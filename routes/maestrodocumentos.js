var express = require('express');
var router = express.Router();
const maestroDocumentoController = require('../controllers/maestroDocumentoController');


router.get('/', maestroDocumentoController.getMaestroDocumentos);
router.post('/setarchivomaestro', maestroDocumentoController.setArchivoMaestro);
router.get('/getarchivomaestro', maestroDocumentoController.getArchivoMaestro);
router.get('/:id', maestroDocumentoController.getMaestroDocumento);
router.post('/:id', maestroDocumentoController.setMaestroDocumento);
router.post('/', maestroDocumentoController.createMaestroDocumento);
router.delete('/:id', maestroDocumentoController.deleteMaestroDocumento);

module.exports = router;