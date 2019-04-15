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
    $('.go-login').click(function(){
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
    $(function(){
        $('.security-code').click(function(){
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
                obj.style.background="#A0A0A0";
                obj.style.borderColor="#A0A0A0";
                obj.innerHTML = "已发送(" + countdown+')' ;
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
function passwordLogin(){
    //检测用户名格式是否正确
    var unameVal=$('#uname').val();
    var pwdVal=$('#pwd').val();
    var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult =  regUserName.test(unameVal);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(pwdVal);
    console.log('unameVal',unameVal);
    console.log('pwdVal',pwdVal);
    console.log('userNameResult',userNameResult);
    console.log(' pwdResult', pwdResult);
}

function phoneLogin(){
   console.log('kk')
}