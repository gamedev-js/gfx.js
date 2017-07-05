
/*
 * gfx.js v1.1.7
 * (c) 2017 @Johnny Wu
 * Released under the MIT License.
 */

var gfx = (function () {
'use strict';

var GL_NEAREST = 9728;                // gl.NEAREST
var GL_LINEAR = 9729;                 // gl.LINEAR
var GL_NEAREST_MIPMAP_NEAREST = 9984; // gl.NEAREST_MIPMAP_NEAREST
var GL_LINEAR_MIPMAP_NEAREST = 9985;  // gl.LINEAR_MIPMAP_NEAREST
var GL_NEAREST_MIPMAP_LINEAR = 9986;  // gl.NEAREST_MIPMAP_LINEAR
var GL_LINEAR_MIPMAP_LINEAR = 9987;   // gl.LINEAR_MIPMAP_LINEAR

// const GL_BYTE = 5120;                  // gl.BYTE
var GL_UNSIGNED_BYTE = 5121;            // gl.UNSIGNED_BYTE
// const GL_SHORT = 5122;                 // gl.SHORT
var GL_UNSIGNED_SHORT = 5123;           // gl.UNSIGNED_SHORT
var GL_UNSIGNED_INT = 5125;             // gl.UNSIGNED_INT
var GL_FLOAT = 5126;                    // gl.FLOAT
var GL_UNSIGNED_SHORT_5_6_5 = 33635;    // gl.UNSIGNED_SHORT_5_6_5
var GL_UNSIGNED_SHORT_4_4_4_4 = 32819;  // gl.UNSIGNED_SHORT_4_4_4_4
var GL_UNSIGNED_SHORT_5_5_5_1 = 32820;  // gl.UNSIGNED_SHORT_5_5_5_1
var GL_HALF_FLOAT_OES = 36193;          // gl.HALF_FLOAT_OES

var GL_DEPTH_COMPONENT = 6402; // gl.DEPTH_COMPONENT

var GL_ALPHA = 6406;            // gl.ALPHA
var GL_RGB = 6407;              // gl.RGB
var GL_RGBA = 6408;             // gl.RGBA
var GL_LUMINANCE = 6409;        // gl.LUMINANCE
var GL_LUMINANCE_ALPHA = 6410;  // gl.LUMINANCE_ALPHA

var GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;   // ext.COMPRESSED_RGB_S3TC_DXT1_EXT
var GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;  // ext.COMPRESSED_RGBA_S3TC_DXT1_EXT
var GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;  // ext.COMPRESSED_RGBA_S3TC_DXT3_EXT
var GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;  // ext.COMPRESSED_RGBA_S3TC_DXT5_EXT

var GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;  // ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
var GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;  // ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
var GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02; // ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
var GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03; // ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG

var GL_COMPRESSED_RGB_ETC1_WEBGL = 0x8D64; // ext.COMPRESSED_RGB_ETC1_WEBGL

var _filterGL = [
  [ GL_NEAREST,  GL_NEAREST_MIPMAP_NEAREST, GL_NEAREST_MIPMAP_LINEAR ],
  [ GL_LINEAR,  GL_LINEAR_MIPMAP_NEAREST, GL_LINEAR_MIPMAP_LINEAR ] ];

var _textureFmtGL = [
  // TEXTURE_FMT_RGB_DXT1: 0
  { format: GL_RGB, internalFormat: GL_COMPRESSED_RGB_S3TC_DXT1_EXT, pixelType: null },

  // TEXTURE_FMT_RGBA_DXT1: 1
  { format: GL_RGBA, internalFormat: GL_COMPRESSED_RGBA_S3TC_DXT1_EXT, pixelType: null },

  // TEXTURE_FMT_RGBA_DXT3: 2
  { format: GL_RGBA, internalFormat: GL_COMPRESSED_RGBA_S3TC_DXT3_EXT, pixelType: null },

  // TEXTURE_FMT_RGBA_DXT5: 3
  { format: GL_RGBA, internalFormat: GL_COMPRESSED_RGBA_S3TC_DXT5_EXT, pixelType: null },

  // TEXTURE_FMT_RGB_ETC1: 4
  { format: GL_RGB, internalFormat: GL_COMPRESSED_RGB_ETC1_WEBGL, pixelType: null },

  // TEXTURE_FMT_RGB_PVRTC_2BPPV1: 5
  { format: GL_RGB, internalFormat: GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG, pixelType: null },

  // TEXTURE_FMT_RGBA_PVRTC_2BPPV1: 6
  { format: GL_RGBA, internalFormat: GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG, pixelType: null },

  // TEXTURE_FMT_RGB_PVRTC_4BPPV1: 7
  { format: GL_RGB, internalFormat: GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG, pixelType: null },

  // TEXTURE_FMT_RGBA_PVRTC_4BPPV1: 8
  { format: GL_RGBA, internalFormat: GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG, pixelType: null },

  // TEXTURE_FMT_A8: 9
  { format: GL_ALPHA, internalFormat: GL_ALPHA, pixelType: GL_UNSIGNED_BYTE },

  // TEXTURE_FMT_L8: 10
  { format: GL_LUMINANCE, internalFormat: GL_LUMINANCE, pixelType: GL_UNSIGNED_BYTE },

  // TEXTURE_FMT_L8_A8: 11
  { format: GL_LUMINANCE_ALPHA, internalFormat: GL_LUMINANCE_ALPHA, pixelType: GL_UNSIGNED_BYTE },

  // TEXTURE_FMT_R5_G6_B5: 12
  { format: GL_RGB, internalFormat: GL_RGB, pixelType: GL_UNSIGNED_SHORT_5_6_5 },

  // TEXTURE_FMT_R5_G5_B5_A1: 13
  { format: GL_RGBA, internalFormat: GL_RGBA, pixelType: GL_UNSIGNED_SHORT_5_5_5_1 },

  // TEXTURE_FMT_R4_G4_B4_A4: 14
  { format: GL_RGBA, internalFormat: GL_RGBA, pixelType: GL_UNSIGNED_SHORT_4_4_4_4 },

  // TEXTURE_FMT_RGB8: 15
  { format: GL_RGB, internalFormat: GL_RGB, pixelType: GL_UNSIGNED_BYTE },

  // TEXTURE_FMT_RGBA8: 16
  { format: GL_RGBA, internalFormat: GL_RGBA, pixelType: GL_UNSIGNED_BYTE },

  // TEXTURE_FMT_RGB16F: 17
  { format: GL_RGB, internalFormat: GL_RGB, pixelType: GL_HALF_FLOAT_OES },

  // TEXTURE_FMT_RGBA16F: 18
  { format: GL_RGBA, internalFormat: GL_RGBA, pixelType: GL_HALF_FLOAT_OES },

  // TEXTURE_FMT_RGB32F: 19
  { format: GL_RGB, internalFormat: GL_RGB, pixelType: GL_FLOAT },

  // TEXTURE_FMT_RGBA32F: 20
  { format: GL_RGBA, internalFormat: GL_RGBA, pixelType: GL_FLOAT },

  // TEXTURE_FMT_R32F: 21
  { format: null, internalFormat: null, pixelType: null },

  // TEXTURE_FMT_111110F: 22
  { format: null, internalFormat: null, pixelType: null },

  // TEXTURE_FMT_SRGB: 23
  { format: null, internalFormat: null, pixelType: null },

  // TEXTURE_FMT_SRGBA: 24
  { format: null, internalFormat: null, pixelType: null },

  // TEXTURE_FMT_D16: 25
  { format: GL_DEPTH_COMPONENT, internalFormat: GL_DEPTH_COMPONENT, pixelType: GL_UNSIGNED_SHORT },

  // TEXTURE_FMT_D24: 26
  { format: GL_DEPTH_COMPONENT, internalFormat: GL_DEPTH_COMPONENT, pixelType: GL_UNSIGNED_INT },

  // TEXTURE_FMT_D24S8: 27
  { format: null, internalFormat: null, pixelType: null } ];

/**
 * enums
 */
var enums = {
  // buffer usage
  USAGE_STATIC: 35044,  // gl.STATIC_DRAW
  USAGE_DYNAMIC: 35048, // gl.DYNAMIC_DRAW
  USAGE_STREAM: 35040,  // gl.STREAM_DRAW

  // index buffer format
  INDEX_FMT_UINT8: 5121,  // gl.UNSIGNED_BYTE
  INDEX_FMT_UINT16: 5123, // gl.UNSIGNED_SHORT
  INDEX_FMT_UINT32: 5125, // gl.UNSIGNED_INT (OES_element_index_uint)

  // vertex attribute semantic
  ATTR_POSITION: 'a_position',
  ATTR_NORMAL: 'a_normal',
  ATTR_TANGENT: 'a_tangent',
  ATTR_BITANGENT: 'a_bitangent',
  ATTR_WEIGHT: 'a_weight',
  ATTR_INDICES: 'a_indices',
  ATTR_COLOR: 'a_color',
  ATTR_COLOR0: 'a_color0',
  ATTR_COLOR1: 'a_color1',
  ATTR_UV: 'a_uv',
  ATTR_UV0: 'a_uv0',
  ATTR_UV1: 'a_uv1',
  ATTR_UV2: 'a_uv2',
  ATTR_UV3: 'a_uv3',
  ATTR_UV4: 'a_uv4',
  ATTR_UV5: 'a_uv5',
  ATTR_UV6: 'a_uv6',
  ATTR_UV7: 'a_uv7',

  // vertex attribute type
  ATTR_TYPE_INT8: 5120,    // gl.BYTE
  ATTR_TYPE_UINT8: 5121,   // gl.UNSIGNED_BYTE
  ATTR_TYPE_INT16: 5122,   // gl.SHORT
  ATTR_TYPE_UINT16: 5123,  // gl.UNSIGNED_SHORT
  ATTR_TYPE_INT32: 5124,   // gl.INT
  ATTR_TYPE_UINT32: 5125,  // gl.UNSIGNED_INT
  ATTR_TYPE_FLOAT32: 5126, // gl.FLOAT

  // texture filter
  FILTER_NEAREST: 0,
  FILTER_LINEAR: 1,

  // texture wrap mode
  WRAP_REPEAT: 10497, // gl.REPEAT
  WRAP_CLAMP: 33071,  // gl.CLAMP_TO_EDGE
  WRAP_MIRROR: 33648, // gl.MIRRORED_REPEAT

  // texture format
  // compress formats
  TEXTURE_FMT_RGB_DXT1: 0,
  TEXTURE_FMT_RGBA_DXT1: 1,
  TEXTURE_FMT_RGBA_DXT3: 2,
  TEXTURE_FMT_RGBA_DXT5: 3,
  TEXTURE_FMT_RGB_ETC1: 4,
  TEXTURE_FMT_RGB_PVRTC_2BPPV1: 5,
  TEXTURE_FMT_RGBA_PVRTC_2BPPV1: 6,
  TEXTURE_FMT_RGB_PVRTC_4BPPV1: 7,
  TEXTURE_FMT_RGBA_PVRTC_4BPPV1: 8,

  // normal formats
  TEXTURE_FMT_A8: 9,
  TEXTURE_FMT_L8: 10,
  TEXTURE_FMT_L8_A8: 11,
  TEXTURE_FMT_R5_G6_B5: 12,
  TEXTURE_FMT_R5_G5_B5_A1: 13,
  TEXTURE_FMT_R4_G4_B4_A4: 14,
  TEXTURE_FMT_RGB8: 15,
  TEXTURE_FMT_RGBA8: 16,
  TEXTURE_FMT_RGB16F: 17,
  TEXTURE_FMT_RGBA16F: 18,
  TEXTURE_FMT_RGB32F: 19,
  TEXTURE_FMT_RGBA32F: 20,
  TEXTURE_FMT_R32F: 21,
  TEXTURE_FMT_111110F: 22,
  TEXTURE_FMT_SRGB: 23,
  TEXTURE_FMT_SRGBA: 24,

  // depth formats
  TEXTURE_FMT_D16: 25,
  TEXTURE_FMT_D32: 26,
  TEXTURE_FMT_D24S8: 27,

  // depth and stencil function
  DS_FUNC_NEVER: 512,    // gl.NEVER
  DS_FUNC_LESS: 513,     // gl.LESS
  DS_FUNC_EQUAL: 514,    // gl.EQUAL
  DS_FUNC_LEQUAL: 515,   // gl.LEQUAL
  DS_FUNC_GREATER: 516,  // gl.GREATER
  DS_FUNC_NOTEQUAL: 517, // gl.NOTEQUAL
  DS_FUNC_GEQUAL: 518,   // gl.GEQUAL
  DS_FUNC_ALWAYS: 519,   // gl.ALWAYS

  // render-buffer format
  RB_FMT_RGBA4: 32854,    // gl.RGBA4
  RB_FMT_RGB5_A1: 32855,  // gl.RGB5_A1
  RB_FMT_RGB565: 36194,   // gl.RGB565
  RB_FMT_D16: 33189,      // gl.DEPTH_COMPONENT16
  RB_FMT_S8: 36168,       // gl.STENCIL_INDEX8
  RB_FMT_D24S8: 34041,    // gl.DEPTH_STENCIL

  // blend-equation
  BLEND_FUNC_ADD: 32774,              // gl.FUNC_ADD
  BLEND_FUNC_SUBTRACT: 32778,         // gl.FUNC_SUBTRACT
  BLEND_FUNC_REVERSE_SUBTRACT: 32779, // gl.FUNC_REVERSE_SUBTRACT

  // blend
  BLEND_ZERO: 0,                          // gl.ZERO
  BLEND_ONE: 1,                           // gl.ONE
  BLEND_SRC_COLOR: 768,                   // gl.SRC_COLOR
  BLEND_ONE_MINUS_SRC_COLOR: 769,         // gl.ONE_MINUS_SRC_COLOR
  BLEND_DST_COLOR: 774,                   // gl.DST_COLOR
  BLEND_ONE_MINUS_DST_COLOR: 775,         // gl.ONE_MINUS_DST_COLOR
  BLEND_SRC_ALPHA: 770,                   // gl.SRC_ALPHA
  BLEND_ONE_MINUS_SRC_ALPHA: 771,         // gl.ONE_MINUS_SRC_ALPHA
  BLEND_DST_ALPHA: 772,                   // gl.DST_ALPHA
  BLEND_ONE_MINUS_DST_ALPHA: 773,         // gl.ONE_MINUS_DST_ALPHA
  BLEND_CONSTANT_COLOR: 32769,            // gl.CONSTANT_COLOR
  BLEND_ONE_MINUS_CONSTANT_COLOR: 32770,  // gl.ONE_MINUS_CONSTANT_COLOR
  BLEND_CONSTANT_ALPHA: 32771,            // gl.CONSTANT_ALPHA
  BLEND_ONE_MINUS_CONSTANT_ALPHA: 32772,  // gl.ONE_MINUS_CONSTANT_ALPHA
  BLEND_SRC_ALPHA_SATURATE: 776,          // gl.SRC_ALPHA_SATURATE

  // stencil operation
  STENCIL_OP_KEEP: 7680,          // gl.KEEP
  STENCIL_OP_ZERO: 0,             // gl.ZERO
  STENCIL_OP_REPLACE: 7681,       // gl.REPLACE
  STENCIL_OP_INCR: 7682,          // gl.INCR
  STENCIL_OP_INCR_WRAP: 34055,    // gl.INCR_WRAP
  STENCIL_OP_DECR: 7683,          // gl.DECR
  STENCIL_OP_DECR_WRAP: 34056,    // gl.DECR_WRAP
  STENCIL_OP_INVERT: 5386,        // gl.INVERT

  // cull
  CULL_NONE: 0,
  CULL_FRONT: 1028,
  CULL_BACK: 1029,
  CULL_FRONT_AND_BACK: 1032,

  // primitive type
  PT_POINTS: 0,         // gl.POINTS
  PT_LINES: 1,          // gl.LINES
  PT_LINE_LOOP: 2,      // gl.LINE_LOOP
  PT_LINE_STRIP: 3,     // gl.LINE_STRIP
  PT_TRIANGLES: 4,      // gl.TRIANGLES
  PT_TRIANGLE_STRIP: 5, // gl.TRIANGLE_STRIP
  PT_TRIANGLE_FAN: 6,   // gl.TRIANGLE_FAN
};

/**
 * @method attrTypeBytes
 * @param {ATTR_TYPE_*} attrType
 */
function attrTypeBytes(attrType) {
  if (attrType === enums.ATTR_TYPE_INT8) {
    return 1;
  } else if (attrType === enums.ATTR_TYPE_UINT8) {
    return 1;
  } else if (attrType === enums.ATTR_TYPE_INT16) {
    return 2;
  } else if (attrType === enums.ATTR_TYPE_UINT16) {
    return 2;
  } else if (attrType === enums.ATTR_TYPE_INT32) {
    return 4;
  } else if (attrType === enums.ATTR_TYPE_UINT32) {
    return 4;
  } else if (attrType === enums.ATTR_TYPE_FLOAT32) {
    return 4;
  }

  console.warn(("Unknown ATTR_TYPE: " + attrType));
  return 0;
}

/**
 * @method glFilter
 * @param {WebGLContext} gl
 * @param {FILTER_*} filter
 * @param {FILTER_*} mipFilter
 */
function glFilter(gl, filter, mipFilter) {
  if ( mipFilter === void 0 ) mipFilter = -1;

  var result = _filterGL[filter][mipFilter+1];
  if (result === undefined) {
    console.warn(("Unknown FILTER: " + filter));
    return mipFilter === -1 ? gl.LINEAR : gl.LINEAR_MIPMAP_LINEAR;
  }

  return result;
}

/**
 * @method glTextureFmt
 * @param {TEXTURE_FMT_*} fmt
 */
function glTextureFmt(fmt) {
  var result = _textureFmtGL[fmt];
  if (result === undefined) {
    console.warn(("Unknown TEXTURE_FMT: " + fmt));
    return _textureFmtGL[enums.TEXTURE_FMT_RGBA8];
  }

  return result;
}

// ====================
// exports
// ====================

var VertexFormat = function VertexFormat(infos) {
  var this$1 = this;

  this._attr2el = {};
  this._elements = [];
  this._bytes = 0;

  var offset = 0;
  for (var i = 0, len = infos.length; i < len; ++i) {
    var info = infos[i];
    var el = {
      name: info.name,
      offset: offset,
      stride: 0,
      stream: -1,
      type: info.type,
      num: info.num,
      normalize: (info.normalize === undefined) ? false : info.normalize,
      bytes: info.num * attrTypeBytes(info.type),
    };

    this$1._attr2el[el.name] = el;
    this$1._elements.push(el);

    this$1._bytes += el.bytes;
    offset += el.bytes;
  }

  for (var i$1 = 0, len$1 = this._elements.length; i$1 < len$1; ++i$1) {
    var el$1 = this$1._elements[i$1];
    el$1.stride = this$1._bytes;
  }
};

/**
 * @method element
 * @param {string} attrName
 */
VertexFormat.prototype.element = function element (attrName) {
  return this._attr2el[attrName];
};

var IndexBuffer = function IndexBuffer(device, format, usage, data, numIndices, persist) {
  this._device = device;
  this._format = format;
  this._usage = usage;
  this._persist = persist;
  this._numIndices = numIndices;

  // calculate bytes
  var bytes = 0;
  if (format === enums.INDEX_FMT_UINT8) {
    bytes = numIndices;
  } else if (format === enums.INDEX_FMT_UINT16) {
    bytes = 2 * numIndices;
  } else if (format === enums.INDEX_FMT_UINT32) {
    bytes = 4 * numIndices;
  }
  this._bytes = bytes;

  // update
  this._glID = device._gl.createBuffer();
  this._data = null;
  this.update(0, data);

  // stats
  device._stats.ib += bytes;
};

var prototypeAccessors = { count: {} };

/**
 * @method destroy
 */
IndexBuffer.prototype.destroy = function destroy () {
  if (this._glID === -1) {
    console.error('The buffer already destroyed');
    return;
  }

  var gl = this.device.gl;
  gl.deleteBuffer(this._glID);
  this.device._stats.ib -= this.bytes;

  this._glID = -1;
};

/**
 * @method update
 * @param {Number} offset
 * @param {ArrayBuffer} data
 */
IndexBuffer.prototype.update = function update (offset, data) {
  if (this._glID === -1) {
    console.error('The buffer is destroyed');
    return;
  }

  if (data && data.byteLength + offset > this._bytes) {
    console.error('Failed to update data, bytes exceed.');
    return;
  }

  var gl = this._device._gl;
  var glUsage = this._usage;

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._glID);
  if (!data) {
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._bytes, glUsage);
  } else {
    if (offset) {
      gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, data, glUsage);
    } else {
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, glUsage);
    }
  }
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  // store the data
  if (this._persist) {
    if (this._data) {
      this._data.set(data, offset);
    } else {
      this._data = data;
    }
  }
};

