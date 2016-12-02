//定义展示老师详细信息的模块
define (function(require, exports, module) {
    // 加载 jquery 插件
    var $ = require('jquery');
    // 加载 bootstrap 插件
    require('bootstrap');

    // 引入 template 模板
    var template = require('template');

    // 使用 modal() 方法，渲染模态框
    // 获取模态框的 id ，用于显示模态框
    var teacherModal = $('#teacherModal');
    
    // 使用给父元素绑定委托事件
    $('#teacherList').on('click', 'a.preview', function() {
        // 查找到当前点击查询的按钮上面的 data-id 属性值，是要渲染显示的当前的用户的 id
        var tc_id = $(this).attr('data-id');   

        // 点击查询的时候发 ajax 请求
        $.ajax({
            url: 'teacher/preview',//请求路径，也就是请求接口
            type: 'post',//请求方式
            data: {tc_id: tc_id},
            success: function(info) {//请求响应成功后执行的函数方法     
                // 把响应过来的数据使用 artTemplate 模板渲染页面上
                // 使用模板引擎，把数据加载过去，得到一个返回值
                // 第一个参数是引入的模板引擎的  script 标签的 id
                var html = template('teacherTpl', info);

                //把使用模板引擎渲染好的 HTML 的标签添的返回值 html 加到对应的 table 的位置
                //把前面的覆盖
                teacherModal.find('table').html(html);
                //teacherModal.find('table').append(html);

                // 把模态框显示出来
                // 使用 modal() 方法，渲染模态框
                teacherModal.modal();
            }
        });
        // 阻止默认行为
        return false;
    });
});
