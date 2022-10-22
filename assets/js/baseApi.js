$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url

        if (options.url.indexOf('/my') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }

        //不论成功还是失败都会调用的函数
        options.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
})