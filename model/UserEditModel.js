var sql_config = require('../config/sql_config')
var CommonModel = require('./CommonModel')

function UserMsgModel(){
    CommonModel.apply(this,arguments)
    // this.init()
    this.selectMsg = function(id,callback){
        var userGetSql = 'select * from members inner join user_message on members.id = user_message.uid where members.id = "'+id+'"';
        this.connection.query(userGetSql,function (err,result) {
            if(callback) callback(err,result);
            
        });
        this.connection.end();
    }
    this.insertMsg = function(id,message,callback){
        var userAddSql = 'INSERT INTO user_message(uid,message) VALUES(?,?)';
        var userAddSql_Params = [id,message];
        this.connection.query(userAddSql,userAddSql_Params,function (err, result) {

            callback(err,result);

        });
        this.connection.end();
    }
    this.updateMsg = function(uid,message,callback){
        var userAddSql = "update user_message set message ='" + message + "' where uid = '"+uid+"'";
        var userAddSql_Params = [uid,message];
        this.connection.query(userAddSql,userAddSql_Params,function (err, result) {

            callback(err,result);

        });
        this.connection.end();
    }
}
module.exports = UserMsgModel