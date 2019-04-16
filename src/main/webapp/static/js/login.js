$(function () {
    $(".login-in-box-tab>div:not('.icon-input')").click(function () {
        // $("div.errMsg").html("");
        // $('p.add-hint').text('');
        // $('p.page-hint').text('');
        // $('p.password-hint').text('');
        var tab = $(this).attr('tab').trim();
        $(this).addClass('active visible').siblings().removeClass('active');
        $('.login-in-box-tab-content>div').each(function () {
            var tabContent = $(this).attr('tabContent').trim();
            if (tab == tabContent) {
                $(this).addClass('active').siblings().removeClass('active');
            }
        })
    })
    $('.forget-password').click(function () {
        $('.login-in-box-tab-content>div').each(function () {
            // $("div.errMsg").html("");
            // $('p.page-hint').text('');
            var tabContent = $(this).attr('tabContent').trim();
            if (tabContent == 'phone-find-password') {
                $(this).addClass('active').siblings().removeClass('active');
                $("div[tab='phone-find-password']").addClass('visible active');
                $("div[tab='email-find-password']").addClass('visible');
                $("div[tab='password-login']").removeClass('visible active');
                $("div[tab='phone-login']").removeClass('visible active');
            }
        })
    })
    $('.go-login').click(function () {
        $("div[tab='password-login']").addClass('visible active');
        $("div[tab='phone-login']").addClass('visible ');
        $("div[tab='phone-find-password']").removeClass('visible active');
        $("div[tab='email-find-password']").removeClass('visible active');
        $('.login-in-box-tab-content>div').each(function () {
            var tabContent = $(this).attr('tabContent').trim();
            if (tabContent == 'password-login') {
                $(this).addClass('active').siblings().removeClass('active');
            }
        })
    })
})


//倒计时
$(function () {
    $('.security-code').click(function () {
        $(this).addClass('active');
        settime(this);
    })
    var countdown = 60;

    function settime(obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.innerHTML = "获取验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.style.background = "#A0A0A0";
            obj.style.borderColor = "#A0A0A0";
            obj.innerHTML = "已发送(" + countdown + ')';
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }
})



//账号用户名登录
// $('.password-login button.password-login-btn').click(function(){
//     var unameVal=$('#uname').val();
//      console.log('unameVal',unameVal);
// })
// function bing(){
//     // 检测是否被绑定
        
//         var unameVal = $('#uname').val();
//         // var pwdVal = $('#pwd').val();
//         $.ajax({
//         type: "GET",
//         url: "/alink-hq/checkUser",
//         data: {
//             "uname": unameVal
//         },
//         async: false,
//         success: function (res) {
//             console.log(res);
//             if (res == "success") {
//                 console.log("有这个用户名");  
//             }
//         },
//         error: function (res) {
//             console.log(res)
//         }
//     })
// }

