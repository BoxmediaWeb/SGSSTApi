var express = require('express');
var router = express.Router();
const detalleDocumentoController = require('../controllers/detalleDocumentoController');

router.get('/', detalleDocumentoController.getDetalleDocumentos);
router.post('/setdetalledocumento', detalleDocumentoController.setArchivoDocumento);
router.get('/getdetalledocumento', detalleDocumentoController.getArchivoDocumento);
router.get('/:id', detalleDocumentoController.getDetalleDocumento);
router.post('/:id', detalleDocumentoController.setDetalleDocumento);
router.post('/', detalleDocumentoController.createDetalleDocumento);
router.delete('/:id', detalleDocumentoController.deleteDetalleDocumento);

module.exports = router;