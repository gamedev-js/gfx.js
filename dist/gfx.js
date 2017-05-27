
/*
 * gfx.js v1.0.0
 * (c) 2017 @Johnny Wu
 * Released under the MIT License.
 */

'use strict';

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
  FILTER_NEAREST: 9728,                 // gl.FILTER_NEAREST
  FILTER_LINEAR: 9729,                  // gl.FILTER_LINEAR
  FILTER_NEAREST_MIPMAP_NEAREST: 9984,  // gl.FILTER_NEAREST_MIPMAP_NEAREST
  FILTER_LINEAR_MIPMAP_NEAREST: 9985,   // gl.FILTER_LINEAR_MIPMAP_NEAREST
  FILTER_NEAREST_MIPMAP_LINEAR: 9986,   // gl.FILTER_NEAREST_MIPMAP_LINEAR
  FILTER_LINEAR_MIPMAP_LINEAR: 9987,    // gl.FILTER_LINEAR_MIPMAP_LINEAR

  // texture wrap mode
  WRAP_REPEAT: 10497, // gl.REPEAT
  WRAP_CLAMP: 33071,  // gl.CLAMP_TO_EDGE
  WRAP_MIRROR: 33648, // gl.MIRRORED_REPEAT

  // texture format
  // compress formats
  TEXTURE_FMT_DXT1: 0,
  TEXTURE_FMT_DXT3: 1,
  TEXTURE_FMT_DXT5: 2,
  TEXTURE_FMT_ETC1: 3,
  TEXTURE_FMT_PVRTC_2BPP_RGB_1: 4,
  TEXTURE_FMT_PVRTC_2BPP_RGBA_1: 5,
  TEXTURE_FMT_PVRTC_4BPP_RGB_1: 6,
  TEXTURE_FMT_PVRTC_4BPP_RGBA_1: 7,

  // normal formats
  TEXTURE_FMT_A8: 8,
  TEXTURE_FMT_L8: 9,
  TEXTURE_FMT_L8_A8: 10,
  TEXTURE_FMT_R5_G6_B5: 11,
  TEXTURE_FMT_R5_G5_B5_A1: 12,
  TEXTURE_FMT_R4_G4_B4_A4: 13,
  TEXTURE_FMT_RGB8: 14,
  TEXTURE_FMT_RGBA8: 15,
  TEXTURE_FMT_RGB16F: 16,
  TEXTURE_FMT_RGBA16F: 17,
  TEXTURE_FMT_RGB32F: 18,
  TEXTURE_FMT_RGBA32F: 19,
  TEXTURE_FMT_R32F: 20,
  TEXTURE_FMT_111110F: 21,
  TEXTURE_FMT_SRGB: 22,
  TEXTURE_FMT_SRGBA: 23,

  // depth formats
  TEXTURE_FMT_DEPTH: 24,
  TEXTURE_FMT_DEPTHSTENCIL: 25,
};

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
    device._vram.ib += bytes;
  }

  /**
   * @method destroy
   */
  destroy() {
    let gl = this.device.gl;
    gl.deleteBuffer(this._id);
    this.device._vram.ib -= this.bytes;

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

    if (data && data.byteLength + offset >= this._bytes) {
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

    // calculate bytes
    this._bytes = this._format._bytes * numVertices;

    // update
    this._id = device._gl.createBuffer();
    this._data = null;
    this.update(0, data);

    // stats
    device._vram.vb += this._bytes;
  }

  /**
   * @method destroy
   */
  destroy() {
    let gl = this.device.gl;
    gl.deleteBuffer(this._id);
    this.device._vram.vb -= this.bytes;

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

    if (data && data.byteLength + offset >= this._bytes) {
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
}

class Shader {
  constructor() {
  }
}

class Texture {
  constructor(device) {
    this._device = device;

    this._width = 4;
    this._height = 4;
    this._mipmaps = true;

    this._anisotropy = 1;
    this._minFilter = enums.FILTER_LINEAR_MIPMAP_LINEAR;
    this._magFilter = enums.FILTER_LINEAR;
    this._wrapS = enums.WRAP_REPEAT;
    this._wrapT = enums.WRAP_REPEAT;
    this._format = enums.TEXTURE_FMT_RGBA8;
  }

  destroy() {
    let gl = this.device.gl;
    gl.deleteTexture(this._id);

    this.device._vram.tex -= this.bytes;
    this._id = -1;
  }

  update () {
  }
}

class Texture2D extends Texture {
  constructor(device, options) {
    super(device);

    if (options) {
      if (options.width !== undefined) {
        this._width = options.width;
      }
      if (options.height !== undefined) {
        this._height = options.height;
      }
      if (options.mipmpas !== undefined) {
        this._mipmaps = options.mipmpas;
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
      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }
      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }

      if (options.format !== undefined) {
        this._format = options.format;
      }
    }
  }

  update() {
  }

  setStates(info) {
    let gl = this._device._gl;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._id);

    if (info.minFilter !== undefined && info.minFilter !== this._minFilter) {
      this._minFilter = info.minFilter;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, info.minFilter);
    }

    if (info.magFilter !== undefined && info.magFilter !== this._magFilter) {
      this._magFilter = info.magFilter;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, info.magFilter);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, info.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, info.wrapT);

    if (this._device.hasExt('EXT_texture_filter_anisotropic')) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
    }

    if (info.genMipmaps) {
      gl.hint(gl.GENERATE_MIPMAP_HINT, info.mipmapHint);
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
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

    this._gl = gl;
    this._extensions = {};
    this._vram = { texture: 0, vb: 0, ib: 0 };

    this._initExtensions([
      'OES_vertex_array_object',
      'OES_texture_float',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_atc',
      'EXT_texture_filter_anisotropic'
    ]);
  }

  _initExtensions(extensions) {
    let gl = this._gl;

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

  hasExt(name) {
    return this._extensions[name] !== undefined;
  }

  // TODO: set states

  draw(base, count) {
    // TODO
  }
}

let gfx = {
  // classes
  IndexBuffer,
  VertexBuffer,
  Shader,
  Texture,
  Texture2D,
  Device,

  // functions
  attrTypeBytes,
};
Object.assign(gfx, enums);

module.exports = gfx;
//# sourceMappingURL=gfx.js.map
