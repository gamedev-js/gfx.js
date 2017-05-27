import Texture from './texture';

export default class Texture2D extends Texture {
  constructor(device, options) {
    super(device);

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
  }

  update() {
  }

  setStates(info) {
    let gl = this._device._gl;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._id);

    if (info.minFilter !== undefined && info.minFilter !== this._minFilter) {
      this._minFilter = info.minFilter;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, info.minFilter);
    }

    if (info.magFilter !== undefined && info.magFilter !== this._magFilter) {
      this._magFilter = info.magFilter;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, info.magFilter);
    }

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, info.wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, info.wrapT);

    if (this._device.hasExt('EXT_texture_filter_anisotropic')) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_ANISOTROPY_EXT, info.anisotropic);
    }

    if (info.genMipmaps) {
      gl.hint(gl.GENERATE_MIPMAP_HINT, info.mipmapHint);
      gl.generateMipmap(gl.TEXTURE_2D);
    }

    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}