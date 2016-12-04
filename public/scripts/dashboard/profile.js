// 定义模块
define(function(require, exports, module) {
    // 引入 jquery
    var $ = require('jquery');
    // 引入 datepicker 的日期插件
    require('datepicker');
    // 汉化
    require('language');

    // 引入省市县三级联动插件
    require('region');

    // 引入上传文件的插件
    require('uploadify');

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

    // 省市县三级联动
    // 引入这个插件，这个插件会提供一个 region() 方法，在内部会发送一个 ajax 请求
    // 同时里面会自动接收响应过来的数据渲染到 hometown 对应的位置
    $('.hometown').region({
        url: '/region'
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

    // 上传文件
    // 这里请求方式类似于 ajax 请求，是由这里面的 flash 插件发送的请求
    // 上传头像的 flash 插件
    $('#upfile').uploadify({
        buttonText: '',//清除默认的一些字
        height: '120px',//设置上传头像的盒子的高度为120px
        fileObjName: 'tc_avatar',//设置上传头像的名字
        swf: 'assets/uploadify/uploadify.swf',//flash 文件路径
        uploader: '/upfile', //后台接口（路径）
        itemTemplate: '<span></span>', // 清除上传头像的 flash 插件的默认样式
        onUploadSuccess: function(file, data) {//监听上传文件成功的事件
            //data是上传成功后响应回来的数据，响应回来的是字符串，先转化成对象
            var data = JSON.parse(data);
            // 在上传头像的文件名的前面加上 根路径
            $('.preview img').attr('src', '/avatars/' + data.filename);
        }
    });
});
