(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("ParticleShift", [], factory);
	else if(typeof exports === 'object')
		exports["ParticleShift"] = factory();
	else
		root["ParticleShift"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/Body.js":
/*!*****************************!*\
  !*** ./src/classes/Body.js ***!
  \*****************************/
/*! namespace exports */
/*! export Body [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Body": () => /* binding */ Body
/* harmony export */ });
var Body = {
  create: function create(settings) {
    var new_body = Object.create(this);
    Object.assign(new_body, settings);
    return new_body;
  }
};

/***/ }),

/***/ "./src/classes/Particle.js":
/*!*********************************!*\
  !*** ./src/classes/Particle.js ***!
  \*********************************/
/*! namespace exports */
/*! export Particle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Particle": () => /* binding */ Particle
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");

var Particle = {
  create: function create(scene, settings_array, id) {
    var new_particle = Object.create(this);
    var defaults = {
      id: id,
      x: settings_array[0] + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.random)(scene.spawn_scatter) - scene.spawn_scatter / 2,
      y: settings_array[1] + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.random)(scene.spawn_scatter) - scene.spawn_scatter / 2,
      r: settings_array[2][0],
      g: settings_array[2][1],
      b: settings_array[2][2],
      a: settings_array[2][3],
      final_x: settings_array[0],
      final_y: settings_array[1],
      final_r: settings_array[2][0],
      final_g: settings_array[2][1],
      final_b: settings_array[2][2],
      final_a: settings_array[2][3]
    };
    Object.assign(new_particle, defaults);
    return new_particle;
  },
  draw: function draw(scene) {
    scene.ctx.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a / 255 + ")";

    if (!scene.particle_type || scene.particle_type == 'rect') {
      scene.ctx.fillRect(this.x * scene.draw_multiplier - scene.draw_particle_size / 2, this.y * scene.draw_multiplier - scene.draw_particle_size / 2, scene.draw_particle_size, scene.draw_particle_size);
    } else if (scene.particle_type == 'circ') {
      scene.ctx.beginPath();
      scene.ctx.arc(this.x * scene.draw_multiplier - scene.draw_particle_size / 2, this.y * scene.draw_multiplier - scene.draw_particle_size / 2, scene.draw_particle_size, 0, 2 * Math.PI);
      scene.ctx.fill();
    }
  },
  update: function update(scene) {
    var caller = this;
    var tick = scene.tick;
    var tick_mod = tick + this.id;
    var distance = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.line_distance)([this.x, this.y], [this.final_x, this.final_y]);
    var bodies = scene.current_screen.bodies;
    var pulled = false;

    if (bodies) {
      bodies.map(function (body) {
        var body_distance = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.line_distance)([caller.x, caller.y], [body.x, body.y]);

        if (body_distance < body.radius) {
          pulled = true;
          var dt = body.force + (body.radius - body_distance) / 10 * body.force;
          var t = dt / body_distance;
          caller.x = (1 - t) * caller.x + t * body.x;
          caller.y = (1 - t) * caller.y + t * body.y;
        }
      });
    }

    if (!pulled) {
      if (distance < 2) {
        this.x = this.final_x;
        this.y = this.final_y;
      } else {
        var dt = scene.particle_speed + distance * scene.particle_speed_distance;
        var t = dt / distance;
        this.x = (1 - t) * this.x + t * this.final_x + Math.sin(tick_mod / 10) * scene.particle_wobble;
        this.y = (1 - t) * this.y + t * this.final_y + Math.sin(tick_mod / 10) * scene.particle_wobble;
      }
    }

    ['r', 'g', 'b', 'a'].map(function (prop) {
      if (caller[prop] !== caller['final_' + prop]) {
        var dir = caller[prop] > caller['final_' + prop];
        caller[prop] += (dir ? -1 : 1) * scene.color_shift_speed;
      }
    });
  }
};

/***/ }),

/***/ "./src/classes/Scene.js":
/*!******************************!*\
  !*** ./src/classes/Scene.js ***!
  \******************************/
/*! namespace exports */
/*! export Scene [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene": () => /* binding */ Scene
/* harmony export */ });
/* harmony import */ var _Particle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Particle.js */ "./src/classes/Particle.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "./src/utils.js");


