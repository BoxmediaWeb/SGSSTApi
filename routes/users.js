var express = require('express');
var multer = require('multer');
const models = require('../models');
var router = express.Router();
const userController = require('../controllers/userController');
const fs = require('fs');
const User = models.User;



//Middleware multer



genRandonString = (length)=>{
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charLength = chars.length;
    var result = '';
    for ( var i = 0; i < length; i++ ) {
       result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
 }


 editarCampoAvatar=async(userId,nombreAvatar)=>{
    await User.update(
        {
            avatar:nombreAvatar
        },
        {
          where: {
            id:userId
            },
        });
}



saveAvatarUser = () =>{
    const storage = multer.diskStorage({
        destination:(req,file,cb)=>{
            const ruta = "./public/images/avatars";
            const path = `${ruta}/${req.body.userAvatar}`;

            fs.unlink(path, (err) => {if (err) {
                console.error('No existe el archivo',err)
                }
            })

            cb(null, ruta)
        },
        filename:(req,file,cb)=>{
            const ext = file.originalname.split('.').pop();
            var archivo=`${req.body.userId}_${genRandonString(20)}.${ext}`;
            editarCampoAvatar(req.body.userId,archivo);
            cb(null,archivo)
        }
    });

    return multer({storage});
}



router.get('/', userController.getUsers);
router.post('/avatar',saveAvatarUser().single('imgAvatar'), userController.postUserAvatar);
router.get('/:id', userController.getUser);
router.post('/:id', userController.setUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);



module.exports = router;
