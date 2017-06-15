const tap = require('tap');
const gfx = require('../dist/gfx.js');

suite(tap, 'helper', {timeout: 20000}, t => {
  function _initGL(cb) {
    while(document.body.firstElementChild) {
      document.body.firstElementChild.remove();
    }

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
      t.equal(gfx.glFilter(gl, gfx.FILTER_NEAREST), gl.NEAREST);
      t.equal(gfx.glFilter(gl, gfx.FILTER_LINEAR), gl.LINEAR);
      t.equal(gfx.glFilter(gl, gfx.FILTER_NEAREST, gfx.FILTER_NEAREST), gl.NEAREST_MIPMAP_NEAREST);
      t.equal(gfx.glFilter(gl, gfx.FILTER_LINEAR, gfx.FILTER_NEAREST), gl.LINEAR_MIPMAP_NEAREST);
      t.equal(gfx.glFilter(gl, gfx.FILTER_NEAREST, gfx.FILTER_LINEAR), gl.NEAREST_MIPMAP_LINEAR);
      t.equal(gfx.glFilter(gl, gfx.FILTER_LINEAR, gfx.FILTER_LINEAR), gl.LINEAR_MIPMAP_LINEAR);

      t.end();
    });

    t.test('wrap', t => {
      t.equal(gfx.WRAP_REPEAT, gl.REPEAT);
      t.equal(gfx.WRAP_CLAMP, gl.CLAMP_TO_EDGE);
      t.equal(gfx.WRAP_MIRROR, gl.MIRRORED_REPEAT);

      t.end();
    });

    t.test('texture_fmt', t => {
      let ext_hf = gl.getExtension('OES_texture_half_float');
      let ext_s3tc = gl.getExtension('WEBGL_compressed_texture_s3tc');
      // let ext_pvrtc = gl.getExtension('WEBGL_compressed_texture_pvrtc');

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB_DXT1),
        { format: gl.RGB, internalFormat: ext_s3tc.COMPRESSED_RGB_S3TC_DXT1_EXT, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA_DXT1),
        { format: gl.RGBA, internalFormat: ext_s3tc.COMPRESSED_RGBA_S3TC_DXT1_EXT, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA_DXT3),
        { format: gl.RGBA, internalFormat: ext_s3tc.COMPRESSED_RGBA_S3TC_DXT3_EXT, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA_DXT5),
        { format: gl.RGBA, internalFormat: ext_s3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT, pixelType: null }
      );

      // t.deepEqual(
      //   gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB_ETC1),
      //   { format: gl.RGB, internalFormat: gl.COMPRESSED_RGB_ETC1_WEBGL, pixelType: null }
      // );

      // t.deepEqual(
      //   gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB_PVRTC_2BPPV1),
      //   { format: gl.RGB, internalFormat: ext_pvrtc.COMPRESSED_RGB_PVRTC_2BPPV1_IMG, pixelType: null }
      // );

      // t.deepEqual(
      //   gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA_PVRTC_2BPPV1),
      //   { format: gl.RGBA, internalFormat: ext_pvrtc.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG, pixelType: null }
      // );

      // t.deepEqual(
      //   gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB_PVRTC_4BPPV1),
      //   { format: gl.RGB, internalFormat: ext_pvrtc.COMPRESSED_RGB_PVRTC_4BPPV1_IMG, pixelType: null }
      // );

      // t.deepEqual(
      //   gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA_PVRTC_4BPPV1),
      //   { format: gl.RGBA, internalFormat: ext_pvrtc.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG, pixelType: null }
      // );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_A8),
        { format: gl.ALPHA, internalFormat: gl.ALPHA, pixelType: gl.UNSIGNED_BYTE }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_L8),
        { format: gl.LUMINANCE, internalFormat: gl.LUMINANCE, pixelType: gl.UNSIGNED_BYTE }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_L8_A8),
        { format: gl.LUMINANCE_ALPHA, internalFormat: gl.LUMINANCE_ALPHA, pixelType: gl.UNSIGNED_BYTE }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_R5_G6_B5),
        { format: gl.RGB, internalFormat: gl.RGB, pixelType: gl.UNSIGNED_SHORT_5_6_5 }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_R5_G5_B5_A1),
        { format: gl.RGBA, internalFormat: gl.RGBA, pixelType: gl.UNSIGNED_SHORT_5_5_5_1 }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_R4_G4_B4_A4),
        { format: gl.RGBA, internalFormat: gl.RGBA, pixelType: gl.UNSIGNED_SHORT_4_4_4_4 }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB8),
        { format: gl.RGB, internalFormat: gl.RGB, pixelType: gl.UNSIGNED_BYTE }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA8),
        { format: gl.RGBA, internalFormat: gl.RGBA, pixelType: gl.UNSIGNED_BYTE }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB16F),
        { format: gl.RGB, internalFormat: gl.RGB, pixelType: ext_hf.HALF_FLOAT_OES }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA16F),
        { format: gl.RGBA, internalFormat: gl.RGBA, pixelType: ext_hf.HALF_FLOAT_OES }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGB32F),
        { format: gl.RGB, internalFormat: gl.RGB, pixelType: gl.FLOAT }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_RGBA32F),
        { format: gl.RGBA, internalFormat: gl.RGBA, pixelType: gl.FLOAT }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_R32F),
        { format: null, internalFormat: null, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_111110F),
        { format: null, internalFormat: null, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_SRGB),
        { format: null, internalFormat: null, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_SRGBA),
        { format: null, internalFormat: null, pixelType: null }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_D16),
        { format: gl.DEPTH_COMPONENT, internalFormat: gl.DEPTH_COMPONENT, pixelType: gl.UNSIGNED_SHORT }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_D32),
        { format: gl.DEPTH_COMPONENT, internalFormat: gl.DEPTH_COMPONENT, pixelType: gl.UNSIGNED_INT }
      );

      t.deepEqual(
        gfx.glTextureFmt(gfx.TEXTURE_FMT_D24S8),
        { format: null, internalFormat: null, pixelType: null }
      );

      t.end();
    });

    t.test('rb_fmt', t => {
      t.equal(gfx.RB_FMT_RGBA4, gl.RGBA4);
      t.equal(gfx.RB_FMT_RGB5_A1, gl.RGB5_A1);
      t.equal(gfx.RB_FMT_RGB565, gl.RGB565);
      t.equal(gfx.RB_FMT_D16, gl.DEPTH_COMPONENT16);
      t.equal(gfx.RB_FMT_S8, gl.STENCIL_INDEX8);
      t.equal(gfx.RB_FMT_D24S8, gl.DEPTH_STENCIL);

      t.end();
    });

    t.test('blend func', t => {
      t.equal(gfx.BLEND_FUNC_ADD, gl.FUNC_ADD);
      t.equal(gfx.BLEND_FUNC_SUBTRACT, gl.FUNC_SUBTRACT);
      t.equal(gfx.BLEND_FUNC_REVERSE_SUBTRACT, gl.FUNC_REVERSE_SUBTRACT);

      t.end();
    });

    t.test('blend', t => {
      t.equal(gfx.BLEND_ZERO, gl.ZERO);
      t.equal(gfx.BLEND_ONE, gl.ONE);
      t.equal(gfx.BLEND_SRC_COLOR, gl.SRC_COLOR);
      t.equal(gfx.BLEND_ONE_MINUS_SRC_COLOR, gl.ONE_MINUS_SRC_COLOR);
      t.equal(gfx.BLEND_DST_COLOR, gl.DST_COLOR);
      t.equal(gfx.BLEND_ONE_MINUS_DST_COLOR, gl.ONE_MINUS_DST_COLOR);
      t.equal(gfx.BLEND_SRC_ALPHA, gl.SRC_ALPHA);
      t.equal(gfx.BLEND_ONE_MINUS_SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      t.equal(gfx.BLEND_DST_ALPHA, gl.DST_ALPHA);
      t.equal(gfx.BLEND_ONE_MINUS_DST_ALPHA, gl.ONE_MINUS_DST_ALPHA);
      t.equal(gfx.BLEND_CONSTANT_COLOR, gl.CONSTANT_COLOR);
      t.equal(gfx.BLEND_ONE_MINUS_CONSTANT_COLOR, gl.ONE_MINUS_CONSTANT_COLOR);
      t.equal(gfx.BLEND_CONSTANT_ALPHA, gl.CONSTANT_ALPHA);
      t.equal(gfx.BLEND_ONE_MINUS_CONSTANT_ALPHA, gl.ONE_MINUS_CONSTANT_ALPHA);
      t.equal(gfx.BLEND_SRC_ALPHA_SATURATE, gl.SRC_ALPHA_SATURATE);

      t.end();
    });

    t.test('cull', t => {
      t.equal(gfx.CULL_NONE, 0);
      t.equal(gfx.CULL_FRONT, gl.FRONT);
      t.equal(gfx.CULL_BACK, gl.BACK);
      t.equal(gfx.CULL_FRONT_AND_BACK, gl.FRONT_AND_BACK);

      t.end();
    });

    t.test('primitive type', t => {
      t.equal(gfx.PT_POINTS, gl.POINTS);
      t.equal(gfx.PT_LINES, gl.LINES);
      t.equal(gfx.PT_LINE_LOOP, gl.LINE_LOOP);
      t.equal(gfx.PT_LINE_STRIP, gl.LINE_STRIP);
      t.equal(gfx.PT_TRIANGLES, gl.TRIANGLES);
      t.equal(gfx.PT_TRIANGLE_STRIP, gl.TRIANGLE_STRIP);
      t.equal(gfx.PT_TRIANGLE_FAN, gl.TRIANGLE_FAN);

      t.end();
    });
  });
});