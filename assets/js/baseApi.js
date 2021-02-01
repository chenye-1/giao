$.ajaxPrefilter(function (option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url

    if (option.url.includes('/my/')) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    option.complete = function (res) {
        console.log(res);
        if (res.responseJSON.status == 1){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
})