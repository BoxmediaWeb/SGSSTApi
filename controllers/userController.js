const models = require('../models');
const User = models.User;
const Perfil = models.Perfil;
const Role = models.Role;
const Permiso = models.Permiso;

getUsers = async(req, res, next) =>{
    try{
        const usuarios = await User.findAndCountAll(
            {include:[Perfil,Role]}
            );
        res.json(usuarios);
    }catch(error){
        res.send(error);
    }
}

getUser=async(req, res, next)=>{
    try{
        const usuario = await User.findOne({
            where:{
                id:req.params.id
            },
            include:[Perfil,Role]
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setUser=async(req, res, next)=>{
    try{
        const body = req.body;
        const usuarioActualizado = await User.update(
            body,
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

createUser = async(req, res, next)=>{
    try{
        const user = await User.create(
            req.body,
        {
            include:[{model:Perfil}]
        });
        res.json(user);
    }catch(error){
        res.send(error);
    }
}

deleteUser=async(req, res, next)=>{
    try{
        const userDeleted = await User.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

postUserAvatar=async(req, res, next)=>{
    try {
        res.json({mensaje:"Imágen guardada"});
    } catch (error) {
        res.json(error);
    }
    
}

module.exports = {getUsers,getUser,createUser,setUser,deleteUser,postUserAvatar};