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

  stencilTest: false,
  stencilSep: false,
  stencilFuncFront: INVALID,
  stencilRefFront: 0,
  stencilMaskFront: 0,
  stencilFailOpFront: INVALID,
  stencilZFailOpFront: INVALID,
  stencilZPassOpFront: INVALID,
  stencilWriteMaskFront: 0xFF,
  stencilFuncBack: INVALID,
  stencilRefBack: 0,
  stencilMaskBack: 0,
  stencilFailOpBack: INVALID,
  stencilZFailOpBack: INVALID,
  stencilZPassOpBack: INVALID,
  stencilWriteMaskBack: 0xFF,

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

    //stencil
    this.stencilTest = cpy.stencilTest;
    this.stencilSep = cpy.stencilSep;
    if(cpy.stencilFuncFront != INVALID) {
      this.stencilFuncFront = cpy.stencilFuncFront;
    }
    this.stencilRefFront = cpy.stencilRefFront;
    this.stencilMaskFront = cpy.stencilMaskFront;
    if(cpy.stencilFailOpFront != INVALID) {
      this.stencilFailOpFront = cpy.stencilFailOpFront;
    }
    if(cpy.stencilZFailOpFront != INVALID) {
      this.stencilZFailOpFront = cpy.stencilZFailOpFront;
    }
    if(cpy.stencilZPassOpFront != INVALID) {
      this.stencilZPassOpFront = cpy.stencilZPassOpFront;
    }
    this.stencilWriteMaskFront = cpy.stencilWriteMaskFront;
    if(cpy.stencilFuncBack != INVALID) {
      this.stencilFuncBack = cpy.stencilFuncBack;
    }
    this.stencilRefBack = cpy.stencilRefBack;
    this.stencilMaskBack = cpy.stencilMaskBack;
    if(cpy.stencilFailOpBack != INVALID) {
      this.stencilFailOpBack = cpy.stencilFailOpBack;
    }
    if(cpy.stencilZFailOpBack != INVALID) {
      this.stencilZFailOpBack = cpy.stencilZFailOpBack;
    }
    if(cpy.stencilZPassOpBack != INVALID) {
      this.stencilZPassOpBack = cpy.stencilZPassOpBack;
    }
    this.stencilWriteMaskBack = cpy.stencilWriteMaskBack;


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