const tap = require('tap');
const gfx = require('../dist/gfx.js');

suite(tap, 'helper', {timeout: 20000}, t => {
  function _initGL(cb) {
    let canvasEL = document.createElement('canvas');
    let gl = canvasEL.getContext('webgl', {});

    document.body.appendChild(canvasEL);
    cb(gl);
  }

  _initGL(gl => {
    t.test('usage', t => {
      t.equal(gfx.USAGE_STATIC, gl.STATIC_DRAW);
      t.equal(gfx.USAGE_DYNAMIC, gl.DYNAMIC_DRAW);
      t.equal(gfx.USAGE_STREAM, gl.STREAM_DRAW);

      t.end();
    });

    t.test('index_fmt', t => {
      t.equal(gfx.INDEX_FMT_UINT8, gl.UNSIGNED_BYTE);
      t.equal(gfx.INDEX_FMT_UINT16, gl.UNSIGNED_SHORT);
      t.equal(gfx.INDEX_FMT_UINT32, gl.UNSIGNED_INT);

      t.end();
    });

    t.test('attr_type', t => {
      t.equal(gfx.ATTR_TYPE_INT8, gl.BYTE);
      t.equal(gfx.ATTR_TYPE_UINT8, gl.UNSIGNED_BYTE);
      t.equal(gfx.ATTR_TYPE_INT16, gl.SHORT);
      t.equal(gfx.ATTR_TYPE_UINT16, gl.UNSIGNED_SHORT);
      t.equal(gfx.ATTR_TYPE_INT32, gl.INT);
      t.equal(gfx.ATTR_TYPE_UINT32, gl.UNSIGNED_INT);
      t.equal(gfx.ATTR_TYPE_FLOAT32, gl.FLOAT);

      t.end();
    });

    t.test('filter', t => {
      t.equal(gfx.FILTER_NEAREST, gl.NEAREST);
      t.equal(gfx.FILTER_LINEAR, gl.LINEAR);
      t.equal(gfx.FILTER_NEAREST_MIPMAP_NEAREST, gl.NEAREST_MIPMAP_NEAREST);
      t.equal(gfx.FILTER_LINEAR_MIPMAP_NEAREST, gl.LINEAR_MIPMAP_NEAREST);
      t.equal(gfx.FILTER_NEAREST_MIPMAP_LINEAR, gl.NEAREST_MIPMAP_LINEAR);
      t.equal(gfx.FILTER_LINEAR_MIPMAP_LINEAR, gl.LINEAR_MIPMAP_LINEAR);

      t.end();
    });

    t.test('wrap', t => {
      t.equal(gfx.WRAP_REPEAT, gl.REPEAT);
      t.equal(gfx.WRAP_CLAMP, gl.CLAMP_TO_EDGE);
      t.equal(gfx.WRAP_MIRROR, gl.MIRRORED_REPEAT);

      t.end();
    });
  });
});