prototypeAccessors.count.get = function () {
  return this._numIndices;
};

Object.defineProperties( IndexBuffer.prototype, prototypeAccessors );

var VertexBuffer = function VertexBuffer(device, format, usage, data, numVertices, persist) {
  this._device = device;
  this._format = format;
  this._usage = usage;
  this._persist = persist;
  this._numVertices = numVertices;

  // calculate bytes
  this._bytes = this._format._bytes * numVertices;

  // update
  this._glID = device._gl.createBuffer();
  this._data = null;
  this.update(0, data);

  // stats
  device._stats.vb += this._bytes;
};

var prototypeAccessors$1 = { count: {} };

/**
 * @method destroy
 */
VertexBuffer.prototype.destroy = function destroy () {
  if (this._glID === -1) {
    console.error('The buffer already destroyed');
    return;
  }

  var gl = this.device.gl;
  gl.deleteBuffer(this._glID);
  this.device._stats.vb -= this.bytes;

  this._glID = -1;
};

/**
 * @method update
 * @param {Number} offset
 * @param {ArrayBuffer} data
 */
VertexBuffer.prototype.update = function update (offset, data) {
  if (this._glID === -1) {
    console.error('The buffer is destroyed');
    return;
  }

  if (data && data.byteLength + offset > this._bytes) {
    console.error('Failed to update data, bytes exceed.');
    return;
  }

  var gl = this._device._gl;
  var glUsage = this._usage;

  gl.bindBuffer(gl.ARRAY_BUFFER, this._glID);
  if (!data) {
    gl.bufferData(gl.ARRAY_BUFFER, this._bytes, glUsage);
  } else {
    if (offset) {
      gl.bufferSubData(gl.ARRAY_BUFFER, data, glUsage);
    } else {
      gl.bufferData(gl.ARRAY_BUFFER, data, glUsage);
    }
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // store the data
  if (this._persist) {
    if (this._data) {
      this._data.set(data, offset);
    } else {
      this._data = data;
    }
  }
};

prototypeAccessors$1.count.get = function () {
  return this._numVertices;
};

Object.defineProperties( VertexBuffer.prototype, prototypeAccessors$1 );

var _genID = 0;

function _parseError(out, type, errorLog) {
  errorLog.split('\n').forEach(function (msg) {
    if (msg.length < 5) {
      return;
    }

    var parts = /^ERROR\:\s+(\d+)\:(\d+)\:\s*(.*)$/.exec(msg);
    if (parts) {
      out.push({
        type: type,
        fileID: parts[1] | 0,
        line: parts[2] | 0,
        message: parts[3].trim()
      });
    } else if (msg.length > 0) {
      out.push({
        type: type,
        fileID: -1,
        line: 0,
        message: msg
      });
    }
  });
}

var Program = function Program(device, options) {
  this._device = device;

  // stores gl information: { location, type }
  this._attributes = [];
  this._uniforms = [];
  this._samplers = [];
  this._errors = [];
  this._linked = false;
  this._vertSource = options.vert;
  this._fragSource = options.frag;
  this._glID = null;
  this._id = _genID++;
};

var prototypeAccessors$2 = { id: {} };

prototypeAccessors$2.id.get = function () {
  return this._id;
};

Program.prototype.link = function link () {
    var this$1 = this;

  if (this._linked) {
    return;
  }

  var gl = this._device._gl;

  var vertShader = _createShader(gl, gl.VERTEX_SHADER, this._vertSource);
  var fragShader = _createShader(gl, gl.FRAGMENT_SHADER, this._fragSource);

  var program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  var failed = false;
  var errors = this._errors;

  if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
    _parseError(errors, 'vs', gl.getShaderInfoLog(vertShader));
    failed = true;
  }

  if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
    _parseError(errors, 'fs', gl.getShaderInfoLog(fragShader));
    failed = true;
  }

  gl.deleteShader(vertShader);
  gl.deleteShader(fragShader);

  if (failed) {
    errors.forEach(function (err) {
      console.error(("Failed to compile " + (err.type) + " " + (err.fileID) + " (ln " + (err.line) + "): " + (err.message)));
    });
    return;
  }

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(("Failed to link shader program: " + (gl.getProgramInfoLog(program))));
    failed = true;
  }

  if (failed) {
    return;
  }

  this._glID = program;

  // parse attribute
  var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
  for (var i = 0; i < numAttributes; ++i) {
    var info = gl.getActiveAttrib(program, i);
    var location = gl.getAttribLocation(program, info.name);

    this$1._attributes.push({
      name: info.name,
      location: location,
      type: info.type,
    });
  }

  // parse uniform
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (var i$1 = 0; i$1 < numUniforms; ++i$1) {
    var info$1 = gl.getActiveUniform(program, i$1);
    var name = info$1.name;
    var location$1 = gl.getUniformLocation(program, name);
    var isArray = name.substr(name.length - 3) === '[0]';
    if (isArray) {
      if (info$1.type === gl.SAMPLER_2D || info$1.type === gl.SAMPLER_CUBE) {
        console.error('sampler array is not supported!');
        continue;
      }
      name = name.substr(0, name.length - 3);
    }

    this$1._uniforms.push({
      name: name,
      location: location$1,
      type: info$1.type,
      size: isArray ? info$1.size : undefined, // used when uniform is an array
    });
  }

  //
  this._linked = true;
};

