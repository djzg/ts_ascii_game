// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"b6f935434f6f72c39b1cc913518da56e":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "8f818f69f51311b5e3d503e78d69c330";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] ???? Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"7843b3960e086726267ff606847fc92b":[function(require,module,exports) {
"use strict";

var _Color = _interopRequireDefault(require("./Color"));

var _Layer = _interopRequireDefault(require("./Layer"));

var _Renderer = _interopRequireDefault(require("./Renderer"));

var _tile = _interopRequireDefault(require("./tile"));

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WIDTH = 80;
const HEIGHT = 24;
const layers = {
  background: new _Layer.default({
    size: new _Vector.default(WIDTH, HEIGHT)
  }),
  actor: new _Layer.default({
    size: new _Vector.default(WIDTH, HEIGHT)
  })
};
const player = new _tile.default({
  background: new _Color.default(0, 0, 0, 0),
  char: '@',
  color: new _Color.default(255, 0, 0),
  isVisible: true,
  pos: _Vector.default.Zero()
});
const backgroundTiles = Array.from({
  length: WIDTH * HEIGHT
}, (_, i) => {
  const x = i % WIDTH;
  const y = Math.floor(i / WIDTH);
  return new _tile.default({
    char: '.',
    pos: new _Vector.default(x, y)
  });
});
const renderer = new _Renderer.default();
renderer.addLayer('background', layers.background);
renderer.addLayer('actor', layers.actor);
renderer.onBeforeDraw(() => {
  layers.background.operations.forEach(op => {
    const newAlpha = (Math.sin(op.pos.x + op.pos.y + renderer.frames / 5) + 1) / 2;
    op.color.a = newAlpha;
  });
});

const draw = () => {
  backgroundTiles.forEach(tile => layers.background.draw(tile));
  layers.actor.draw(player);
  renderer.commit();
  requestAnimationFrame(draw);
};

draw();
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      {
        player.pos.add(new _Vector.default(0, -1));
        break;
      }

    case 'ArrowDown':
      {
        player.pos.add(new _Vector.default(0, 1));
        break;
      }

    case 'ArrowLeft':
      {
        player.pos.add(new _Vector.default(-1, 0));
        break;
      }

    case 'ArrowRight':
      {
        player.pos.add(new _Vector.default(1, 0));
        break;
      }
  }
});
},{"./Layer":"c4f78b48f438a740ea8ee25007bbc086","./Vector":"d5ca3ed2260ba0186e9c5f78a8315afc","./Color":"6c0fe30d48590b8846803a126092b525","./tile":"fa8466c678779d18bfcc535fda8a692b","./Renderer":"6ea6afeab1854b9e6990d1368a4ef23d"}],"c4f78b48f438a740ea8ee25007bbc086":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

;

const drawingOperation = tile => ({
  tile,
  char: tile.char,
  color: tile.color.clone(),
  background: tile.background.clone(),
  pos: tile.pos.clone(),
  isVisible: tile.isVisible
});

class Layer {
  constructor(options) {
    _defineProperty(this, "operations", []);

    this.opacity = options.opacity || 1;
    this.isVisible = options.isVisible || true;
    this.pos = options.pos || _Vector.default.Zero();
    this.size = options.size;
    this._z = options.z || 0;
  }

  get z() {
    return this._z;
  }

  draw(tile) {
    this.operations.push(drawingOperation(tile));
  }

  clear() {
    this.operations = [];
  }

}

exports.default = Layer;
},{"./Vector":"d5ca3ed2260ba0186e9c5f78a8315afc"}],"d5ca3ed2260ba0186e9c5f78a8315afc":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  clone() {
    return new Vector(this.x, this.y);
  }

  static add(v1, v2) {
    return v1.clone().add(v2);
  }

  static Zero() {
    return new Vector(0, 0);
  }

}

