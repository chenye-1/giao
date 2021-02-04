$(function () {
    function initCate() {
        // 获取文章分类
        $.ajax({
            method: 'get',
            url: '/my/article/cates/',
            success(res) {
                var htmlStr = template('artCatetpl', res)
                $('[name=cate_id]').html(htmlStr)
                layui.form.render()
            }
        })
    }
    initCate()
    // 初始化富文本编辑器
    initEditor()


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)
    $('.layui-btn-danger').on('click', function () {
        $("#file").click()
        $('#file').on('change', function (e) {
            var files = this.files
            if (files.length == 0) return
            var newImgURL = URL.createObjectURL(files[0])
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域
        })
    })

    var state='已发布'
    $("#btn-draft").on('click',function(){
        state='草稿'
    })
    $('#form-pub').on('submit',function(e){
        e.preventDefault()
        var fd=new FormData(this)
        fd.append('state',state)
        fd.forEach(function(k,v){
            console.log();
        })
        $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 400,
          height: 280
        })
        .toBlob(function(blob) {
          // 将 Canvas 画布上的内容，转化为文件对象
          // 得到文件对象后，进行后续的操作
          // 5. 将文件对象，存储到 fd 中
          fd.append('cover_img', blob)
          // 6. 发起 ajax 数据请求
          publishArticle(fd)
        })
    })
    function publishArticle(fd){
        $.ajax({
            type:'post',
            url:'/my/article/add',
            data:fd,
            contentType: false,
            processData: false,
            success(res){
                console.log(res);
                if(res.status!==0) return layui.layer.msg('发布失败')
                layui.layer.msg('发布成功')
                location.href='/article/art-List.html'
            }
        })
    }
})

