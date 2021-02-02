$(function () {
    // 请求数据
    getUserInfo()
})
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        success(res) {
            if (res.status !== 0) return layui.layer.msg('获取数据失败')
            renderAvatar(res.data)
        }
    })
}
// 渲染数据
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.textAvatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.textAvatar').html(first).show()
    }
}

// 退出
var layer = layui.layer
$('#logout').on('click', function () {
    layer.confirm('你确定要退出吗', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token')
        location.href = '/login.html'

    });
})