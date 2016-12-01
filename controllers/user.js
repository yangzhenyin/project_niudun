// 引入 express
var express = require('express');

// 创建路有对象
var router = express.Router();

// 暴露路由
module.exports = router;

// 设置对应要渲染的页面，/user 使用户列表
router.get('/', function(req, res) {
    // 渲染用于页面
    res.render('users/user', {
        // 留空对象，用于添加数据

    });
});

// 设置对应要渲染的页面，/user/profile 是查看用户信息
router.get('/profile', function(req, res) {
    // 渲染对应页面
    res.render('users/profile', {
        // 留空对象，用于添加数据

    });
});