Program.prototype.destroy = function destroy () {
  var gl = this._device._gl;
  gl.deleteProgram(this._glID);

  this._linked = false;
  this._glID = null;
  this._attributes = [];
  this._uniforms = [];
  this._samplers = [];
};

Object.defineProperties( Program.prototype, prototypeAccessors$2 );

// ====================
// internal
// ====================

function _createShader(gl, type, src) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  return shader;
}

var Texture = function Texture(device) {
  this._device = device;

  this._width = 4;
  this._height = 4;
  this._hasMipmap = false;
  this._compressed = false;

  this._anisotropy = 1;
  this._minFilter = enums.FILTER_LINEAR;
  this._magFilter = enums.FILTER_LINEAR;
  this._mipFilter = enums.FILTER_LINEAR;
  this._wrapS = enums.WRAP_REPEAT;
  this._wrapT = enums.WRAP_REPEAT;
  // wrapR available in webgl2
  // this._wrapR = enums.WRAP_REPEAT;
  this._format = enums.TEXTURE_FMT_RGBA8;

  this._target = -1;
};

/**
 * @method destroy
 */
Texture.prototype.destroy = function destroy () {
  if (this._glID === -1) {
    console.error('The texture already destroyed');
    return;
  }

  var gl = this.device.gl;
  gl.deleteTexture(this._glID);

  this.device._stats.tex -= this.bytes;
  this._glID = -1;
};

function _isPow2(v) {
  return !(v & (v - 1)) && (!!v);
}

