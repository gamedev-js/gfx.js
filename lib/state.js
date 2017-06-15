import { enums } from './enums';
const INVALID = -1;

const _resets = {
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

export default class State {
  constructor() {
    // blending
    this.blend = false;
    this.blendSep = 0;
    this.blendColor = 0xffffffff;
    this.blendEq = enums.BLEND_FUNC_ADD;
    this.blendAlphaEq = enums.BLEND_FUNC_ADD;
    this.blendSrc = enums.BLEND_ONE;
    this.blendDst = enums.BLEND_ZERO;
    this.blendSrcAlpha = enums.BLEND_ONE;
    this.blendDstAlpha = enums.BLEND_ZERO;

    // depth
    this.depthTest = false;
    this.depthWrite = false;
    this.depthFunc = enums.DEPTH_FUNC_LESS;

    // cull-mode
    this.cullMode = enums.CULL_BACK;

    // bindings
    this.maxStream = -1;
    this.vertexBuffers = [];
    this.vertexBufferOffsets = [];
    this.indexBuffer = null;
    this.textureUnits = [];
    this.program = null;
  }

  reset () {
    this.set(_resets);
  }

  set (cpy) {
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
}