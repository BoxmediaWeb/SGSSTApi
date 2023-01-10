const models = require('../models')
const Empresa = models.Empresa;

getEmpresas = async(req, res, next) =>{
    try{
        const usuarios = await Empresa.findAndCountAll();
        res.json(usuarios);
    }catch(error){
        res.send(error);
    }

}

getEmpresa=async(req, res, next)=>{
    try{
        const usuario = await Empresa.findOne({
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setEmpresa=async(req, res, next)=>{
    try{
        const usuarioActualizado = await Empresa.update(
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

createEmpresa = async(req, res, next)=>{
    try{
        const usuarios = await Empresa.create(req.body);
        res.json(req.query);
    }catch(error){
        res.send(error);
    }
}

deleteEmpresa=async(req, res, next)=>{
    try{
        const EmpresaDeleted = await Empresa.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getEmpresas,getEmpresa,createEmpresa,setEmpresa,deleteEmpresa};