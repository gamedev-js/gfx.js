const tap = require('tap');
const gfx = require('../dist/gfx.js');

suite(tap, 'helper', { timeout: 20000 }, t => {
  function _initDevice(cb) {
    while(document.body.firstElementChild) {
      document.body.firstElementChild.remove();
    }

    let canvasEL = document.createElement('canvas');
    let device = new gfx.Device(canvasEL);

    document.body.appendChild(canvasEL);

    cb(device);
  }

  t.afterEach(done => {
    while(document.body.firstElementChild) {
      document.body.firstElementChild.remove();
    }

    done();
  });

  _initDevice(device => {
    t.test('attributes', t => {
      let shader = new gfx.Shader(device, {
        vert: `
          attribute vec3 a_position;
          attribute vec2 a_uv0;

          void main() {
            vec4 position = vec4(a_uv0.xy, a_position.z, 1.0);
            gl_Position = vec4( a_position, 1.0 );
          }
        `,
        frag: `
          precision mediump float;
          void main() {
            gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
          }
        `
      });
      shader.link();

      t.equal(shader._attributes.length, 2);
      t.equal(shader._attributes[0].name, 'a_uv0');
      t.equal(shader._attributes[0].type, device._gl.FLOAT_VEC2);
      t.equal(shader._attributes[1].name, 'a_position');
      t.equal(shader._attributes[1].type, device._gl.FLOAT_VEC3);

      t.end();
    });
  });
});