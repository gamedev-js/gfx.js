import { enums } from './enums';

export default class State {
  constructor() {
    // states
    this.blend = false;
    this.blendSep = false;
    this.blendColor = 0xffffffff;
    this.blendEq = enums.BLEND_FUNC_ADD;
    this.blendAlphaEq = enums.BLEND_FUNC_ADD;
    this.blendSrc = enums.BLEND_ONE;
    this.blendDst = enums.BLEND_ZERO;
    this.blendSrcAlpha = enums.BLEND_ONE;
    this.blendDstAlpha = enums.BLEND_ZERO;

    this.cullMode = enums.CULL_BACK;

    // bindings
    this.vertexBuffers = [];
    this.vertexBufferOffsets = [];
    this.indexBuffer = null;
    this.textureUnits = [];
    this.program = null;
  }

  copy (cpy) {
    // states
    this.blend = cpy.blend;
    this.blendSep = cpy.blendSep;
    this.blendColor = cpy.blendColor;
    this.blendEq = cpy.blendEq;
    this.blendAlphaEq = cpy.blendAlphaEq;
    this.blendSrc = cpy.blendSrc;
    this.blendDst = cpy.blendDst;
    this.blendSrcAlpha = cpy.blendSrcAlpha;
    this.blendDstAlpha = cpy.blendDstAlpha;

    this.cullMode = cpy.cullMode;

    // bindings
    this.maxStream = 0;
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
    // states
    this.blend = false;
    this.blendSep = false;
    this.blendColor = 0xffffffff;
    this.blendEq = enums.BLEND_FUNC_ADD;
    this.blendAlphaEq = enums.BLEND_FUNC_ADD;
    this.blendSrc = enums.BLEND_ONE;
    this.blendDst = enums.BLEND_ZERO;
    this.blendSrcAlpha = enums.BLEND_ONE;
    this.blendDstAlpha = enums.BLEND_ZERO;

    this.cullMode = enums.CULL_BACK;
  }
}