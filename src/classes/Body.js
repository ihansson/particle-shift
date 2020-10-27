export var Body = {

	create: function(settings){

		const new_body = Object.create(this)
		Object.assign(new_body, settings)
		return new_body

	}

}