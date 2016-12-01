var express = require('express');

var router = express.Router();
// 暴露接口
module.exports = router;

// 设置登录的子路由，渲染登录页面
router.get('/', function(req, res) {
    res.render('login/login', {

    });
});
