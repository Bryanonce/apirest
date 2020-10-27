require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());



app.get('/usuarios',(req,res)=>{
	res.json("getUsuarios");
})
app.post('/usuarios',(req,res)=>{
	let body = req.body;
	if(body.nombre === undefined){
		res.status(400).json({
			ok: false,
			mensaje: 'Es necesario enviar el nombre'
		});
	}else{
		res.json({
		persona: body
	});
	};
	
})
app.put('/usuarios/:id',(req,res)=>{
	let id = req.params.id;
	let body = req.body;
	res.json({
		id,
		nombre: 'Bryan'
	});
})
app.delete('/usuarios',(req,res)=>{
	res.json("delete");
})
app.listen(process.env.PORT,()=>{
	console.log("Escuchando puerto 3000")
})