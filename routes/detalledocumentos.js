var express = require('express');
var multer = require('multer');
const fs = require('fs');
const models = require('../models');
var router = express.Router();
const detalleDocumentoController = require('../controllers/detalleDocumentoController');
const DetalleDocumento = models.DetalleDocumento;

uploadDetalleDocumento = () =>{

    const storage = multer.diskStorage({
        destination:async(req,file,cb)=>{
            await console.log("req.body ===>", req.body.documentoId);
            const ruta = await "./public/detalleDocumentos";
            const path = await `${ruta}/${req.body.documentoId}`;
            cb(null, ruta)
        },
        filename:async(req,file,cb)=>{
            const ext = await file.originalname.split('.').pop();
            var archivo= await `${req.body.documentoId}_${genRandonString(10)}.${ext}`;
            await editarCampoUbicacion(req.body,archivo);
            cb(null,archivo)
        }
    });

    return multer({storage});
}

genRandonString = (length)=>{
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

editarCampoUbicacion=async(body,nombreArchivo)=>{

    console.log("body.version", body.version);

    const documentoSeleccionado = await DetalleDocumento.update(
        {
            ubicacion:nombreArchivo,
            version:body.version,
            comentario:body.comentario,
            fecha:body.fecha
        },
        {
          where: {
            id:body.documentoId
            }
        });
    
        await console.log("DetalleDocumentoSeleccionado=>", documentoSeleccionado);
}


router.get('/', detalleDocumentoController.obtenerItems);
router.get('/limpiardocumento/:id', detalleDocumentoController.limpiarDocumento);
router.post('/matriz', detalleDocumentoController.crearItemMatriz);
router.post('/upload',uploadDetalleDocumento().single('archivoDocumento'), detalleDocumentoController.uploadDetalleDocumento);
router.post('/setdetalledocumento', detalleDocumentoController.setArchivoDocumento);
router.get('/getdetalledocumento', detalleDocumentoController.getArchivoDocumento);
router.get('/:id', detalleDocumentoController.getDetalleDocumento);
router.post('/:id', detalleDocumentoController.setDetalleDocumento);
router.post('/', detalleDocumentoController.crearItem);
router.delete('/:id', detalleDocumentoController.deleteDetalleDocumento);
//imgAvatar

module.exports = router;