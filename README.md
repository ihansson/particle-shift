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

## Usage

### Basic

### With Body / Gradient ?

## Options

### Scene

### Screen

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

## v1

- Go through method / prop names and make better
- Versioning
- Readme

## v2

- Deactivate inactive / remove invsible
- Change particle data format to int arrays
- Web workers?
- Webgl?
- Better recording
- Better timing mechanism (framerate independent)