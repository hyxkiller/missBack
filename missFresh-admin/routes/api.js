const express = require('express');
const router = express.Router();
const userController  = require('../controller/user.js')
const goodsController = require('../controller/goods.js')

const upload = require('../utils/uploadimg') 
//用户相关路由
router.post('/users/signUp',userController.signUp)
router.post('/users/signIn',userController.signIn)
router.get('/users/isLogin',userController.isLogin)
router.get('/users/logout',userController.logout)

//商品相关路由
router.post('/goods/addMsg',upload.single('logo'),goodsController.addMsg)
router.post('/goods/updateMsg',upload.single('logo'),goodsController.updateMsg)
router.get('/goods/list',goodsController.list)
router.get('/goods/deleteGoods',goodsController.deleteGoods)
router.get('/goods/findGoods',goodsController.findGoods)

module.exports = router