// 引入 express 核心模块
var express = require('express');

// 创建路由核心模块
var router = express.Router();

// 暴露路由接口
module.exports = router;

// 设置子路由，根据  /course/add, 渲染添加课程的页面
router.get('/add', function(req, res) {
    // 渲染添加课程的页面
    res.render('courses/course_add', {
        // 留一个空对象，用于添加数据

    });
});
