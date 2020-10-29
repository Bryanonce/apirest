const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.get('/usuarios',(req,res)=>{
	let desde = req.query.desde || 0;
	let limite = req.query.limite || 5;
	desde = Number(desde)
	limite = Number(limite)
	Usuario.find({},'nombre email role estado img')
		.skip(desde)
		.limit(limite)
		.exec((err,req)=>{
			if(err){
				res.status(400).json({
					ok: false,
					err
				});
			}

			Usuario.count({},(err,conteo)=>{
				res.json({
					ok: true,
					users: req,
					conteo: conteo
				})
			})

				
		})

})

app.post('/usuarios',(req,res)=>{

	let body = req.body;
	let usuarios = new Usuario({
		nombre: body.nombre,
		email: body.email,
		password: bcrypt.hashSync(body.password,10),
		role: body.role
	});
	usuarios.save((err,usuariodB)=>{
		if(err){
			res.status(400).json({
				ok: false,
				err
			});
		}
		//usuariodB.password = null;
		res.json({
			ok:true,
			usuario: usuariodB
		})
	})
	
})
app.put('/usuarios/:id',(req,res)=>{
	let id = req.params.id;
	let body = _.pick(req.body,['nombre','email','img','role','estado']);
	console.log(body);
	Usuario.findByIdAndUpdate(id,body,{new: true, runValidators: true},(err,user)=>{

		if(err){
			res.status(400).json({
				ok: false,
				err
			});
		}

		res.json({
			ok: true,
			usuario: user
		});
	})
})

app.delete('/usuarios/:id',function(req,res){

	let id = req.params.id;
	let body = _.pick(req.body,['estado']);
	body.estado = false;
	Usuario.findByIdAndUpdate(id,body,(err,usuarioBorrado)=>{
		if(err){
			return res.status(400).json({
				ok: false,
				err
			})
		}

		if(!usuarioBorrado){
			return res.status(400).json({
				ok: false,
				error: {
					err,
					message: 'Usuario no encontrado'
				}
			})
		}

		res.json({
			ok: true,
			user: usuarioBorrado,
			mensaje: 'usuario borrado'
		})

	})

})

module.exports={
	app
}