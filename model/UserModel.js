var sql_config = require('../config/sql_config')
function  UserModel(){
    var connection;
    this.init = function(){
        var mysql = require('mysql');
        sql_config.database = 'mydata'
        connection = mysql.createConnection(sql_config);
        connection.connect();
    };
    this.insert = function(username,password,callback){
        var userAddSql = 'INSERT INTO members(username,password) VALUES(?,?)';
        var userAddSql_Params = [username,password];
        connection.query(userAddSql,userAddSql_Params,function (err, result) {

            callback(err,result);

        });
        connection.end();
    }
    
    this.select = function(name,callback){
        var userGetSql = 'SELECT * FROM members where username = "'+name+'"';

        connection.query(userGetSql,function (err,result) {

             callback(err,result);

        });
        connection.end();
    }
    //根据id
    this.idSelect = function(id,callback){
        var userGetSql = 'SELECT * FROM members where id = "'+id+'"';

        connection.query(userGetSql,function (err,result) {

             callback(err,result);

        });
        connection.end();
    }
    this.updatePassword = function(id,password,callback){
        var userAddSql = "update members set password ='" + password + "' where id = '"+id+"'";
        var userAddSql_Params = [id,password];
        connection.query(userAddSql,userAddSql_Params,function (err, result) {

            callback(err,result);

        });
        connection.end();
    }
    this.updateLoginMsg = function(id,loginNum,callback){
        loginNum = loginNum ? loginNum+1 : 1
        var userAddSql = "update members set loginNum ='" + loginNum + "' where id = '"+id+"'";
        var userAddSql_Params = [id,loginNum];
        connection.query(userAddSql,userAddSql_Params,function (err, result) {
            if (callback) callback(err,result);

        });
        connection.end();
    }
}
module.exports = UserModel