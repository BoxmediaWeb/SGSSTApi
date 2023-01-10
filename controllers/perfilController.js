const models = require('../models')
const Perfil = models.Perfil;
const User = models.User;

getPerfiles = async(req, res, next) =>{
    try{
        const usuarios = await Perfil.findAll({include:[User]});
        res.json(usuarios);
    }catch(error){
        res.send(error);
    }
}

getPerfil=async(req, res, next)=>{
    try{
        const usuario = await Perfil.findOne({
            include:[User],
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setPerfil=async(req, res, next)=>{
    try{
        const usuarioActualizado = await Perfil.update(
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

createPerfil = async(req, res, next)=>{
    try{
        const body = req.body;
        const usuarios = await Perfil.create({
            User:{
                name:"fdsfsdgdfgdfhdf"
            },
            include:[{association:User}]
        });
        res.json(req.query);
    }catch(error){
        res.send(error);
    }
}

deletePerfil=async(req, res, next)=>{
    try{
        const PerfilDeleted = await Perfil.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getPerfiles,getPerfil,createPerfil,setPerfil,deletePerfil};