var Scene = {
  create: function create(settings) {
    var new_scene = Object.create(this);
    var canvas = document.querySelector(settings.selector);
    var ctx = canvas.getContext('2d');
    canvas.width = settings.draw_width;
    canvas.height = settings.draw_height;
    var defaults = {
      canvas: canvas,
      ctx: ctx,
      particle_size: 2,
      step_width: 6,
      particle_type: 'rect',
      draw_width: 1000,
      draw_height: 600,
      draw_multiplier: 1,
      spawn_scatter: 250,
      shuffle_spawn: true,
      particle_speed: 1,
      particle_speed_distance: 0.05,
      particle_wobble: 0.2,
      color_shift_speed: 4,
      show_fps: false,
      tick: 0,
      fps: 60,
      last_frame_call: 0,
      pre_render_frames_count: false,
      pre_render_frames: [],
      active: false,
      current_screen: false
    };
    Object.assign(new_scene, defaults, settings);
    return new_scene;
  },
  resize: function resize() {
    var width = this.canvas.getBoundingClientRect().width;
    var height = Math.ceil(width * (this.draw_height / this.draw_width));
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    this.draw_multiplier = width / this.draw_width;
  },
  add_screen: function add_screen(screen) {
    this.screens.push(screen);
  },
  play_screen: function play_screen(screen) {
    var caller = this;
    this.current_screen = screen;
    this.setup_particles(screen);
    this.resize();

    if (!this.last_frame_call) {
      this.last_frame_call = performance.now();
    }

    if (!this.active) {
      this.active = true;
      window.addEventListener("resize", this.resize.bind(this));
      this.draw();
    }
  },
  draw: function draw() {
    var caller = this;
    this.tick++;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.current_screen.bodies) {
      this.current_screen.bodies.forEach(function (body) {
        if (body.update) body.update(caller, caller.ctx);
        if (body.render) body.render(caller, caller.ctx);
      });
    }

    this.draw_particle_size = this.particle_size * this.draw_multiplier;
    this.particles.forEach(function (particle) {
      particle.update(caller);
      particle.draw(caller);
    });

    if (this.pre_render_frames_count) {
      this.pre_render();
    }

    if (this.show_fps) {
      this.draw_fps();
    }

    window.requestAnimationFrame(function () {
      caller.draw();
    });
  },
  draw_fps: function draw_fps() {
    var now = performance.now();

    if (this.tick % 20 == 0) {
      this.fps = Math.round(1 / ((now - this.last_frame_call) / 1000));
    }

    this.last_frame_call = now;
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, 75, 25);
    this.ctx.font = '12px Courier';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('FPS:' + this.fps, 16, 15);
  },
  pre_render: function pre_render() {
    var _this = this;

    this.pre_render_frames.push(this.ctx.getImageData(0, 0, this.draw_width, this.draw_height));
    this.pre_render_frames_count--;

    if (this.pre_render_frames_count == 0) {
      var pre_render_node = document.createElement('canvas');
      var pre_render_ctx = pre_render_node.getContext('2d');
      pre_render_node.width = this.draw_width;
      pre_render_node.height = this.draw_height * this.pre_render_frames.length;
      this.pre_render_frames.forEach(function (frame, i) {
        pre_render_ctx.putImageData(frame, 0, i * _this.draw_height);
      });
      document.body.appendChild(pre_render_node);
    }
  },
  particles: [],
  setup_particles: function setup_particles(screen) {
    var caller = this;
    var ctx = this.ctx;
    var new_particles;

    if (this.shuffle_spawn) {
      new_particles = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.shuffle)(screen.particles.map(function (particle, i) {
        return _Particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle.create(caller, particle, i);
      }));
    } else {
      new_particles = screen.particles.map(function (particle, i) {
        return _Particle_js__WEBPACK_IMPORTED_MODULE_0__.Particle.create(caller, particle, i);
      });
    }

    if (this.particles.length > 0) {
      var diff = this.particles.length - new_particles.length;
      new_particles.map(function (particle, i) {
        if (caller.particles[i]) {
          ['x', 'y', 'r', 'g', 'b', 'a'].map(function (prop) {
            particle[prop] = caller.particles[i][prop];
          });
        }
      });
    } else {
      new_particles.map(function (particle, i) {
        particle.a = 0;
      });
    }

    this.particles = new_particles;
  }
};

