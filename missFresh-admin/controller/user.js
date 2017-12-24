const User = require('../model/user')
const { getParam } = require('../utils/utils')
const bcrypt = require('bcrypt');
const async = require('async');

const signUp = function(req,res){
    const { username, password, roles } = req.body;
    User.findOne({username})
        .then((user) => {
            if(user){
                res.json(getParam({success: false}))
            }else{
                bcrypt.hash(password,10)
                      .then((password) => {
                          const willSaveUser = new User({
                              username,
                              password,
                              roles
                          })
                          willSaveUser.save().then(() => {
                              res.json(getParam({ success: true }))
                          })
                      })
            }
        })
}
const signIn = function(req,res){
    const { username, password } = req.body;
    User.findOne({username})
        .then((user) => {
            if(!user){
                res.json(getParam({login:false}))
            }else{
                async.waterfall([
                    function(cb){
                        bcrypt.hash(user.password,10).then((user_password) => {
                            cb(null, user_password)
                        })
                    },
                    function(user_password,cb){
                        bcrypt.compare(password,user_password)
                            .then((result) => {
                                if(result){
                                    req.session.username = user.username
                                    res.json(getParam({
                                        login: true,
                                        username: user.username
                                    }))
                                }else{
                                    res.json(getParam({login: false}))
                                }
                            })
                        cb(null,'')
                    }
                ],function(err,res){
                    console.log(res)
                })
            }   
        })
}
const isLogin = function(req,res){
    res.json(getParam({
        login: req.session.username ? true : false,
        username: req.session.username
    }))
}
const logout = function(req,res){
    req.session = null;
    res.json(getParam({
        logout : true
    }))
}

module.exports = { signUp, signIn, isLogin, logout }