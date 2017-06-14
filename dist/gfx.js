
/*
 * gfx.js v1.0.3
 * (c) 2017 @Johnny Wu
 * Released under the MIT License.
 */

'use strict';

const GL_NEAREST = 9728;                // gl.NEAREST
const GL_LINEAR = 9729;                 // gl.LINEAR
const GL_NEAREST_MIPMAP_NEAREST = 9984; // gl.NEAREST_MIPMAP_NEAREST
const GL_LINEAR_MIPMAP_NEAREST = 9985;  // gl.LINEAR_MIPMAP_NEAREST
const GL_NEAREST_MIPMAP_LINEAR = 9986;  // gl.NEAREST_MIPMAP_LINEAR
const GL_LINEAR_MIPMAP_LINEAR = 9987;   // gl.LINEAR_MIPMAP_LINEAR

// const GL_BYTE = 5120;                     // gl.BYTE
const GL_UNSIGNED_BYTE = 5121;            // gl.UNSIGNED_BYTE
// const GL_SHORT = 5122;                    // gl.SHORT
const GL_UNSIGNED_SHORT = 5123;           // gl.UNSIGNED_SHORT
const GL_FLOAT = 5126;                    // gl.FLOAT
const GL_UNSIGNED_SHORT_5_6_5 = 33635;    // gl.UNSIGNED_SHORT_5_6_5
const GL_UNSIGNED_SHORT_4_4_4_4 = 32819;  // gl.UNSIGNED_SHORT_4_4_4_4
const GL_UNSIGNED_SHORT_5_5_5_1 = 32820;  // gl.UNSIGNED_SHORT_5_5_5_1
const GL_HALF_FLOAT_OES = 36193;          // gl.HALF_FLOAT_OES

const GL_DEPTH_COMPONENT = 6402; // gl.DEPTH_COMPONENT

const GL_ALPHA = 6406;            // gl.ALPHA
const GL_RGB = 6407;              // gl.RGB
const GL_RGBA = 6408;             // gl.RGBA
const GL_LUMINANCE = 6409;        // gl.LUMINANCE
const GL_LUMINANCE_ALPHA = 6410;  // gl.LUMINANCE_ALPHA

const GL_COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;   // ext.COMPRESSED_RGB_S3TC_DXT1_EXT
const GL_COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;  // ext.COMPRESSED_RGBA_S3TC_DXT1_EXT
const GL_COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;  // ext.COMPRESSED_RGBA_S3TC_DXT3_EXT
const GL_COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;  // ext.COMPRESSED_RGBA_S3TC_DXT5_EXT

const GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;  // ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
const GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;  // ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
const GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02; // ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
const GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03; // ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG

const GL_COMPRESSED_RGB_ETC1_WEBGL = 0x8D64; // ext.COMPRESSED_RGB_ETC1_WEBGL

const _filterGL = [
  [ GL_NEAREST,  GL_NEAREST_MIPMAP_NEAREST, GL_NEAREST_MIPMAP_LINEAR ],
  [ GL_LINEAR,  GL_LINEAR_MIPMAP_NEAREST, GL_LINEAR_MIPMAP_LINEAR ],
];

const _textureFmtGL = [
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

  // TEXTURE_FMT_DEPTH: 25
  { format: GL_DEPTH_COMPONENT, internalFormat: GL_DEPTH_COMPONENT, pixelType: GL_UNSIGNED_SHORT },

  // TEXTURE_FMT_DEPTHSTENCIL: 26
  { format: null, internalFormat: null, pixelType: null },
];

/**
 * enums
 */
let enums = {
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
  TEXTURE_FMT_DEPTH: 25,
  TEXTURE_FMT_DEPTHSTENCIL: 26,

  // render-buffer format
  RB_FMT_RGBA4: 32854,          // gl.RGBA4
  RB_FMT_RGB5_A1: 32855,        // gl.RGB5_A1
  RB_FMT_RGB565: 36194,         // gl.RGB565
  RB_FMT_DEPTH: 33189,          // gl.DEPTH_COMPONENT16
  RB_FMT_STENCIL: 36168,        // gl.STENCIL_INDEX8
  RB_FMT_DEPTH_STENCIL: 34041,  // gl.DEPTH_STENCIL

  // depth-function
  DEPTH_FUNC_NEVER: 512,    // gl.NEVER
  DEPTH_FUNC_LESS: 513,     // gl.LESS
  DEPTH_FUNC_EQUAL: 514,    // gl.EQUAL
  DEPTH_FUNC_LEQUAL: 515,   // gl.LEQUAL
  DEPTH_FUNC_GREATER: 516,  // gl.GREATER
  DEPTH_FUNC_NOTEQUAL: 517, // gl.NOTEQUAL
  DEPTH_FUNC_GEQUAL: 518,   // gl.GEQUAL
  DEPTH_FUNC_ALWAYS: 519,   // gl.ALWAYS

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

  console.warn(`Unknown ATTR_TYPE: ${attrType}`);
  return 0;
}

