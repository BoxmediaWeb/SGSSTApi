var express = require('express');
var router = express.Router();
const empresaController = require('../controllers/empresaController');


router.get('/', empresaController.getEmpresas);
router.get('/:id', empresaController.getEmpresa);
router.post('/:id', empresaController.setEmpresa);
router.post('/', empresaController.createEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;