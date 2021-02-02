$(function () {
    // var form = layui.form
    // form.verify({
    //     nickname(value) {
    //         if (value.length > 6) {
    //             return "昵称长度必须在1~6之间"
    //         }
    //     }
    //     // nickname:[
    //     //     /^[\S]{1,6}$/,'昵称必须1-6位，切不能出现空格'
    //     // ]
    // })

    // function initUserInfo() {
    //     $.ajax({
    //         type: 'get',
    //         url: '/my/userinfo',
    //         success: function (res) {
    //             form.val('formUserInfo', res.data)
    //         }
    //     })
    // }
    // initUserInfo()
    // $('#btn_reset').on('click', function (e) {
    //     e.preventDefault();
    //     initUserInfo()

    // })
    // $('.layui-form').on('submit', function (e) {
    //     e.preventDefault();
    //     $.ajax({
    //         type: 'post',
    //         url: '/my/userinfo',
    //         data: $(this).serialize(),
    //         success: function (res) {
    //             console.log(res);
    //             if (res.status !== 0) return layui.layer.msg("更新用户信息失败")
    //             layui.layer.msg("更新用户信息成功")
    //             window.parent.getUserInfo()

    //         }
    //     })
    // })



    // again
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                $('.layui-form [name=id]').val(res.data.id)
                $('.layui-form [name=username]').val(res.data.username)
                $('.layui-form [name=nickname]').val(res.data.nickname || res.data.username)
                $('.layui-form [name=email]').val(res.data.email)
                // layui.form.val('formUserInfo', res.data)
            }
        })
    }
    initUserInfo()

    // 重置
    $('.layui-form').on('reset', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    // 修改提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg('更新用户信息失败')
                layui.layer.msg('更新用户信息成功')
                window.parent.getUserInfo()
                
            }
        })
    })
})