var Texture2D = (function (Texture$$1) {
  function Texture2D(device, options) {
    Texture$$1.call(this, device);
    this._target = this._device._gl.TEXTURE_2D;

    this.update(options);
  }

  if ( Texture$$1 ) Texture2D.__proto__ = Texture$$1;
  Texture2D.prototype = Object.create( Texture$$1 && Texture$$1.prototype );
  Texture2D.prototype.constructor = Texture2D;

  /**
   * @method update
   * @param {Object} options
   * @param {Array} options.images
   * @param {Boolean} options.mipmap
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {TEXTURE_FMT_*} options.format
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {FILTER_*} options.mipFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  Texture2D.prototype.update = function update (options) {
    var gl = this._device._gl;
    var genMipmap = this._hasMipmap;

    if (options) {
      if (options.width !== undefined) {
        this._width = options.width;
      }
      if (options.height !== undefined) {
        this._height = options.height;
      }
      if (options.anisotropy !== undefined) {
        this._anisotropy = options.anisotropy;
      }
      if (options.minFilter !== undefined) {
        this._minFilter = options.minFilter;
      }
      if (options.magFilter !== undefined) {
        this._magFilter = options.magFilter;
      }
      if (options.mipFilter !== undefined) {
        this._mipFilter = options.mipFilter;
      }
      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }
      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }
      if (options.format !== undefined) {
        this._format = options.format;
        this._compressed = (
          this._format >= enums.TEXTURE_FMT_RGB_DXT1 &&
          this._format <= enums.TEXTURE_FMT_RGBA_PVRTC_4BPPV1
        );
      }

      // check if generate mipmap
      if (options.mipmap !== undefined) {
        this._hasMipmap = options.mipmap;
        genMipmap = options.mipmap;
      }

      if (options.images !== undefined) {
        if (options.images.length > 1) {
          genMipmap = false;
        }
      }
    }

    this._glID = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._glID);
    // always alloc texture in GPU when we create it.
    var images = options.images || [null];
    this._setMipmap(images, options.flipY, options.premultiplyAlpha);
    this._setTexInfo();

    if (genMipmap) {
      gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
      gl.generateMipmap(gl.TEXTURE_2D);
    }
    this._device._restoreTexture(0);
  };

  /**
   * @method updateSubImage
   * @param {Object} options
   * @param {Number} options.x
   * @param {Number} options.y
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Number} options.level
   * @param {HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ArrayBufferView} options.image
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  Texture2D.prototype.updateSubImage = function updateSubImage (options) {
    var gl = this._device._gl;
    var glFmt = glTextureFmt(this._format);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._glID);
    this._setSubImage(glFmt, options);
    this._device._restoreTexture(0);
  };

  /**
   * @method updateImage
   * @param {Object} options
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Number} options.level
   * @param {HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ArrayBufferView} options.image
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  Texture2D.prototype.updateImage = function updateImage (options) {
    var gl = this._device._gl;
    var glFmt = glTextureFmt(this._format);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._glID);
    this._setImage(glFmt, options);
    this._device._restoreTexture(0);
  };

  Texture2D.prototype._setSubImage = function _setSubImage (glFmt, options) {
    var gl = this._device._gl;
    var flipY = options.flipY;
    var premultiplyAlpha = options.premultiplyAlpha;
    var img = options.image;

    if (
      img instanceof HTMLCanvasElement ||
      img instanceof HTMLImageElement ||
      img instanceof HTMLVideoElement
    ) {
      if (flipY === undefined) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      } else {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      }

      if (premultiplyAlpha === undefined) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
      }

      gl.texSubImage2D(gl.TEXTURE_2D, options.level, options.x, options.y, glFmt.format, glFmt.pixelType, img);
    } else {
      if (flipY === undefined) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      }

      if (premultiplyAlpha === undefined) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
      }

      if (this._compressed) {
        gl.compressedTexSubImage2D(gl.TEXTURE_2D,
          options.level,
          options.x,
          options.y,
          options.width,
          options.height,
          glFmt.format,
          img
        );
      } else {
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          options.level,
          options.x,
          options.y,
          options.width,
          options.height,
          glFmt.format,
          glFmt.pixelType,
          img
        );
      }
    }
  };

  Texture2D.prototype._setImage = function _setImage (glFmt, options) {
    var gl = this._device._gl;
    var flipY = options.flipY;
    var premultiplyAlpha = options.premultiplyAlpha;
    var img = options.image;

    if (
      img instanceof HTMLCanvasElement ||
      img instanceof HTMLImageElement ||
      img instanceof HTMLVideoElement
    ) {
      if (flipY === undefined) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      } else {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      }

      if (premultiplyAlpha === undefined) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
      }

      gl.texImage2D(
        gl.TEXTURE_2D,
        options.level,
        glFmt.internalFormat,
        glFmt.format,
        glFmt.pixelType,
        img
      );
    } else {
      if (flipY === undefined) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
      }

      if (premultiplyAlpha === undefined) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      } else {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
      }

      if (this._compressed) {
        gl.compressedTexImage2D(
          gl.TEXTURE_2D,
          options.level,
          glFmt.internalFormat,
          options.width,
          options.height,
          0,
          img
        );
      } else {
        gl.texImage2D(
          gl.TEXTURE_2D,
          options.level,
          glFmt.internalFormat,
          options.width,
          options.height,
          0,
          glFmt.format,
          glFmt.pixelType,
          img
        );
      }
    }
  };

  Texture2D.prototype._setMipmap = function _setMipmap (images, flipY, premultiplyAlpha) {
    var this$1 = this;

    var glFmt = glTextureFmt(this._format);
    var options = {
      width: this._width,
      height: this._height,
      flipY: flipY,
      premultiplyAlpha: premultiplyAlpha,
      level: 0,
      image: null
    };

    for (var i = 0; i < images.length; ++i) {
      options.level = i;
      options.width = this$1._width >> i;
      options.height = this$1._height >> i;
      options.image = images[i];
      this$1._setImage(glFmt, options);
    }
  };

  Texture2D.prototype._setTexInfo = function _setTexInfo () {
    var gl = this._device._gl;
    var pot = _isPow2(this._width) && _isPow2(this._height);

    // WebGL1 doesn't support all wrap modes with NPOT textures
    if (!pot && (this._wrapS !== enums.WRAP_CLAMP || this._wrapT !== enums.WRAP_CLAMP)) {
      console.warn('WebGL1 doesn\'t support all wrap modes with NPOT textures');
      this._wrapS = enums.WRAP_CLAMP;
      this._wrapT = enums.WRAP_CLAMP;
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, glFilter(gl, this._minFilter, this._hasMipmap ? this._mipFilter : -1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, glFilter(gl, this._magFilter, -1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);

    var ext = this._device.ext('EXT_texture_filter_anisotropic');
    if (ext) {
      gl.texParameteri(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy);
    }
  };

  return Texture2D;
}(Texture));

var TextureCube = (function (Texture$$1) {
  function TextureCube(device, options) {
    Texture$$1.call(this, device);
    this._target = this._device._gl.TEXTURE_CUBE_MAP;

    this.update(options);
  }

  if ( Texture$$1 ) TextureCube.__proto__ = Texture$$1;
  TextureCube.prototype = Object.create( Texture$$1 && Texture$$1.prototype );
  TextureCube.prototype.constructor = TextureCube;

  /**
   * @method update
   * @param {Object} options
   * @param {Array} options.images
   * @param {Boolean} options.mipmap
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {TEXTURE_FMT_*} options.format
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {FILTER_*} options.mipFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   * @param {WRAP_*} options.wrapR
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  TextureCube.prototype.update = function update (options) {
    var gl = this._device._gl;
    var genMipmap = this._hasMipmap;

    if (options) {
      if (options.width !== undefined) {
        this._width = options.width;
      }
      if (options.height !== undefined) {
        this._height = options.height;
      }
      if (options.anisotropy !== undefined) {
        this._anisotropy = options.anisotropy;
      }
      if (options.minFilter !== undefined) {
        this._minFilter = options.minFilter;
      }
      if (options.magFilter !== undefined) {
        this._magFilter = options.magFilter;
      }
      if (options.mipFilter !== undefined) {
        this._mipFilter = options.mipFilter;
      }
      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }
      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }
      // wrapR available in webgl2
      // if (options.wrapR !== undefined) {
      //   this._wrapR = options.wrapR;
      // }
      if (options.format !== undefined) {
        this._format = options.format;
        this._compressed = (
          this._format >= enums.TEXTURE_FMT_RGB_DXT1 &&
          this._format <= enums.TEXTURE_FMT_RGBA_PVRTC_4BPPV1
        );
      }

      // check if generate mipmap
      if (options.mipmap !== undefined) {
        this._hasMipmap = options.mipmap;
        genMipmap = options.mipmap;
      }

      if (options.images !== undefined) {
        if (options.images.length > 1) {
          genMipmap = false;
        }
      }
    }

    this._glID = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._glID);
      if (options.images !== undefined) {
        this._setMipmap(options.images, options.flipY, options.premultiplyAlpha);
      }

      this._setTexInfo();

      if (genMipmap) {
        gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      }
    this._device._restoreTexture(0);
  };

  /**
   * @method updateSubImage
   * @param {Object} options
   * @param {Number} options.x
   * @param {Number} options.y
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Number} options.level
   * @param {Number} options.faceIndex
   * @param {HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ArrayBufferView} options.image
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  TextureCube.prototype.updateSubImage = function updateSubImage (options) {
    var gl = this._device._gl;
    var glFmt = glTextureFmt(this._format);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._glID);
    this._setSubImage(glFmt, options);
    this._device._restoreTexture(0);
  };

  /**
   * @method updateImage
   * @param {Object} options
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Number} options.level
   * @param {Number} options.faceIndex
   * @param {HTMLCanvasElement | HTMLImageElement | HTMLVideoElement | ArrayBufferView} options.image
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  TextureCube.prototype.updateImage = function updateImage (options) {
    var gl = this._device._gl;
    var glFmt = glTextureFmt(this._format);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._glID);
    this._setImage(glFmt, options);
    this._device._restoreTexture(0);
  };

  TextureCube.prototype._setSubImage = function _setSubImage (glFmt, options) {
    var gl = this._device._gl;
    var flipY = options.flipY;
    var premultiplyAlpha = options.premultiplyAlpha;
    var faceIndex = options.faceIndex;
    var img = options.image;

    if (flipY === undefined) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    } else {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    }

    if (premultiplyAlpha === undefined) {
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    } else {
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
    }

    if (
      img instanceof HTMLCanvasElement ||
      img instanceof HTMLImageElement ||
      img instanceof HTMLVideoElement
    ) {
      gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex, options.level, options.x, options.y, glFmt.format, glFmt.pixelType, img);
    } else {
      if (this._compressed) {
        gl.compressedTexSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
          options.level,
          options.x,
          options.y,
          options.width,
          options.height,
          glFmt.format,
          img
        );
      } else {
        gl.texSubImage2D(
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
          options.level,
          options.x,
          options.y,
          options.width,
          options.height,
          glFmt.format,
          glFmt.pixelType,
          img
        );
      }
    }
  };

  TextureCube.prototype._setImage = function _setImage (glFmt, options) {
    var gl = this._device._gl;
    var flipY = options.flipY;
    var premultiplyAlpha = options.premultiplyAlpha;
    var faceIndex = options.faceIndex;
    var img = options.image;

    if (flipY === undefined) {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    } else {
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    }

    if (premultiplyAlpha === undefined) {
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    } else {
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
    }
    if (
      img instanceof HTMLCanvasElement ||
      img instanceof HTMLImageElement ||
      img instanceof HTMLVideoElement
    ) {
      gl.texImage2D(
        gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
        options.level,
        glFmt.internalFormat,
        glFmt.format,
        glFmt.pixelType,
        img
      );
    } else {
      if (this._compressed) {
        gl.compressedTexImage2D(
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
          options.level,
          glFmt.internalFormat,
          options.width,
          options.height,
          0,
          img
        );
      } else {
        gl.texImage2D(
          gl.TEXTURE_CUBE_MAP_POSITIVE_X + faceIndex,
          options.level,
          glFmt.internalFormat,
          options.width,
          options.height,
          0,
          glFmt.format,
          glFmt.pixelType,
          img
        );
      }
    }
  };

  // levelImages = [imagePosX, imageNegX, imagePosY, imageNegY, imagePosZ, imageNegz]
  // images = [levelImages0, levelImages1, ...]
  TextureCube.prototype._setMipmap = function _setMipmap (images, flipY, premultiplyAlpha) {
    var this$1 = this;

    var glFmt = glTextureFmt(this._format);
    var options = {
      width: this._width,
      height: this._height,
      faceIndex : 0,
      flipY: flipY,
      premultiplyAlpha: premultiplyAlpha,
      level: 0,
      image: null
    };

    for (var i = 0; i < images.length; ++i) {
      var levelImages = images[i];
      options.level = i;
      options.width = this$1._width >> i;
      options.height = this$1._height >> i;

      for (var face = 0; face < 6; ++face) {
        options.faceIndex = face;
        options.image = levelImages[face];
        this$1._setImage(glFmt, options);
      }
    }
  };

  TextureCube.prototype._setTexInfo = function _setTexInfo () {
    var gl = this._device._gl;

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, glFilter(gl, this._minFilter, this._hasMipmap ? this._mipFilter : -1));
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, glFilter(gl, this._magFilter, -1));
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this._wrapT);
    // wrapR available in webgl2
    // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, this._wrapR);

    var ext = this._device.ext('EXT_texture_filter_anisotropic');
    if (ext) {
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy);
    }
  };

  return TextureCube;
}(Texture));

var RenderBuffer = function RenderBuffer(device, format, width, height) {
  this._device = device;
  this._format = format;
  this._width = width;
  this._height = height;

  var gl = device._gl;
  this._glID = gl.createRenderbuffer();

  gl.bindRenderbuffer(gl.RENDERBUFFER, this._glID);
  gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
};

/**
 * @method destroy
 */
RenderBuffer.prototype.destroy = function destroy () {
  if (this._glID === null) {
    console.error('The render-buffer already destroyed');
    return;
  }

  var gl = this._device._gl;

  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  gl.deleteRenderbuffer(this._glID);

  this._glID = null;
};

var FrameBuffer = function FrameBuffer(device, width, height, options) {
  this._device = device;
  this._width = width;
  this._height = height;

  this._colors = options.colors || [];
  this._depth = options.depth || null;
  this._stencil = options.stencil || null;
  this._depthStencil = options.depthStencil || null;

  this._glID = device._gl.createFramebuffer();
};

/**
 * @method destroy
 */
FrameBuffer.prototype.destroy = function destroy () {
  if (this._glID === null) {
    console.error('The frame-buffer already destroyed');
    return;
  }

  var gl = this._device._gl;

  gl.deleteFramebuffer(this._glID);

  this._glID = null;
};

var _default = {
  // blend
  blend: false,
  blendSep: false,
  blendColor: 0xffffffff,
  blendEq: enums.BLEND_FUNC_ADD,
  blendAlphaEq: enums.BLEND_FUNC_ADD,
  blendSrc: enums.BLEND_ONE,
  blendDst: enums.BLEND_ZERO,
  blendSrcAlpha: enums.BLEND_ONE,
  blendDstAlpha: enums.BLEND_ZERO,

  // depth
  depthTest: false,
  depthWrite: false,
  depthFunc: enums.DS_FUNC_LESS,

  // stencil
  stencilTest: false,
  stencilSep: false,
  stencilFuncFront: enums.DS_FUNC_ALWAYS,
  stencilRefFront: 0,
  stencilMaskFront: 0xff,
  stencilFailOpFront: enums.STENCIL_OP_KEEP,
  stencilZFailOpFront: enums.STENCIL_OP_KEEP,
  stencilZPassOpFront: enums.STENCIL_OP_KEEP,
  stencilWriteMaskFront: 0xff,
  stencilFuncBack: enums.DS_FUNC_ALWAYS,
  stencilRefBack: 0,
  stencilMaskBack: 0xff,
  stencilFailOpBack: enums.STENCIL_OP_KEEP,
  stencilZFailOpBack: enums.STENCIL_OP_KEEP,
  stencilZPassOpBack: enums.STENCIL_OP_KEEP,
  stencilWriteMaskBack: 0xff,

  // cull-mode
  cullMode: enums.CULL_BACK,

  // primitive-type
  primitiveType: enums.PT_TRIANGLES,

  // bindings
  maxStream: -1,
  vertexBuffers: [],
  vertexBufferOffsets: [],
  indexBuffer: null,
  textureUnits: [],
  program: null,
};

var State = function State() {
  // bindings
  this.vertexBuffers = [];
  this.vertexBufferOffsets = [];
  this.textureUnits = [];

  this.set(_default);
};

State.prototype.reset = function reset () {
  this.set(_default);
};

State.prototype.set = function set (cpy) {
    var this$1 = this;

  // blending
  this.blend = cpy.blend;
  this.blendSep = cpy.blendSep;
  this.blendColor = cpy.blendColor;
  this.blendEq = cpy.blendEq;
  this.blendAlphaEq = cpy.blendAlphaEq;
  this.blendSrc = cpy.blendSrc;
  this.blendDst = cpy.blendDst;
  this.blendSrcAlpha = cpy.blendSrcAlpha;
  this.blendDstAlpha = cpy.blendDstAlpha;

  // depth
  this.depthTest = cpy.depthTest;
  this.depthWrite = cpy.depthWrite;
  this.depthFunc = cpy.depthFunc;

  // stencil
  this.stencilTest = cpy.stencilTest;
  this.stencilSep = cpy.stencilSep;
  this.stencilFuncFront = cpy.stencilFuncFront;
  this.stencilRefFront = cpy.stencilRefFront;
  this.stencilMaskFront = cpy.stencilMaskFront;
  this.stencilFailOpFront = cpy.stencilFailOpFront;
  this.stencilZFailOpFront = cpy.stencilZFailOpFront;
  this.stencilZPassOpFront = cpy.stencilZPassOpFront;
  this.stencilWriteMaskFront = cpy.stencilWriteMaskFront;
  this.stencilFuncBack = cpy.stencilFuncBack;
  this.stencilRefBack = cpy.stencilRefBack;
  this.stencilMaskBack = cpy.stencilMaskBack;
  this.stencilFailOpBack = cpy.stencilFailOpBack;
  this.stencilZFailOpBack = cpy.stencilZFailOpBack;
  this.stencilZPassOpBack = cpy.stencilZPassOpBack;
  this.stencilWriteMaskBack = cpy.stencilWriteMaskBack;

  // cull-mode
  this.cullMode = cpy.cullMode;

  // primitive-type
  this.primitiveType = cpy.primitiveType;

  // bindings
  this.maxStream = cpy.maxStream;
  for (var i = 0; i < cpy.vertexBuffers.length; ++i) {
    this$1.vertexBuffers[i] = cpy.vertexBuffers[i];
  }
  for (var i$1 = 0; i$1 < cpy.vertexBufferOffsets.length; ++i$1) {
    this$1.vertexBufferOffsets[i$1] = cpy.vertexBufferOffsets[i$1];
  }
  this.indexBuffer = cpy.indexBuffer;
  for (var i$2 = 0; i$2 < cpy.textureUnits.length; ++i$2) {
    this$1.textureUnits[i$2] = cpy.textureUnits[i$2];
  }
  this.program = cpy.program;
};

var GL_INT = 5124;
var GL_FLOAT$1 = 5126;
var GL_FLOAT_VEC2 = 35664;
var GL_FLOAT_VEC3 = 35665;
var GL_FLOAT_VEC4 = 35666;
var GL_INT_VEC2 = 35667;
var GL_INT_VEC3 = 35668;
var GL_INT_VEC4 = 35669;
var GL_BOOL = 35670;
var GL_BOOL_VEC2 = 35671;
var GL_BOOL_VEC3 = 35672;
var GL_BOOL_VEC4 = 35673;
var GL_FLOAT_MAT2 = 35674;
var GL_FLOAT_MAT3 = 35675;
var GL_FLOAT_MAT4 = 35676;
var GL_SAMPLER_2D = 35678;
var GL_SAMPLER_CUBE = 35680;

/**
 * _type2uniformCommit
 */
var _type2uniformCommit = {};
_type2uniformCommit[GL_INT] = function (gl, id, value) {
    gl.uniform1i(id, value);
  };
_type2uniformCommit[GL_FLOAT$1] = function (gl, id, value) {
    gl.uniform1f(id, value);
  };
_type2uniformCommit[GL_FLOAT_VEC2] = function (gl, id, value) {
    gl.uniform2fv(id, value);
  };
_type2uniformCommit[GL_FLOAT_VEC3] = function (gl, id, value) {
    gl.uniform3fv(id, value);
  };
_type2uniformCommit[GL_FLOAT_VEC4] = function (gl, id, value) {
    gl.uniform4fv(id, value);
  };
_type2uniformCommit[GL_INT_VEC2] = function (gl, id, value) {
    gl.uniform2iv(id, value);
  };
_type2uniformCommit[GL_INT_VEC3] = function (gl, id, value) {
    gl.uniform3iv(id, value);
  };
_type2uniformCommit[GL_INT_VEC4] = function (gl, id, value) {
    gl.uniform4iv(id, value);
  };
_type2uniformCommit[GL_BOOL] = function (gl, id, value) {
    gl.uniform1i(id, value);
  };
_type2uniformCommit[GL_BOOL_VEC2] = function (gl, id, value) {
    gl.uniform2iv(id, value);
  };
_type2uniformCommit[GL_BOOL_VEC3] = function (gl, id, value) {
    gl.uniform3iv(id, value);
  };
_type2uniformCommit[GL_BOOL_VEC4] = function (gl, id, value) {
    gl.uniform4iv(id, value);
  };
_type2uniformCommit[GL_FLOAT_MAT2] = function (gl, id, value) {
    gl.uniformMatrix2fv(id, false, value);
  };
_type2uniformCommit[GL_FLOAT_MAT3] = function (gl, id, value) {
    gl.uniformMatrix3fv(id, false, value);
  };
_type2uniformCommit[GL_FLOAT_MAT4] = function (gl, id, value) {
    gl.uniformMatrix4fv(id, false, value);
  };
_type2uniformCommit[GL_SAMPLER_2D] = function (gl, id, value) {
    gl.uniform1i(id, value);
  };
_type2uniformCommit[GL_SAMPLER_CUBE] = function (gl, id, value) {
    gl.uniform1i(id, value);
  };

/**
 * _type2uniformArrayCommit
 */
var _type2uniformArrayCommit = {};
_type2uniformArrayCommit[GL_INT] = function (gl, id, value) {
    gl.uniform1iv(id, value);
  };
_type2uniformArrayCommit[GL_FLOAT$1] = function (gl, id, value) {
    gl.uniform1fv(id, value);
  };
_type2uniformArrayCommit[GL_FLOAT_VEC2] = function (gl, id, value) {
    gl.uniform2fv(id, value);
  };
_type2uniformArrayCommit[GL_FLOAT_VEC3] = function (gl, id, value) {
    gl.uniform3fv(id, value);
  };
_type2uniformArrayCommit[GL_FLOAT_VEC4] = function (gl, id, value) {
    gl.uniform4fv(id, value);
  };
_type2uniformArrayCommit[GL_INT_VEC2] = function (gl, id, value) {
    gl.uniform2iv(id, value);
  };
_type2uniformArrayCommit[GL_INT_VEC3] = function (gl, id, value) {
    gl.uniform3iv(id, value);
  };
_type2uniformArrayCommit[GL_INT_VEC4] = function (gl, id, value) {
    gl.uniform4iv(id, value);
  };
_type2uniformArrayCommit[GL_BOOL] = function (gl, id, value) {
    gl.uniform1iv(id, value);
  };
_type2uniformArrayCommit[GL_BOOL_VEC2] = function (gl, id, value) {
    gl.uniform2iv(id, value);
  };
_type2uniformArrayCommit[GL_BOOL_VEC3] = function (gl, id, value) {
    gl.uniform3iv(id, value);
  };
_type2uniformArrayCommit[GL_BOOL_VEC4] = function (gl, id, value) {
    gl.uniform4iv(id, value);
  };
_type2uniformArrayCommit[GL_FLOAT_MAT2] = function (gl, id, value) {
    gl.uniformMatrix2fv(id, false, value);
  };
_type2uniformArrayCommit[GL_FLOAT_MAT3] = function (gl, id, value) {
    gl.uniformMatrix3fv(id, false, value);
  };
_type2uniformArrayCommit[GL_FLOAT_MAT4] = function (gl, id, value) {
    gl.uniformMatrix4fv(id, false, value);
  };

/**
 * _commitBlendStates
 */
function _commitBlendStates(gl, cur, next) {
  // enable/disable blend
  if (cur.blend !== next.blend) {
    if (!next.blend) {
      gl.disable(gl.BLEND);
      return;
    }

    gl.enable(gl.BLEND);

    if (
      next.blendSrc === enums.BLEND_CONSTANT_COLOR ||
      next.blendSrc === enums.BLEND_ONE_MINUS_CONSTANT_COLOR ||
      next.blendDst === enums.BLEND_CONSTANT_COLOR ||
      next.blendDst === enums.BLEND_ONE_MINUS_CONSTANT_COLOR
    ) {
      gl.blendColor(
        (next.blendColor >> 24) / 255,
        (next.blendColor >> 16 & 0xff) / 255,
        (next.blendColor >> 8 & 0xff) / 255,
        (next.blendColor & 0xff) / 255
      );
    }

    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  }

  // nothing to update
  if (next.blend === false) {
    return;
  }

  // blend-color
  if (cur.blendColor !== next.blendColor) {
    gl.blendColor(
      (next.blendColor >> 24) / 255,
      (next.blendColor >> 16 & 0xff) / 255,
      (next.blendColor >> 8 & 0xff) / 255,
      (next.blendColor & 0xff) / 255
    );
  }

  // separate diff, reset all
  if (cur.blendSep !== next.blendSep) {
    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  }

  if (next.blendSep) {
    // blend-func-separate
    if (
      cur.blendSrc !== next.blendSrc ||
      cur.blendDst !== next.blendDst ||
      cur.blendSrcAlpha !== next.blendSrcAlpha ||
      cur.blendDstAlpha !== next.blendDstAlpha
    ) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
    }

    // blend-equation-separate
    if (
      cur.blendEq !== next.blendEq ||
      cur.blendAlphaEq !== next.blendAlphaEq
    ) {
      gl.blendEquationSeparate(next.blendEq, next.blendAlphaEq);
    }
  } else {
    // blend-func
    if (
      cur.blendSrc !== next.blendSrc ||
      cur.blendDst !== next.blendDst
    ) {
      gl.blendFunc(next.blendSrc, next.blendDst);
    }

    // blend-equation
    if (cur.blendEq !== next.blendEq) {
      gl.blendEquation(next.blendEq);
    }
  }
}

/**
 * _commitDepthStates
 */
function _commitDepthStates(gl, cur, next) {
  // enable/disable depth-test
  if (cur.depthTest !== next.depthTest) {
    if (!next.depthTest) {
      gl.disable(gl.DEPTH_TEST);
      return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(next.depthFunc);
    gl.depthMask(next.depthWrite);

    return;
  }

  // commit depth-write
  if (cur.depthWrite !== next.depthWrite) {
    gl.depthMask(next.depthWrite);
  }

  // check if depth-write enabled
  if (next.depthTest === false) {
    if (next.depthWrite) {
      next.depthTest = true;
      next.depthFunc = enums.DS_FUNC_ALWAYS;

      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(next.depthFunc);
    }

    return;
  }

  // depth-func
  if (cur.depthFunc !== next.depthFunc) {
    gl.depthFunc(next.depthFunc);
  }
}

/**
 * _commitStencilStates
 */
function _commitStencilStates(gl, cur, next) {
  if (next.stencilTest !== cur.stencilTest) {
    if (!next.stencilTest) {
      gl.disable(gl.STENCIL_TEST);
      return;
    }

    gl.enable(gl.STENCIL_TEST);

    if (next.stencilSep) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    } else {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMask(next.stencilWriteMaskFront);
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }

    return;
  }

  // fast return
  if (!next.stencilTest) {
    return;
  }

  if (cur.stencilSep !== next.stencilSep) {
    if (next.stencilSep) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    } else {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
      gl.stencilMask(next.stencilWriteMaskFront);
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }
    return;
  }

  if (next.stencilSep) {
    // front
    if (
      cur.stencilFuncFront !== next.stencilFuncFront ||
      cur.stencilRefFront !== next.stencilRefFront ||
      cur.stencilMaskFront !== next.stencilMaskFront
    ) {
      gl.stencilFuncSeparate(gl.FRONT, next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
    }
    if (cur.stencilWriteMaskFront !== next.stencilWriteMaskFront) {
      gl.stencilMaskSeparate(gl.FRONT, next.stencilWriteMaskFront);
    }
    if (
      cur.stencilFailOpFront !== next.stencilFailOpFront ||
      cur.stencilZFailOpFront !== next.stencilZFailOpFront ||
      cur.stencilZPassOpFront !== next.stencilZPassOpFront
    ) {
      gl.stencilOpSeparate(gl.FRONT, next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }

    // back
    if (
      cur.stencilFuncBack !== next.stencilFuncBack ||
      cur.stencilRefBack !== next.stencilRefBack ||
      cur.stencilMaskBack !== next.stencilMaskBack
    ) {
      gl.stencilFuncSeparate(gl.BACK, next.stencilFuncBack, next.stencilRefBack, next.stencilMaskBack);
    }
    if (cur.stencilWriteMaskBack !== next.stencilWriteMaskBack) {
      gl.stencilMaskSeparate(gl.BACK, next.stencilWriteMaskBack);
    }
    if (
      cur.stencilFailOpBack !== next.stencilFailOpBack ||
      cur.stencilZFailOpBack !== next.stencilZFailOpBack ||
      cur.stencilZPassOpBack !== next.stencilZPassOpBack
    ) {
      gl.stencilOpSeparate(gl.BACK, next.stencilFailOpBack, next.stencilZFailOpBack, next.stencilZPassOpBack);
    }
  } else {
    if (
      cur.stencilFuncFront !== next.stencilFuncFront ||
      cur.stencilRefFront !== next.stencilRefFront ||
      cur.stencilMaskFront !== next.stencilMaskFront
    ) {
      gl.stencilFunc(next.stencilFuncFront, next.stencilRefFront, next.stencilMaskFront);
    }
    if (cur.stencilWriteMaskFront !== next.stencilWriteMaskFront) {
      gl.stencilMask(next.stencilWriteMaskFront);
    }
    if (
      cur.stencilFailOpFront !== next.stencilFailOpFront ||
      cur.stencilZFailOpFront !== next.stencilZFailOpFront ||
      cur.stencilZPassOpFront !== next.stencilZPassOpFront
    ) {
      gl.stencilOp(next.stencilFailOpFront, next.stencilZFailOpFront, next.stencilZPassOpFront);
    }
  }

}

/**
 * _commitCullMode
 */
function _commitCullMode(gl, cur, next) {
  if (cur.cullMode === next.cullMode) {
    return;
  }

  if (next.cullMode === enums.CULL_NONE) {
    gl.disable(gl.CULL_FACE);
    return;
  }

  gl.enable(gl.CULL_FACE);
  gl.cullFace(next.cullMode);
}

/**
 * _commitVertexBuffers
 */
function _commitVertexBuffers(gl, cur, next) {
  var attrsDirty = false;

  // nothing changed for vertex buffer
  if (next.maxStream === -1) {
    console.warn('VertexBuffer not assigned, please call setVertexBuffer before every draw.');
    return;
  }

  if (cur.maxStream !== next.maxStream) {
    attrsDirty = true;
  } else if (cur.program !== next.program) {
    attrsDirty = true;
  } else {
    for (var i = 0; i < next.maxStream + 1; ++i) {
      if (
        cur.vertexBuffers[i] !== next.vertexBuffers[i] ||
        cur.vertexBufferOffsets[i] !== next.vertexBufferOffsets[i]
      ) {
        attrsDirty = true;
        break;
      }
    }
  }

  if (attrsDirty) {
    for (var i$1 = 0; i$1 < next.maxStream + 1; ++i$1) {
      var vb = next.vertexBuffers[i$1];
      var vbOffset = next.vertexBufferOffsets[i$1];
      if (!vb) {
        continue;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vb._glID);

      for (var j = 0; j < next.program._attributes.length; ++j) {
        var attr = next.program._attributes[j];

        var el = vb._format.element(attr.name);
        if (!el) {
          console.warn(("Can not find vertex attribute: " + (attr.name)));
          continue;
        }

        gl.enableVertexAttribArray(attr.location);
        gl.vertexAttribPointer(
          attr.location,
          el.num,
          el.type,
          el.normalize,
          el.stride,
          el.offset + vbOffset * el.stride
        );
      }
    }
  }
}

/**
 * _commitTextures
 */
function _commitTextures(gl, cur, next) {
  for (var i = 0; i < next.textureUnits.length; ++i) {
    if (cur.textureUnits[i] !== next.textureUnits[i]) {
      var texture = next.textureUnits[i];
      // gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(texture._target, texture._glID);
    }
  }
}

/**
 * _attach
 */
function _attach(gl, location, attachment, face) {
  if ( face === void 0 ) face = 0;

  if (attachment instanceof Texture2D) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      location,
      gl.TEXTURE_2D,
      attachment._glID,
      0
    );
  } else if (attachment instanceof TextureCube) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      location,
      gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
      attachment._glID,
      0
    );
  } else {
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      location,
      gl.RENDERBUFFER,
      attachment._glID
    );
  }
}

