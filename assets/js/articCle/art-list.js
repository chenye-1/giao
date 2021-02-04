$(function () {
    var q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: '',
        state: ''
    }
    function initList() {

        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success(res) {
                var htmlStr = template('artlisttmp', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    initList()

    // 定义模板引擎过滤器
    // template.defaults.imports.dateFormat = function (value) {
    //     var dt = new Date(date)
    //     var y = dt.getFullYear()
    //     var m = (dt.getMonth() + 1).toString().padStart(2, '0')
    //     var d = dt.getDate().toString().padStart(2, '0')

    //     var hh = dt.getHours().toString().padStart(2, '0')
    //     var mm = dt.getMinutes().toString().padStart(2, '0')
    //     var ss = dt.getSeconds().toString().padStart(2, '0')

    //     return `${y}-${m}-${d}  ${hh}-${mm}-${ss}`
    // }


    template.defaults.imports.dateFormat = function (value) {
        var date = new Date(value);
        var y = date.getFullYear();
        var m = (date.getMonth() + 1).toString().padStart(2, "0");
        var d = date.getDate().toString().padStart(2, "0");
        var t = date.getHours().toString().padStart(2, "0");
        var f = date.getMinutes().toString().padStart(2, "0");
        var s = date.getSeconds().toString().padStart(2, "0");

        return `${y}-${m}-${d} ${t}:${f}:${s}`;
    };


    // 初始化文章分类的方法
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                // 通过 layui 重新渲染表单区域的UI结构
                layui.form.render()
            }
        })
    }
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initList()
    })

    // 分页
    function renderPage(total) {
        layui.laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],// 每页展示多少条
            jump: function (obj, first) {
                if (!first) {
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    initList()
                }
            }
        })
    }

    // 删除
    $('tbody').on('click', '#btn-remove', function () {
        var id = $(this).attr('data-id')
        var len = $('#btn-remove').length
        layui.layer.confirm('确定要删除吗',
            { icon: 3, title: '提示' }, function () {
                $.ajax({
                    method: 'get',
                    url: '/my/article/delete/' + id,
                    success(res) {
                        if (res.status !== 0) return layui.layer.msg('删除文章失败')
                        layui.layer.msg('删除文章成功')
                        if (len === 1) {
                            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                        }
                        initList()
                    }
                })
            },


        )
    })
})