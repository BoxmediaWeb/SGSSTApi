const models = require('../models');
const { Op } = require("sequelize");
const MaestroDocumento = models.MaestroDocumento;
const fs = require('fs');

getMaestroDocumentos = async(req, res, next) =>{

    try{

        var mainStatement = {};
        var whereStatement = {};
    
        if(req.query.ubicacion){
            whereStatement.ubicacion=req.query.ubicacion;
        }

        if(req.query.tipoDocumento){
            whereStatement.tipoDocumento=req.query.tipoDocumento
        }
    
        mainStatement.where = whereStatement;

        const maestroDocumentos = await MaestroDocumento.findAll(mainStatement);
        res.json(maestroDocumentos);
    }catch(error){
        res.send(error);
    }

}

getMaestroDocumento=async(req, res, next)=>{
    try{
        const usuario = await MaestroDocumento.findOne({
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setMaestroDocumento=async(req, res, next)=>{
    try{
        const usuarioActualizado = await MaestroDocumento.update(
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

createMaestroDocumento = async(req, res, next)=>{
    try{
        const usuarios = await MaestroDocumento.create(req.body);
        res.json(req.query);
    }catch(error){
        res.send(error);
    }
}

deleteMaestroDocumento=async(req, res, next)=>{
    try{
        const MaestroDocumentoDeleted = await MaestroDocumento.destroy({
            where: {
                id:req.params.id
            }
        });
        res.json(pedidoDeleted);
    }catch(error){
        res.send(error);
    }
}

//Elementos corregido

setArchivoMaestro=async(req, res, next)=>{
    var nombreArchivo = `${req.body.maestroId}_${generarStringrRandom(10)}.txt`;
    var createStream = await fs.createWriteStream(nombreArchivo);
    await createStream.end();
    const item = await MaestroDocumento.update({archivo:nombreArchivo},{where:{id:req.body.maestroId}});

    await fs.writeFile(`./public/maetroDocumentos/${nombreArchivo}`, req.body.contenido, function(err) {
        if(err) {
            res.send(err);
        }else{
            res.json({
                "mensaje":"Archivo subido"
            });
        }
    });
}

getArchivoMaestro=async(req, res, next)=>{
    const item = await MaestroDocumento.findByPk(req.query.maestroId);
    var nombreArchivo = `./public/maetroDocumentos/${item.archivo}`;

    await fs.readFile(nombreArchivo, "utf8", function(err, contenido) {
        res.json({
            "contenido":contenido
        }); 
    });
}

generarStringrRandom=(length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {getMaestroDocumentos,getMaestroDocumento,createMaestroDocumento,setMaestroDocumento,deleteMaestroDocumento,setArchivoMaestro,getArchivoMaestro};