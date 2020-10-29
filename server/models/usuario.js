const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;
let rolesValidos = {
	values: ['ADMIN_ROLE','USER_ROLE'],
	message: '{value} no es un rol valido'
}

let usuarioSchema = new Schema({
	nombre: {
		type: String,
		required: [true,'El nombre es Necesario']
	},
	email: {
		type: String,
		required: [true,'El correo es Necesario'],
		unique: [true, 'El email debe ser único'] 
	},
	password: {
		type: String,
		required: [true,'El pass es Necesario']
	},
	img: { 
		type: String
	},
	role: {
		type: String,
		default: 'USER_ROLE',
		enum: rolesValidos
	},
	estado: {
		type: Boolean,
		default: false
	},
	google: {
		type: Boolean,
		default: false
	}
});


usuarioSchema.plugin( uniqueValidator, {
	message: '{PATH} debe de ser único'
});

usuarioSchema.methods.toJSON = function(){
	let user = this;
	let userObject = user.toObject();
	delete userObject.password;
	return userObject;
}
module.exports = mongoose.model('Usuario',usuarioSchema);
