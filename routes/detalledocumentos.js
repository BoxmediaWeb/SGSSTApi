var express = require('express');
var multer = require('multer');
const fs = require('fs');
const models = require('../models');

var router = express.Router();
const detalleDocumentoController = require('../controllers/detalleDocumentoController');

const DetalleDocumento = models.DetalleDocumento;

uploadDetalleDocumento = () =>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            const ruta = "./public/detalleDocumentos";
            const path = `${ruta}/${req.body.ubicacion}`;

            fs.unlink(path, (err) => {if (err) {
                console.error('No existe el archivo',err)
                }
            })

            cb(null, ruta)
        },
        filename:(req,file,cb)=>{
            const ext = file.originalname.split('.').pop();
            var archivo=`${req.body.estandar}_${genRandonString(20)}.${ext}`;
            editarCampoUbicacion(req.body,archivo);
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
    await DetalleDocumento.update(
        {
            ubicacion:nombreArchivo,
            version:body.version,
            comentario:body.comentario,
            fecha:body.fecha
        },
        {
          where: {
            id:body.detalleDocumentoId
            },
        });
}


router.get('/', detalleDocumentoController.obtenerItems);
router.post('/matriz', detalleDocumentoController.crearItemMatriz);
router.post('/upload',uploadDetalleDocumento().single('archivoDetalleDocumento'), detalleDocumentoController.uploadDetalleDocumento);
router.post('/setdetalledocumento', detalleDocumentoController.setArchivoDocumento);
router.get('/getdetalledocumento', detalleDocumentoController.getArchivoDocumento);
router.get('/:id', detalleDocumentoController.getDetalleDocumento);
router.post('/:id', detalleDocumentoController.setDetalleDocumento);
router.post('/', detalleDocumentoController.crearItem);
router.delete('/:id', detalleDocumentoController.deleteDetalleDocumento);
//imgAvatar

module.exports = router;