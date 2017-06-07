import { enums } from './enums';

export default class IndexBuffer {
  /**
   * @constructor
   * @param {Device} device
   * @param {INDEX_FMT_*} format
   * @param {USAGE_*} usage
   * @param {ArrayBuffer} data
   * @param {Number} numIndices
   * @param {Boolean} persist
   */
  constructor(device, format, usage, data, numIndices, persist) {
    this._device = device;
    this._format = format;
    this._usage = usage;
    this._persist = persist;
    this._numIndices = numIndices;

    // calculate bytes
    let bytes = 0;
    if (format === enums.INDEX_FMT_UINT8) {
      bytes = numIndices;
    } else if (format === enums.INDEX_FMT_UINT16) {
      bytes = 2 * numIndices;
    } else if (format === enums.INDEX_FMT_UINT32) {
      bytes = 4 * numIndices;
    }
    this._bytes = bytes;

    // update
    this._id = device._gl.createBuffer();
    this._data = null;
    this.update(0, data);

    // stats
    device._stats.ib += bytes;
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
    this.device._stats.ib -= this.bytes;

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

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._id);
    if (!data) {
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._bytes, glUsage);
    } else {
      if (offset) {
        gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER, data, glUsage);
      } else {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, glUsage);
      }
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

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