var Device = function Device(canvasEL, opts) {
  var gl;

  // default options
  opts = opts || {};
  if (opts.alpha === undefined) {
    opts.alpha = false;
  }
  if (opts.stencil === undefined) {
    opts.stencil = true;
  }
  if (opts.depth === undefined) {
    opts.depth = true;
  }
  if (opts.antialias === undefined) {
    opts.antialias = false;
  }
  // NOTE: it is said the performance improved in mobile device with this flag off.
  if (opts.preserveDrawingBuffer === undefined) {
    opts.preserveDrawingBuffer = false;
  }


  try {
    gl = canvasEL.getContext('webgl', opts);
  } catch (err) {
    console.error(err);
    return;
  }

  // statics
  this._gl = gl;
  this._extensions = {};
  this._caps = {}; // capability
  this._stats = {
    texture: 0,
    vb: 0,
    ib: 0,
    drawcalls: 0,
  };

  // runtime
  this._current = new State();
  this._next = new State();
  this._uniforms = {}; // name: { value, num, dirty }
  this._vx = this._vy = this._vw = this._vh = 0;
  this._sx = this._sy = this._sw = this._sh = 0;
  this._framebuffer = null;

  this._initExtensions([
    'EXT_texture_filter_anisotropic',
    'OES_standard_derivatives',
    'OES_texture_float',
    'OES_texture_float_linear',
    'OES_texture_half_float',
    'OES_texture_half_float_linear',
    'OES_vertex_array_object',
    'WEBGL_compressed_texture_atc',
    'WEBGL_compressed_texture_etc1',
    'WEBGL_compressed_texture_pvrtc',
    'WEBGL_compressed_texture_s3tc',
    'WEBGL_depth_texture',
    'WEBGL_draw_buffers' ]);
  this._initCaps();
  this._initStates();
};

