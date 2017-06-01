
export default class Device {
  /**
   * @param {HTMLElement} canvasEL
   * @param {object} opts
   */
  constructor(canvasEL, opts) {
    let gl;

    try {
      gl = canvasEL.getContext('webgl', opts);
    } catch (err) {
      console.error(err);
      return;
    }

    this._gl = gl;
    this._extensions = {};
    this._vram = { texture: 0, vb: 0, ib: 0 };

    this._initExtensions([
      'OES_vertex_array_object',
      'OES_texture_float',
      'OES_texture_half_float',
      'OES_texture_half_float_linear',
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_atc',
      'EXT_texture_filter_anisotropic'
    ]);
  }

  _initExtensions(extensions) {
    let gl = this._gl;

    for (let i = 0; i < extensions.length; ++i) {
      let name = extensions[i];

      try {
        let ext = gl.getExtension(name);
        if (ext) {
          this._extensions[name] = ext;
        }

      } catch (e) {
        console.error(e);
      }
    }
  }

  ext(name) {
    return this._extensions[name];
  }

  // TODO: set states

  draw(base, count) {
    // TODO
  }
}