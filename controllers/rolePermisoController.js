const models = require('../models')
const Role_Permiso = models.Role_Permiso;
const Permiso = models.Permiso;
const Role = models.Role;

getRolePermisos = async(req, res, next) =>{
    try{
        const usuarios = await Role_Permiso.findAll();
        res.json(usuarios);
    }catch(error){
        res.send(error);
    }

}

getRolePermiso=async(req, res, next)=>{
    try{
        const usuario = await Role_Permiso.findOne({
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setRolePermiso=async(req, res, next)=>{
    try{
        const usuarioActualizado = await Role_Permiso.update(
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

createRolePermiso = async(req, res, next)=>{
    try{
        const usuarios = await Role_Permiso.create(req.body);
        res.json(req.query);
    }catch(error){
        res.send(error);
    }
}

deleteRolePermiso=async(req, res, next)=>{
    try{
        const RolePermisoDeleted = await Role_Permiso.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getRolePermisos,getRolePermiso,createRolePermiso,setRolePermiso,deleteRolePermiso};