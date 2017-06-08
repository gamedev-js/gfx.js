document.addEventListener('readystatechange', () => {
  if ( document.readyState !== 'complete' ) {
    return;
  }

  let gfx = window.gfx;

  // init
  let canvasEL = document.getElementById('canvas');
  let device = new gfx.Device(canvasEL);
  let stats = new window.LStats(document.body);

  // init resources
  let program = new gfx.Program(device, {
    vert: `
      precision mediump float;
      attribute vec2 a_position;
      void main () {
        gl_Position = vec4(a_position, 0, 1);
      }
    `,
    frag: `
      precision mediump float;
      uniform vec4 color;
      void main () {
        gl_FragColor = color;
      }
    `,
  });
  program.link();

  let vertexFmt = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
  ]);
  let vertexBuffer = new gfx.VertexBuffer(
    device,
    vertexFmt,
    gfx.USAGE_STATIC,
    new Float32Array([-1, 0, 0, -1, 1, 1]),
    3,
    false
  );

  // update
  function animate() {
    stats.tick();

    device.setViewport(0, 0, canvasEL.width, canvasEL.height);
    device.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: 1
    });
    device.setVertexBuffer(0, vertexBuffer);
    device.setUniform('color', new Float32Array([1, 0, 0, 1]));
    device.setProgram(program);
    device.draw(0, 3);

    requestAnimationFrame(animate);
  }

  function resize () {
    let bcr = canvasEL.parentElement.getBoundingClientRect();
    canvasEL.width = bcr.width;
    canvasEL.height = bcr.height;
  }

  window.addEventListener('resize', () => {
    resize();
  });

  window.requestAnimationFrame(() => {
    resize();
    animate();
  });
});