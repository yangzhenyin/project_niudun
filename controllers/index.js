// 这里是子路由
// 引入 express
var express = require('express');

// 引入操作数据库的方法
var tcModel = require('../models/teacher');

// 创建子路由
var router = express.Router();

// 暴露子路由接口
module.exports = router;

//根据不同的请求路由设置不同的处理函数
//收到请求，然后响应内容
router.get('/', function(req, res) {
    // 渲染页面 res.send('')只能发送一些字符串
    // 当执行这句代码的时候会自动到 views 目录下找到对应的页面进行渲染
    // 因为前面的已经使用 app.set('views', __dirname + '/views'); 配置好了就是使用 views 这个
    // 目录下的的页面进行渲染
    res.render('dashboard/index', {
        // 这里是以后可能会添加数据，留一个空对象在这里

    });
});

//设置路由，根据路由调用不同的处理函数
// 根据 settings 路由，调用处理函数
router.get('/settings', function(req, res) {
    // 获取当前记录的登录状态的用户的 id，根据这个 id，取数据库中查询数据然后渲染到个人中心页面上
    var tc_id = req.session.loginfo.tc_id;
    //调用操作数据的方法，从数据库中查询当前用户的数据，用于渲染页面时的数据
    tcModel.find(tc_id, function(err, result) {
        //查询得到的数据 result 是一个数组，里面的元素是一个对象，用于渲染页面时的数据
        res.render('dashboard/settings', result[0]);
    });
});

// 更新完善将讲师的资料
router.post('/update', function(req, res) {
    // 获取前端提交的数据
    var body = req.body;
    // 根据传过来的当前用户的 id，去更新完善当前讲师的资料
    // 调用数据库的方法
    tcModel.update(body, function(err, result) {
        // 判断操作数据库的时候是否发生异常
        if (err) {
            throw err;
        }
        // 提示前端更新数据完成
        res.json({
            code: 10000,
            msg: '数据更新完成!',
            result: {}
        });
    });
});

// 根据 settings 路由，调用处理函数
router.get('/repass', function(req, res) {
    res.render('dashboard/repass', {
        // 留空，用于数据添加
        
    });
});
