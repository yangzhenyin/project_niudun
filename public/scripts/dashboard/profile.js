// 定义模块
define(function(require, exports, module) {
    // 引入 jquery
    var $ = require('jquery');
    // 引入 datepicker 的日期插件
    require('datepicker');
    // 汉化
    require('language');

    // 引入文本编辑器器插件
    var ck = require('ckeditor');

    // 在视图中使用 文本编辑器
    ck.replace('teacherIntroduce');

    // 引入发送 ajax 请求的插件
    require('form');

    $('.datepicker').datepicker({
        format: 'yyyy-mm-dd',//日期格式
        language: 'zh-CN'// 使用中文
    });

    // 监听 form 表单的 submit 事件，发送 ajax 请求
    $('#updateTeacher').on('submit', function() {

        // 提交ckeditor数据
        // 这句代码可以让 form 表单获取到文本编辑器里面的数据内容
        for(instance in CKEDITOR.instances) {
            CKEDITOR.instances[instance].updateElement();
        }

        // 当监听到 submit 的提交事件的时候，发送 ajax 请求
        $(this).ajaxSubmit({
            url: '/update',//请求接口（路径）
            type: 'post',//请求方式
            success: function(info) {
                // 判断更新是否成功
                // 提示更新数据完成
                    alert(info.msg);
                if (info.code === 10000) {
                    location.reload();
                }
            }
        });
        // 阻止 form 表单的默认提交行为
        return false;
    });
});
