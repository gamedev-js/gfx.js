import { enums } from './enums';
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

export default class State {
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