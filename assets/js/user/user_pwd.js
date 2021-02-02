$(function () {
    var form = layui.form
    form.verify({
        oldpwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            if ($('.layui-form [name=oldPwd]').val() == value) return '原密码不能与新密码相同'
        },
        affirmpwd(value) {
            if ($('.layui-form [name=newPwd]').val() !== value) return '两次密码输入不一致'
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success(res) {
                console.log(res);
                if (res.status !== 0) return layui.layer.msg('修改密码失败')
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})