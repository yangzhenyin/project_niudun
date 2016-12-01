var mysql = require('mysql');

// 连接本地数据库
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3307',
    user     : 'root',
    password : 'yang35602',
    database : 'niudun'
});

// 暴露接口
module.exports = connection;
