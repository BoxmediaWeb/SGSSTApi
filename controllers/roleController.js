const models = require('../models')
const Role = models.Role;
const User = models.User;
const Modulo = models.Modulo;
const Role_Modulo = models.Role_Modulo;
const Permiso = models.Permiso;

getRoles = async(req, res, next) =>{
    try{
        const usuarios = await Role.findAndCountAll({include:[User,Modulo]});
        res.json(usuarios);
    }catch(error){
        res.send(error);
    }

}

getRole=async(req, res, next)=>{
    try{
        const usuario = await Role.findOne({
            include:[Permiso,Modulo],
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setRole=async(req, res, next)=>{
    try{
        const usuarioActualizado = await Role.update(
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

createRole = async(req, res, next)=>{
    try{
        var permisos = await Permiso.findAll();
        var modulos = await Modulo.findAll();
        const usuario = await Role.create(req.body);
        usuario.addPermisos(permisos, { through: { estado: false }});
        usuario.addModulos(modulos, { through: { hidden: true }});

        res.json(nuevoUsuario);
    }catch(error){
        res.send(error);
    }
}

deleteRole=async(req, res, next)=>{
    try{
        const RoleDeleted = await Role.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

generarPermisos=async(modulos,req)=>{

    const resetModulos = req.body.resetModulos;
    const roleId = req.params.id;
    var mod_rl = [];

    modulos.map((data)=>{
        if(resetModulos[data.title]==true){
            mod_rl.push({
                roleId:roleId,
                moduloId:data.id
            });
        }
    });

    Role_Modulo.bulkCreate(mod_rl).then(() => {
        return Role_Modulo.findAll();
      }).then(users => {
        //console.log(users)
      });
}

resetPermisos=async(req, res, next)=>{
    try{
        var role = await Role.findByPk(req.params.id);
        await role.setPermisos(req.body.permisos);
        await role.setModulos(req.body.modulos);

        res.json(req.body);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getRoles,getRole,createRole,setRole,deleteRole,resetPermisos};