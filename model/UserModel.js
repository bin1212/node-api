function  UserModel(){
    var connection;
    this.init = function(){
        var mysql = require('mysql');
        connection = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'wenbin1995',
            port:'3306',
            database : 'mydata'
        });
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