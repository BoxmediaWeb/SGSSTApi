const models = require('../models');
const jwt = require('jsonwebtoken');
const User = models.User;
const Perfil = models.Perfil;
const Role = models.Role;
const Modulo = models.Modulo;

setLogin=async(req, res, next)=>{
    try{
        var users = [];
        var nick = req.body.nick;

        if (req.body.nick && req.body.password) {
            users = await User.findOne({
                include:[Perfil,{model:Role,include:[{model:Modulo, attributes: ['title','type','icon','link','parent']}]}],
                attributes : ['id', 'name', 'nick', 'avatar', 'email', 'status'],
                where:{
                    nick:req.body.nick,
                    password:req.body.password
                }
            });            
        }

        if(users.length == 0){
            return res.status(403).send({
                message: 'Credenciales incorrectas'
            });
        }else{
            const token = jwt.sign({nick}, req.app.get('llave'), { expiresIn: '1m' });
            const refreshToken = jwt.sign({nick}, req.app.get('llaveRefresh'), { expiresIn: '30m' });

            res.json({
                mensaje: 'Bienvenido',
                token,
                refreshToken,
                user:users
                });
        }
    }catch(error){
        res.send(error);
    }
}

getAuthUser=async(req, res, next)=>{

    const token = req.headers.authorization.split(' ')[1];
    const nick = jwt.verify(token, req.app.get('llave')).nick;

    var user = await User.findOne({
            include:[Perfil,{model:Role,include:[{model:Modulo, attributes: ['title','type','icon','link','parent']}]}],
            attributes : ['id', 'name', 'nick', 'avatar', 'email', 'status'],
            where:{
                nick
            }
        });
    res.json(user);
}

refreshToken=async(req, res, next)=>{

    const nick = req.body.nick.toString();
    const refreshToken = req.body.refreshToken;

    const isValid = verifyRefresh(nick, refreshToken,req);

    console.log("Valor de la llave",req.app.get('llave'));

    if (!isValid) {
        return res
        .status(401)
        .json({ success: false, error: `Ha habido un error` });
    }

    user = await User.findOne({
        include:[Perfil,{model:Role,include:[{model:Modulo, attributes: ['title','type','icon','link','parent']}]}],
        attributes : ['id', 'name', 'nick', 'avatar', 'email', 'status'],
        where:{
            nick:nick
        }
    });   

    //const token = jwt.sign(nick, req.app.get('llave'), { expiresIn: 60 * 60 });

    const token = jwt.sign({nick}, req.app.get('llave'), { expiresIn: '1m' });

    res.json({
        mensaje: 'Bienvenido',
        token,
        refreshToken,
        user
        });
}

verifyRefresh = (nick, token, req) => {
    try {
        const decoded = jwt.verify(token, req.app.get('llaveRefresh'));
        return decoded.nick == nick;
    } catch (error) {
     // console.error(error);
     return false;
    }
}


module.exports = {setLogin,getAuthUser,refreshToken};