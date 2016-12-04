// 定义模块
define(function(require, exports, module) {
    // 引入 jquery 
    var $ = require('jquery');

    // 引入 ajax 插件
    require('form');
    // 监听 form 表单的提交事件
    // 会自动获取 form 表单中的属性值进行提交
    $('#login').on('submit', function() {
        // 发送 ajax 请求
        $(this).ajaxSubmit({
            url: '/login',
            type: 'post',
            success: function(info) {
                // 发送请求响应成功后执行这个方法
                // 判断登录是否成功
                if (info.code === 10000) {
                    //跳转到首页
                    location.href = '/';
                }
            }
        });
        // 阻止表单的默认行为
        return false;
    });
});
