// 这里是子路由
// 引入 express
var express = require('express');

// 引入操作数据库的方法
var tcModel = require('../models/teacher');

// 加载省市县三级联动的数据
var region = require('../models/region.json');

// 引入操作路径的核心模块
var path = require('path');

// 这里的 __dirname 路径是到当前的目录下
var rootPath = path.join(__dirname, '../');

// 引入上传文件的核心模块
var multer = require('multer');

// 自定义设置上传图片保存的路径
var storage = multer.diskStorage({
    // 自定义文件存储路径
    destination: function(req, file, cb) {
        // 这里指定的是文件存储的自定义路径
        cb(null, rootPath + 'uploads/avatars');
    },
    filename: function(req, file, cb) {//存储成功后执行的回调函数
        // 这里指定的是文件存储时的名字
        // 新名字 = 原始名 + 时间戳 + 后缀名
        // 获取上传文件的名字
        var originalname = file.originalname;
        // 获取后缀名与前面正常名字的分隔符  '.' 的索引
        var lastIndex = originalname.lastIndexOf('.');
        // 获取原始名分隔符前面的部分
        var filename = originalname.slice(0, lastIndex);
        // 获取原始名后面的后缀名
        var fileExt = originalname.slice(lastIndex);//从 '.' 截取到最后面
        // Date.now()是一个时间戳，用于保证每一个上传文件的名字的不同
        // 使用自己拼接好的名字
        cb(null, filename + '-' + Date.now() + fileExt);
    }
});

// 上传的头像的存储路径
// 使用自定义的存储文件路径
var upload = multer({storage: storage});
//var upload = multer({dest: rootPath + '/uploads/avatars'});

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

// 请求省市县三级联动的数据
router.get('/region', function(req, res) {
    // 把请求的数据响应回去    
    res.json(region);
});

// 上传文件的子路由
router.post('/upfile', upload.single('tc_avatar'), function(req, res) {
    // 获取传过来的数据
    // 只获取上传头像的 用户id 和 头像文件名
    var body = {
        tc_id: req.session.loginfo.tc_id,
        tc_avatar: req.file.filename
    };
    // body-parser中间件会把 post 提交的表单数据挂载到 req.body 上
    // 调用操作数据库的方法，把头像的名字存储到数据库中
    tcModel.update(body, function(err, result) {
        // 判断操作数据库是否有异常
        if (err) {
            throw err;
        }
        // 成功了，就响应给前端
        // 把上传的文件的信息数据返回给前端
        res.json(req.file);
    });
});
