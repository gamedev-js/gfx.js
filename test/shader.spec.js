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
      let program = new gfx.Program(device, {
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
      program.link();

      t.equal(program._attributes.length, 2);
      t.equal(program._attributes[0].name, 'a_uv0');
      t.equal(program._attributes[0].type, device._gl.FLOAT_VEC2);
      t.equal(program._attributes[1].name, 'a_position');
      t.equal(program._attributes[1].type, device._gl.FLOAT_VEC3);

      t.end();
    });
  });

  _initDevice(device => {
    t.test('errors', t => {

      let program = new gfx.Program(device, {
        vert: `
          attribute vec3 a_position
          attribute vec2 a_uv0;

          void main() {
            vec4 position = vec4(a_uv0.xy, a_position.z, 1.0);
            gl_Position = vec4( a_position, 1.0 );
          }
        `,
        frag: `
          precision mediump float;
          void main() {
            gl_fragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
          }
        `
      });
      program.link();

      t.equal(program._errors.length, 4);
      t.equal(program._errors[0].fileID, 0);
      t.equal(program._errors[0].line, 3);

      t.equal(program._errors[1].fileID, 0);
      t.equal(program._errors[1].line, 4);

      t.end();
    });
  });

  _initDevice(device => {
    t.test('uniformArray', t => {

      let program = new gfx.Program(device, {
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
          uniform float farray[2];
          uniform vec2 v2array[3];
          uniform bool barray[4];
          void main() {
            gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
            if (barray[3]) {
              gl_FragColor.r = farray[0];
            } else {
              gl_FragColor.r = v2array[1].x;
            }
          }
        `
      });
      program.link();
      let uniforms = program._uniforms;
      let gl = device._gl;
      t.equal(uniforms.length, 3);
      // the sequence will vary in different browsers, so let us define a table to check
      let uniformTable = {
        farray: {
          type: gl.FLOAT,
          size: 2
        },
        v2array: {
          type: gl.FLOAT_VEC2,
          size: 3
        },
        barray: {
          type: gl.BOOL,
          size: 4
        }
      };
      uniforms.forEach(uniform => {
        t.equal(uniform.type, uniformTable[uniform.name].type);
        t.equal(uniform.size, uniformTable[uniform.name].size);
      });
      t.end();
    });
  });
});