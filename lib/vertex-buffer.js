export default class VertexBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {VertexFormat} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer} data
   * @param {Number} numVertices
   * @param {Boolean} persist
   */
  constructor(device, format, usage, data, numVertices, persist) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._persist = persist;

    // calculate bytes
    this._bytes = this._format._bytes * numVertices;

    // update
    this._id = device._gl.createBuffer();
    this._data = null;
    this.update(0, data);

    // stats
    device._vram.vb += this._bytes;
  }

  /**
   * @method destroy
   */
  destroy() {
    if (this._id === -1) {
      console.error('The buffer already destroyed');
      return;
    }

    let gl = this.device.gl;
    gl.deleteBuffer(this._id);
    this.device._vram.vb -= this.bytes;

    this._id = -1;
  }

  /**
   * @method update
   * @param {Number} offset
   * @param {ArrayBuffer} data
   */
  update(offset, data) {
    if (this._id === -1) {
      console.error('The buffer is destroyed');
      return;
    }

    if (data && data.byteLength + offset >= this._bytes) {
      console.error('Failed to update data, bytes exceed.');
      return;
    }

    let gl = this._device._gl;
    let glUsage = this._usage;

    gl.bindBuffer(gl.ARRAY_BUFFER, this._id);
    if (!data) {
      gl.bufferData(gl.ARRAY_BUFFER, this._bytes, glUsage);
    } else {
      if (offset) {
        gl.bufferSubData(gl.ARRAY_BUFFER, data, glUsage);
      } else {
        gl.bufferData(gl.ARRAY_BUFFER, data, glUsage);
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // store the data
    if (this._persist) {
      if (this._data) {
        this._data.set(data, offset);
      } else {
        this._data = data;
      }
    }
  }
}