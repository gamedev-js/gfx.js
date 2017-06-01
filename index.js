
import {
  enums,
  attrTypeBytes,
  glFilter,
  glTextureFmt,
} from './lib/enums';
import IndexBuffer from './lib/index-buffer';
import VertexBuffer from './lib/vertex-buffer';
import Shader from './lib/shader';
import Texture from './lib/texture';
import Texture2D from './lib/texture-2d';
import Device from './lib/device';

let gfx = {
  // classes
  IndexBuffer,
  VertexBuffer,
  Shader,
  Texture,
  Texture2D,
  Device,

  // functions
  attrTypeBytes,
  glFilter,
  glTextureFmt,
};
Object.assign(gfx, enums);

export default gfx;