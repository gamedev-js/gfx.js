const tap = require('tap');
const gfx = require('../dist/gfx.js');
const resl = require('./fixtures/resl');

suite(tap, 'texture', { timeout: 20000 }, t => {

  t.test('texture-2d', t => {

    t.test('POT texture', t => {

      while (document.body.firstElementChild) {
        document.body.firstElementChild.remove();
      }
      let canvasEL = document.createElement('canvas');
      let device = new gfx.Device(canvasEL);
      let counter = 0;
      let texture = null;

      resl({
        manifest: {
          image: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
        },
        onDone(assets) {
          let image = assets.image;
          let _generateMipmap = device._gl.generateMipmap;
          device._gl.generateMipmap = function (target) {
            counter += 1;
            _generateMipmap.call(device._gl, target);
          }
          texture = new gfx.Texture2D(device, {
            width: image.width,
            height: image.height,
            images: [image],
            mipmap: true
          });

          t.equal(counter, 1);

          t.end();
        }
      });
    });

    t.test('NPOT texture', t => {

      while (document.body.firstElementChild) {
        document.body.firstElementChild.remove();
      }
      let canvasEL = document.createElement('canvas');
      let device = new gfx.Device(canvasEL);
      let counter = 0;
      let texture = null;

      resl({
        manifest: {
          image: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
        },
        onDone(assets) {
          let image = assets.image;
          let _generateMipmap = device._gl.generateMipmap;
          device._gl.generateMipmap = function (target) {
            counter += 1;
            _generateMipmap.call(device._gl, target);
          }

          texture = new gfx.Texture2D(device, {
            width: image.width,
            height: image.height,
            images: [image],
            mipmap: true
          });

          t.equal(counter, 0);

          t.end();
        }
      });
    });

    t.end();
  });

  t.test('texture-cube', t => {

    t.test('POT texture', t => {

      while (document.body.firstElementChild) {
        document.body.firstElementChild.remove();
      }
      let canvasEL = document.createElement('canvas');
      let device = new gfx.Device(canvasEL);
      let counter = 0;
      let texture = null;

      resl({
        manifest: {
          image0: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
          image1: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
          image2: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
          image3: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
          image4: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
          image5: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_64.jpg'
          },
        },
        onDone(assets) {
          let image = assets.image0;
          let _generateMipmap = device._gl.generateMipmap;
          device._gl.generateMipmap = function (target) {
            counter += 1;
            _generateMipmap.call(device._gl, target);
          }
          texture = new gfx.TextureCube(device, {
            width: image.width,
            height: image.height,
            images: [[assets.image0, assets.image1, assets.image2, assets.image3, assets.image4, assets.image5]],
            mipmap: true
          });

          t.equal(counter, 1);

          t.end();
        }
      });
    });

    t.test('NPOT texture', t => {

      while (document.body.firstElementChild) {
        document.body.firstElementChild.remove();
      }
      let canvasEL = document.createElement('canvas');
      let device = new gfx.Device(canvasEL);
      let counter = 0;
      let texture = null;

      resl({
        manifest: {
          image0: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
          image1: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
          image2: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
          image3: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
          image4: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
          image5: {
            type: 'image',
            src: __dirname + '/fixtures/uv_checker_50.jpg'
          },
        },
        onDone(assets) {
          let image = assets.image0;
          let _generateMipmap = device._gl.generateMipmap;
          device._gl.generateMipmap = function (target) {
            counter += 1;
            _generateMipmap.call(device._gl, target);
          }

          texture = new gfx.TextureCube(device, {
            width: image.width,
            height: image.height,
            images: [[assets.image0, assets.image1, assets.image2, assets.image3, assets.image4, assets.image5]],
            mipmap: true
          });

          t.equal(counter, 0);

          t.end();
        }
      });
    });

    t.end();
  });
});
