var sql_config = require('../config/sql_config')

function CommonModel(){
    this.connection;
    this.init = function(){
        var mysql = require('mysql');
        sql_config.database = 'mydata'
        this.connection = mysql.createConnection(sql_config);
        this.connection.connect();
    };
}
module.exports = CommonModel