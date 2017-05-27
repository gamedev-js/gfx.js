document.addEventListener('readystatechange', () => {
  if ( document.readyState !== 'complete' ) {
    return;
  }

  // modules
  const pstats = window.pstats;
  const vmath = window.vmath;
  const ddraw = window.ddraw;
  const sgraph = window.sgraph;

  // init stats
  let stats = pstats.new(document.body, {
    values: {
      fps: { desc: 'Framerate (FPS)', below: 30, average: 500 },
      memory: { desc: 'Memory', extension: 'memory.used', average: 1000 },
    },
    extensions: [
      'memory', 'webgl'
    ],
  });

  // init renderer
  let canvasEL = document.getElementById('canvas');
  let device = new window.GraphicsDevice({
    canvas: canvasEL
  });
  let renderer = new window.ForwardRenderer(device);

  // update
  function animate() {
    // scene.addLight(light);
    // scene.addModel(model);

    renderer.render(scene, camera);

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});