var express = require('express');
var router = express.Router();
var UserModel = require('../model/UserModel')
var respondMsg = require('../services/resultMsg')

var userModel = new UserModel()
router.post('/register',function(req,res,next){
    // console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;
    userModel.init()
    userModel.select(username,function(err, result){
        if(result.length){
            respondMsg.result.resultCode=10001;
            respondMsg.result.detailDescription = '该账号账号已存在'
            res.send(respondMsg.result);
        }else{
            userModel.init()
            userModel.insert(username,password,function(err, result){
                if(err){
                    respondMsg.result.resultCode=10002;
                    respondMsg.result.detailDescription = '注册失败'
                    res.send(respondMsg.result);
                }else if(!result.affectedRows){
                    respondMsg.result.resultCode=10003;
                    respondMsg.result.detailDescription = '注册失败'
                    res.send(respondMsg.result);
                }else{
                    respondMsg.result.resultCode = 200;
                    respondMsg.result.detailDescription = null
                    res.send(respondMsg.result);
                }
            })
        }
    })
})
router.post('/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    userModel.init()
    userModel.select(username,function(err, result){
        console.log(err,'err',result)
        if(result.length){
            var sqlPassword = result[0].password
            if(sqlPassword === password){
                respondMsg.result.resultCode=200;
                respondMsg.result.detailDescription = null
                res.send(respondMsg.result);
            }else{
                respondMsg.result.resultCode=10002;
                respondMsg.result.detailDescription = '账号密码不匹配'
                res.send(respondMsg.result);
            }
        }else{
            respondMsg.result.resultCode=10001;
            respondMsg.result.detailDescription = '账号不存在'
            res.send(respondMsg.result);
        }
    })
})
router.get('/test',function(req,res,next){
    res.send('测试测试');
})
module.exports = router