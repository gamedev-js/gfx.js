(() => {
  let gfx = window.gfx;
  let device = window.device;
  let canvas = window.canvas;

  function _bigTriangle(device) {
    let program = new gfx.Program(device, {
      vert: `
        precision mediump float;
        attribute vec2 a_position;
        varying vec2 uv;

        void main() {
          uv = (a_position + vec2(1,1)) * 0.5;
          gl_Position = vec4(a_position, 0, 1);
        }
      `,
      frag: `
        precision mediump float;
        varying vec2 uv;
        uniform sampler2D texture;
        uniform float time;

        void main() {
          vec2 offset = vec2(time * -0.1);

          gl_FragColor = texture2D(texture, 8.0 * (uv + offset));
        }
      `,
    });
    program.link();

    let vertexFmt = new gfx.VertexFormat([
      { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
    ]);
    let vb = new gfx.VertexBuffer(
      device,
      vertexFmt,
      gfx.USAGE_STATIC,
      new Float32Array([-1, 4, -1, -1, 4, -1]),
      3,
      false
    );

    return {
      vb,
      program,
    };
  }

  // create background texture
  let img = document.createElement('canvas');
  let imgC = img.getContext('2d');
  img.width = img.height = 128;
  imgC.fillStyle = '#ddd';
  imgC.fillRect(0, 0, 128, 128);
  imgC.fillStyle = '#555';
  imgC.fillRect(0, 0, 64, 64);
  imgC.fillStyle = '#999';
  imgC.fillRect(32, 32, 32, 32);
  imgC.fillStyle = '#555';
  imgC.fillRect(64, 64, 64, 64);
  imgC.fillStyle = '#777';
  imgC.fillRect(96, 96, 32, 32);
  let textureBG = new gfx.Texture2D(device, {
    images: [img],
    width: 128,
    height: 128,
    wrapS: gfx.WRAP_REPEAT,
    wrapT: gfx.WRAP_REPEAT,
    mipmap: true,
  });

  let bg = _bigTriangle(device);

  let t = 0;

  // tick
  return function tick(dt) {
    t += dt;

    device.setViewport(0, 0, canvas.width, canvas.height);
    device.clear({
      color: [0.1, 0.1, 0.1, 1],
      depth: 1
    });
    device.setTexture('texture', textureBG, 0);
    device.setUniform('time', t);
    device.setVertexBuffer(0, bg.vb);
    device.setProgram(bg.program);
    device.draw(0, bg.vb.count);
  };
})();