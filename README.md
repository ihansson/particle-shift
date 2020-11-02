# Particle Shift

Under construction, check back in novemember for something production ready.

## Demo

Under construction

## Install

### Webpack Require

Particle Shift can be included as a module through npm or yarn

```console
npm install ihansson/particle-shift
```

```javascript
import { Scene, Screen, Body } from 'particle-shift'
Sceen.create({
	...
})
```

### CDN

Alternatively the library can be included separately and accessed via the ParticleShift global.

```html
<script src="https://cdn.jsdelivr.net/gh/ihansson/particle-shift@main/dist/particle-shift.min.js"></script>
<script>
ParticleShift.Sceen.create({
	...
})
</script>
```

## Basic Example

```html
<script src="https://cdn.jsdelivr.net/gh/ihansson/particle-shift@main/dist/particle-shift.min.js"></script>
<canvas id="canvas" width=500 height=300></canvas>
<script>
const scene = ParticleShift.Scene.create({
	selector: '#canvas',
	particle_size: 2,
	step_width: 6,
	draw_width: 500,
	draw_height: 300
})

const screen1 = ParticleShift.Screen.create(scene, {
	render: function(scene, ctx){
		ctx.font = '170px Georgia'
		ctx.fillStyle = 'black';
		ctx.fillText('Hello', 25, 200)
	}
})

const screen2 = ParticleShift.Screen.create(scene, {
	render: function(scene, ctx){
		ctx.fillText('There', 25, 200)
	}
})

scene.play_screen(screen1);

window.setTimeout(function(){
	scene.play_screen(screen2)
},2000)
</script>
```

## Options

### Scene

The scene is particle shift represents the canvas for the particle system and is used to controlled what is drawn and when. The most important properties of the scene are the particle_size and step_width which will control the level of detail of the particle system.

#### Responsive

The scene had a separate draw_width and draw_height from the actual width and heigh to allow for the canvas itself to be responsive. You should always sepcify a draw_width and draw_height and if you then want this to be responsive you can make the canvas responsive using css (100% width), or you can specify a different height and width in css to scale up to.

#### Pre Render

The pre_render_frames_count property can be set to create a sheet of all rendered frames if you have a scene which is too demanding to be rendered in real time. There is currently no option to directly output a gif or video so these would then need to be converted to your required format via another tool.

#### Example

```javascript
const scene = ParticleShift.Scene.create({
	selector: '#canvas',
	particle_size: 2,
	step_width: 6,
	draw_width: 500,
	draw_height: 300
})
```

#### Settings

| property                | type       | default | notes                                                                                      |
|-------------------------|------------|---------|--------------------------------------------------------------------------------------------|
| selector                | string     | n/a     | CSS Selector for a canvas element                                                          |
| draw_width              | num        | n/a     | Draw width for the scene (will be scaled up/down to the size of the canvas when rendered)  |
| draw_height             | num        | n/a     | Draw height for the scene                                                                  |
| particle_size           | num        | 2       | Pixel size of each particle                                                                |
| step_width              | num        | 6       | The distance to travel between sampling each pixel in a scene                              |
| particle_type           | rect, circ | rect    | Whether to render each particle as a rect or circ                                          |
| spawn_scatter           | num        | 250     | Random distance maximum from which a new particle will be spawned to the final destination |
| shuffle_spawn           | bool       | true    | Whether particle positions will be shuffled between each scene.                            |
| particle_speed          | num        | 1       | Base speed of particle                                                                     |
| particle_speed_distance | num        | 0.05    | Distance multiplier to the speed of a particle                                             |
| particle_wobble         | num        | 0.2     | Adds a sin() position modifier to make movement appear less linear                         |
| color_shift_speed       | num        | 4       | Speed at which particles will change color                                                 |
| show_fps                | bool       | false   | Enable the fps meter in the top left                                                       |
| pre_render_frames_count | num, false | false   | If used will store each frame generated and output a canvas with each frame stacked.       |

#### Scene Object

| property    | type           | default | notes                                                                 |
|-------------|----------------|---------|-----------------------------------------------------------------------|
| play_screen | method(screen) | n/a     | Triggers the scene to animate particles to match the specified screen |

### Screen

A particle shift screen represents a single drawn image on a canvas which can be used for the particles to transition from and to. Anything can be drawn to the screen through the standard canvas 2d context api.

#### Example

```javascript
const screen1 = ParticleShift.Screen.create(scene, {
	render: function(scene, ctx){
		ctx.font = '170px Georgia'
		ctx.fillStyle = 'black';
		ctx.fillText('Hello', 25, 200)
	}
})
```

#### Settings

| property | type             | default | notes                                                                                     |
|----------|------------------|---------|-------------------------------------------------------------------------------------------|
| bodies   | array(body)      | n/a     | An array of bodies to be considered for the screen                                        |
| render   | func(scene, ctx) | n/a     | Called on setup to generate an image which can then be used to create the particle system |

#### Screen Object

| property | type             | default | notes                                                                                     |
| debug    | method           | n/a     | Used on an instantiated screen object to output the rendered scene                        |

### Body

Particle shift bodies are used to add basic attractors or deflectors to the particle system. Bodies are circles with a force which will be applied as a portion of the distance to the center of the body. The most common use case is to bind the update function to mouse position x/y to create mouse interaction.

#### Example

```javascript
const example_body = ParticleShift.Body.create({
	x: 0,
	y: 0,
	radius: 50,
	force: -0.75,
	update: function(scene, ctx){},
	draw: function(scene, ctx){}
})
```

#### Settings

| property | type             | default | notes                                                                         |
|----------|------------------|---------|-------------------------------------------------------------------------------|
| x        | num              | n/a     | Starting x position of body                                                   |
| y        | num              | n/a     | Starting y position of body                                                   |
| radius   | num              | n/a     | Radius of influence                                                           |
| force    | num              | n/a     | Force of influence on particles (can be negative)                             |
| update   | func(scene, ctx) | n/a     | Called on every frame to update body properties, such as moving the body.     |
| draw     | func(scene, ctx) | n/a     | Called when drawing a frame, this is used if you want the body to be visible. |

## License

[MIT](https://github.com/ihansson/particle-shift/blob/main/LICENSE)

## Author

[Ian Hansson](https://ianhan.com/)