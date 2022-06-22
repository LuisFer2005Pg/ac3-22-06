//importar o mongoose
const mongoose = require('mongoose')

//criar a estrutura para o armazenamento das informaçoes do usuario
const modelo = mongoose.Schema({
    nome:String,
    email:String,
    senha:String
})

//gravar q estrutura na model usuarios
const usuarios = mongoose.model('usuarios',modelo)

//exportar os dados para acesso externo
module.exports = usuarios