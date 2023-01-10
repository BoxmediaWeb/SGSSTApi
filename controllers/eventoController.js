const models = require('../models')
const Evento = models.Evento;

getEventos = async(req, res, next) =>{
    try{
        const usuarios = await Evento.findAndCountAll({include:[]});
        res.json(usuarios);
    }catch(error){
        res.send(error);
    }

}

getEvento=async(req, res, next)=>{
    try{
        const usuario = await Evento.findOne({
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setEvento=async(req, res, next)=>{
    try{
        const usuarioActualizado = await Evento.update(
            req.body,
            {
                where:{
                    id:req.params.id
                }
            }
        );
        res.json(usuarioActualizado);
    }catch(error){
        res.send(error);
    }
}

createEvento = async(req, res, next)=>{
    const body = req.body;
    try{
        const usuarios = await Evento.create(body);
        res.json(body);
    }catch(error){
        res.send(error);
    }
}

deleteEvento=async(req, res, next)=>{
    try{
        const EventoDeleted = await Evento.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getEventos,getEvento,createEvento,setEvento,deleteEvento};