Device.prototype._initExtensions = function _initExtensions (extensions) {
    var this$1 = this;

  var gl = this._gl;

  for (var i = 0; i < extensions.length; ++i) {
    var name = extensions[i];

    try {
      var ext = gl.getExtension(name);
      if (ext) {
        this$1._extensions[name] = ext;
      }
    } catch (e) {
      console.error(e);
    }
  }
};

Device.prototype._initCaps = function _initCaps () {
  var gl = this._gl;
  var extDrawBuffers = this.ext('WEBGL_draw_buffers');

  this._caps.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  this._caps.maxFragUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
  this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

  this._caps.maxDrawBuffers = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL) : 1;
  this._caps.maxColorAttachments = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL) : 1;
};

Device.prototype._initStates = function _initStates () {
  var gl = this._gl;

  // gl.frontFace(gl.CCW);
  gl.disable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ZERO);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendColor(1,1,1,1);

  gl.colorMask(true, true, true, true);

  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);

  gl.disable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LESS);
  gl.depthMask(false);
  gl.disable(gl.POLYGON_OFFSET_FILL);
  gl.depthRange(0,1);

  gl.disable(gl.STENCIL_TEST);
  gl.stencilFunc(gl.ALWAYS, 0, 0xFF);
  gl.stencilMask(0xFF);
  gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);

  // TODO:
  // this.setAlphaToCoverage(false);
  // this.setTransformFeedbackBuffer(null);
  // this.setRaster(true);
  // this.setDepthBias(false);

  gl.clearDepth(1);
  gl.clearColor(0, 0, 0, 0);
  gl.clearStencil(0);

  gl.disable(gl.SCISSOR_TEST);
};

