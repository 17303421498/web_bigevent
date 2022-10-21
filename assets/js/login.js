$(function() {
    $("#link_reg").on('click', function() {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on('click', function() {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    //先获取到layui.js里面的form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义密码框的规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //自定义确认密码框的规则
        //value是确认密码框里面的值
        repwd: function(value) {
            //先拿到密码框里面的值
            var pwd = $(".reg-box [name=password]").val()
                //然后判断确认密码框里的值是否和密码框里的值相同
            if (pwd !== value) {
                //不相同返回一个提示消息即可
                return '两次密码输入不一致'
            }
        }
    })

    $("#form_reg").on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功')
            })
        $("#link_login").click()
    })

    $("#form_login").on('submit', function(e) {
        e.preventDefault()

        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})