/**
 * @method glFilter
 * @param {WebGLContext} gl
 * @param {FILTER_*} filter
 * @param {FILTER_*} mipFilter
 */
function glFilter(gl, filter, mipFilter = -1) {
  let result = _filterGL[filter][mipFilter+1];
  if (result === undefined) {
    console.warn(`Unknown FILTER: ${filter}`);
    return mipFilter === -1 ? gl.LINEAR : gl.LINEAR_MIPMAP_LINEAR;
  }

  return result;
}

/**
 * @method glTextureFmt
 * @param {TEXTURE_FMT_*} fmt
 */
function glTextureFmt(fmt) {
  let result = _textureFmtGL[fmt];
  if (result === undefined) {
    console.warn(`Unknown TEXTURE_FMT: ${fmt}`);
    return _textureFmtGL[enums.TEXTURE_FMT_RGBA8];
  }

  return result;
}

// ====================
// exports
// ====================

class VertexFormat {
  /**
   * @constructor
   * @param {Array} infos
   *
   * @example
   * let vertexFmt = new VertexFormat([
   *   { name: gfx.ATTR_POSITION, type: gfx.ATTR_TYPE_FLOAT32, num: 3 },
   *   { name: gfx.ATTR_UV0, type: gfx.ATTR_TYPE_FLOAT32, num: 2 },
   *   { name: gfx.ATTR_COLOR, type: gfx.ATTR_TYPE_FLOAT32, num: 4, normalize: true },
   * ])
   */
  constructor(infos) {
    this._attr2el = {};
    this._elements = [];
    this._bytes = 0;

    let offset = 0;
    for (let i = 0, len = infos.length; i < len; ++i) {
      let info = infos[i];
      let el = {
        name: info.name,
        offset: offset,
        stride: 0,
        stream: -1,
        type: info.type,
        num: info.num,
        normalize: (info.normalize === undefined) ? false : info.normalize,
        bytes: info.num * attrTypeBytes(info.type),
      };

      this._attr2el[el.name] = el;
      this._elements.push(el);

      this._bytes += el.bytes;
      offset += el.bytes;
    }

    for (let i = 0, len = this._elements.length; i < len; ++i) {
      let el = this._elements[i];
      el.stride = this._bytes;
    }
  }

  /**
   * @method element
   * @param {string} attrName
   */
  element(attrName) {
    return this._attr2el[attrName];
  }
}

class IndexBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {INDEX_FMT_*} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer} data
   * @param {Number} numIndices
   * @param {Boolean} persist
   */
  constructor(device, format, usage, data, numIndices, persist) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._persist = persist;
    this._numIndices = numIndices;

    // calculate bytes
    let bytes = 0;
    if (format === enums.INDEX_FMT_UINT8) {
      bytes = numIndices;
    } else if (format === enums.INDEX_FMT_UINT16) {
      bytes = 2 * numIndices;
    } else if (format === enums.INDEX_FMT_UINT32) {
      bytes = 4 * numIndices;
    }
    this._bytes = bytes;

    // update
    this._id = device._gl.createBuffer();
    this._data = null;
    this.update(0, data);

    // stats
    device._stats.ib += bytes;
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._id === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    let gl = this.device.gl;
    gl.deleteBuffer(this._id);
    this.device._stats.ib -= this.bytes;

    this._id = -1;
  }

  /**
   * @method update
   * @param {Number} offset
   * @param {ArrayBuffer} data
   */
  update(offset, data) {
    if (this._id === -1) {
      console.error('The buffer is destroyed');
      return;
    }

    if (data && data.byteLength + offset > this._bytes) {
      console.error('Failed to update data, bytes exceed.');
      return;
    }

    let gl = this._device._gl;
    let glUsage = this._usage;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._id);
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
  }

  get count () {
    return this._numIndices;
  }
}

class VertexBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {VertexFormat} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer} data
   * @param {Number} numVertices
   * @param {Boolean} persist
   */
  constructor(device, format, usage, data, numVertices, persist) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._persist = persist;
    this._numVertices = numVertices;

    // calculate bytes
    this._bytes = this._format._bytes * numVertices;

    // update
    this._id = device._gl.createBuffer();
    this._data = null;
    this.update(0, data);

    // stats
    device._stats.vb += this._bytes;
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._id === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    let gl = this.device.gl;
    gl.deleteBuffer(this._id);
    this.device._stats.vb -= this.bytes;

    this._id = -1;
  }

  /**
   * @method update
   * @param {Number} offset
   * @param {ArrayBuffer} data
   */
  update(offset, data) {
    if (this._id === -1) {
      console.error('The buffer is destroyed');
      return;
    }

    if (data && data.byteLength + offset > this._bytes) {
      console.error('Failed to update data, bytes exceed.');
      return;
    }

    let gl = this._device._gl;
    let glUsage = this._usage;

    gl.bindBuffer(gl.ARRAY_BUFFER, this._id);
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
  }

  get count () {
    return this._numVertices;
  }
}

