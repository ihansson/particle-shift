export var Screen = {

	create: function(scene, settings){

		const new_screen = Object.create(this)

		settings.render(scene, scene.ctx)

		let x = 0;
		let y = 0;

		let particles = [];
		let image = scene.ctx.getImageData(0,0,scene.draw_width,scene.draw_height)
		let image_data = image.data

		new_screen.draw_width = scene.draw_width
		new_screen.draw_height = scene.draw_height

		scene.ctx.clearRect(0, 0, scene.draw_width, scene.draw_height);

		while(x < scene.draw_width){
			y = 0
			while(y < scene.draw_height){
				let index = (y * scene.draw_width + x) * 4;
				if(image_data[index+3] !== 0){
					particles.push([x, y, [image_data[index],image_data[index+1],image_data[index+2],image_data[index+3]]])
				}
				y += scene.step_width
			}
			x += scene.step_width
		}

		Object.assign(new_screen, {
			settings,
			image,
			particles,
			bodies: settings.bodies
		})

		return new_screen

	},

	debug: function(){

		const debug_node = document.createElement('div')

		const screen_node = document.createElement('canvas')
		screen_node.width = this.draw_width
		screen_node.height = this.draw_height

		const screen_node_ctx = screen_node.getContext('2d')
		screen_node_ctx.putImageData(this.image, 0, 0)

		const label = document.createElement('h6')
		label.innerHTML = 'Particles: '+this.particles.length
		
		debug_node.appendChild(label)
		debug_node.appendChild(screen_node)

		document.body.appendChild(debug_node)
	}

}