Device.prototype._restoreTexture = function _restoreTexture (unit) {
  var gl = this._gl;

  var texture = this._current.textureUnits[unit];
  if (texture) {
    gl.bindTexture(texture._target, texture._glID);
  } else {
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
};

/**
 * @method ext
 * @param {string} name
 */
Device.prototype.ext = function ext (name) {
  return this._extensions[name];
};

// ===============================
// Immediate Settings
// ===============================

/**
 * @method setFrameBuffer
 * @param {FrameBuffer} fb - null means use the backbuffer
 */
Device.prototype.setFrameBuffer = function setFrameBuffer (fb) {
    var this$1 = this;

  if (this._framebuffer === fb) {
    return;
  }

  this._framebuffer = fb;
  var gl = this._gl;

  if (fb === null) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return;
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, fb._glID);

  var numColors = this._framebuffer._colors.length;
  for (var i = 0; i < numColors; ++i) {
    var colorBuffer = this$1._framebuffer._colors[i];
    _attach(gl, gl.COLOR_ATTACHMENT0 + i, colorBuffer);

    // TODO: what about cubemap face??? should be the target parameter for colorBuffer
  }
  for (var i$1 = numColors; i$1 < this._caps.maxColorAttachments; ++i$1) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0 + i$1,
      gl.TEXTURE_2D,
      null,
      0
    );
  }

  if (this._framebuffer._depth) {
    _attach(gl, gl.DEPTH_ATTACHMENT, this._framebuffer._depth);
  }

  if (this._framebuffer._stencil) {
    _attach(gl, gl.STENCIL_ATTACHMENT, fb._stencil);
  }

  if (this._framebuffer._depthStencil) {
    _attach(gl, gl.DEPTH_STENCIL_ATTACHMENT, fb._depthStencil);
  }
};

/**
 * @method setViewport
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
Device.prototype.setViewport = function setViewport (x, y, w, h) {
  if (
    this._vx !== x ||
    this._vy !== y ||
    this._vw !== w ||
    this._vh !== h
  ) {
    this._gl.viewport(x, y, w, h);
    this._vx = x;
    this._vy = y;
    this._vw = w;
    this._vh = h;
  }
};

/**
 * @method setScissor
 * @param {Number} x
 * @param {Number} y
 * @param {Number} w
 * @param {Number} h
 */
Device.prototype.setScissor = function setScissor (x, y, w, h) {
  if (
    this._sx !== x ||
    this._sy !== y ||
    this._sw !== w ||
    this._sh !== h
  ) {
    this._gl.scissor(x, y, w, h);
    this._sx = x;
    this._sy = y;
    this._sw = w;
    this._sh = h;
  }
};

/**
 * @method clear
 * @param {Object} opts
 * @param {Array} opts.color
 * @param {Number} opts.depth
 * @param {Number} opts.stencil
 */
Device.prototype.clear = function clear (opts) {
  var gl = this._gl;
  var flags = 0;

  if (opts.color !== undefined) {
    flags |= gl.COLOR_BUFFER_BIT;
    gl.clearColor(opts.color[0], opts.color[1], opts.color[2], opts.color[3]);
  }

  if (opts.depth !== undefined) {
    flags |= gl.DEPTH_BUFFER_BIT;
    gl.clearDepth(opts.depth);

    gl.enable(gl.DEPTH_TEST);
    gl.depthMask(true);
    gl.depthFunc(gl.ALWAYS);
  }

  if (opts.stencil !== undefined) {
    flags |= gl.STENCIL_BUFFER_BIT;
    gl.clearStencil(opts.stencil);
  }

  gl.clear(flags);

  // restore depth-write
  if (opts.depth !== undefined) {
    if (this._current.depthTest === false) {
      gl.disable(gl.DEPTH_TEST);
    } else {
      if (this._current.depthWrite === false) {
        gl.depthMask(false);
      }
      if (this._current.depthFunc !== enums.DS_FUNC_ALWAYS) {
        gl.depthFunc(this._current.depthFunc);
      }
    }
  }
};

// ===============================
// Deferred States
// ===============================

/**
 * @method enableBlend
 */
Device.prototype.enableBlend = function enableBlend () {
  this._next.blend = true;
};

/**
 * @method enableDepthTest
 */
Device.prototype.enableDepthTest = function enableDepthTest () {
  this._next.depthTest = true;
};

/**
 * @method enableDepthWrite
 */
Device.prototype.enableDepthWrite = function enableDepthWrite () {
  this._next.depthWrite = true;
};

/**
 * @method enableStencilTest
 */
Device.prototype.enableStencilTest = function enableStencilTest () {
  this._next.stencilTest = true;
};

/**
 * @method setStencilFunc
 * @param {DS_FUNC_*} func
 * @param {Number} ref
 * @param {Number} mask
 */
Device.prototype.setStencilFunc = function setStencilFunc (func, ref, mask) {
  this._next.stencilSep = false;
  this._next.stencilFuncFront = this._next.stencilFuncBack = func;
  this._next.stencilRefFront = this._next.stencilRefBack = ref;
  this._next.stencilMaskFront = this._next.stencilMaskBack = mask;
};

/**
 * @method setStencilFuncFront
 * @param {DS_FUNC_*} func
 * @param {Number} ref
 * @param {Number} mask
 */
