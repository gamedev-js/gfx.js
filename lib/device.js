import State from './state';
import { enums } from './enums';

/**
 * _commitBlendStates
 */
function _commitBlendStates(gl, cur, next) {
  if (cur.blend === next.blend) {
    return;
  }

  if (!next.blend) {
    gl.disable(gl.BLEND);
    return;
  }

  // enable-blend
  gl.enable(gl.BLEND);

  // blend-color
  if (cur.blendColor !== next.blendColor) {
    gl.blendColor(
      (next.blendColor >> 24) / 255,
      (next.blendColor >> 16 & 0xff) / 255,
      (next.blendColor >> 8 & 0xff) / 255,
      (next.blendColor & 0xff) / 255
    );
  }

  // seprate diff, reset all
  if (cur.blendSep !== next.blendSep) {
    if (next.blendSep) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
      gl.blendEquationSeprate(next.blendEq, next.blendAlphaEq);
    } else {
      gl.blendFunc(next.blendSrc, next.blendDst);
      gl.blendEquation(next.blendEq);
    }

    return;
  }

  if (next.blendSep) {
    // blend-func-seprate
    if (
      cur.blendSrc !== next.blendSrc ||
      cur.blendDst !== next.blendDst ||
      cur.blendSrcAlpha !== next.blendSrcAlpha ||
      cur.blendDstAlpha !== next.blendDstAlpha
    ) {
      gl.blendFuncSeparate(next.blendSrc, next.blendDst, next.blendSrcAlpha, next.blendDstAlpha);
    }

    // blend-equation-seprate
    if (
      cur.blendEq !== next.blendEq ||
      cur.blendAlphaEq !== next.blendAlphaEq
    ) {
      gl.blendEquationSeprate(next.blendEq, next.blendAlphaEq);
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
 * _commitVertexBuffer
 */
function _commitVertexBuffer(gl, cur, next) {
  let attrsDirty = false;

  if (cur.maxStream !== next.maxStream) {
    attrsDirty = true;
  }
  if (cur.program !== next.program) {
    attrsDirty = true;
  }
  for (let i = 0; i < next.maxStream; ++i) {
    if (
      cur.vertexBuffers[i] !== next.vertexBuffers[i] ||
      cur.vertexBufferOffsets[i] !== next.vertexBufferOffsets[i]
    ) {
      attrsDirty = true;
      break;
    }
  }

  if (attrsDirty) {
    for (let i = 0; i < next.maxStream; ++i) {
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

export default class Device {
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
    this._vram = { texture: 0, vb: 0, ib: 0 };

    // runtime states
    this._current = new State();
    this._next = new State();
    this._uniforms = {}; // name: { value, num, dirty }

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

    this._initCaps();
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

  _initCaps() {
    let gl = this._gl;

    this._caps.maxVertexTextures = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    this._caps.maxFragUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    this._caps.maxTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
  }

  /**
   * @method ext
   * @param {string} name
   */
  ext(name) {
    return this._extensions[name];
  }

  /**
   * @method enableBlend
   */
  enableBlend() {
    this._next.blend = true;
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
    this._next.blendSrc = src;
    this._next.blendDst = dst;
  }

  /**
   * @method setBlendFunctionSeprate
   * @param {BELND_*} src
   * @param {BELND_*} dst
   * @param {BELND_*} srcAlpha
   * @param {BELND_*} dstAlpha
   */
  setBlendFunctionSeprate(src, dst, srcAlpha, dstAlpha) {
    this._next.blendSep = true;
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
    this._next.blendEq = eq;
  }

  /**
   * @method setBlendEquationSeprate
   * @param {BELND_FUNC_*} eq
   * @param {BELND_FUNC_*} alphaEq
   */
  setBlendEquationSeprate(eq, alphaEq) {
    this._next.blendSep = true;
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
   * @method draw
   * @param {Number} base
   * @param {Number} count
   */
  draw(base, count) {
    let cur = this._current;
    let next = this._next;
    let gl = this._gl;

    // commit blend
    _commitBlendStates(gl, cur, next);

    // commit cull
    _commitCullMode(gl, cur, next);

    // commit vertex-buffer
    _commitVertexBuffer(gl, cur, next);

    // commit index-buffer
    if (cur.indexBuffer !== next.indexBuffer) {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, next.indexBuffer ? next.indexBuffer._id : null);
    }

    // commit program
    if (cur.program !== next.program) {
      gl.useProgram(next.program);
    }

    // update states
    cur.copy(next);
    next.reset();
  }
}