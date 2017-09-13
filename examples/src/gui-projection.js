(() => {
  let gfx = window.gfx;
  let device = window.device;
  let canvas = window.canvas;
  let resl = window.resl;
  let { vec3, mat4 } = window.vmath;

  // init resources
  let program = new gfx.Program(device, {
    vert: `
      precision highp float;
      uniform mat4 projection;
      attribute vec2 a_position;
      void main () {
        gl_Position = projection * vec4(a_position, 0, 1);
      }
    `,
    frag: `
      precision highp float;
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
  let spriteWidth = 128;
  let spriteHeight = 128;
  let vertexBuffer = new gfx.VertexBuffer(
    device,
    vertexFmt,
    gfx.USAGE_STATIC,
    new Float32Array([
      0, 0,
      0, spriteHeight,
      spriteWidth, spriteHeight,
      0, 0,
      spriteWidth, spriteHeight,
      spriteWidth, 0
    ]),
    6
  );
  let projection = mat4.create();
  /**
   * coordinates
   * .---------> x
   * |
   * |
   * |
   * |
   * V y
   */
  let designSize = { width: 480, height: 320 };
  let left = 0;
  let right = designSize.width;
  let top = 0;
  let bottom = designSize.height;
  let tmps = mat4.create();
  mat4.fromTranslation(tmps, vec3.new(-(left + right) / 2, -(top + bottom) / 2, 1));
  mat4.fromScaling(projection, vec3.new(2 / (right - left), -2 / (bottom - top), 1));
  mat4.multiply(projection, projection, tmps);

  // tick
  return function tick() {
    device.setViewport(0, 0, canvas.width, canvas.height);
    device.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: 1
    });

    device.setVertexBuffer(0, vertexBuffer);
    device.setUniform('color', new Float32Array([1, 0, 0, 1]));
    device.setUniform('projection', mat4.array(new Float32Array(16), projection));
    device.setProgram(program);
    device.draw(0, vertexBuffer.count);
  };
})();
