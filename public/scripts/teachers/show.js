//定义展示老师详细信息的模块
define (function(require, exports, module) {
    // 加载 jquery 插件
    var $ = require('jquery');
    // 加载 bootstrap 插件
    require('bootstrap');

    // 使用 modal() 方法，渲染模态框
    var teacherModal = $('#teacherModal');
    // 使用给父元素绑定委托事件
    $('#teacherList').on('click', 'a.preview', function() {
        // 使用 modal() 方法，渲染模态框
        teacherModal.modal();
        // 阻止默认行为
        return false;
    });
});