function passwordLogin() {
    $('.password-login .add-hint').text('');
    $('.password-login .password-hint').text('');
    $('.password-login .page-hint ').text('');
    //检测用户名格式是否正确
    var unameVal = $('#uname').val();
    var pwdVal = $('#pwd').val();
    var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult = regUserName.test(unameVal);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(pwdVal);
    //检测账号格式是否正确
    var regAccount = /^[a-z A-Z]{5}[0-9]{3}/;
    var accountResult = regAccount.test(unameVal);
    //验证手机号是否正确
    var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = regPhone.test(unameVal);
    //验证邮箱
    var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var emailResult = regEmail.test(regEmail);
    console.log(unameVal, pwdVal);
    var p=/^[0-9]+$/;
    var e = new RegExp("[@]");
    var a=/^[a-zA-Z]+$/;

    var isBind=false;
    // 检测是否被绑定
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkUser",
        data: {
            "uname": unameVal
        },
        async: false,
        success: function (res) {
            console.log(res);
            if (res == "success") {
                console.log("有这个用户名");  
                isBind=true;
            }
        },
        
    })
    console.log(isBind);

    //检测是否登录
    // $.ajax({
    //     type: "GET",
    //     url: "/alink-hq/login",
    //     data: {
    //         "uname": unameVal,
    //         "pwd": pwdVal
    //     },
    //     async: false,
    //     success: function (msg) {
    //         console.log(msg);
    //     },
    //     error: function (res) {

    //     }
    // })
    // return false;
    if (unameVal.length>6 && p.test(unameVal)) {
        //想输入的是手机号
        if (!phoneResult) {
            $('.password-login .add-hint').text('请输入正确的手机号');
            $('.password-login .password-hint').text('');
        } else if(!isBind) {

            if (pwdVal == '') {
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('');
            }else{
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('');
            }
        }else if(isBind){
            if (pwdVal == '') {
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login ..page-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
        }

    }else if(e.test(unameVal)){
        //想输入的是邮箱
        if(!emailResult){
            $('.password-login .add-hint').text('请输入正确的邮箱');
            $('.password-login .password-hint').text('');
        }else if(!isBind){
            $('.password-login .add-hint').text('');
            $('.password-login .password-hint').text('');
            $('.password-login .page-hint ').text('');
            if (pwdVal == '') {
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('');
            }
        }else{
            if (pwdVal == '') {
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login ..page-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
           
        }
    }else if(a.test(unameVal) || unameVal.length<=6){
        //想输入的是用户名
        if(!isBind){
            $('.password-login .add-hint').text('登录名错误');
            $('.password-login .password-hint').text('');
            if (pwdVal == '') {
                $('.password-login .add-hint').text('登录名错误');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login .page-hint ').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }else{
                $('.password-login .page-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
        }else{
            if(pwdVal==''){
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('请输入密码');
                $('.password-login .page-hint').text('');
            }else{
                $('.password-login .page-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
        }
    }else if(unameVal==''){
        if (pwdVal == '') {
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('请输入密码');
        }else if(pwdResult){
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('');
        }else{
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('');
        }
    }else{
        $('.password-login .add-hint').text();
        $('.password-login .password-hint').text('');
    }
    // $.ajax({
    //     type: "GET",
    //     url: "/alink-hq/checkUser",
    //     data: {
    //         "uname": unameVal
    //     },
    //     async: false,
    //     success: function (res) {
    //         console.log(res);
    //         if (res == "success") {
    //             console.log("有这个用户名");  
    //         }
    //     },
    //     error: function (res) {
    //         console.log(res)
    //     }
    // })
    // $.ajax({
    //     type: "GET",
    //     url: "/alink-hq/login",
    //     data: {
    //         "uname": unameVal,
    //         "pwd": pwdVal
    //     },
    //     async: false,
    //     success: function (res) {
    //         location.href = "/alink-hq/home";
    //         //  location.href = "/alink-hq/"+res;  
    //         console.log(res);
    //     },
    //     error: function (res) {
    //         falseResult();
    //     }
    // })


    // console.log('unameVal',unameVal);
    // console.log('pwdVal',pwdVal);
    // console.log('userNameResult',userNameResult);
    // console.log(' pwdResult', pwdResult);
    // if(unameVal==''){
    //     if(pwdVal==''){
    //        $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
    //        $('.password-login .password-hint').text('请输入密码');  
    //     }else{
    //         $('.password-login .add-hint').text('');
    //         $('.password-login .password-hint').text('');  
    //         $('#pwd').val('');
    //     }
    // }else if(!unameVal || !accountResult){
    //     if(pwdVal==''){
    //         $('.password-login .add-hint').text('登录名错误');
    //         $('.password-login .password-hint').text('请输入密码');  
    //     }else if(pwdResult){
    //         $('.password-login .add-hint').text('登录名密码不正确');
    //         $('#pwd').val('');
    //     }
    // }else if(!phoneResult){
    //         $('.password-login .add-hint').text('请输入正确的手机号');
    // }

}
function falseResult() {
    // $.ajax({
    //     type: "GET",
    //     url: "/alink-hq/checkUser",
    //     data: {
    //         "uname": unameVal,
    //         "mobile": unameVal
    //     },
    //     async: false,
    //     success: function (res) {
    //         if (res == "success") {
    //             console.log("有这个用户名");  
    //         }
    //     },
    //     error: function (res) {
    //         console.log(res)
    //     }
    // })
    var p=/^[0-9]+$/;
    var e = new RegExp("[@]");
    var a=/^[a-zA-Z]+$/;
    if (p.test(unameVal)) {
        //想输入的是手机号
        if (!phoneResult) {
            $('.password-login .add-hint').text('请输入正确的手机号');
            $('.password-login .password-hint').text('');
        } else {
            if (pwdVal == '') {
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('');
            }else{
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('');
            }
        }

    }else if(e.test(unameVal)){
        //想输入的是邮箱
        if(!emailResult){
            $('.password-login .add-hint').text('请输入正确的邮箱');
            $('.password-login .password-hint').text('');
        }else{
            if (pwdVal == '') {
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('');
            }else{
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('');
            }
        }
    }else if(a.test(unameVal)){
        //想输入的是用户名
        if(!userNameResult){
            $('.password-login .add-hint').text('请输入正确的用户名');
            $('.password-login .password-hint').text('');
        }else{
            if (pwdVal == '') {
                $('.password-login .add-hint').text('登录名错误');
                $('.password-login .password-hint').text('请输入密码');
            }else if(pwdResult){
                $('.password-login .add-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }else{
                $('.password-login .add-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
        }
    }else if(unameVal==''){
        if (pwdVal == '') {
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('请输入密码');
        }else if(pwdResult){
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('');
        }else{
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('');
        }
    }else{
        $('.password-login .add-hint').text();
        $('.password-login .password-hint').text('');
    }
}
function phoneLogin() {
    console.log('kk')
}