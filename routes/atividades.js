const atividades = require('../models/atividades')
const usuarios = require('../models/usuarios')

module.exports = (app)=>{
    //criar a rota para renderizar a view atividades
    app.get('/atividades', async(req,res)=>{
        //capturar o id a barra de endereço
        var id = req.query.id
        //buscar o nome na collection usuarios
        var user = await usuarios.findOne({_id:id})
        //buscar todas as atividades desse usuario
        var abertas = await atividades.find({usuario:id,status:0}).sort({data:1})
        //buscar todas as atividades desse usuario
        var entregues = await atividades.find({usuario:id,status:1}).sort({data:1})
        //buscar todas as atividades desse usuario
        var excluidas = await atividades.find({usuario:id,status:2}).sort({data:1})
        //console.log(buscar)
        // res.render('atividades.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
        //abrir view acordeis
        // res.render('accordion.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
        //abrir view atividades2
        res.render('atividades2.ejs',{nome:user.nome,id:user._id,dados:abertas,dadosx:excluidas,dadose:entregues})
    })

    //gravar as informações 
    app.post('/atividades',async(req,res)=>{
        var dados = req.body
        //console.log(dados)
        const conexao = require('../config/database')()
        const atividades = require('../models/atividades')
        var salvar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            disciplina:dados.disciplina,
            entrega:dados.entrega,
            instrucoes:dados.orientacao,
            usuario:dados.id
        }).save()
        //redirecionar para a tora atividades
        res.redirect('/atividades?id='+dados.id)
    })

    //excluir atividades 
    app.get("/entregue",async(req,res)=>{
        //recuperar o parametro id da barra de endereco
        var id = req.query.id
        var entregue = await atividades.findOneAndUpdate(
        {_id:id},
        {status:1}
        )
        //redirecionar para a rota atividades 
        res.redirect('/atividades?id='+entregue.usuario)
    })
    
        //excluir atividades 
        app.get("/excluir",async(req,res)=>{
            //recuperar o parametro id da barra de endereco
            var id = req.query.id
            var excluir = await atividades.findOneAndUpdate(
            {_id:id},
            {status:2}
            )
            //redirecionar para a rota atividades 
            res.redirect('/atividades?id='+excluir.usuario)
        })

            //excluir atividades 
    app.get("/desfazer",async(req,res)=>{
        //recuperar o parametro id da barra de endereco
        var id = req.query.id
        var desfazer = await atividades.findOneAndUpdate(
        {_id:id},
        {status:0}
        )
        //redirecionar para a rota atividades 
        res.redirect('/atividades?id='+desfazer.usuario)
    })

        //criar a rota para renderizar a view alterar
        app.get('/alterar', async(req,res)=>{
            //capturar o id(atividade) a barra de endereço
            var id = req.query.id
            //buscar todas as atividades desse usuario
            var alterar = await atividades.findOne({_id:id})

            //buscar o nome na collection usuarios
            var user = await usuarios.findOne({_id:alterar.usuario})

            res.render('alterar.ejs',{nome:user.nome,id:user._id,dados:alterar})
        })
    
        //criar rota para gravar as altearções na atividade
        app.post('/alterar', async(req,res)=>{
            //quais são as informações digitadas?
            var infos = req.body
            // console.log(infos)
            //gravar as alterações na collection atividades
            var gravar = await atividades.findOneAndUpdate(
                {_id:infos.id_a},
                {   data:infos.data,
                    tipo:infos.tipo,
                    disciplina:infos.disciplina,
                    entrega:infos.entrega,
                    instrucoes:infos.orientacao
                }
            )
            res.redirect('/atividades?id='+infos.id)
        })
}