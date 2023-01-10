var express = require('express');
var router = express.Router();
const roleController = require('../controllers/roleController');

router.get('/', roleController.getRoles);
router.post('/resetpermisos/:id', roleController.resetPermisos);
router.get('/:id', roleController.getRole);
router.post('/:id', roleController.setRole);
router.post('/', roleController.createRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;