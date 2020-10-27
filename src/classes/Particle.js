import { random, line_distance } from '../utils.js';

export var Particle = {

	create: function(scene, settings_array, id){

		const new_particle = Object.create(this)
		const defaults = {

			id,

			x: settings_array[0] + random(scene.spawn_scatter) - (scene.spawn_scatter / 2),
			y: settings_array[1] + random(scene.spawn_scatter) - (scene.spawn_scatter / 2),

			r: settings_array[2][0],
			g: settings_array[2][1],
			b: settings_array[2][2],
			a: settings_array[2][3],

			final_x: settings_array[0],
			final_y: settings_array[1],

			final_r: settings_array[2][0],
			final_g: settings_array[2][1],
			final_b: settings_array[2][2],
			final_a: settings_array[2][3],

		}
		Object.assign(new_particle, defaults)
		return new_particle

	},

	draw: function(scene){

		scene.ctx.fillStyle = "rgba("+this.r+","+this.g+","+this.b+","+(this.a / 255)+")";
		
		if(!scene.particle_type || scene.particle_type == 'rect'){
			scene.ctx.fillRect((this.x * scene.draw_multiplier) - (scene.draw_particle_size / 2), (this.y * scene.draw_multiplier) - (scene.draw_particle_size / 2), scene.draw_particle_size, scene.draw_particle_size)
	    } else if(scene.particle_type == 'circ') {
		    scene.ctx.beginPath();
		    scene.ctx.arc((this.x * scene.draw_multiplier) - (scene.draw_particle_size / 2), (this.y * scene.draw_multiplier)  - (scene.draw_particle_size / 2), scene.draw_particle_size, 0, 2 * Math.PI);
		    scene.ctx.fill();
		}
	
	},

	update: function(scene){

		const caller = this

		const tick = scene.tick
		const tick_mod = tick + this.id

		const distance = line_distance([this.x, this.y],[this.final_x,this.final_y])
		const bodies = scene.current_screen.bodies

		let pulled = false

		if(bodies){

			bodies.map(function(body){
				const body_distance = line_distance([caller.x, caller.y],[body.x,body.y])
				if(body_distance < body.radius){
					pulled = true
					const dt = body.force + (((body.radius - body_distance) / 10) * body.force);
					const t = dt / body_distance
					caller.x = ((1 - t) * caller.x + t * body.x)
					caller.y = ((1 - t) * caller.y + t * body.y)
				}
			})

		}

		if(!pulled){

			if(distance < 2){
				this.x = this.final_x
				this.y = this.final_y
			} else {
				const dt = scene.particle_speed + (distance * scene.particle_speed_distance);
				const t = dt / distance
				this.x = ((1 - t) * this.x + t * this.final_x) + (Math.sin(tick_mod / 10) * scene.particle_wobble)
				this.y = ((1 - t) * this.y + t * this.final_y) + (Math.sin(tick_mod / 10) * scene.particle_wobble)
			}

		}

		['r','g','b','a'].map(prop => {
			if(caller[prop] !== caller['final_'+prop]){
				const dir = caller[prop] > caller['final_'+prop]
				caller[prop] += (dir ? -1 : 1) * scene.color_shift_speed;
			}
		})

	}

}