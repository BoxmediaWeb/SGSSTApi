var express = require('express');
var router = express.Router();
const moduloController = require('../controllers/moduloController');


router.get('/', moduloController.getModulos);
router.get('/:id', moduloController.getModulo);
router.post('/:id', moduloController.setModulo);
router.post('/', moduloController.createModulo);
router.delete('/:id', moduloController.deleteModulo);

module.exports = router;