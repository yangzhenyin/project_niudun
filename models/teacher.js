// 处理teacher数据表的数据

var db = require('../config/db');

// 下一步通过db处理数据

// 添加数据
// 暴露添加老师信息的数据库的方法
module.exports.add = function (body, callback) {
    // body 即表单数据，这里的 body = req.body 是由 body-parser 解析并且挂载 req 对象上的
    // 往数据库中插入数据
    // 这里的 callback 是一个回调函数，里面有两个参数 err 和 rows，也就是传过去的接收的参数 result
    // 返回的 rows 是一个对象
    db.query('INSERT INTO `teacher` SET ?', body, callback);
}

// 展示数据
// 暴露查询老师数据的数据库的方法，从数据中查询数据，然后渲染到页面上
module.exports.show = function (callback) {
    // 这里的 callback 是回调函数，里面有两个参数， err 和 rows，返回的 rows 是一个数组
    // 这里是查询数据库，从里面读取添加老师的列表，然后渲染到页面上
    db.query('SELECT * FROM `teacher`', callback);

}

// 查询单个讲师的数据，用于渲染
module.exports.find = function(tc_id, callback) {
    // 根据 传过来的特定的 id 进行查询对应的老师数据
    // 这里的意思就是拼接字符串，是查找条件
    db.query('SELECT * FROM `teacher` WHERE tc_id = ' + tc_id, callback);
};

