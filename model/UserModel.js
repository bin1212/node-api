var sql_config = require('../config/sql_config')
function  UserModel(){
    var connection;
    this.init = function(){
        var mysql = require('mysql');
        sql_config.database = 'mydata'
        console.log(sql_config)
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
}
module.exports = UserModel