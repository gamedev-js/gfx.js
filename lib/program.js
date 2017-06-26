let _genID = 0;

export default class Program {
  /**
   * @param {ef.GraphicsDevice} device - graphic device
   * @param {object} options - shader definition
   * @param {string} options.vert - vertex shader source code
   * @param {string} options.frag - fragment shader shader source code
   * @example
   * let prog = new Program(device, {
   *   vert: `
   *     attribute vec3 a_position;
   *     void main() {
   *       gl_Position = vec4( a_position, 1.0 );
   *     }
   *   `,
   *   frag: `
   *     precision mediump float;
   *     void main() {
   *       gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
   *     }
   *   `
   * });
   */
  constructor(device, options) {
    this._device = device;

    // stores gl information: { location, type }
    this._attributes = [];
    this._uniforms = [];
    this._samplers = [];

    this._linked = false;
    this._vertSource = options.vert;
    this._fragSource = options.frag;
    this._glID = null;
    this._id = _genID++;
  }

  get id() {
    return this._id;
  }

  link() {
    if (this._linked) {
      return;
    }

    let gl = this._device._gl;

    let vertShader = _createShader(gl, gl.VERTEX_SHADER, this._vertSource);
    let fragShader = _createShader(gl, gl.FRAGMENT_SHADER, this._fragSource);

    let program = gl.createProgram();
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    let failed = false;

    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      console.error(`Failed to compile vertex shader: ${gl.getShaderInfoLog(vertShader)}`);
      failed = true;
    }

    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      console.error(`Failed to compile fragment shader: ${gl.getShaderInfoLog(fragShader)}`);
      failed = true;
    }

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(`Failed to link shader program: ${gl.getProgramInfoLog(program)}`);
      failed = true;
    }

    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);

    if (failed) {
      return;
    }

    this._glID = program;

    // parse attribute
    let numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (let i = 0; i < numAttributes; ++i) {
      let info = gl.getActiveAttrib(program, i);
      let location = gl.getAttribLocation(program, info.name);

      this._attributes.push({
        name: info.name,
        location: location,
        type: info.type,
      });
    }

    // parse uniform
    let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < numUniforms; ++i) {
      let info = gl.getActiveUniform(program, i);
      let location = gl.getUniformLocation(program, info.name);

      // NOTE:
      // if we define an array uniform: float foobar[10]
      // the uniform.name will be 'foobar[0]', and the size will be 10

      this._uniforms.push({
        name: info.name,
        location: location,
        type: info.type,
        size: info.size, // used when uniform is an array
      });
    }

    //
    this._linked = true;
  }

  destroy() {
    let gl = this._device._gl;
    gl.deleteProgram(this._glID);

    this._linked = false;
    this._glID = null;
    this._attributes = [];
    this._uniforms = [];
    this._samplers = [];
  }
}

// ====================
// internal
// ====================

function _createShader(gl, type, src) {
  let shader = gl.createShader(type);
  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  return shader;
}