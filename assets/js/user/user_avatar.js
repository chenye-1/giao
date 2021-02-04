// // 1.1 获取裁剪区域的 DOM 元素
// var $image = $('#image')
// // 1.2 配置选项
// const options = {
//     // 纵横比
//     aspectRatio: 1,
//     // 指定预览区域
//     preview: '.img-preview'
// }

// // 1.3 创建裁剪区域
// $image.cropper(options)


// $('#uploading').on('click', function () {
//     $('#file').click()
//     $('#file').on('change', function (e) {
//         var filelist = e.target.files
//         if (filelist.length == 0) return layui.layer.msg('请选择图片')
//         var file = filelist[0]
//         var imgURL = URL.createObjectURL(file)
//         $image
//             .cropper('destroy') // 销毁旧的裁剪区域
//             .attr('src', imgURL) // 重新设置图片路径
//             .cropper(options) // 重新初始化裁剪区域

//         // 另一种写法
//         // var reader = new FileReader() //  文件读取器
//         // console.log(reader);
//         // reader.readAsArrayBuffer(file)
//         // // onload事件  文件读取完毕
//         // reader.onload = function () {
//         //     console.log(reader.result);
//         //     $image
//         //         .cropper('destroy') // 销毁旧的裁剪区域
//         //         .attr('src', reader.result) // 重新设置图片路径
//         //         .cropper(options) // 重新初始化裁剪区域
//         // }
//     })

// })

// $('#confirm').on('click', function () {
//     var dataURL = $image
//         .cropper('getCroppedCanvas', {
//             // 创建一个 Canvas 画布
//             width: 100,
//             height: 100
//         })
//         .toDataURL('image/png')
//     $.ajax({
//         type: 'POST',
//         url: '/my/update/avatar',
//         data: {
//             avatar: dataURL
//         },
//         success(res) {
//             if (res.status !== 0) return layer.msg('更换头像失败！')
//             layer.msg('更换头像成功！')
//             window.parent.getUserInfo()
//         }
//     })
// })


// again
var $image = $('#image')
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

$('#uploading').on('click', function () {
    $("#file").click()
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length == 0) return layui.layer.msg('请选择图片')
        var file = filelist[0]
        var imgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
})

$('#confirm').on('click', function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success(res) {
            if (res.status !== 0) return layer.msg('更换头像失败！')
            layer.msg('更换头像成功！')
            window.parent.getUserInfo()
        }
    })
})