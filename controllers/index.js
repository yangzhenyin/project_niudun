// 这里是子路由
// 引入 express
var express = require('express');

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
    res.render('dashboard/settings', {
        // 留空，用于数据添加
        
    });
});
