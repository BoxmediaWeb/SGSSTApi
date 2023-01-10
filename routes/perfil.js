var express = require('express');
var router = express.Router();
const perfilController = require('../controllers/perfilController');


router.get('/', perfilController.getPerfiles);
router.get('/:id', perfilController.getPerfil);
router.post('/:id', perfilController.setPerfil);
router.post('/', perfilController.createPerfil);
router.delete('/:id', perfilController.deletePerfil);

module.exports = router;