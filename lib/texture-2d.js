import Texture from './texture';

export default class Texture2D extends Texture {
  /**
   * @constructor
   * @param {Object} options
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Boolean} options.mipmaps
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   */
  constructor(device, options) {
    super(device);
    this.update(options);

    // TODO:
    // bind();
    //   setMipmap();
    //   setTexInfo();
    // bindEnd();
  }

  update(options) {
    let gl = this._device._gl;

    if (options) {
      if (options.width !== undefined) {
        this._width = options.width;
      }
      if (options.height !== undefined) {
        this._height = options.height;
      }
      if (options.mipmpas !== undefined) {
        this._mipmaps = options.mipmpas;
      }
      if (options.anisotropy !== undefined) {
        this._anisotropy = options.anisotropy;
      }
      if (options.minFilter !== undefined) {
        this._minFilter = options.minFilter;
      }
      if (options.magFilter !== undefined) {
        this._magFilter = options.magFilter;
      }
      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }
      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }
      if (options.format !== undefined) {
        this._format = options.format;
      }
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._id);
      // this._setMipmap();
      this._setTexInfo();
    gl.bindTexture(gl.TEXTURE_2D, null);
  }

  _setTexInfo() {
    let gl = this._device._gl;

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this._minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this._magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);

    if (this._device.hasExt('EXT_texture_filter_anisotropic')) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropic);
    }

    if (this._mipmaps) {
      gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
      gl.generateMipmap(gl.TEXTURE_2D);
    }
  }
}