import { enums } from './enums';

export default class Texture {
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