(() => {
  let gfx = window.gfx;
  let device = window.device;
  let canvas = window.canvas;
  let { vec2, mat23, mat4 } = window.vmath;

  // init resources
  let program = new gfx.Program(device, {
    vert: `
      precision highp float;
      uniform mat4 projection;
      uniform mat4 transform;
      attribute vec2 a_position;
      void main () {
        gl_Position = projection * transform * vec4(a_position, 0, 1);
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
  let affineTranslation = mat23.create();
  let affineRotation = mat23.create();
  let affineScale = mat23.create();
  /**
   * coordinates
   * .---------> x
   * |
   * |
   * |
   * |
   * V y
   */

  // tick
  return function tick() {
    mat4.ortho(projection, 0, canvas.width, canvas.height, 0, -100, 100);

    mat23.fromTranslation(affineTranslation, vec2.new(10, (canvas.height - spriteHeight) / 2));

    mat23.fromTranslation(affineRotation, vec2.new(10 + spriteWidth * 2, (canvas.height - spriteHeight) / 2));
    mat23.rotate(affineRotation, affineRotation, Math.PI * 15 / 180);

    mat23.fromTranslation(affineScale, vec2.new(10 + spriteWidth * 4, (canvas.height - spriteHeight) / 2));
    mat23.scale(affineScale, affineScale, vec2.new(1.2, 0.5));

    device.setViewport(0, 0, canvas.width, canvas.height);
    device.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: 1
    });

    // translation
    device.setVertexBuffer(0, vertexBuffer);
    device.setUniform('color', new Float32Array([1, 0, 0, 1]));
    device.setUniform('projection', mat4.array(new Float32Array(16), projection));
    device.setUniform('transform', mat23.array4x4(new Float32Array(16), affineTranslation));
    device.setProgram(program);
    device.draw(0, vertexBuffer.count);

    // rotation
    device.setVertexBuffer(0, vertexBuffer);
    device.setUniform('color', new Float32Array([0, 1, 0, 1]));
    device.setUniform('projection', mat4.array(new Float32Array(16), projection));
    device.setUniform('transform', mat23.array4x4(new Float32Array(16), affineRotation));
    device.setProgram(program);
    device.draw(0, vertexBuffer.count);

    // scale
    device.setVertexBuffer(0, vertexBuffer);
    device.setUniform('color', new Float32Array([0, 0, 1, 1]));
    device.setUniform('projection', mat4.array(new Float32Array(16), projection));
    device.setUniform('transform', mat23.array4x4(new Float32Array(16), affineScale));
    device.setProgram(program);
    device.draw(0, vertexBuffer.count);
  };
})();
