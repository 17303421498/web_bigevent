$(function() {
    getUserInfo()

    var layer = layui.layer

    //点击退出按钮
    $("#btnLogout").on('click', function() {
        layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function(index) {
            //1.清空本地储存中的token
            localStorage.removeItem('token')

            //2.重新跳转到登录页面
            location.href = '/login.html'

            //3.关闭询问框
            layer.close(index)
        })
    })

})

//获取用户的信息
function getUserInfo() {
    $.ajax({
        methods: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvater(res.data)
        },
        //不论成功还是失败都会调用的函数
        complete: function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')
                location.href = '/login.html'
            }
        }
    })
}


//渲染用户头像
function renderAvater(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    console.log(name)
        //2.设置欢迎文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)

    //3.按需渲染用户头像
    if (user.user_pic !== null) {
        //3.1用户有头像
        $(".text-avater").hide()
        $(".layui-nav-img").attr('src', user.user_pic).show()
    } else {
        //3.2渲染文本头像
        $(".layui-nav-img").hide()
        var first = name[0].toUpperCase()
        $(".text-avater").html(first).show()
    }
}