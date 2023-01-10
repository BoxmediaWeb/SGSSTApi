var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');


router.post('/', loginController.setLogin);
router.get('/authuser', loginController.getAuthUser);
router.post('/refresh', loginController.refreshToken);

module.exports = router;