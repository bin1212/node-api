var express = require('express');
var router = express.Router();
var querystring = require('querystring')
var respondMsg = require('../services/resultMsg')
var UserEditModel = require('../model/UserEditModel')
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
initData = JSON.stringify(initData)
var userEditModel = new UserEditModel()
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
module.exports = router