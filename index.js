
import {
  enums,
  attrTypeBytes,
  glFilter,
  glTextureFmt,
} from './lib/enums';
import IndexBuffer from './lib/index-buffer';
import VertexBuffer from './lib/vertex-buffer';
import Program from './lib/program';
import Texture from './lib/texture';
import Texture2D from './lib/texture-2d';
import TextureCube from './lib/texture-cube';
import Device from './lib/device';

let gfx = {
  // classes
  IndexBuffer,
  VertexBuffer,
  Program,
  Texture,
  Texture2D,
  TextureCube,
  Device,

  // functions
  attrTypeBytes,
  glFilter,
  glTextureFmt,
};
Object.assign(gfx, enums);

export default gfx;