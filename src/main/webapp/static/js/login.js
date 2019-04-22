$(function () {
    $(".login-in-box-tab>div:not('.icon-input')").click(function () {
        $('.errMsg p').html('');
        $('p.page-hint').text('');
        $('p.add-hint').text('');
        $('p.password-hint').text('');
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
            $('.errMsg p').html('');
            $('p.page-hint').text('');
            $('p.add-hint').text('');
            $('p.password-hint').text('');
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
        $('.errMsg p').html('');
        $('p.page-hint').text('');
        $('p.add-hint').text('');
        $('p.password-hint').text('');
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
            obj.style.background = "#006DC1";
            obj.style.borderColor = "#006DC1";
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
$(function () {
    $("input").focus(function () {
        $('.errMsg p').html('');
        $(this).parent().prev('p').text('');
        // $('.container').unbind('click');
    });
})

//点击任意处检测手机或邮箱格式
$(function () {
    $('.container').click(function () {
        // console.log('我执行');
        var unameVal = $('#uname').val();
        var phoneVal = $('#phone-l').val();
        var p = /^[0-9]+$/;
        var e = new RegExp("[@]");
        //验证手机号是否正确
        var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        var phoneResult = regPhone.test(unameVal);
        var phoneResult2 = regPhone.test(phoneVal);
        //验证邮箱
        var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        var emailResult = regEmail.test(unameVal);
        console.log(unameVal);
        console.log(phoneResult2);
        if (unameVal !== '') {
            if (p.test(unameVal)) {
                if (!phoneResult) {
                    $('.password-login .add-hint').text('请输入正确的手机号');
                    // $('.password-login .password-hint').text('');
                } else {
                    $('.password-login .add-hint').text('');
                }
            } else if (e.test(unameVal)) {
                if (!emailResult) {
                    $('.password-login .add-hint').text('请输入正确的邮箱');
                    // $('.password-login .password-hint').text('');
                } else {
                    $('.password-login .add-hint').text('');
                }
            }
        }
        if (phoneVal !== '') {
            if (p.test(phoneVal)) {
                if (!phoneResult2) {
                    $('.phone-login .add-hint').text('请输入正确的手机号');
                } else {
                    $('.phone-login .add-hint').text('');
                }
            }
        }

    })
})


function passwordLogin() {
    $('.content .login-in-box-tab-content button').addClass('active');
    var isBind = false;
    //检测用户名格式是否正确
    var unameVal = $('#uname').val();
    var pwdVal = $('#pwd').val();
    console.log(unameVal, pwdVal);
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
    var emailResult = regEmail.test(unameVal);
    // console.log(unameVal, pwdVal);
    var p = /^[0-9]*$/;

    var e = new RegExp("[@]");
    var a = /^[a-zA-Z]+$/;
    var h = new RegExp("[\u4e00-\u9fa5]");
    // console.log(h.test(unameVal));
    // 检测是否被绑定
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkUser",
        data: {
            "uname": unameVal
        },
        async: false,
        success: function (res) {
            // console.log(res);
            if (res == "success") {
                // console.log("有这个用户名");
                isBind = true;

            }
        }
    })
    console.log(isBind);
    if (unameVal == '') {
        if (pwdVal == '') {
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('.password-login .password-hint').text('请输入密码');
        } else {
            $('.password-login .add-hint').text('请输入账号/用户名/邮箱/手机号');
            $('#pwd').val('');
            $('.password-login .password-hint').text('');
        }
    } else if (p.test(unameVal)) {
        //想输入的是手机号
        // console.log('想输入的是手机号');
        // console.log(isBind);
        if (!phoneResult) {
            $('.password-login .add-hint').text('请输入正确的手机号');
            $('.password-login .password-hint').text('');
        } else if (isBind) {
            // console.log('走了这部分1');
            if (pwdVal == '') {
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('请输入密码');
            } else {
                localStorage.setItem('useVal', unameVal);
                $("form:eq(0)").submit();
                $('#pwd').val('');
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('');
            }
        } else {
            $('.container').unbind('click'); //K掉事件
            // console.log('走了这部分2');
            if (pwdVal == '') {
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('请输入密码');
            } else {
                $('.password-login .add-hint').text('该手机号未绑定');
                $('.password-login .password-hint').text('');
                $('#pwd').val('');
            }
        }
    } else if (e.test(unameVal)) {
        //想输入的是邮箱
        if (!emailResult) {
            $('.password-login .add-hint').text('请输入正确的邮箱');
            $('.password-login .password-hint').text('');
        } else if (!isBind) {
            if (pwdVal == '') {
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('请输入密码');
            } else {
                $('.password-login .add-hint').text('该邮箱未绑定');
                $('.password-login .password-hint').text('');
                $('#pwd').val('');
            }
        } else {
            if (pwdVal == '') {
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('请输入密码');
            } else {
                localStorage.setItem('useVal', unameVal);
                $("form:eq(0)").submit();
                // $('.password-login .page-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
        }
    } else {
        //想输入的是用户名或账号
        console.log('想输入的是用户名或账号');
        if (!isBind) {
            if (pwdVal == '') {
                $('.password-login .add-hint').text('登录名错误');
                $('.password-login .password-hint').text('请输入密码');
                $('.password-login .page-hint').text('');
            } else {
                $('.password-login .page-hint').text('登录名密码不正确');
                // $('.password-login .add-hint').text('登录名密码不正确');
                $('#pwd').val('');
                $('.password-login .password-hint').text('');
            }
        } else {
            if (pwdVal == '') {
                $('.password-login .add-hint').text('');
                $('.password-login .password-hint').text('请输入密码');
                $('.password-login .page-hint').text('');
            } else {
                localStorage.setItem('useVal', unameVal);
                $("form:eq(0)").submit();
                $('.password-login .add-hint').text('');
                // $('.password-login .page-hint').text('登录名密码不正确');
                $('.password-login .password-hint').text('');
            }
        }
    }
}


$(function () {
    var text = $('.errMsg p').text();
    // console.log(text);
    if (text != '') {
        var hasUse = localStorage.getItem('useVal');
        // var hasPwd=localStorage.getItem('passwordVal');
        console.log('hasUse', hasUse);
        // console.log('hasPwd',hasPwd);
        if (hasUse) {
            $('#uname').val(hasUse);
        }
        // if(hasPwd){
        //     $('#pwd').val(hasPwd);
        // }
    } else {
        localStorage.removeItem('useVal');
        // localStorage.removeItem('passwordVal');
        localStorage.clear()
        // $('#uname').val('');
        // $('#pwd').val('');
    }
})
// $(function(){
//     overTime();
// })
//联系我们的弹出框
function contact() {
    var width = window.screen.width;
    var height = window.screen.height;
    $('#shade-lay').addClass('active');
    $('#shade-lay').css({'width': width, 'height': height});
    $('.contact').addClass('active');
}
function closeContact() {
    var width = window.screen.width;
    var height = window.screen.height;
    $('#shade-lay').removeClass('active');
    $('#shade-lay').css({'width': width, 'height': height});
    $('.contact').removeClass('active');
}
// 登录超时的弹出框
function overTime() {
    var width = window.screen.width;
    var height = window.screen.height;
    $('#shade-lay').addClass('active');
    $('#shade-lay').css({'width': width, 'height': height});
    $('.overtime').addClass('active');
}
function closeOverTime() {
    var width = window.screen.width;
    var height = window.screen.height;
    $('#shade-lay').removeClass('active');
    $('#shade-lay').css({'width': width, 'height': height});
    $('.overtime').removeClass('active');
}


//手机验证码登录
function phoneLogin() {

    var isBind = false;
    var phoneVal = $('#phone-l').val();
    var codeVal = $('#code-l').val();
    console.log(phoneVal, codeVal);
    //验证手机号格式是否正确
    var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = regPhone.test(phoneVal);
    console.log(phoneResult);
    // 检测是否被绑定
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkUser",
        data: {
            "uname": phoneVal
        },
        async: false,
        success: function (res) {
            // console.log(res);
            if (res == "success") {

                isBind = true;
            }
        }
    })
    console.log('手机号是否绑定', isBind);
    if (phoneVal == '') {
        if (codeVal == '') {
            $('.phone-login .add-hint').text('请输入手机号');
            $('.phone-login .password-hint').text('请输入验证码');
            $('#phone-l').val('');
            $('#code-l').val('');
        } else {
            $('.phone-login .add-hint').text('请输入手机号');
            $('.phone-login .password-hint').text('');
            $('#phone-l').val('');
        }
    } else if (!isBind) {
        $('.container').unbind('click'); //K掉事件
        if (codeVal == '') {
            $('.phone-login .add-hint').text('该手机号未绑定');
            $('.phone-login .password-hint').text('请输入验证码');
        } else {
            $('.phone-login .add-hint').text('该手机号未绑定');
            $('.phone-login .password-hint').text('');
        }
    } else {
        if (codeVal == '') {
            $('.phone-login .add-hint').text('');
            $('.phone-login .password-hint').text('请输入验证码');
        } else {
            validCode(phoneVal, codeVal)
        }
    }
}

function phoneCode() {

    var isBind = false;
    var phoneVal = $('#phone-l').val();
    var codeVal = $('#code-l').val();
    //验证手机号格式是否正确
    var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = regPhone.test(phoneVal);

    // 检测是否被绑定
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkUser",
        data: {
            "uname": phoneVal
        },
        async: false,
        success: function (res) {

            if (res == "success") {
                isBind = true;
            }
        }
    })
    if (phoneVal == '') {
        if (codeVal == '') {
            $('.phone-login .add-hint').text('请输入手机号');
            $('.phone-login .password-hint').text('');
            $('#phone-l').val('');
            $('#code-l').val('');
        } else {
            $('.phone-login .add-hint').text('请输入手机号');
            $('.phone-login .password-hint').text('');
            $('#phone-l').val('');
        }
    } else if (!isBind) {
        if (codeVal == '') {
            $('.phone-login .add-hint').text('该手机号未绑定');
            $('.phone-login .password-hint').text('');
            $('#code-l').val('');
        } else {
            $('.phone-login .add-hint').text('该手机号未绑定');
            $('.phone-login .password-hint').text('');

        }
    } else {
        if (codeVal == '') {
            sendCode(phoneVal);
            $('#code-l').val('');
        } else {
            sendCode(phoneVal);
        }
    }
}
//发送验证码
function sendCode(phoneVal) {
    $.ajax({
        type: "GET",
        url: "/alink-hq/verify/",
        data: {
            "mobile": phoneVal
            // "email": email
        },
        async: true,
        success: function (res) {
            console.log("result=" + res + ",mobile=" + mobile);
            if (res == 'success') {
                console.log('成功发送');
            }
        }
    })
}
/* 校验验证码 */
function validCode(phoneVal, codeVal) {

    $.ajax({
        type: "GET",
        url: "/alink-hq/checkCode",
        data: {
            "mobile": phoneVal,
            "code": codeVal
        },
        async: false,
        success: function (res) {
            if (res == "success") {
                console.log('校验成功')
                $(".phone-login form").submit();
            } else {
                console.log('校验失败')
                $('.phone-login .password-hint').text('验证码不正确');
            }
        }
    })

}