(() => {
  let gfx = window.gfx;
  let device = window.device;
  let canvas = window.canvas;
  let resl = window.resl;

  let texture = null;

  // init resources
  let program = new gfx.Program(device, {
    vert: `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 v_texcoord;
      void main () {
        gl_Position = vec4(a_position, 0, 1);
        v_texcoord = a_position * 0.5 + 0.5;
      }
    `,
    frag: `
      precision mediump float;
      uniform sampler2D texture;
      uniform vec4 color;
      varying vec2 v_texcoord;
      void main () {
        gl_FragColor = texture2D(texture, v_texcoord);
      }
    `,
  });
  program.link();

  resl({
    manifest: {
      image: {
        type: 'image',
        src: './assets/uv_checker_01.jpg'
      },
    },
    onDone (assets) {
      let image = assets.image;
      texture = new gfx.Texture2D(device, {
        width : image.width,
        height : image.height,
        images : [image]
      });
    }
  });
  let vertexFmt = new gfx.VertexFormat([
    { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
  ]);
  let vertexBuffer = new gfx.VertexBuffer(
    device,
    vertexFmt,
    gfx.USAGE_STATIC,
    new Float32Array([-1, -1, 1, -1, 1, 1, 1, 1, -1, 1, -1, -1]),
    6,
    false
  );

  // tick
  return function tick() {
    device.setViewport(0, 0, canvas.width, canvas.height);
    device.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: 1
    });

    if (texture) {
      device.setVertexBuffer(0, vertexBuffer);
      device.setUniform('color', new Float32Array([1, 0, 0, 1]));
      device.setTexture('texture', texture, 0);
      device.setProgram(program);
      device.draw(0, vertexBuffer.count);
    }
  };
})();
