import { enums } from './enums';

const _default = {
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
  depthFunc: enums.DEPTH_FUNC_LESS,

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

export default class State {
  constructor() {
    // bindings
    this.vertexBuffers = [];
    this.vertexBufferOffsets = [];
    this.textureUnits = [];

    this.set(_default);
  }

  reset () {
    this.set(_default);
  }

  set (cpy) {
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

    // cull-mode
    this.cullMode = cpy.cullMode;

    // primitive-type
    this.primitiveType = cpy.primitiveType;

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