exports.default = Vector;
},{}],"6c0fe30d48590b8846803a126092b525":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Color {
  constructor(r = 255, g = 255, b = 255, a = 1) {
    this._r = r;
    this._g = g;
    this._b = b;
    this._a = a;
    this.makeCssString();
  }

  get r() {
    return this._r;
  }

  get g() {
    return this._g;
  }

  get b() {
    return this._b;
  }

  get a() {
    return this._a;
  }

  set r(value) {
    this._r = value;
    this.makeCssString();
  }

  set g(value) {
    this._g = value;
    this.makeCssString();
  }

  set b(value) {
    this._b = value;
    this.makeCssString();
  }

  set a(value) {
    this._a = value;
    this.makeCssString();
  }

  makeCssString() {
    this.cssString = `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`;
  }

  toCssString() {
    return this.cssString;
  }

  clone() {
    return new Color(this._r, this._g, this._b, this._a);
  }

}

exports.default = Color;
;
},{}],"fa8466c678779d18bfcc535fda8a692b":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Color = _interopRequireDefault(require("./Color"));

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Tile {
  constructor(options) {
    _defineProperty(this, "id", Math.random().toString(36).slice(2));

    this.char = options.char || ' ';
    this.color = options.color || new _Color.default();
    this.background = options.background || new _Color.default(0, 0, 0, 1);
    this.pos = options.pos || new _Vector.default(0, 0);
    this.isVisible = options.isVisible || true;
  }

}

exports.default = Tile;
;
},{"./Color":"6c0fe30d48590b8846803a126092b525","./Vector":"d5ca3ed2260ba0186e9c5f78a8315afc"}],"6ea6afeab1854b9e6990d1368a4ef23d":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Renderer {
  constructor() {
    _defineProperty(this, "namedLayers", {});

    _defineProperty(this, "layers", []);

    _defineProperty(this, "layerElements", {});

    _defineProperty(this, "size", 30);

    _defineProperty(this, "beforeDraw", () => {});

    _defineProperty(this, "frames", 0);
  }

  addLayer(name, layer) {
    if (name in this.namedLayers) {
      return new Error(`${name} layer already attached to renderer`);
    }

    this.namedLayers[name] = layer;
    this.layers.push(layer);
    this.orderLayers();
    return this;
  }

  onBeforeDraw(cb) {
    this.beforeDraw = cb;
  }

  commit() {
    this.beforeDraw();

    for (let [name, layer] of Object.entries(this.namedLayers)) {
      let layerEl = this.layerElements[name];

      if (!layerEl) {
        layerEl = document.createElement('div');
        layerEl.classList.add('asc-engine-layer');
        layerEl.style.fontSize = `${this.size}px`;
        layerEl.style.top = `${layer.pos.y * this.size}px`;
        layerEl.style.left = `${layer.pos.x * this.size / 2}px`;
        layerEl.style.height = `${layer.size.y * this.size}px`;
        layerEl.style.width = `${layer.size.x * this.size / 2}px`;
        layerEl.style.zIndex = layer.z.toString();
        document.getElementById('asc-engine-layer-container').appendChild(layerEl);
        this.layerElements[name] = layerEl;
      }

      for (let op of layer.operations) {
        let opEl = document.getElementById(`asc-engine-tile-${op.tile.id}`);

        if (!opEl) {
          opEl = document.createElement('div');
          opEl.classList.add('asc-engine-tile');
          opEl.id = `asc-engine-tile-${op.tile.id}`;
          layerEl.appendChild(opEl);
        }

        if (op.isVisible) {
          opEl.innerHTML = op.char.replace(/ /g, '&nbsp;');
          opEl.style.color = op.color.toCssString();
          opEl.style.background = op.background.toCssString();
          opEl.style.top = `${op.pos.y * this.size}px`;
          opEl.style.left = `${op.pos.x * this.size / 2}px`;
          opEl.style.display = 'block';
        } else {
          opEl.style.display = 'none';
        }
      }

      layer.clear();
    }

    this.frames++;
  }

  orderLayers() {
    this.layers = this.layers.sort((la, lb) => la.z - lb.z);
  }

}

exports.default = Renderer;
},{}]},{},["b6f935434f6f72c39b1cc913518da56e","7843b3960e086726267ff606847fc92b"], null)

//# sourceMappingURL=ts_ascii_game.8f818f69.js.map
