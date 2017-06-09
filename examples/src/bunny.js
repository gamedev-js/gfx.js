(() => {
  let resl = window.resl;
  let gfx = window.gfx;
  let device = window.device;
  let canvas = window.canvas;
  let {mat4} = window.vmath;

  // init resources
  let program = new gfx.Program(device, {
    vert: `
      precision mediump float;
      attribute vec3 a_position;
      uniform mat4 model, view, projection;
      void main () {
        gl_Position = projection * view * model * vec4(a_position, 1);
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

  let vertexBuffer, indexBuffer;

  let vertexFmt = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
  ]);

  let bunnyLoaded = false;

  resl({
    js: {
      type: 'text',
      src: './assets/bunny.js'
    },

    onDone (assets) {
      let bunny = eval(assets.js);
      let verts = new Array(bunny.positions.length * 3);
      let indices = new Array(bunny.cells.length * 3);

      for (let i = 0; i < bunny.positions.length; ++i) {
        let pos = bunny.positions[i];
        verts[3 * i] = pos[0];
        verts[3 * i + 1] = pos[1];
        verts[3 * i + 2] = pos[2];
      }

      for (let i = 0; i < bunny.cells.length; ++i) {
        let cell = bunny.cells[i];
        indices[3 * i] = cell[0];
        indices[3 * i + 1] = cell[1];
        indices[3 * i + 2] = cell[2];
      }

      vertexBuffer = new gfx.VertexBuffer(
        device,
        vertexFmt,
        gfx.USAGE_STATIC,
        new Float32Array(verts),
        bunny.positions.length,
        false
      );

      indexBuffer = new gfx.IndexBuffer(
        device,
        gfx.INDEX_FMT_UINT16,
        gfx.USAGE_STATIC,
        new Uint16Array(indices),
        indices.length,
        false
      );
    }
  });

  let view = mat4.create();
  let project = mat4.create();

  // tick
  return function tick() {
    // mat4.lookat( view,
    //   [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
    //   [0, 2.5, 0],
    //   [0, 1, 0]
    // );

    device.setViewport(0, 0, canvas.width, canvas.height);
    device.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: 1
    });

    if (bunnyLoaded) {
      device.setVertexBuffer(0, vertexBuffer);
      device.setIndexBuffer(indexBuffer);
      // device.setUniform('model', );
      // device.setUniform('view', );
      // device.setUniform('projection', );
      device.setUniform('color', new Float32Array([1, 1, 0, 1]));
      device.setProgram(program);
      device.draw(0, indexBuffer.count);
    }
  };
})();