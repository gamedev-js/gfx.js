import Texture from './texture';
import { enums, glFilter, glTextureFmt } from './enums';

export default class Texture2D extends Texture {
  /**
   * @constructor
   * @param {Object} options
   * @param {Array} options.images
   * @param {Boolean} options.mipmap
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {FILTER_*} options.mipFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  constructor(device, options) {
    super(device);
    this._target = this._device._gl.TEXTURE_2D;

    this.update(options);
  }

  /**
   * @method update
   * @param {Object} options
   * @param {Array} options.images
   * @param {Boolean} options.mipmap
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {FILTER_*} options.mipFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   */
  update(options) {
    let gl = this._device._gl;
    let genMipmap = this._hasMipmap;

    if (options) {
      if (options.width !== undefined) {
        this._width = options.width;
      }
      if (options.height !== undefined) {
        this._height = options.height;
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
      if (options.mipFilter !== undefined) {
        this._mipFilter = options.mipFilter;
      }
      if (options.wrapS !== undefined) {
        this._wrapS = options.wrapS;
      }
      if (options.wrapT !== undefined) {
        this._wrapT = options.wrapT;
      }
      if (options.format !== undefined) {
        this._format = options.format;
        this._compressed = (
          this._format >= enums.TEXTURE_FMT_RGB_DXT1 &&
          this._format <= enums.TEXTURE_FMT_RGBA_PVRTC_4BPPV1
        );
      }

      // check if generate mipmap
      if (options.mipmap !== undefined) {
        this._hasMipmap = options.mipmap;
        genMipmap = options.mipmap;
      }

      if (options.images !== undefined) {
        if (options.images.length > 1) {
          genMipmap = false;
        }
      }
    }

    this._id = gl.createTexture();

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this._id);
      if (options.images !== undefined) {
        this._setMipmap(options.images, options.flipY, options.premultiplyAlpha);
      }

      this._setTexInfo();

      if (genMipmap) {
        gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
        gl.generateMipmap(gl.TEXTURE_2D);
      }
    this._device._restoreTexture(0);
  }

  _setMipmap(images, flipY, premultiplyAlpha) {
    let gl = this._device._gl;
    let glFmt = glTextureFmt(this._format);

    for (let i = 0; i < images.length; ++i) {
      let img = images[i];

      if (
        img instanceof HTMLCanvasElement ||
        img instanceof HTMLImageElement ||
        img instanceof HTMLVideoElement
      ) {
        if (flipY === undefined) {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        } else {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        }

        if (premultiplyAlpha === undefined) {
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        } else {
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
        }

        gl.texImage2D(
          gl.TEXTURE_2D,
          i,
          glFmt.internalFormat,
          glFmt.format,
          glFmt.pixelType,
          img
        );
      } else {
        if (flipY === undefined) {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        } else {
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        }

        if (premultiplyAlpha === undefined) {
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
        } else {
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premultiplyAlpha);
        }

        if (this._compressed) {
          gl.compressedTexImage2D(
            gl.TEXTURE_2D,
            i,
            glFmt.internalFormat,
            this._width,
            this._height,
            0,
            img
          );
        } else {
          gl.texImage2D(
            gl.TEXTURE_2D,
            i,
            glFmt.internalFormat,
            this._width,
            this._height,
            0,
            glFmt.format,
            glFmt.pixelType,
            img
          );
        }
      }
    }
  }

  _setTexInfo() {
    let gl = this._device._gl;

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, glFilter(gl, this._minFilter, this._hasMipmap ? this._mipFilter : -1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, glFilter(gl, this._magFilter, -1));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this._wrapT);

    let ext = this._device.ext('EXT_texture_filter_anisotropic');
    if (ext) {
      gl.texParameteri(gl.TEXTURE_2D, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy);
    }
  }
}