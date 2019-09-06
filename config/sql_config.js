var env = require('./mode_env');

var sql_config = {
    host:'localhost',
    user:'root',
    password:env === 'production' ? 'Wen1995!_' : 'wenbin1995',
    port:'3306',
    database : ''
}
module.exports = sql_config