// 引入 express 核心模块
var express = require('express');

// 创建路由模块
var router = express.Router();

// 暴露路有接口
module.exports = router;

// 设置子路由，根据 /advert 请求路径，渲染广告页面
router.get('/', function(req, res) {
    // 渲染广告页面
    res.render('adverts/advert_list', {
        // 留一个空对象，用于数据添加

    });
});

// 设置子路由， 根据 /advert/add 渲染添加广告的页面
router.get('/add', function(req, res) {
    console.log('aa');
    // 渲染添加广告的页面
    res.render('adverts/advert_add', {
        // 留一个空对象用于添加数据

    });
});
