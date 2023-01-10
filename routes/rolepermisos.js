var express = require('express');
var router = express.Router();
const rolePermisoController = require('../controllers/rolePermisoController');


router.get('/', rolePermisoController.getRolePermisos);
router.get('/:id', rolePermisoController.getRolePermiso);
router.post('/:id', rolePermisoController.setRolePermiso);
router.post('/', rolePermisoController.createRolePermiso);
router.delete('/:id', rolePermisoController.deleteRolePermiso);

module.exports = router;