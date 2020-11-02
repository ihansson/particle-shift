import { Particle } from './Particle.js';
import { shuffle } from '../utils.js';

export var Scene = {

	create: function(settings){

		const new_scene = Object.create(this)

		const canvas = document.querySelector(settings.selector)
		const ctx = canvas.getContext('2d')

		canvas.width = settings.draw_width
		canvas.height = settings.draw_height

		const defaults = {

			canvas,
			ctx,

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
			current_screen: false,

		}

		Object.assign(new_scene, defaults, settings)

		return new_scene

	},

	resize: function(){

		const width = this.canvas.getBoundingClientRect().width;
		const height = Math.ceil(width * (this.draw_height / this.draw_width));
		this.canvas.width = width
		this.canvas.height = height

		this.width = width
		this.height = height

		this.draw_multiplier = width / this.draw_width

	},
	add_screen: function(screen){
		this.screens.push(screen)
	},
	play_screen: function(screen){
		const caller = this
		this.current_screen = screen
		this.setup_particles(screen)
		this.resize()
		if(!this.last_frame_call){
			this.last_frame_call = performance.now()
		}
		if(!this.active){
			this.active = true;
			window.addEventListener("resize", this.resize.bind(this))
			this.draw()
		}
	},

	draw: function(){

		const caller = this

		this.tick++

		this.ctx.clearRect(0, 0, this.width, this.height);

		if(this.current_screen.bodies){
			this.current_screen.bodies.forEach(body => {
				if(body.update) body.update(caller, caller.ctx)
				if(body.render) body.render(caller, caller.ctx)
			})
		}

		this.draw_particle_size = this.particle_size * this.draw_multiplier

		this.particles.forEach(particle => {
			particle.update(caller)
			particle.draw(caller)
		})

		if(this.pre_render_frames_count){
			this.pre_render()
		}

		if(this.show_fps){
			this.draw_fps()
		}

		window.requestAnimationFrame(function(){
			caller.draw()
		})

	},

	draw_fps: function(){
		const now = performance.now()
		if(this.tick % 20 == 0){
			this.fps = Math.round(1 / ((now - this.last_frame_call) / 1000));
		}
		this.last_frame_call = now;

		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0,0,75,25)
		this.ctx.font = '12px Courier'
		this.ctx.fillStyle = 'white';
		this.ctx.fillText('FPS:'+this.fps, 16, 15)
	},

	pre_render: function(){
		this.pre_render_frames.push(
			this.ctx.getImageData(0,0,this.draw_width,this.draw_height)
		)
		this.pre_render_frames_count--
		if(this.pre_render_frames_count == 0){
			const pre_render_node = document.createElement('canvas')
			const pre_render_ctx = pre_render_node.getContext('2d')
			pre_render_node.width = this.draw_width
			pre_render_node.height = this.draw_height * this.pre_render_frames.length
			this.pre_render_frames.forEach((frame, i) => {
				pre_render_ctx.putImageData(frame, 0, i * this.draw_height)
			})
			document.body.appendChild(pre_render_node)
		}
	},

	particles: [],
	setup_particles: function(screen){

		const caller = this
		const ctx = this.ctx

		let new_particles;
		if(this.shuffle_spawn){
			new_particles = shuffle(screen.particles.map((particle, i) => Particle.create(caller, particle, i)));
		} else {
			new_particles = screen.particles.map((particle, i) => Particle.create(caller, particle, i));
		}

		if(this.particles.length > 0){
			let diff = this.particles.length - new_particles.length;
			new_particles.map((particle, i) => {
				if(caller.particles[i]){
					['x','y','r','g','b','a'].map(prop => {
						particle[prop] = caller.particles[i][prop]
					})
				}
			})
		} else {
			new_particles.map((particle, i) => {
				particle.a = 0
			})
		}

		this.particles = new_particles

	}

}