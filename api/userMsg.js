var express = require('express');
var router = express.Router();
var querystring = require('querystring')
var Base64 = require('js-base64').Base64;
var respondMsg = require('../services/resultMsg')
var UserEditModel = require('../model/UserEditModel')
var UserModel = require('../model/UserModel')
var blacklist = require('express-jwt-blacklist');

var initData = {
    title:'',
    contentDetail:[
        {
            id:'1',
            content:'',
            children:[]
        },
    ]
}
initData = Base64.encode(JSON.stringify(initData))
var userEditModel = new UserEditModel()
var userModel = new UserModel()
router.get('/content',function(req,res,next){
    const id = req.user.user.id
    userEditModel.init()
    userEditModel.selectMsg(id,function(err,result){
        if(result && result.length){
            respondMsg.ObjectResult.resultCode=200;
            respondMsg.ObjectResult.detailDescription = ''
            respondMsg.ObjectResult.resultContent = result[0].message
            res.send(respondMsg.ObjectResult);
        }else{
            userEditModel.init()
            userEditModel.insertMsg(id,initData,function(err,result){
                respondMsg.ObjectResult.resultCode=200;
                respondMsg.ObjectResult.detailDescription = ''
                respondMsg.ObjectResult.resultContent = initData
                res.send(respondMsg.ObjectResult);
            })
        }
    })
})
router.put('/content/update',function(req,res,next){
    const id = req.user.user.id
    var msg = req.body.msg;
    msg = JSON.stringify(msg)
    userEditModel.init()
    userEditModel.updateMsg(id,msg,function(err,result){
        if(result && !err){
            respondMsg.ObjectResult.resultCode=200;
            respondMsg.ObjectResult.detailDescription = ''
            respondMsg.ObjectResult.resultContent = {}
            res.send(respondMsg.ObjectResult);
        }else{
            respondMsg.ObjectResult.resultCode=10001;
            respondMsg.ObjectResult.detailDescription = '保存失败'
            respondMsg.ObjectResult.resultContent = {}
            res.send(respondMsg.ObjectResult);
        }
    })
})
router.put('/user/change_password',function(req,res,next){
    const id = req.user.user.id
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    userModel.init()
    userModel.idSelect(id,function(err,result){
        if(err){
            respondMsg.result.resultCode=10001;
            respondMsg.result.detailDescription = 'select failed'
            respondMsg.result.resultContent = []
            res.send(respondMsg.result);
        }else if(oldPassword == result[0].password){
            userModel.init()
            userModel.updatePassword(id,newPassword,function(err,result){
                if(err){
                    respondMsg.result.resultCode=10002;
                    respondMsg.result.detailDescription = 'change failed'
                    respondMsg.result.resultContent = []
                    res.send(respondMsg.result);
                }else{
                    blacklist.revoke(req.user)
                    respondMsg.result.resultCode=200;
                    respondMsg.result.detailDescription = 'success'
                    respondMsg.result.resultContent = []
                    res.send(respondMsg.result);
                }
            })
        }else{
            respondMsg.result.resultCode=10003;
            respondMsg.result.detailDescription = '旧密码错误'
            respondMsg.result.resultContent = []
            res.send(respondMsg.result);
        }
        
    })
})
module.exports = router