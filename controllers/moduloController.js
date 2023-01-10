const models = require('../models')
const Modulo = models.Modulo;
const User = models.User;

getModulos = async(req, res, next) =>{
    try{
        const modulos = await Modulo.findAndCountAll();
        res.json(modulos);
    }catch(error){
        res.send(error);
    }

}

getModulo=async(req, res, next)=>{
    try{
        const modulo = await Modulo.findOne({
            where:{
                id:req.params.id
            }
        });
        res.send(modulo);
    }catch(error){
        res.send(error);
    }
}

setModulo=async(req, res, next)=>{
    try{
        const moduloActualizado = await Modulo.update(
            req.body,
            {
                where:{
                    id:req.params.id
                }
            }
        );
        res.json(moduloActualizado);
    }catch(error){
        res.send(error);
    }
}

createModulo = async(req, res, next)=>{
    try{
        const modulos = await Modulo.create(req.body);
        res.json(req.query);
    }catch(error){
        res.send(error);
    }
}

deleteModulo=async(req, res, next)=>{
    try{
        const ModuloDeleted = await Modulo.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getModulos,getModulo,createModulo,setModulo,deleteModulo};