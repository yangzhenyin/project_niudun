// 引入 require 核心模块
var express = require('express');

// 引入操作数据库的核心模块，跟老师有关
var tcModel = require('../models/teacher');

// 创建路由
var router = express.Router();

// 暴露路由接口
module.exports = router;

// 根据 /teacher 路径，渲染跟 teacher 列表的相关页面
router.get('/', function(req, res) {
    // 连接数据库，获取数据，加载到 views 视图页面中的具体位置
    // 引入查询数据的方法，从数据库中查询所有的老师信息，然后使用 xtpl 模板渲染到页面上
    // 这里的 result 是从从数据中查询数据返回的数组数据 rows
    tcModel.show(function(err, result) {
        // 渲染对应的页面
        res.render('teachers/index', {
            // 留一个空对象，用于加载数据
            // 把从数据库中查到的数据渲染到页面上
            teachers: result
        });
    });
    
});

// 根据 /teacher/add 路径，渲染跟添加 teacher 有关的页面
router.get('/add', function(req, res) {
    //渲染跟添加讲师有关的页面
    res.render('teachers/add', {
        // 留一个空对象，用于添加数据

    });
});

// 根据 /teacher/add:tc_id 路径，查询数据库，用于渲染编辑教师的页面
router.get('/edit/:tc_id', function(req, res) {
    // 引用查询数据库的方法，从数据库中查找对应 tc_id 的教师信息
    // 获取要查看的当前教师信息的 tc_id 
    var tc_id = req.params.tc_id;
    tcModel.find(tc_id, function(err, result) {
        // 判断是否发生异常
        if (err) {
            throw err;
        }
        //渲染跟添加讲师有关的页面
        res.render('teachers/add', {
            // 留一个空对象，用于添加数据

        });
    });
});

// 根据 /teacher/add 路径 和 post 请求方式，进行操作数据库的操作
router.post('/add', function(req, res) {
    // 进行数据库操作
    // 引用往数据库中添加老师信息的方法
    // 这里的 body 是通过 body-parser 方法解析到的数据对象，并且挂载到了 req 对象上
    var body = req.body;
    // 往数据库中添加数据，添加老师的信息
    // 这里的 result 是往添加数据中添加完数据后返回的数据对象
    tcModel.add(body, function (err, result) {
        // 判断有没有发生异常
        if(err) {
            throw err;
        }

        // 响应结果
        // 往数据库中添加数据后完成后给前端返回一个信息，提示已经完成
        res.json({
            code: 10000,
            msg: '添加成功！',
            result: {}
        });

    });
});

