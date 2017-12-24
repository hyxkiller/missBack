const Good = require('../model/goods');
const { getParam } = require('../utils/utils');

const list = function(req,res,next){
    Good.find({})
        .sort({_id:-1})
        .then((result)=>{
            res.json(getParam({
                result
            }))
        })
}
const addMsg = function(req,res,next){
    const { goodsname, price, count, num, goodslogo } = req.body;
    const willSaveGoods = new Good({
        goodsname,
        price,
        count,
        num,
        goodslogo: req.file && req.file.filename ? req.file.filename : ''
    })
    willSaveGoods.save().then(() => {
        res.json(getParam({
            success: true
        }))
    })
}

const updateMsg = function(req,res,next){
    const { goodsname, price, count, num, goodslogo } = req.body;
    if(num){
        const setObj = {
            goodsname, price, count
        }
        if(req.file && req.file.filename){
            setObj.goodslogo = req.file.filename
        }
        Good.update({num},{
            $set: setObj
        }).then(() => {
            res.json(getParam({
                success: true
            }))
        })
    }
}

const deleteGoods = function(req,res,next){
    const { num } = req.query;
    Good.remove({num: num})
        .then((result) => {
            res.json(getParam({success: true}))
        })
}

const findGoods = function(req,res,next){
    var key = req.query.key,
        val = req.query.val
    switch(key){
        case "goodsname": 
            Good.find({goodsname: eval('/' + val+ '/')})//eval加正则实现模糊查询
                .then((result) => {
                    res.json(getParam({
                        success: true,
                        result
                    }))
                })
                return
        case "price": 
            Good.find({price: eval('/' + val+ '/')})
                .then((result) => {
                    res.json(getParam({
                        success: true,
                        result
                    }))
                }) 
                return
        case "count": 
            Good.find({count: eval('/' + val+ '/')}) 
                .then((result) => {
                    res.json(getParam({
                        success: true,
                        result
                    }))
                }) 
            return
    }
} 



module.exports = { addMsg, list ,deleteGoods, updateMsg, findGoods }