/***/ }),

/***/ "./src/classes/Screen.js":
/*!*******************************!*\
  !*** ./src/classes/Screen.js ***!
  \*******************************/
/*! namespace exports */
/*! export Screen [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Screen": () => /* binding */ Screen
/* harmony export */ });
var Screen = {
  create: function create(scene, settings) {
    var new_screen = Object.create(this);
    settings.render(scene, scene.ctx);
    var x = 0;
    var y = 0;
    var particles = [];
    var image = scene.ctx.getImageData(0, 0, scene.draw_width, scene.draw_height);
    var image_data = image.data;
    new_screen.draw_width = scene.draw_width;
    new_screen.draw_height = scene.draw_height;
    scene.ctx.clearRect(0, 0, scene.draw_width, scene.draw_height);

    while (x < scene.draw_width) {
      y = 0;

      while (y < scene.draw_height) {
        var index = (y * scene.draw_width + x) * 4;

        if (image_data[index + 3] !== 0) {
          particles.push([x, y, [image_data[index], image_data[index + 1], image_data[index + 2], image_data[index + 3]]]);
        }

        y += scene.step_width;
      }

      x += scene.step_width;
    }

    Object.assign(new_screen, {
      settings: settings,
      image: image,
      particles: particles,
      bodies: settings.bodies
    });
    return new_screen;
  },
  debug: function debug() {
    var debug_node = document.createElement('div');
    var screen_node = document.createElement('canvas');
    screen_node.width = this.draw_width;
    screen_node.height = this.draw_height;
    var screen_node_ctx = screen_node.getContext('2d');
    screen_node_ctx.putImageData(this.image, 0, 0);
    var label = document.createElement('h6');
    label.innerHTML = 'Particles: ' + this.particles.length;
    debug_node.appendChild(label);
    debug_node.appendChild(screen_node);
    document.body.appendChild(debug_node);
  }
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! export Body [provided] [maybe used in particle-shift, particle-shift.min (runtime-defined)] [usage prevents renaming] -> ./src/classes/Body.js .Body */
/*! export Scene [provided] [maybe used in particle-shift, particle-shift.min (runtime-defined)] [usage prevents renaming] -> ./src/classes/Scene.js .Scene */
/*! export Screen [provided] [maybe used in particle-shift, particle-shift.min (runtime-defined)] [usage prevents renaming] -> ./src/classes/Screen.js .Screen */
/*! other exports [not provided] [maybe used in particle-shift, particle-shift.min (runtime-defined)] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.d, __webpack_require__.r, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Scene": () => /* reexport safe */ _classes_Scene_js__WEBPACK_IMPORTED_MODULE_0__.Scene,
/* harmony export */   "Screen": () => /* reexport safe */ _classes_Screen_js__WEBPACK_IMPORTED_MODULE_1__.Screen,
/* harmony export */   "Body": () => /* reexport safe */ _classes_Body_js__WEBPACK_IMPORTED_MODULE_2__.Body
/* harmony export */ });
/* harmony import */ var _classes_Scene_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Scene.js */ "./src/classes/Scene.js");
/* harmony import */ var _classes_Screen_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/Screen.js */ "./src/classes/Screen.js");
/* harmony import */ var _classes_Body_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/Body.js */ "./src/classes/Body.js");





/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! namespace exports */
/*! export line_distance [provided] [no usage info] [missing usage info prevents renaming] */
/*! export random [provided] [no usage info] [missing usage info prevents renaming] */
/*! export shuffle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "line_distance": () => /* binding */ line_distance,
/* harmony export */   "random": () => /* binding */ random,
/* harmony export */   "shuffle": () => /* binding */ shuffle
/* harmony export */ });
function line_distance(line_a, line_b) {
  var a = line_a[0] - line_b[0];
  var b = line_a[1] - line_b[1];
  return Math.sqrt(a * a + b * b);
}
function random(to) {
  return Math.floor(Math.random() * to + 1);
}
function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.js");
/******/ })()
;
});
//# sourceMappingURL=particle-shift.js.map