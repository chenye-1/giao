$(function () {
    // 登陆与注册盒子的切换
    $('#link_reg').on('click', function () {
        $('.loginbox').hide()
        $('.regbox').show()
    })
    $('#go-login').on('click', function () {
        $('.loginbox').show()
        $('.regbox').hide()
    })
    layui.form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var password = $('.regbox [name=password]').val();
            if (value !== password) {
                return "两次密码不一致"
            }
        }
    });

    // 注册
    $('#regForm').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $("#regForm [name=username]").val(),
                password: $("#regForm [name=password]").val()
            },
            success(res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg('注册成功')
                $('#go-login').click()
            }
        })
    })

    // 登陆
    $('#loginform').submit(function (e) {
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })

})

