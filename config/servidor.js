//importar o express
const express = require('express')
//executar o expressa 
const app = express()
//definir a porta do servidor local
const porta = process.env.PORT || 3535

//definir a pasa dos arquivos estaticos (css, imagens, jquery)
app.use(express.static('./assets/'))

app.use(express.urlencoded({
    extended:false
}))

//exxportar o app e a porta
module.exports={app,porta}