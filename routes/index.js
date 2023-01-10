var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Api SGSST - Desarrollado por Andrés Salas para BoxMedia S.A.S' });
});

module.exports = router;