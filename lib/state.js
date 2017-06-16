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

  // stencil
  stencilTest: false,
  stencilSep: false,
  stencilFuncFront: enums.FUNC_ALWAYS,
  stencilRefFront: 0,
  stencilMaskFront: 0xFF,
  stencilFailOpFront: enums.OP_KEEP,
  stencilZFailOpFront: enums.OP_KEEP,
  stencilZPassOpFront: enums.OP_KEEP,
  stencilWriteMaskFront: 0xFF,
  stencilFuncBack: enums.FUNC_ALWAYS,
  stencilRefBack: 0,
  stencilMaskBack: 0xFF,
  stencilFailOpBack: enums.OP_KEEP,
  stencilZFailOpBack: enums.OP_KEEP,
  stencilZPassOpBack: enums.OP_KEEP,
  stencilWriteMaskBack: 0xFF,

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

    // stencil
    this.stencilTest = cpy.stencilTest;
    this.stencilSep = cpy.stencilSep;
    if (cpy.stencilFuncFront != INVALID) {
      this.stencilFuncFront = cpy.stencilFuncFront;
    }
    this.stencilRefFront = cpy.stencilRefFront;
    this.stencilMaskFront = cpy.stencilMaskFront;
    if (cpy.stencilFailOpFront != INVALID) {
      this.stencilFailOpFront = cpy.stencilFailOpFront;
    }
    if (cpy.stencilZFailOpFront != INVALID) {
      this.stencilZFailOpFront = cpy.stencilZFailOpFront;
    }
    if (cpy.stencilZPassOpFront != INVALID) {
      this.stencilZPassOpFront = cpy.stencilZPassOpFront;
    }
    this.stencilWriteMaskFront = cpy.stencilWriteMaskFront;
    if (cpy.stencilFuncBack != INVALID) {
      this.stencilFuncBack = cpy.stencilFuncBack;
    }
    this.stencilRefBack = cpy.stencilRefBack;
    this.stencilMaskBack = cpy.stencilMaskBack;
    if (cpy.stencilFailOpBack != INVALID) {
      this.stencilFailOpBack = cpy.stencilFailOpBack;
    }
    if (cpy.stencilZFailOpBack != INVALID) {
      this.stencilZFailOpBack = cpy.stencilZFailOpBack;
    }
    if (cpy.stencilZPassOpBack != INVALID) {
      this.stencilZPassOpBack = cpy.stencilZPassOpBack;
    }
    this.stencilWriteMaskBack = cpy.stencilWriteMaskBack;


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