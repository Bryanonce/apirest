//=====================
//		Puerto
//=====================
process.env.PORT = process.env.PORT || 3000;

//=====================
//		Entorno
//=====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=====================
//   Base de datos
//=====================
let urlDataBase;
if(process.env.NODE_ENV === 'dev'){
	urlDataBase = 'mongodb://localhost:27017/cafe';
}else{
urlDataBase = 'mongodb+srv://complex:R6D9YbvlSwE6Qjri@cluster0.vrxbv.mongodb.net/cafe?retryWrites=true&w=majority'

}

process.env.urlDataBase = urlDataBase; 