// 使用模块化规范定义 js
define(function (require, exports, module) {
    // 加载依赖的模块
    var $ = require('jquery'); //这里的 jquery 是配置好的路径
    // 折叠，显示和隐藏
    // 给 .navs 下的 ul 前面为a 标签的绑定点击事件
    $('.navs ul').prev('a').on('click', function () {
        $(this).next().slideToggle();
    });

    // 设置状态样式，循环所有的 a， 当 href 属性和样式就在那个上面的路径相同时
    $('.navs a').each(function () {
        // 获得当前的元素的属性和路径
        var href = $(this).attr('href').slice(1);
        var pathname = location.pathname;
        // 判断当前的路径中是否包含当前点击的 a 标签的 href 属性中的连接地址
        // lastIndexOf() 方法可返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
        if (pathname.lastIndexOf(href) == 1) {
            //等于 1 就是包含，包含就添加类样式属性 active
            $(this).addClass('active');
            //closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
            //parents() 方法是匹配所有的父元素，一直倒根节点
            // 这里是为了让里面有子级隐藏标签的，当点击里面的子级标签的时候让父级元素 ul 显示出来
            $(this).closest('ul').show();

            return false;
        }
    });
    /*$('.navs a').each( function() {
        // 获取当前的请求路径
        var pathname = location.pathname;
        var href = $(this).attr('href');
        if (href === pathname) {
            // 当属性和当前请求路径相同的时候就是 class 选中状态
            $(this).addClass('active');
            // 找到满足条件的就不在寻找
            return false;
        }
    });*/
});
