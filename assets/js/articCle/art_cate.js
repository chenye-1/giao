$(function () {
    // function initArtCateList() {
    //     $.ajax({
    //         type: 'GET',
    //         url: '/my/article/cates',
    //         success(res) {
    //             var htmlStr = template('tmp', res)
    //             $('tbody').html(htmlStr)
    //         }
    //     })
    // }
    // initArtCateList()
    // // 添加列表
    // var index = null
    // $('#btn-addlist').on('click', function () {
    //     index = layui.layer.open({
    //         type: 1,
    //         area: ['500px', '250px'],
    //         title: '添加文章分类'
    //         , content: $('#add-art').html(),

    //     });


    // })
    // $('body').on('submit', '#form-add', function (e) {
    //     e.preventDefault()
    //     $.ajax({
    //         type: 'post',
    //         url: '/my/article/addcates',
    //         data: $(this).serialize(),
    //         success(res) {
    //             if (res.status !== 0) return layui.layer.msg('新增分类失败')
    //             layui.layer.msg('新增分类成功')
    //             initArtCateList()
    //             layer.close(index)
    //         }
    //     })
    // })

    // // 修改  获取赋值表单
    // var indexcompile = null
    // $('body').on('click', '#compile', function () {
    //     indexcompile = layui.layer.open({
    //         type: 1,
    //         area: ['500px', '250px'],
    //         title: '添加文章分类'
    //         , content: $('#amend-art').html(),

    //     });
    //     var id = $(this).parent().attr('data-id')
    //     $.ajax({
    //         method: 'GET',
    //         url: '/my/article/cates/' + id,
    //         success(res) {
    //             layui.form.val('form-amend', res.data)
    //         }
    //     })
    // })

    // // 修改并渲染
    // $('body').on('submit','#form-amend',function(e){
    //     e.preventDefault()
    //      $.ajax({
    //          method:'POST',
    //          url:'/my/article/updatecate',
    //          data:$(this).serialize(),
    //          success(res){
    //             if(res.status!==0) return layer.msg('修改失败')
    //             initArtCateList()
    //             layer.close(indexcompile)
    //          }
    //      })
    // })

    // // 删除
    // $('tbody').on('click','#art-remove',function(){
    //     var id=$(this).parent().attr('data-Id')
    //     $.ajax({
    //         method:'get',
    //         url:'/my/article/deletecate/'+id,
    //         success(res){
    //             if(res.status!==0) return  layer.msg('删除失败')
    //             layer.msg('删除成功')
    //             initArtCateList()
    //         }
    //     })
    // })




    // again

    // 渲染
    function initArtCateList() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: res => {
                var htmlStr = template('tmp', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    initArtCateList()
    var addlistindex = null
    $('#btn-addlist').on('click', function () {
        addlistindex = layer.open({
            type: 1,
            title: '在线调试',
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#add-art').html()
        });
    })
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layui.layer.msg('添加失败')
                layui.layer.msg('添加成功')
                initArtCateList()
                layer.close(addlistindex)
            }
        })
    })

    // 编辑
    var compileIndex = null;
    $('tbody').on('click', '#compile', function () {

        compileIndex = layui.layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            , content: $('#amend-art').html(),

        });
        var id = $(this).parent().attr('data-Id')
        $.ajax({
            method: 'get',
            url: '/my/article/cates/' + id,
            success(res) {
                layui.form.val('form-amend', res.data)
            }
        })

    })

    // 修改
    $('body').on('submit', '#form-amend', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) return layui.layer.msg('修改失败')
                layui.layer.msg('修改成功')
                initArtCateList()
                layer.close(compileIndex)
            }
        })
    })

    // 删除
    $('tbody').on('click', '#art-remove', function () {
        var id = $(this).parent().attr('data-Id')
        layui.layer.confirm('is not?', { icon: 3, title: '提示' },
            function (index) {
                //do something
               
                console.log(id);
                $.ajax({
                    method: 'GET',
                    url: '/my/article/deletecate/' + id,
                    success: function (res) {
                        alert(1)    
                        console.log(res);
                        
                        initArtCateList()
                        layer.close(index);
                    }
                })

            });

    })
})