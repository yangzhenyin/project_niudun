// 配置依赖的模块的路径
seajs.config({
    base: '/assets',//到时候 base 这个路径会自动拼接到 jquery 代表的路径上
    alias: {
        jquery: 'jquery/jquery.js',
        validate: 'jquery-validate/jquery-validate.js',//form表单验证的插件
        form: 'jquery-form/jquery.form.js',//发送 ajax 请求的插件
        bootstrap: 'bootstrap/js/bootstrap.js',//整体样式
        datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker',//引入bootstrap添加时间的插件
        language: 'bootstrap-datepicker/js/bootstrap-datepicker.zh-CN.min.js',//事件插件的中文
        template: 'artTemplate/template-native.js',//原生版artTemplate
        nprogress: 'nprogress/nprogress.js'//进度条
    },
    // 实现全局加载，要想执行，但是要在后面执行以下 use 一下
    preload: ['/scripts/common', 'bootstrap']
});
// 加载依赖的模块
