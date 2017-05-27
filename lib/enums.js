export let enums = {
  // buffer usage
  USAGE_STATIC: 35044,  // gl.STATIC_DRAW
  USAGE_DYNAMIC: 35048, // gl.DYNAMIC_DRAW
  USAGE_STREAM: 35040,  // gl.STREAM_DRAW

  // index buffer format
  INDEX_FMT_UINT8: 5121,  // gl.UNSIGNED_BYTE
  INDEX_FMT_UINT16: 5123, // gl.UNSIGNED_SHORT
  INDEX_FMT_UINT32: 5125, // gl.UNSIGNED_INT (OES_element_index_uint)

  // vertex attribute semantic
  ATTR_POSITION: 'a_position',
  ATTR_NORMAL: 'a_normal',
  ATTR_TANGENT: 'a_tangent',
  ATTR_BITANGENT: 'a_bitangent',
  ATTR_WEIGHT: 'a_weight',
  ATTR_INDICES: 'a_indices',
  ATTR_COLOR: 'a_color',
  ATTR_COLOR0: 'a_color0',
  ATTR_COLOR1: 'a_color1',
  ATTR_UV: 'a_uv',
  ATTR_UV0: 'a_uv0',
  ATTR_UV1: 'a_uv1',
  ATTR_UV2: 'a_uv2',
  ATTR_UV3: 'a_uv3',
  ATTR_UV4: 'a_uv4',
  ATTR_UV5: 'a_uv5',
  ATTR_UV6: 'a_uv6',
  ATTR_UV7: 'a_uv7',

  // vertex attribute type
  ATTR_TYPE_INT8: 5120,    // gl.BYTE
  ATTR_TYPE_UINT8: 5121,   // gl.UNSIGNED_BYTE
  ATTR_TYPE_INT16: 5122,   // gl.SHORT
  ATTR_TYPE_UINT16: 5123,  // gl.UNSIGNED_SHORT
  ATTR_TYPE_INT32: 5124,   // gl.INT
  ATTR_TYPE_UINT32: 5125,  // gl.UNSIGNED_INT
  ATTR_TYPE_FLOAT32: 5126, // gl.FLOAT

  // texture filter
  FILTER_NEAREST: 9728,                 // gl.FILTER_NEAREST
  FILTER_LINEAR: 9729,                  // gl.FILTER_LINEAR
  FILTER_NEAREST_MIPMAP_NEAREST: 9984,  // gl.FILTER_NEAREST_MIPMAP_NEAREST
  FILTER_LINEAR_MIPMAP_NEAREST: 9985,   // gl.FILTER_LINEAR_MIPMAP_NEAREST
  FILTER_NEAREST_MIPMAP_LINEAR: 9986,   // gl.FILTER_NEAREST_MIPMAP_LINEAR
  FILTER_LINEAR_MIPMAP_LINEAR: 9987,    // gl.FILTER_LINEAR_MIPMAP_LINEAR

  // texture wrap mode
  WRAP_REPEAT: 10497, // gl.REPEAT
  WRAP_CLAMP: 33071,  // gl.CLAMP_TO_EDGE
  WRAP_MIRROR: 33648, // gl.MIRRORED_REPEAT

  // texture format
  // compress formats
  TEXTURE_FMT_DXT1: 0,
  TEXTURE_FMT_DXT3: 1,
  TEXTURE_FMT_DXT5: 2,
  TEXTURE_FMT_ETC1: 3,
  TEXTURE_FMT_PVRTC_2BPP_RGB_1: 4,
  TEXTURE_FMT_PVRTC_2BPP_RGBA_1: 5,
  TEXTURE_FMT_PVRTC_4BPP_RGB_1: 6,
  TEXTURE_FMT_PVRTC_4BPP_RGBA_1: 7,

  // normal formats
  TEXTURE_FMT_A8: 8,
  TEXTURE_FMT_L8: 9,
  TEXTURE_FMT_L8_A8: 10,
  TEXTURE_FMT_R5_G6_B5: 11,
  TEXTURE_FMT_R5_G5_B5_A1: 12,
  TEXTURE_FMT_R4_G4_B4_A4: 13,
  TEXTURE_FMT_RGB8: 14,
  TEXTURE_FMT_RGBA8: 15,
  TEXTURE_FMT_RGB16F: 16,
  TEXTURE_FMT_RGBA16F: 17,
  TEXTURE_FMT_RGB32F: 18,
  TEXTURE_FMT_RGBA32F: 19,
  TEXTURE_FMT_R32F: 20,
  TEXTURE_FMT_111110F: 21,
  TEXTURE_FMT_SRGB: 22,
  TEXTURE_FMT_SRGBA: 23,

  // depth formats
  TEXTURE_FMT_DEPTH: 24,
  TEXTURE_FMT_DEPTHSTENCIL: 25,
};

export function attrTypeBytes(attrType) {
  if (attrType === enums.ATTR_TYPE_INT8) {
    return 1;
  } else if (attrType === enums.ATTR_TYPE_UINT8) {
    return 1;
  } else if (attrType === enums.ATTR_TYPE_INT16) {
    return 2;
  } else if (attrType === enums.ATTR_TYPE_UINT16) {
    return 2;
  } else if (attrType === enums.ATTR_TYPE_INT32) {
    return 4;
  } else if (attrType === enums.ATTR_TYPE_UINT32) {
    return 4;
  } else if (attrType === enums.ATTR_TYPE_FLOAT32) {
    return 4;
  }

  console.warn(`Unknown ATTR_TYPE: ${attrType}`);
  return 0;
}