var env = require('./mode_env');

var sql_config = {
    host:'localhost',
    user:'root',
    password:env === 'production' ? '123456' : '123456',
    port:'3306',
    database : ''
}
module.exports = sql_config
