// 定义添加讲师的模块函数
define(function(require, exports, module) {
    // 引入 jquery 函数
    var $ = require('jquery');

    // 引入表单验证插件
    require('validate');

    // 引入添加时间的 bootstrap 插件
    require('datepicker');

    // 使用中文
    require('language');

    // 引入一个发送 ajax 请求的插件
    require('form');
    console.log();
    // 添加到那个接口
    // $('#addTeacher').on('submit', function() {
    $('#addTeacher').validate({
        onKeyup: true, //设置在什么时候开始进行表单验证
        sendForm: false, //阻止表单默认提交行为
        eachInvalidField: function() {
            // 当元素不合法时，会触发这个方法
            // $(this) 指的不合法的表单元素，当前正在表单验证的某一个 input 元素
            // 绑定委托事件
            //寻找到当前验证元素的父元素
            $(this).parents('.form-group')
            .removeClass('has-success')
            .addClass('has-error');

            // 对号或者 X号样式
            $(this).next()
            .removeClass('glyphicon-ok')
            .addClass('glyphicon-remove');
            
        },
        eachValidField: function() {
            // 当验证元素合法时能触发这个方法
            $(this).parents('.form-group')
            .addClass('has-success')
            .removeClass('has-error');

            $(this).next()
            .addClass('glyphicon-ok')
            .removeClass('glyphicon-remove');
        },
        valid: function() {
            // 当所有的验证都合法的时候才能触发这个事件
            // jquery.form.js专门ajax提交表单的

            // 获取当前的 action 的属性值，来判断是编辑还是添加，同时去掉空格
            var url = $(this).attr('action').trim();

            $(this).ajaxSubmit({
                url: url,//所谓接口就是路径，设置的后台请求接口，就是请求路径
                type: 'post',//请求方式
                success: function(info) {
                    // 判断往数据库中添加数据是否正常完成
                    if (info.code === 10000) {
                        // 正常，并且完成就刷新
                        location.reload();
                    }
                }
            });
        }
    });
})