class Program {
  /**
   * @param {ef.GraphicsDevice} device - graphic device
   * @param {object} options - shader definition
   * @param {string} options.vert - vertex shader source code
   * @param {string} options.frag - fragment shader shader source code
   * @example
   * let prog = new Program(device, {
   *   vert: `
   *     attribute vec3 a_position;
   *     void main() {
   *       gl_Position = vec4( a_position, 1.0 );
   *     }
   *   `,
   *   frag: `
   *     precision mediump float;
   *     void main() {
   *       gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
   *     }
   *   `
   * });
   */
  constructor(device, options) {
    this._device = device;

    // stores gl information: { location, type }
    this._attributes = [];
    this._uniforms = [];
    this._samplers = [];

    this._linked = false;
    this._vertSource = options.vert;
    this._fragSource = options.frag;
    this._program = null;
  }

  link() {
    if (this._linked) {
      return;
    }

    let gl = this._device._gl;

    let vertShader = _createShader(gl, gl.VERTEX_SHADER, this._vertSource);
    let fragShader = _createShader(gl, gl.FRAGMENT_SHADER, this._fragSource);

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    let failed = false;

    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      console.error(`Failed to compile vertex shader: ${gl.getShaderInfoLog(vertShader)}`);
      failed = true;
    }

    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      console.error(`Failed to compile fragment shader: ${gl.getShaderInfoLog(fragShader)}`);
      failed = true;
    }

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Failed to link shader program: ${gl.getProgramInfoLog(program)}`);
      failed = true;
    }

    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    if (failed) {
      return;
    }

    this._program = program;

    // parse attribute
    let numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttributes; ++i) {
      let info = gl.getActiveAttrib(program, i);
      let location = gl.getAttribLocation(program, info.name);

      this._attributes.push({
        name: info.name,
        location: location,
        type: info.type,
      });
    }

    // parse uniform
    let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; ++i) {
      let info = gl.getActiveUniform(program, i);
      let location = gl.getUniformLocation(program, info.name);

      this._uniforms.push({
        name: info.name,
        location: location,
        type: info.type,
      });
    }

    //
    this._linked = true;
  }

  destroy() {
    let gl = this._device._gl;
    gl.deleteProgram(this._program);

    this._linked = false;
    this._program = null;
    this._attributes = [];
    this._uniforms = [];
    this._samplers = [];
  }
}

// ====================
// internal
// ====================

function _createShader(gl, type, src) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  return shader;
}

class Texture {
  /**
   * @constructor
   */
  constructor(device) {
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
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._id === -1) {
      console.error('The texture already destroyed');
      return;
    }

    let gl = this.device.gl;
    gl.deleteTexture(this._id);

    this.device._stats.tex -= this.bytes;
    this._id = -1;
  }
}

class Texture2D extends Texture {
  /**
   * @constructor
   * @param {Device} device
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
  constructor(device, options) {
    super(device);
    this._target = this._device._gl.TEXTURE_2D;

    this.update(options);
  }

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
  update(options) {
    let gl = this._device._gl;
    let genMipmap = this._hasMipmap;

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

    this._id = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._id);
      // always alloc texture in GPU when we create it.
      let images = options.images || [null];
      this._setMipmap(images, options.flipY, options.premultiplyAlpha);
      this._setTexInfo();

      if (genMipmap) {
        gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
        gl.generateMipmap(gl.TEXTURE_2D);
      }
    this._device._restoreTexture(0);
  }

  _setMipmap(images, flipY, premultiplyAlpha) {
    let gl = this._device._gl;
    let glFmt = glTextureFmt(this._format);

    for (let i = 0; i < images.length; ++i) {
      let img = images[i];

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
          i,
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
            i,
            glFmt.internalFormat,
            this._width,
            this._height,
            0,
            img
          );
        } else {
          gl.texImage2D(
            gl.TEXTURE_2D,
            i,
            glFmt.internalFormat,
            this._width,
            this._height,
            0,
            glFmt.format,
            glFmt.pixelType,
            img
          );
        }
      }
    }
  }

  _setTexInfo() {
    let gl = this._device._gl;

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, glFilter(gl, this._minFilter, this._hasMipmap ? this._mipFilter : -1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, glFilter(gl, this._magFilter, -1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);

    let ext = this._device.ext('EXT_texture_filter_anisotropic');
    if (ext) {
      gl.texParameteri(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy);
    }
  }
}

class TextureCube extends Texture {
  /**
   * @constructor
   * @param {Device} device
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
  constructor(device, options) {
    super(device);
    this._target = this._device._gl.TEXTURE_CUBE_MAP;

    this.update(options);
  }

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
  update(options) {
    let gl = this._device._gl;
    let genMipmap = this._hasMipmap;

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

    this._id = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._id);
      if (options.images !== undefined) {
        this._setMipmap(options.images, options.flipY, options.premultiplyAlpha);
      }

      this._setTexInfo();

      if (genMipmap) {
        gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      }
    this._device._restoreTexture(0);
  }

  // levelImages = [imagePosX, imageNegX, imagePosY, imageNegY, imagePosZ, imageNegz]
  // images = [levelImages0, levelImages1, ...]
  _setMipmap(images, flipY, premultiplyAlpha) {
    let gl = this._device._gl;
    let glFmt = glTextureFmt(this._format);

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

    for (let i = 0; i < images.length; ++i) {
      let levelImages = images[i];
      for (let face = 0; face < 6; ++face) {
        if (
          levelImages[face] instanceof HTMLCanvasElement ||
          levelImages[face] instanceof HTMLImageElement ||
          levelImages[face] instanceof HTMLVideoElement
        ) {
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
            i,
            glFmt.internalFormat,
            glFmt.format,
            glFmt.pixelType,
            levelImages[face]
          );
        } else {
          if (this._compressed) {
            gl.compressedTexImage2D(
              gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
              i,
              glFmt.internalFormat,
              this._width,
              this._height,
              0,
              levelImages[face]
            );
          } else {
            gl.texImage2D(
              gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
              i,
              glFmt.internalFormat,
              this._width,
              this._height,
              0,
              glFmt.format,
              glFmt.pixelType,
              levelImages[face]
            );
          }
        }
      }
    }
  }

  _setTexInfo() {
    let gl = this._device._gl;

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, glFilter(gl, this._minFilter, this._hasMipmap ? this._mipFilter : -1));
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, glFilter(gl, this._magFilter, -1));
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this._wrapT);
    // wrapR available in webgl2
    // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, this._wrapR);

    let ext = this._device.ext('EXT_texture_filter_anisotropic');
    if (ext) {
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy);
    }
  }
}

class RenderBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {RB_FMT_*} format
   * @param {Number} width
   * @param {Number} height
   */
  constructor(device, format, width, height) {
    this._device = device;
    this._format = format;
    this._width = width;
    this._height = height;

    const gl = device._gl;
    this._rb = gl.createRenderbuffer();

    gl.bindRenderbuffer(gl.RENDERBUFFER, this._rb);
    gl.renderbufferStorage(gl.RENDERBUFFER, format, width, height);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._rb === null) {
      console.error('The render-buffer already destroyed');
      return;
    }

    const gl = this._device._gl;

    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.deleteRenderbuffer(this._rb);

    this._rb = null;
  }
}

class FrameBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {Number} width
   * @param {Number} height
   * @param {Object} options
   * @param {Array} options.colors
   * @param {RenderBuffer|Texture2D|TextureCube} options.depth
   * @param {RenderBuffer|Texture2D|TextureCube} options.stencil
   * @param {RenderBuffer|Texture2D|TextureCube} options.depthStencil
   */
  constructor(device, width, height, options) {
    this._device = device;
    this._width = width;
    this._height = height;

    this._colors = options.colors || [];
    this._depth = options.depth || null;
    this._stencil = options.stencil || null;
    this._depthStencil = options.depthStencil || null;

    this._fb = device._gl.createFramebuffer();
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._fb === null) {
      console.error('The frame-buffer already destroyed');
      return;
    }

    const gl = this._device._gl;

    gl.deleteFramebuffer(this._fb);

    this._fb = null;
  }
}

const INVALID = -1;

const _defaultStates = {
  blend: false,
  blendSep: INVALID, // 0: false, 1: true
  blendColor: INVALID,
  blendEq: INVALID,
  blendAlphaEq: INVALID,
  blendSrc: INVALID,
  blendDst: INVALID,
  blendSrcAlpha: INVALID,
  blendDstAlpha: INVALID,

  depthTest: false,
  depthWrite: false,
  depthFunc: INVALID,

  cullMode: enums.CULL_BACK,

  // bindings
  maxStream: -1,
  vertexBuffers: [],
  vertexBufferOffsets: [],
  indexBuffer: null,
  textureUnits: [],
  program: null,
};

class State {
  constructor() {
    this.vertexBuffers = [];
    this.vertexBufferOffsets = [];
    this.textureUnits = [];

    this.set(_defaultStates);
  }

  set (cpy) {
    // states

    // blending
    this.blend = cpy.blend;
    if (cpy.blendSep !== INVALID) {
      this.blendSep = cpy.blendSep;
    }
    if (cpy.blendColor !== INVALID) {
      this.blendColor = cpy.blendColor;
    }
    if (cpy.blendEq !== INVALID) {
      this.blendEq = cpy.blendEq;
    }
    if (cpy.blendAlphaEq !== INVALID) {
      this.blendAlphaEq = cpy.blendAlphaEq;
    }
    if (cpy.blendSrc !== INVALID) {
      this.blendSrc = cpy.blendSrc;
    }
    if (cpy.blendDst !== INVALID) {
      this.blendDst = cpy.blendDst;
    }
    if (cpy.blendSrcAlpha !== INVALID) {
      this.blendSrcAlpha = cpy.blendSrcAlpha;
    }
    if (cpy.blendDstAlpha !== INVALID) {
      this.blendDstAlpha = cpy.blendDstAlpha;
    }

    // depth
    this.depthTest = cpy.depthTest;
    this.depthWrite = cpy.depthWrite;
    if (cpy.depthFunc !== INVALID) {
      this.depthFunc = cpy.depthFunc;
    }

    // cull-mode
    this.cullMode = cpy.cullMode;

    // bindings
    this.maxStream = cpy.maxStream;
    for (let i = 0; i < cpy.vertexBuffers.length; ++i) {
      this.vertexBuffers[i] = cpy.vertexBuffers[i];
    }
    for (let i = 0; i < cpy.vertexBufferOffsets.length; ++i) {
      this.vertexBufferOffsets[i] = cpy.vertexBufferOffsets[i];
    }
    this.indexBuffer = cpy.indexBuffer;
    for (let i = 0; i < cpy.textureUnits.length; ++i) {
      this.textureUnits[i] = cpy.textureUnits[i];
    }
    this.program = cpy.program;
  }

  reset () {
    this.set(_defaultStates);
  }
}

const GL_INT = 5124;
const GL_FLOAT$1 = 5126;
const GL_FLOAT_VEC2 = 35664;
const GL_FLOAT_VEC3 = 35665;
const GL_FLOAT_VEC4 = 35666;
const GL_INT_VEC2 = 35667;
const GL_INT_VEC3 = 35668;
const GL_INT_VEC4 = 35669;
const GL_BOOL = 35670;
const GL_BOOL_VEC2 = 35671;
const GL_BOOL_VEC3 = 35672;
const GL_BOOL_VEC4 = 35673;
const GL_FLOAT_MAT2 = 35674;
const GL_FLOAT_MAT3 = 35675;
const GL_FLOAT_MAT4 = 35676;
const GL_SAMPLER_2D = 35678;
const GL_SAMPLER_CUBE = 35680;

/**
 * _type2uniformCommit
 */
let _type2uniformCommit = {
  [GL_INT]: function (gl, id, value) {
    gl.uniform1i(id, value);
  },

  [GL_FLOAT$1]: function (gl, id, value) {
    gl.uniform1f(id, value);
  },

  [GL_FLOAT_VEC2]: function (gl, id, value) {
    gl.uniform2fv(id, value);
  },

  [GL_FLOAT_VEC3]: function (gl, id, value) {
    gl.uniform3fv(id, value);
  },

  [GL_FLOAT_VEC4]: function (gl, id, value) {
    gl.uniform4fv(id, value);
  },

  [GL_INT_VEC2]: function (gl, id, value) {
    gl.uniform2iv(id, value);
  },

  [GL_INT_VEC3]: function (gl, id, value) {
    gl.uniform3iv(id, value);
  },

  [GL_INT_VEC4]: function (gl, id, value) {
    gl.uniform4iv(id, value);
  },

  [GL_BOOL]: function (gl, id, value) {
    gl.uniform1i(id, value);
  },

  [GL_BOOL_VEC2]: function (gl, id, value) {
    gl.uniform2iv(id, value);
  },

  [GL_BOOL_VEC3]: function (gl, id, value) {
    gl.uniform3iv(id, value);
  },

  [GL_BOOL_VEC4]: function (gl, id, value) {
    gl.uniform4iv(id, value);
  },

  [GL_FLOAT_MAT2]: function (gl, id, value) {
    gl.uniformMatrix2fv(id, false, value);
  },

  [GL_FLOAT_MAT3]: function (gl, id, value) {
    gl.uniformMatrix3fv(id, false, value);
  },

  [GL_FLOAT_MAT4]: function (gl, id, value) {
    gl.uniformMatrix4fv(id, false, value);
  },

  [GL_SAMPLER_2D]: function (gl, id, value) {
    gl.uniform1i(id, value);
  },

  [GL_SAMPLER_CUBE]: function (gl, id, value) {
    gl.uniform1i(id, value);
  },
};

/**
 * _commitBlendStates
 */
function _commitBlendStates(gl, cur, next) {
  // enable/disable blend
  if (cur.blend !== next.blend) {
    if (next.blend === false) {
      gl.disable(gl.BLEND);
      return;
    } else {
      gl.enable(gl.BLEND);
    }
  } else {
    if (next.blend === false) {
      return;
    }
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
  // commit depth write
  if (cur.depthWrite !== next.depthWrite) {
    gl.depthMask(next.depthWrite);
  }

  // enable/disable depth-test
  if (cur.depthTest !== next.depthTest) {
    if (next.depthTest === false) {
      gl.disable(gl.DEPTH_TEST);
      return;
    } else {
      gl.enable(gl.DEPTH_TEST);
    }
  } else {
    if (next.depthTest === false) {
      return;
    }
  }

  // depth-func
  if (cur.depthFunc !== next.depthFunc) {
    gl.depthFunc(next.depthFunc);
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
  let attrsDirty = false;

  if (cur.maxStream !== next.maxStream) {
    attrsDirty = true;
  } else if (cur.program !== next.program) {
    attrsDirty = true;
  } else {
    for (let i = 0; i < next.maxStream + 1; ++i) {
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
    for (let i = 0; i < next.maxStream + 1; ++i) {
      let vb = next.vertexBuffers[i];
      let vbOffset = next.vertexBufferOffsets[i];
      if (!vb) {
        continue;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vb._id);

      for (let i = 0; i < next.program._attributes.length; ++i) {
        let attr = next.program._attributes[i];

        let el = vb._format.element(attr.name);
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
  for (let i = 0; i < next.textureUnits.length; ++i) {
    if (cur.textureUnits[i] !== next.textureUnits[i]) {
      let texture = next.textureUnits[i];
      // gl.activeTexture(gl.TEXTURE0 + i);
      gl.bindTexture(texture._target, texture._id);
    }
  }
}

/**
 * _attach
 */
function _attach(gl, location, attachment, face = 0) {
  if (attachment instanceof Texture2D) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      location,
      gl.TEXTURE_2D,
      attachment._id,
      0
    );
  } else if (attachment instanceof TextureCube) {
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      location,
      gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
      attachment._id,
      0
    );
  } else {
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      location,
      gl.RENDERBUFFER,
      attachment._rb
    );
  }
}

class Device {
  /**
   * @param {HTMLElement} canvasEL
   * @param {object} opts
   */
  constructor(canvasEL, opts) {
    let gl;

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
    this._primitiveType = enums.PT_TRIANGLES;
    this._vx = this._vy = this._vw = this._vh = 0;
    this._sx = this._sy = this._sw = this._sh = 0;
    this._framebuffer = null;

    this._initExtensions([
      'EXT_texture_filter_anisotropic',
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
      'WEBGL_draw_buffers',
    ]);
    this._initCaps();
    this._initStates();
  }

  _initExtensions(extensions) {
    const gl = this._gl;

    for (let i = 0; i < extensions.length; ++i) {
      let name = extensions[i];

      try {
        let ext = gl.getExtension(name);
        if (ext) {
          this._extensions[name] = ext;
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  _initCaps() {
    const gl = this._gl;
    const extDrawBuffers = this.ext('WEBGL_draw_buffers');

    this._caps.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this._caps.maxFragUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);

    this._caps.maxDrawBuffers = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_DRAW_BUFFERS_WEBGL) : 1;
    this._caps.maxColorAttachments = extDrawBuffers ? gl.getParameter(extDrawBuffers.MAX_COLOR_ATTACHMENTS_WEBGL) : 1;
  }

  _initStates() {
    const gl = this._gl;

    gl.disable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ZERO);
    gl.blendEquation(gl.FUNC_ADD);

    gl.colorMask(true, true, true, true);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);

    gl.disable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.depthMask(false);

    // TODO:
    // gl.disable(gl.STENCIL_TEST);
    // this.setStencilFunc(pc.FUNC_ALWAYS, 0, 0xFF);
    // this.setStencilOperation(pc.STENCILOP_KEEP, pc.STENCILOP_KEEP, pc.STENCILOP_KEEP, 0xFF);
    // this.setAlphaToCoverage(false);
    // this.setTransformFeedbackBuffer(null);
    // this.setRaster(true);
    // this.setDepthBias(false);

    gl.clearDepth(1);
    gl.clearColor(0, 0, 0, 0);
    gl.clearStencil(0);

    gl.disable(gl.SCISSOR_TEST);
  }

  _restoreTexture (unit) {
    const gl = this._gl;

    let texture = this._current.textureUnits[unit];
    if (texture) {
      gl.bindTexture(texture._target, texture._id);
    } else {
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
  }

  /**
   * @method ext
   * @param {string} name
   */
  ext(name) {
    return this._extensions[name];
  }

  // ===============================
  // Immediate Settings
  // ===============================

  /**
   * @method setFrameBuffer
   * @param {FrameBuffer} fb - null means use the backbuffer
   */
  setFrameBuffer(fb) {
    if (this._framebuffer === fb) {
      return;
    }

    this._framebuffer = fb;
    const gl = this._gl;

    if (fb === null) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      return;
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, fb._fb);

    let numColors = this._framebuffer._colors.length;
    for (let i = 0; i < numColors; ++i) {
      let colorBuffer = this._framebuffer._colors[i];
      _attach(gl, gl.COLOR_ATTACHMENT0 + i, colorBuffer);

      // TODO: what about cubemap face??? should be the target parameter for colorBuffer
    }
    for (let i = numColors; i < this._caps.maxColorAttachments; ++i) {
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0 + i,
        gl.TEXTURE_2D,
        null,
        0
      );
    }

    if (this._framebuffer._depth) {
      _attach(gl, gl.DEPTH_ATTACHMENT, this._framebuffer._depth);
    } else {
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.DEPTH_ATTACHMENT,
        gl.TEXTURE_2D,
        null,
        0
      );
    }

    if (this._framebuffer._stencil) {
      _attach(gl, gl.STENCIL_ATTACHMENT, fb._stencil);
    } else {
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.STENCIL_ATTACHMENT,
        gl.TEXTURE_2D,
        null,
        0
      );
    }

    if (this._framebuffer._depthStencil) {
      _attach(gl, gl.DEPTH_STENCIL_ATTACHMENT, fb._depthStencil);
    } else {
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.DEPTH_STENCIL_ATTACHMENT,
        gl.TEXTURE_2D,
        null,
        0
      );
    }
  }

  /**
   * @method setViewport
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  setViewport(x, y, w, h) {
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
  }

  /**
   * @method setScissor
   * @param {Number} x
   * @param {Number} y
   * @param {Number} w
   * @param {Number} h
   */
  setScissor(x, y, w, h) {
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
  }

  /**
   * @method clear
   * @param {Object} opts
   * @param {Array} opts.color
   * @param {Number} opts.depth
   * @param {Number} opts.stencil
   */
  clear(opts) {
    const gl = this._gl;
    let flags = 0;

    if (opts.color !== undefined) {
      flags |= gl.COLOR_BUFFER_BIT;
      gl.clearColor(opts.color[0], opts.color[1], opts.color[2], opts.color[3]);
    }

    if (opts.depth !== undefined) {
      flags |= gl.DEPTH_BUFFER_BIT;
      if (!this._current.depthWrite) {
        gl.depthMask(true);
      }
      gl.clearDepth(opts.depth);
    }

    if (opts.stencil !== undefined) {
      flags |= gl.STENCIL_BUFFER_BIT;
      gl.clearStencil(opts.stencil);
    }

    gl.clear(flags);

    // restore depth-write
    if (opts.depth !== undefined && !this._current.depthWrite) {
      gl.depthMask(false);
    }
  }

  // ===============================
  // Deferred States
  // ===============================

  /**
   * @method enableBlend
   */
  enableBlend() {
    this._next.blend = true;
  }

  /**
   * @method enableDepthTest
   */
  enableDepthTest() {
    this._next.depthTest = true;
  }

  /**
   * @method enableDepthWrite
   */
  enableDepthWrite() {
    this._next.depthWrite = true;
  }

  /**
   * @method setBlendColor
   * @param {Number} r
   * @param {Number} g
   * @param {Number} b
   * @param {Number} a
   */
  setBlendColor(r, g, b, a) {
    this._next.blendColor = (r * 255) << 24 | (g * 255) << 16 | (b * 255) << 8 | a * 255;
  }

  /**
   * @method setBlendFunction
   * @param {BELND_*} src
   * @param {BELND_*} dst
   */
  setBlendFunction(src, dst) {
    this._next.blendSep = 0;
    this._next.blendSrc = src;
    this._next.blendDst = dst;
  }

  /**
   * @method setBlendFunctionSeparate
   * @param {BELND_*} src
   * @param {BELND_*} dst
   * @param {BELND_*} srcAlpha
   * @param {BELND_*} dstAlpha
   */
  setBlendFunctionSeparate(src, dst, srcAlpha, dstAlpha) {
    this._next.blendSep = 1;
    this._next.blendSrc = src;
    this._next.blendDst = dst;
    this._next.blendSrcAlpha = srcAlpha;
    this._next.blendDstAlpha = dstAlpha;
  }

  /**
   * @method setBlendEquation
   * @param {BELND_FUNC_*} eq
   */
  setBlendEquation(eq) {
    this._next.blendSep = 0;
    this._next.blendEq = eq;
  }

  /**
   * @method setBlendEquationSeparate
   * @param {BELND_FUNC_*} eq
   * @param {BELND_FUNC_*} alphaEq
   */
  setBlendEquationSeparate(eq, alphaEq) {
    this._next.blendSep = 1;
    this._next.blendEq = eq;
    this._next.blendAlphaEq = alphaEq;
  }

  /**
   * @method setCullMode
   * @param {CULL_*} mode
   */
  setCullMode(mode) {
    this._next.cullMode = mode;
  }

  /**
   * @method setVertexBuffer
   * @param {Number} stream
   * @param {VertexBuffer} buffer
   * @param {Number} start - start vertex
   */
  setVertexBuffer(stream, buffer, start = 0) {
    this._next.vertexBuffers[stream] = buffer;
    this._next.vertexBufferOffsets[stream] = start;
    if (this._next.maxStream < stream) {
      this._next.maxStream = stream;
    }
  }

  /**
   * @method setIndexBuffer
   * @param {IndexBuffer} buffer
   */
  setIndexBuffer(buffer) {
    this._next.indexBuffer = buffer;
  }

  /**
   * @method setProgram
   * @param {Program} program
   */
  setProgram(program) {
    this._next.program = program;
  }

  /**
   * @method setTexture
   * @param {String} name
   * @param {Texture} texture
   * @param {Number} stage
   */
  setTexture(name, texture, stage) {
    if (stage >= this._caps.maxTextureUnits) {
      console.warn(`Can not set texture ${name} at stage ${stage}, max texture exceed: ${this._caps.maxTextureUnits}`);
      return;
    }

    this._next.textureUnits[stage] = texture;
    this.setUniform(name, stage);
  }

  /**
   * @method setUniform
   * @param {String} name
   * @param {*} value
   * @param {Number} num
   */
  setUniform(name, value, num = 1) {
    let uniform = this._uniforms[name];
    if (!uniform) {
      uniform = {
        dirty: true,
        value: value,
        num: num
      };
    } else {
      uniform.dirty = true;
      uniform.value = value;
      uniform.num = num;
    }
    this._uniforms[name] = uniform;
  }

  /**
   * @method setPrimitiveType
   * @param {PT_*} type
   */
  setPrimitiveType(type) {
    this._primitiveType = type;
  }

  /**
   * @method draw
   * @param {Number} base
   * @param {Number} count
   */
  draw(base, count) {
    const gl = this._gl;
    let cur = this._current;
    let next = this._next;

    // commit blend
    _commitBlendStates(gl, cur, next);

    // commit depth
    _commitDepthStates(gl, cur, next);

    // TODO: commit stencil

    // commit cull
    _commitCullMode(gl, cur, next);

    // commit vertex-buffer
    _commitVertexBuffers(gl, cur, next);

    // commit index-buffer
    if (cur.indexBuffer !== next.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, next.indexBuffer ? next.indexBuffer._id : null);
    }

    // commit program
    if (cur.program !== next.program) {
      gl.useProgram(next.program._program);
    }

    // commit texture/sampler
    _commitTextures(gl, cur, next);

    // commit uniforms
    for (let i = 0; i < next.program._uniforms.length; ++i) {
      let uniformInfo = next.program._uniforms[i];
      let uniform = this._uniforms[uniformInfo.name];
      if (!uniform) {
        // console.warn(`Can not find uniform ${uniformInfo.name}`);
        continue;
      }

      if (!uniform.dirty) {
        continue;
      }

      uniform.dirty = false;

      let commitFunc = _type2uniformCommit[uniformInfo.type];
      if (!commitFunc) {
        console.warn(`Can not find commit function for uniform ${uniformInfo.name}`);
        continue;
      }

      commitFunc(gl, uniformInfo.location, uniform.value);
    }

    // drawPrimitives
    if (next.indexBuffer) {
      gl.drawElements(
        this._primitiveType,
        count,
        next.indexBuffer._format,
        base * next.indexBuffer._bytes
      );
    } else {
      gl.drawArrays(
        this._primitiveType,
        base,
        count
      );
    }

    // TODO: autogen mipmap for color buffer
    // if (this._framebuffer && this._framebuffer.colors[0].mipmap) {
    //   gl.bindTexture(this._framebuffer.colors[i]._target, colors[i]._id);
    //   gl.generateMipmap(this._framebuffer.colors[i]._target);
    // }

    // update stats
    this._stats.drawcalls += 1;

    // reset states
    cur.set(next);
    next.reset();
  }
}

let gfx = {
  // classes
  VertexFormat,
  IndexBuffer,
  VertexBuffer,
  Program,
  Texture,
  Texture2D,
  TextureCube,
  RenderBuffer,
  FrameBuffer,
  Device,

  // functions
  attrTypeBytes,
  glFilter,
  glTextureFmt,
};
Object.assign(gfx, enums);

module.exports = gfx;
//# sourceMappingURL=gfx.js.map
