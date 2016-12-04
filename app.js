//引入 express
var express = require('express');

// 引入解析请求头的核心模块
var bodyParser = require('body-parser');

// 引入解析设置 cookie 的中间件
var cookieParser = require('cookie-parser');

// 引入解析设置 session 的中间件
var session = require('express-session');

// 创建 app 实例化对象
var app = express();

// 配置 xtpl 加载路径和使用的文件的后缀名 xtpl
// 指定模板的具体位置，指定模板放在哪里
// 指定模板目录和路径
app.set('views', './views');
// 指定使用的模板引擎
app.set('view engine', 'xtpl');

// 应用 cookie 中间件
// 此中间件会在响应 res 中设置 cookie 方法
app.use(cookieParser());

// 应用 session 中间件
// 会在请求 req 上 加一个 session 属性
app.use(session({
    secret: 'keyboard cat',
    resave: false
}));

// 解析 application/x-www-form-urlencoded 
// 当有这个请求头的时候，body-parser 方法会自动解析，并且把解析到的数据挂载到 req 对象上
app.use(bodyParser.urlencoded({ extended: false }));

// 设置暴露静态资源目录，这里的 '/' 就代表根目录 public 和 uploads
app.use('/', express.static('public'));

app.use('/', express.static('uploads'));

// 检测是否是登录状态，是登陆状态就往后执行，不是就跳转到登录页面
app.use(function (req, res, next) {
    // 获取当前的要访问的接口 （也就是登录路径）
    var url = req.originalUrl;

    // 获取 req.session.loginfo 上的属性值，记录的是登录状态
    var loginfo = req.session.loginfo;
    // 把 loginfo 登录信息挂在到全局对象上
    // 挂载到 app.locals 全局对象下，在任何视图下都能获取到
    app.locals.loginfo = loginfo;
    // 判断是否是登录状态和是否是登录页面的路径
    if (url != '/login' && !loginfo) {
        // 跳转到登陆页面
        return res.redirect('/login');
    }
    next();
});



// 加载设置好的资源请求路径，加载子路由，仪表盘和设置
var index = require('./controllers/index');

// 加载子路由，用户列表和查看用户信息
var user = require('./controllers/user');

// 加载子路由，老师列表和添加老师信心
var teacher = require('./controllers/teacher');

// 加载登录路由，登录页面
var loggin = require('./controllers/login');

// 暴露跟登录有关的接口
app.use('/login', loggin);

// 加载子路由，广告列表和添加广告
var advert = require('./controllers/advert');

// 加载子路由，渲染添加课程的页面
var course = require('./controllers/course');

// 加载路由，根据请求路径去请求对应的页面
// 设置挂载子路由，对于不同的请求路径去找对应的接口
// 收到  / 请求，找到对应的文件进行渲染
app.use('/', index);

// 暴露用户有关的接口
app.use('/user', user);

// 暴露跟老师有关的接口
app.use('/teacher', teacher);

// 暴露跟广告有关的接口
app.use('/advert', advert);

// 暴露跟课程有关的接口
app.use('/course', course);


// 绑定端口号开启服务器
app.listen(3000, function () {
    console.log('running...');
});
