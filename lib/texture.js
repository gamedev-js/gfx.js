import { enums } from './enums';

export default class Texture {
  /**
   * @constructor
   */
  constructor(device) {
    this._device = device;

    this._width = 4;
    this._height = 4;
    this._hasMipmap = false;
    this._compressed = false;

    this._anisotropy = 1;
    this._minFilter = enums.FILTER_LINEAR;
    this._magFilter = enums.FILTER_LINEAR;
    this._mipFilter = enums.FILTER_LINEAR;
    this._wrapS = enums.WRAP_REPEAT;
    this._wrapT = enums.WRAP_REPEAT;
    this._format = enums.TEXTURE_FMT_RGBA8;
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._id === -1) {
      console.error('The texture already destroyed');
      return;
    }

    let gl = this.device.gl;
    gl.deleteTexture(this._id);

    this.device._vram.tex -= this.bytes;
    this._id = -1;
  }
}