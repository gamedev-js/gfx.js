function _loadPromise(url) {
  return new Promise((resolve, reject) => {
    let xhr = new window.XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = onreadystatechange;
    xhr.send(null);

    function onreadystatechange(e) {
      if (xhr.readyState !== 4) {
        return;
      }

      // Testing harness file:/// results in 0.
      if ([0, 200, 304].indexOf(xhr.status) === -1) {
        reject(`While loading from url ${url} server responded with a status of ${xhr.status}`);
      } else {
        resolve(e.target.response);
      }
    }
  });
}

function _load(view, url) {
  if (window.reqID) {
    window.cancelAnimationFrame(window.reqID);
  }

  _loadPromise(url).then(result => {
    if (view.firstElementChild) {
      view.firstElementChild.remove();
    }

    let canvas = document.createElement('canvas');
    canvas.classList.add('fit');
    canvas.tabIndex = -1;
    view.appendChild(canvas);

    window.canvas = canvas;
    window.device = new window.gfx.Device(canvas);

    let tick = null;
    let lasttime = 0;

    // update
    function animate(timestamp) {
      if (timestamp === undefined) {
        timestamp = 0;
      }
      let dt = (timestamp - lasttime)/1000;
      lasttime = timestamp;

      window.stats.tick();

      if (tick) {
        tick(dt);
      }

      window.reqID = requestAnimationFrame(animate);
    }

    window.reqID = window.requestAnimationFrame(() => {
      _resize();

      tick = eval(`${result}\n//# sourceURL=${url}`);
      animate();
    });

  }).catch(err => {
    console.error(err);
  });
}

function _resize() {
  if (!window.canvas) {
    return;
  }

  let bcr = window.canvas.parentElement.getBoundingClientRect();
  window.canvas.width = bcr.width;
  window.canvas.height = bcr.height;
}

document.addEventListener('readystatechange', () => {
  if ( document.readyState !== 'complete' ) {
    return;
  }

  // let spector = new window.SPECTOR.Spector();
  // spector.displayUI();

  let view = document.getElementById('view');
  let showFPS = document.getElementById('showFPS');
  let exampleList = document.getElementById('exampleList');

  // update profile
  showFPS.checked = localStorage.getItem('gfx.showFPS') === 'true';
  let exampleIndex = parseInt(localStorage.getItem('gfx.exampleIndex'));
  if (isNaN(exampleIndex)) {
    exampleIndex = 0;
  }
  exampleList.selectedIndex = exampleIndex;

  // init
  let stats = new window.LStats(document.body);
  showFPS.checked ? stats.show() : stats.hide();

  window.stats = stats;
  _load(view, exampleList.value);

  window.addEventListener('resize', () => {
    _resize();
  });

  showFPS.addEventListener('click', event => {
    localStorage.setItem('gfx.showFPS', event.target.checked);
    if (event.target.checked) {
      stats.show();
    } else {
      stats.hide();
    }
  });

  exampleList.addEventListener('change', event => {
    localStorage.setItem('gfx.exampleIndex', event.target.selectedIndex);
    _load(view, exampleList.value);
  });
});