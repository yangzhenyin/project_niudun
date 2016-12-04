var express = require('express');

var router = express.Router();

// 引入操作数据库的方法，讲师表
var tcModel = require('../models/teacher');

// 暴露接口
module.exports = router;

// 设置登录的子路由，渲染登录页面
router.get('/', function(req, res) {
    res.render('login/login', {

    });
});

// 设置登录请求的路由，向后台发送数据，记录当前用的登录状态
router.post('/', function(req, res) {
    // 根据请求过来的数据中的数据，然后根据数据里面的条件查询数据库中的数据，进行对比，有就记录登录状态，
    // 同时跳转到首页
    var body = req.body;
    tcModel.authored(body, function(err, result) {
        // 判断操作数据库的过程中是否发生异常
        if (err) {
            throw err;
        }
        // 就是存在，记录登录状态
        req.session.loginfo = result[0];
        
        // 返回给前端说明已经登陆成功
        res.json({
            code: 10000,
            msg: '登陆成功!',
            result: {}
        });
    });
});
