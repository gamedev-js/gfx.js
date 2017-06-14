import Texture from './texture';
import { enums, glFilter, glTextureFmt } from './enums';

export default class TextureCube extends Texture {
  /**
   * @constructor
   * @param {Device} device
   * @param {Object} options
   * @param {Array} options.images
   * @param {Boolean} options.mipmap
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {TEXTURE_FMT_*} options.format
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {FILTER_*} options.mipFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   * @param {WRAP_*} options.wrapR
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
   */
  constructor(device, options) {
    super(device);
    this._target = this._device._gl.TEXTURE_CUBE_MAP;

    this.update(options);
  }

  /**
   * @method update
   * @param {Object} options
   * @param {Array} options.images
   * @param {Boolean} options.mipmap
   * @param {Number} options.width
   * @param {Number} options.height
   * @param {TEXTURE_FMT_*} options.format
   * @param {Number} options.anisotropy
   * @param {FILTER_*} options.minFilter
   * @param {FILTER_*} options.magFilter
   * @param {FILTER_*} options.mipFilter
   * @param {WRAP_*} options.wrapS
   * @param {WRAP_*} options.wrapT
   * @param {WRAP_*} options.wrapR
   * @param {Boolean} options.flipY
   * @param {Boolean} options.premultiplyAlpha
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
      // wrapR available in webgl2
      // if (options.wrapR !== undefined) {
      //   this._wrapR = options.wrapR;
      // }
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
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._id);
      if (options.images !== undefined) {
        this._setMipmap(options.images, options.flipY, options.premultiplyAlpha);
      }

      this._setTexInfo();

      if (genMipmap) {
        gl.hint(gl.GENERATE_MIPMAP_HINT, gl.NICEST);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
      }
    this._device._restoreTexture(0);
  }

  // levelImages = [imagePosX, imageNegX, imagePosY, imageNegY, imagePosZ, imageNegz]
  // images = [levelImages0, levelImages1, ...]
  _setMipmap(images, flipY, premultiplyAlpha) {
    let gl = this._device._gl;
    let glFmt = glTextureFmt(this._format);

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

    for (let i = 0; i < images.length; ++i) {
      let levelImages = images[i];
      for (let face = 0; face < 6; ++face) {
        if (
          levelImages[face] instanceof HTMLCanvasElement ||
          levelImages[face] instanceof HTMLImageElement ||
          levelImages[face] instanceof HTMLVideoElement
        ) {
          gl.texImage2D(
            gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
            i,
            glFmt.internalFormat,
            glFmt.format,
            glFmt.pixelType,
            levelImages[face]
          );
        } else {
          if (this._compressed) {
            gl.compressedTexImage2D(
              gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
              i,
              glFmt.internalFormat,
              this._width,
              this._height,
              0,
              levelImages[face]
            );
          } else {
            gl.texImage2D(
              gl.TEXTURE_CUBE_MAP_POSITIVE_X + face,
              i,
              glFmt.internalFormat,
              this._width,
              this._height,
              0,
              glFmt.format,
              glFmt.pixelType,
              levelImages[face]
            );
          }
        }
      }
    }
  }

  _setTexInfo() {
    let gl = this._device._gl;

    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, glFilter(gl, this._minFilter, this._hasMipmap ? this._mipFilter : -1));
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, glFilter(gl, this._magFilter, -1));
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, this._wrapS);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, this._wrapT);
    // wrapR available in webgl2
    // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, this._wrapR);

    let ext = this._device.ext('EXT_texture_filter_anisotropic');
    if (ext) {
      gl.texParameteri(gl.TEXTURE_CUBE_MAP, ext.TEXTURE_MAX_ANISOTROPY_EXT, this._anisotropy);
    }
  }
}
