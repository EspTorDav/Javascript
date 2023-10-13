require('dotenv').config(); //Busca el archivo .env para
                            //Consumir las variables alli definidas

//Exportamos los modulos para poder reasignar las variables                         
module.exports.Config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_DBNAME
}