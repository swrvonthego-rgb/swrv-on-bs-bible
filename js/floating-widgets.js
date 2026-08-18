// SWRV Kingdom Bible — draggable, edge-dockable floating widgets
// The font-size button and the tour-replay button sit fixed in a bottom
// corner and can end up stacked on top of each other and on top of the
// reading text on smaller screens. This lets a user drag either one
// anywhere on screen; dropping one near the left or right edge "docks" it
// into a thin arrow tab that just peeks out from the side instead of
// covering content. Tapping a docked tab slides it back out; tapping it
// again (now undocked) fires its normal action, same as always.
//
// The mini music player uses the same docked-tab look and storage, but
// doesn't drag: its shape/position must stay put (it has tappable children
// — play, track name, expand — that need normal single taps to reach them),
// so free-drag is disabled for it and a double-tap docks/undocks it to the
// nearest side instead.
(function(){
  var STORE_KEY = 'swrv_floating_positions_v1';
  var EDGE_SNAP = 46;      // px from the screen edge that triggers docking on drop
  var DRAG_THRESHOLD = 6;  // px of movement before a press counts as a drag, not a tap
  var DOUBLE_TAP_MS = 350;

  function loadAll(){ try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch(e){ return {}; } }
  function saveAll(p){ try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch(e){} }

  function makeFloatingWidget(el, id, onActivate, opts){
    if(!el || el._swrvDockInit) return;
    el._swrvDockInit = true;
    el.classList.add('floating-widget');
    var noDrag = !!(opts && opts.noDrag);
    var lastTapTime = 0;

    var originalHTML = el.innerHTML;
    var positions = loadAll();
    var state = positions[id] || null; // {docked, side, x, y}

    function applyPosition(){
      el.style.left = ''; el.style.right = ''; el.style.top = ''; el.style.bottom = '';
      if(!state) return; // no saved position yet — leave the original CSS default in place
      if(state.docked){
        el.innerHTML = '<span class="widget-dock-arrow">' + (state.side === 'left' ? '›' : '‹') + '</span>';
        el.classList.add('widget-docked');
        el.classList.toggle('docked-left', state.side === 'left');
        el.classList.toggle('docked-right', state.side !== 'left');
        el.style.top = state.y + 'px';
        el.style[state.side === 'left' ? 'left' : 'right'] = '-14px';
      } else {
        el.innerHTML = originalHTML;
        el.classList.remove('widget-docked', 'docked-left', 'docked-right');
        el.style.left = state.x + 'px';
        el.style.top = state.y + 'px';
      }
    }
    applyPosition();

    var dragging = false, moved = false, startX, startY, origX, origY;

    function pointFrom(e){ return e.touches ? e.touches[0] : e; }

    function onDown(e){
      var p = pointFrom(e);
      startX = p.clientX; startY = p.clientY;
      var rect = el.getBoundingClientRect();
      origX = rect.left; origY = rect.top;
      dragging = true; moved = false;
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchmove', onMove, {passive:false});
      document.addEventListener('touchend', onUp);
    }

    function onMove(e){
      if(!dragging || noDrag) return;
      var p = pointFrom(e);
      var dx = p.clientX - startX, dy = p.clientY - startY;
      if(!moved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)){
        moved = true;
        el.classList.add('widget-dragging');
        if(el.classList.contains('widget-docked')){
          el.innerHTML = originalHTML;
          el.classList.remove('widget-docked', 'docked-left', 'docked-right');
        }
      }
      if(!moved) return;
      if(e.cancelable) e.preventDefault();
      var w = el.offsetWidth, h = el.offsetHeight;
      var nx = origX + dx, ny = origY + dy;
      nx = Math.max(4, Math.min(window.innerWidth - w - 4, nx));
      ny = Math.max(56, Math.min(window.innerHeight - h - 4, ny));
      el.style.left = nx + 'px'; el.style.top = ny + 'px';
      el.style.right = ''; el.style.bottom = '';
    }

    function onUp(){
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
      if(!dragging) return;
      dragging = false;
      el.classList.remove('widget-dragging');

      if(!moved){
        if(noDrag){
          // No free-drag on this widget — a double-tap docks/undocks it
          // instead, so its shape and position otherwise never change.
          var now = Date.now();
          var isDoubleTap = (now - lastTapTime) < DOUBLE_TAP_MS;
          lastTapTime = isDoubleTap ? 0 : now;
          if(isDoubleTap){
            if(state && state.docked){
              state.docked = false;
            } else {
              var r2 = el.getBoundingClientRect();
              var nearLeft2 = r2.left <= (window.innerWidth / 2);
              state = { docked: true, side: nearLeft2 ? 'left' : 'right', y: r2.top };
            }
            positions[id] = state; saveAll(positions);
            applyPosition();
          }
          return;
        }
        // A plain tap, not a drag.
        if(state && state.docked){
          // First tap on a docked tab only slides it back out.
          state.docked = false;
          if(state.x == null){
            var r = el.getBoundingClientRect();
            state.x = Math.max(12, window.innerWidth - el.offsetWidth - 70);
            state.y = r.top;
          }
          positions[id] = state; saveAll(positions);
          applyPosition();
        } else if(typeof onActivate === 'function'){
          onActivate();
        }
        // else: no dedicated action (e.g. the music mini bar) — let the tap
        // fall through to whichever inner control the user actually touched.
        return;
      }

      // Was dragged — dock it if dropped near an edge, else remember the free spot.
      var rect = el.getBoundingClientRect();
      var nearLeft = rect.left <= EDGE_SNAP;
      var nearRight = (window.innerWidth - rect.right) <= EDGE_SNAP;
      if(nearLeft || nearRight){
        state = { docked: true, side: nearLeft ? 'left' : 'right', y: rect.top };
      } else {
        state = { docked: false, x: rect.left, y: rect.top };
      }
      positions[id] = state; saveAll(positions);
      applyPosition();
    }

    el.addEventListener('mousedown', onDown);
    el.addEventListener('touchstart', onDown, {passive:true});
    window.addEventListener('resize', function(){
      if(state && !state.docked){
        state.x = Math.min(state.x, window.innerWidth - el.offsetWidth - 4);
        state.y = Math.min(state.y, window.innerHeight - el.offsetHeight - 4);
      }
      applyPosition();
    });
  }

  function init(){
    makeFloatingWidget(document.getElementById('floatingFontSizeBtn'), 'floatingFontSizeBtn', function(){
      if(typeof toggleFontSizePopover === 'function') toggleFontSizePopover();
    });
    makeFloatingWidget(document.getElementById('tourRelaunchBtn'), 'tourRelaunchBtn', function(){
      if(typeof startAppTour === 'function') startAppTour();
    });
    // The mini music player has its own tappable children (play / track name /
    // expand), so it never free-drags — its shape and position stay fixed.
    // A double-tap docks it to the nearest side or brings it back out; single
    // taps pass through to whichever child the user touched, as always.
    makeFloatingWidget(document.getElementById('musicMini'), 'musicMini', null, { noDrag: true });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Escape hatch if a widget ever gets dragged somewhere unreachable.
  window.resetFloatingWidgetPositions = function(){
    try { localStorage.removeItem(STORE_KEY); } catch(e){}
    location.reload();
  };
})();
