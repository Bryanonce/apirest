require('./config/config');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
app.use(require('./rutas/usuario').app)
//Importar database
 mongoose.connect(process.env.urlDataBase,
 	{
 		useNewUrlParser: true,
 		useCreateIndex: true
 	},
 	(err, resp)=>{
	if(err){
		throw new Error("Fallo conección con la base de datos",err);
	}else{
		console.log("Base de datos online"); 
	}
 });







app.listen(process.env.PORT,()=>{
	console.log("Escuchando puerto 3000")
})