Device.prototype.setStencilFuncFront = function setStencilFuncFront (func, ref, mask) {
  this._next.stencilSep = true;
  this._next.stencilFuncFront = func;
  this._next.stencilRefFront = ref;
  this._next.stencilMaskFront = mask;
};

/**
 * @method setStencilFuncBack
 * @param {DS_FUNC_*} func
 * @param {Number} ref
 * @param {Number} mask
 */
Device.prototype.setStencilFuncBack = function setStencilFuncBack (func, ref, mask) {
  this._next.stencilSep = true;
  this._next.stencilFuncBack = func;
  this._next.stencilRefBack = ref;
  this._next.stencilMaskBack = mask;
};

/**
 * @method setStencilOp
 * @param {STENCIL_OP_*} failOp
 * @param {STENCIL_OP_*} zFailOp
 * @param {STENCIL_OP_*} zPassOp
 * @param {Number} writeMask
 */
Device.prototype.setStencilOp = function setStencilOp (failOp, zFailOp, zPassOp, writeMask) {
  this._next.stencilFailOpFront = this._next.stencilFailOpBack = failOp;
  this._next.stencilZFailOpFront = this._next.stencilZFailOpBack = zFailOp;
  this._next.stencilZPassOpFront = this._next.stencilZPassOpBack = zPassOp;
  this._next.stencilWriteMaskFront = this._next.stencilWriteMaskBack = writeMask;
};

/**
 * @method setStencilOpFront
 * @param {STENCIL_OP_*} failOp
 * @param {STENCIL_OP_*} zFailOp
 * @param {STENCIL_OP_*} zPassOp
 * @param {Number} writeMask
 */
Device.prototype.setStencilOpFront = function setStencilOpFront (failOp, zFailOp, zPassOp, writeMask) {
  this._next.stencilSep = true;
  this._next.stencilFailOpFront = failOp;
  this._next.stencilZFailOpFront = zFailOp;
  this._next.stencilZPassOpFront = zPassOp;
  this._next.stencilWriteMaskFront = writeMask;
};

/**
 * @method setStencilOpBack
 * @param {STENCIL_OP_*} failOp
 * @param {STENCIL_OP_*} zFailOp
 * @param {STENCIL_OP_*} zPassOp
 * @param {Number} writeMask
 */
Device.prototype.setStencilOpBack = function setStencilOpBack (failOp, zFailOp, zPassOp, writeMask) {
  this._next.stencilSep = true;
  this._next.stencilFailOpBack = failOp;
  this._next.stencilZFailOpBack = zFailOp;
  this._next.stencilZPassOpBack = zPassOp;
  this._next.stencilWriteMaskBack = writeMask;
};

/**
 * @method setDepthFunc
 * @param {DS_FUNC_*} depthFunc
 */
Device.prototype.setDepthFunc = function setDepthFunc (depthFunc) {
  this._next.depthFunc = depthFunc;
};

/**
 * @method setBlendColor32
 * @param {Number} rgba
 */
Device.prototype.setBlendColor32 = function setBlendColor32 (rgba) {
  this._next.blendColor = rgba;
};

/**
 * @method setBlendColor
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a
 */
Device.prototype.setBlendColor = function setBlendColor (r, g, b, a) {
  this._next.blendColor = ((r * 255) << 24 | (g * 255) << 16 | (b * 255) << 8 | a * 255) >>> 0;
};

/**
 * @method setBlendFunc
 * @param {BELND_*} src
 * @param {BELND_*} dst
 */
Device.prototype.setBlendFunc = function setBlendFunc (src, dst) {
  this._next.blendSep = false;
  this._next.blendSrc = src;
  this._next.blendDst = dst;
};

/**
 * @method setBlendFuncSep
 * @param {BELND_*} src
 * @param {BELND_*} dst
 * @param {BELND_*} srcAlpha
 * @param {BELND_*} dstAlpha
 */
Device.prototype.setBlendFuncSep = function setBlendFuncSep (src, dst, srcAlpha, dstAlpha) {
  this._next.blendSep = true;
  this._next.blendSrc = src;
  this._next.blendDst = dst;
  this._next.blendSrcAlpha = srcAlpha;
  this._next.blendDstAlpha = dstAlpha;
};

/**
 * @method setBlendEq
 * @param {BELND_FUNC_*} eq
 */
Device.prototype.setBlendEq = function setBlendEq (eq) {
  this._next.blendSep = false;
  this._next.blendEq = eq;
};

/**
 * @method setBlendEqSep
 * @param {BELND_FUNC_*} eq
 * @param {BELND_FUNC_*} alphaEq
 */
Device.prototype.setBlendEqSep = function setBlendEqSep (eq, alphaEq) {
  this._next.blendSep = true;
  this._next.blendEq = eq;
  this._next.blendAlphaEq = alphaEq;
};

/**
 * @method setCullMode
 * @param {CULL_*} mode
 */
Device.prototype.setCullMode = function setCullMode (mode) {
  this._next.cullMode = mode;
};

/**
 * @method setVertexBuffer
 * @param {Number} stream
 * @param {VertexBuffer} buffer
 * @param {Number} start - start vertex
 */
Device.prototype.setVertexBuffer = function setVertexBuffer (stream, buffer, start) {
    if ( start === void 0 ) start = 0;

  this._next.vertexBuffers[stream] = buffer;
  this._next.vertexBufferOffsets[stream] = start;
  if (this._next.maxStream < stream) {
    this._next.maxStream = stream;
  }
};

/**
 * @method setIndexBuffer
 * @param {IndexBuffer} buffer
 */
Device.prototype.setIndexBuffer = function setIndexBuffer (buffer) {
  this._next.indexBuffer = buffer;
};

/**
 * @method setProgram
 * @param {Program} program
 */
Device.prototype.setProgram = function setProgram (program) {
  this._next.program = program;
};

/**
 * @method setTexture
 * @param {String} name
 * @param {Texture} texture
 * @param {Number} slot
 */
Device.prototype.setTexture = function setTexture (name, texture, slot) {
  if (slot >= this._caps.maxTextureUnits) {
    console.warn(("Can not set texture " + name + " at stage " + slot + ", max texture exceed: " + (this._caps.maxTextureUnits)));
    return;
  }

  this._next.textureUnits[slot] = texture;
  this.setUniform(name, slot);
};

/**
 * @method setUniform
 * @param {String} name
 * @param {*} value
 */
Device.prototype.setUniform = function setUniform (name, value) {
  var uniform = this._uniforms[name];
  if (!uniform) {
    uniform = {
      dirty: true,
      value: value,
    };
  } else {
    uniform.dirty = true;
    uniform.value = value;
  }
  this._uniforms[name] = uniform;
};

/**
 * @method setPrimitiveType
 * @param {PT_*} type
 */
Device.prototype.setPrimitiveType = function setPrimitiveType (type) {
  this._next.primitiveType = type;
};

/**
 * @method draw
 * @param {Number} base
 * @param {Number} count
 */
Device.prototype.draw = function draw (base, count) {
    var this$1 = this;

  var gl = this._gl;
  var cur = this._current;
  var next = this._next;

  // commit blend
  _commitBlendStates(gl, cur, next);

  // commit depth
  _commitDepthStates(gl, cur, next);

  // commit stencil
  _commitStencilStates(gl, cur, next);

  // commit cull
  _commitCullMode(gl, cur, next);

  // commit vertex-buffer
  _commitVertexBuffers(gl, cur, next);

  // commit index-buffer
  if (cur.indexBuffer !== next.indexBuffer) {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, next.indexBuffer ? next.indexBuffer._glID : null);
  }

  // commit program
  var programDirty = false;
  if (cur.program !== next.program) {
    if (next.program._linked) {
      gl.useProgram(next.program._glID);
    } else {
      console.warn('Failed to use program: has not linked yet.');
    }
    programDirty = true;
  }

  // commit texture/sampler
  _commitTextures(gl, cur, next);

  // commit uniforms
  for (var i = 0; i < next.program._uniforms.length; ++i) {
    var uniformInfo = next.program._uniforms[i];
    var uniform = this$1._uniforms[uniformInfo.name];
    if (!uniform) {
      // console.warn(`Can not find uniform ${uniformInfo.name}`);
      continue;
    }

    if (!programDirty && !uniform.dirty) {
      continue;
    }

    uniform.dirty = false;

    // TODO: please consider array uniform: uniformInfo.size > 0

    var commitFunc = (uniformInfo.size === undefined) ? _type2uniformCommit[uniformInfo.type] : _type2uniformArrayCommit[uniformInfo.type];
    if (!commitFunc) {
      console.warn(("Can not find commit function for uniform " + (uniformInfo.name)));
      continue;
    }

    commitFunc(gl, uniformInfo.location, uniform.value);
  }

  // drawPrimitives
  if (next.indexBuffer) {
    gl.drawElements(
      this._next.primitiveType,
      count,
      next.indexBuffer._format,
      base * next.indexBuffer._bytes
    );
  } else {
    gl.drawArrays(
      this._next.primitiveType,
      base,
      count
    );
  }

  // TODO: autogen mipmap for color buffer
  // if (this._framebuffer && this._framebuffer.colors[0].mipmap) {
  // gl.bindTexture(this._framebuffer.colors[i]._target, colors[i]._glID);
  // gl.generateMipmap(this._framebuffer.colors[i]._target);
  // }

  // update stats
  this._stats.drawcalls += 1;

  // reset states
  cur.set(next);
  next.reset();
};

var gfx = {
  // classes
  VertexFormat: VertexFormat,
  IndexBuffer: IndexBuffer,
  VertexBuffer: VertexBuffer,
  Program: Program,
  Texture: Texture,
  Texture2D: Texture2D,
  TextureCube: TextureCube,
  RenderBuffer: RenderBuffer,
  FrameBuffer: FrameBuffer,
  Device: Device,

  // functions
  attrTypeBytes: attrTypeBytes,
  glFilter: glFilter,
  glTextureFmt: glTextureFmt,
};
Object.assign(gfx, enums);

return gfx;

}());
//# sourceMappingURL=gfx.dev.js.map
