const models = require('../models')
const DetalleDocumento = models.DetalleDocumento;
const MaestroDocumento = models.MaestroDocumento;
const DocVariables = models.DocVariables;
const { Op } = require("sequelize");
const fs = require('fs');

getDetalleDocumentos = async(req, res, next) =>{

    let mainStatement = {};
    let whereStatement = {};

    let mainStatementMaestro = {};
    let whereStatementMaestro = {};

    /*Filtros de la tabla maestro*/

    if (req.query.ubicacion) {
        whereStatementMaestro.ubicacion=req.query.ubicacion;
    }

    if (req.query._tipoDocumento) {
        whereStatementMaestro.tipoDocumento = {[Op.not]: req.query._tipoDocumento};
    }

    if (req.query.tipoDocumento) {
        whereStatementMaestro.tipoDocumento = req.query.tipoDocumento;
    }

    /*Filtros de la tabla detalleDocumentos*/

    try{

        const maestroDocumento = await MaestroDocumento.findAll(mainStatementMaestro);

        if(req.query.index){
            mainStatement.include=[MaestroDocumento];
            const maestroSeleccionado = await maestroDocumento[req.query.index];
            whereStatement.maestroId=maestroSeleccionado.id;
        }else{
            mainStatement.include=[{model:MaestroDocumento,where:{ubicacion:req.query.ubicacion}}];
        }


        mainStatement.where= await whereStatement;
        mainStatementMaestro.where = await whereStatementMaestro;

        const detalleDocumento = await DetalleDocumento.findAndCountAll(mainStatement);
        res.json(detalleDocumento);
    }catch(error){
        res.send(error);
    }
}

getDetalleDocumentosDoc = async(req, res, next) =>{

    try{
        const maestroDocumento = await MaestroDocumento.findAll({
            where:{
                ubicacion:req.query.ubicacion,
                tipoDocumento:'Documento'
            }
        });
        const maestroSeleccionado = maestroDocumento[req.query.index];
        
        const detalleDocumento = await DetalleDocumento.findAndCountAll({
            include:[MaestroDocumento],
            where:{
                maestroId:maestroSeleccionado.id
            }
        });
        res.json({mensaje:"Accedí"});
    }catch(error){
        res.send(error);
    }
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

setArchivoDocumento=async(req, res, next) =>{
    try {

        var nombreArchivo = "";
        var nombreCompletoArchivo="";

        if (req.query.id) {
            nombreArchivo = req.body.estandar+".txt";
           const detalleDocumentoCargado = await DetalleDocumento.findByPk(req.query.id);
           nombreCompletoArchivo = detalleDocumentoCargado.ubicacion;  
        }else{
            nombreArchivo = req.body.estandar+".txt";
            nombreCompletoArchivo = generarStringrRandom(10)+"_"+nombreArchivo;
        }

        var createStream = fs.createWriteStream(nombreArchivo);
        createStream.end();
        
        fs.writeFile("./public/detalleDocumentos/"+nombreCompletoArchivo, req.body.valor, function(err) {
            if(err) {
                res.send(err);
            }else{
                res.json({
                    "mensaje":"Archivo subido"
                });
            }
        });

        if (req.query.id) {
            const detalleDocumentoActualizado = await DetalleDocumento.update(
                {
                    ubicacion:nombreCompletoArchivo
                },
                {
                    where:{
                        id:req.query.id
                    }
                }
            );
        }else{
            const maestroDocumento = await MaestroDocumento.findAll({where:{ubicacion:req.body.estandar}});

            const dataDetalleDocumento = {
                fecha:req.body.fecha,
                version:req.body.version,
                ubicacion:nombreCompletoArchivo,
                comentario:req.body.comentario,
                maestroId:maestroDocumento[req.body.indice].id
            }
    
            const detalleDocumento = await DetalleDocumento.create(dataDetalleDocumento);
        }


    } catch (error) {
        res.send(error);
    }
}

getArchivoDocumento=async(req, res, next)=>{
    const detalleDocumento = await DetalleDocumento.findOne({
        where:{
            id:req.query.id
        }
    });

    var nombreArchivo = `./public/detalleDocumentos/${detalleDocumento.ubicacion}`;

    await fs.readFile(nombreArchivo, "utf8", function(err, data) {
        res.json({archivo:data});
    });
}

getDetalleDocumento=async(req, res, next)=>{
    try{
        const usuario = await DetalleDocumento.findOne({
            include:[MaestroDocumento, DocVariables],
            where:{
                id:req.params.id
            }
        });
        res.send(usuario);
    }catch(error){
        res.send(error);
    }
}

setDetalleDocumento=async(req, res, next)=>{
    try{
        const usuarioActualizado = await DetalleDocumento.update(
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

createDetalleDocumento = async(req, res, next)=>{
    try{
        const maestroDocumento = await MaestroDocumento.findAll({
            where:{
                ubicacion:req.body.nombreEstandar
            }
        });

        const idMaestroDocumento = maestroDocumento[req.body.indexEstandar].id;
        const ubicacionMaestro = maestroDocumento[req.body.indexEstandar].ubicacion;

        const dataDetalleDocumento = {
            fecha:req.body.fecha,
            maestroId:idMaestroDocumento,
            version:req.body.version,
            comentario:req.body.comentario,
            usuario:req.body.usuario,
            estado:req.body.estado,
            ubicacion:ubicacionMaestro
        }

        const detalleDocumento = await DetalleDocumento.create(dataDetalleDocumento);

        var docVariables = req.body.docVariables.map((data)=>{
            return {
              nombre:data.nombre,
              valor:data.valor,
              detalleDocumentoId: detalleDocumento.id
            }
          });

        const docsvariables = DocVariables.bulkCreate(docVariables);

        res.json(detalleDocumento);
    }catch(error){
        res.send(error);
    }
}

deleteDetalleDocumento=async(req, res, next)=>{
    try{

        const detalleDocumento = await DetalleDocumento.findOne({where:{id:parseInt(req.params.id)}});

        fs.unlink(`./public/detalleDocumentos/${detalleDocumento.ubicacion}`, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });

        const DetalleDocumentoDeleted = await DetalleDocumento.destroy({
            where:{
                id:parseInt(req.params.id)
            }
        });
        res.json(DetalleDocumentoDeleted);
    }catch(error){
        res.send(error);
    }
}

module.exports = {getDetalleDocumentos,getDetalleDocumento,createDetalleDocumento,setDetalleDocumento,deleteDetalleDocumento,getDetalleDocumentosDoc,setArchivoDocumento,getArchivoDocumento};