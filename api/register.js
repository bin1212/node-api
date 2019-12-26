var express = require('express');
var router = express.Router();
var UserModel = require('../model/UserModel')
var respondMsg = require('../services/resultMsg')
var jwt = require('jsonwebtoken')
var randtoken = require('rand-token');
var blacklist = require('express-jwt-blacklist');

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
        if(result.length){
            var sqlPassword = result[0].password
            var loginNum = result[0].loginNum
            if(sqlPassword === password){
                var token = jwt.sign(
                    {   user:result[0],
                        blackIdBin:result[0].id + '_' + randtoken.generator({ chars: '0-9' }).generate(6)
                    },
                    'secretbin1995',
                    {expiresIn:3600 * 24}
                )
                respondMsg.ObjectResult.resultCode=200;
                respondMsg.ObjectResult.resultContent = {
                    access_token:token,
                    expiresIn:3600 * 24,
                    name:result[0].username,
                    loginNum:loginNum?loginNum:0,
                    updateTime:new Date(result[0].update_time).getTime(),
                };
                //更新登录次数
                userModel.init()
                userModel.updateLoginMsg(result[0].id,loginNum,function(err, result){
                    console.log(result)
                })
                respondMsg.ObjectResult.detailDescription = null
                res.json(respondMsg.ObjectResult)
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
router.put('/logout',function(req,res,next){
    blacklist.revoke(req.user)
    respondMsg.result.resultCode=200;
    respondMsg.result.detailDescription = 'success'
    respondMsg.result.resultContent = []
    res.send(respondMsg.result);
})
router.get('/test',function(req,res,next){
    res.send('测试测试');
})
module.exports = router