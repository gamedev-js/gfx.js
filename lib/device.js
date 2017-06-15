import State from './state';
import { enums } from './enums';

import Texture2D from './texture-2d';
import TextureCube from './texture-cube';

const GL_INT = 5124;
const GL_FLOAT = 5126;
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

  [GL_FLOAT]: function (gl, id, value) {
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
        if (!el) {
          console.warn(`Can not find vertex attribute: ${attr.name}`);
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