var express = require('express');
var router = express.Router();
const eventoController = require('../controllers/eventoController');


router.get('/', eventoController.getEventos);
router.get('/:id', eventoController.getEvento);
router.post('/:id', eventoController.setEvento);
router.post('/', eventoController.createEvento);
router.delete('/:id', eventoController.deleteEvento);

module.exports = router;
