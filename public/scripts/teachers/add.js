// 定义添加讲师的模块函数
define(function(require, exports, module) {
    // 引入 jquery 函数
    var $ = require('jquery');

    // 添加到那个接口
    $('#addTeacher').on('submit', function() {
        // submit 有默认的提交行为
        
        // 1.将数据提交到那个接口
        // 2.以何种方式提交
        // 3.传递哪些参数
        var forData = $(this).serialize();
        $.ajax({
            url: '/teacher/add',//所谓接口就是路径，设置的后台请求接口，就是请求路径
            type: 'post',
            data: forData, //这里的 forData 是表单序列化后的，
            success: function(info) {
                // 判断往数据库中添加数据是否正常完成
                if (info.code === 10000) {
                    // 正常，并且完成就刷新
                    location.reload();
                }
            }

        });
        return false;//阻止跳转
    });
})
