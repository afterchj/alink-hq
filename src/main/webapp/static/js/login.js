$(function () {
    $(".login-in-box-tab>div:not('.icon-input')").click(function () {
        $('.errMsg p').html('');
        $('p.page-hint').text('');
        $('p.add-hint').text('');
        $('p.password-hint').text('');
        $('#phone-f').val('');
        $('#code-f').val('');
        $('#pwd-f').val('');
        $('#uname').val('');
        $('#phone-l').val('');
        $('#pwd').val('');
        $('#code-l').val('');
        $('#email-e').val('');
        $('#code-e').val('');
        $('#pwd-e').val('');
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
            $('#phone-f').val('');
            $('#code-f').val('');
            $('#pwd-f').val('');
            $('#uname').val('');
            $('#phone-l').val('');
            $('#pwd').val('');
            $('#code-l').val('');
            $('#email-e').val('');
            $('#code-e').val('');
            $('#pwd-e').val('');
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
        $('#phone-f').val('');
        $('#code-f').val('');
        $('#pwd-f').val('');
        $('#uname').val('');
        $('#phone-l').val('');
        $('#pwd').val('');
        $('#code-l').val('');
        $('#email-e').val('');
        $('#code-e').val('');
        $('#pwd-e').val('');
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
        //验证手机号是否正确
        var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        var phoneVal1=$('#phone-l').val();
        var phoneVal2=$('#phone-f').val();
        // var isBind1 = checkExist(phoneVal1);
        // var isBind2=checkExist(phoneVal2);
        var phoneResult1= regPhone.test(phoneVal1);
        var phoneResult2= regPhone.test(phoneVal2);
        //验证邮箱
        var emailVal = $('#email-e').val();
        var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        var emailResult=regEmail.test(emailVal);
        // var emailResult = regEmail.test(unameVal);
        if(phoneVal1!='' &&  phoneResult1 ){
            $(this).addClass('active');
            settime(this);
        }
        if(phoneVal2!='' && phoneResult2 ){
            $(this).addClass('active');
            settime(this);
        }
        if(emailResult!='' && emailResult){
            $(this).addClass('active');
            settime(this);
        }
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
        var phoneValL = $('#phone-l').val();
        var phoneValF = $('#phone-f').val();
        var emailVal=$('#email-e').val();
        var p = /^[0-9]+$/;
        var e = new RegExp("[@]");
        //验证手机号是否正确
        var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        var phoneResult = regPhone.test(unameVal);
        var phoneResultL = regPhone.test(phoneValL);
        var phoneResultF = regPhone.test(phoneValF);
        //验证邮箱
        var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        var emailResult = regEmail.test(unameVal);
        var emailResult2=regEmail.test(emailVal);
        // console.log(unameVal);
        // console.log(phoneResult2);
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
        if (phoneValL !== '') {
            if (p.test(phoneValL)) {
                if (!phoneResultL) {
                    $('.phone-login .add-hint').text('请输入正确的手机号');
                    $('.phone-find-password .mobile-code-hint').text('');
                    $('.phone-find-password .mobile-password-hint').text('');
                } else {
                    $('.phone-login .add-hint').text('');
                }
            }
        }
        if (phoneValF !== '') {
            if (p.test(phoneValF)) {
                if (!phoneResultF) {
                    $('.phone-find-password .mobile-add-hint').text('请输入正确的手机号');
                } else {
                    $('.phone-find-password .mobile-add-hint').text('');
                }
            }
        }
        if (emailVal !== '') {
            if (!emailResult2) {
                $('.email-find-password .email-add-hint').text('请输入正确的邮箱');
            }else{
                $('.email-find-password .email-add-hint').text('');
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
    var p = /^[0-9]*$/;

    var e = new RegExp("[@]");
    var a = /^[a-zA-Z]+$/;
    var h = new RegExp("[\u4e00-\u9fa5]");
    // 检测是否被绑定
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkUser",
        data: {
            "uname": unameVal
        },
        async: false,
        success: function (res) {
            if (res == "success") {
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
        if (!phoneResult) {
            $('.password-login .add-hint').text('请输入正确的手机号');
            $('.password-login .password-hint').text('');
        } else if (isBind) {
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
            $('.container').unbind('click');
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
    var phoneVal = $('#phone-l').val();
    var codeVal = $('#code-l').val();
    var isBind = checkExist(phoneVal);
    console.log(phoneVal, codeVal);
    //验证手机号格式是否正确
    var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = regPhone.test(phoneVal);
    console.log(phoneResult);
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
    var phoneVal = $('#phone-l').val();
    var codeVal = $('#code-l').val();
    //验证手机号格式是否正确
    var regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = regPhone.test(phoneVal);
    var isBind = checkExist(phoneVal);
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
//手机发送验证码
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
            if (res == 'success') {
                console.log('成功发送');
            }
        }
    })
}
//邮箱发送验证码
function emailCode(emailVal) {
    $.ajax({
        type: "GET",
        url: "/alink-hq/verify/",
        data: {
            // "mobile": phoneVal
            "email": emailVal
        },
        async: true,
        success: function (res) {
            console.log(res);
            if (res == 'success') {
                console.log('成功发送');
            }
        }
    })
}
//手机找回密码发送验证码
function phoneFindPwdCode() {
    var phoneVal = $('#phone-f').val();
    var codeVal = $('#code-f').val();
    var newPwd = $('#pwd-f').val();
    var isBind = checkExist(phoneVal);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(newPwd);
    console.log('该手机号是否被绑定', isBind);
    if (phoneVal == '') {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
            }
        }
        if (newPwd == '') {
            $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
            $('.phone-find-password .mobile-code-hint').text('');
            $('.phone-find-password .mobile-password-hint').text('请输入新密码');
        } else if (pwdResult) {
            $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
            $('.phone-find-password .mobile-code-hint').text('');
            $('.phone-find-password .mobile-password-hint').text('');
            $('#pwd-f').val('');
        }
    } else if (!isBind) {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('.container').unbind('click');
            }
        } else {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
                $('.container').unbind('click');
            }
        }
    } else {
        var codeResult = findValidCode(phoneVal, codeVal);
        console.log('codeResult', codeResult);
        if (codeVal == '') {
            if (newPwd == '') {
                sendCode(phoneVal);
            } else if (pwdResult) {
                sendCode(phoneVal);
                $('.phone-find-password .mobile-add-hint').text('');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
            }
        } else if (codeResult == 'failure') {
            if (newPwd == '') {
                sendCode(phoneVal);
            } else if (pwdResult) {
                sendCode(phoneVal);
            }
        } else if (codeResult == 'success') {
            if (newPwd == '') {
                sendCode(phoneVal);
            } else if (pwdResult) {
                sendCode(phoneVal);
            }
        }
    }
}
// 手机找回密码
function phoneFindPwd() {
    var phoneVal = $('#phone-f').val();
    var codeVal = $('#code-f').val();
    var newPwd = $('#pwd-f').val();
    console.log(phoneVal, codeVal, newPwd);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(newPwd);
    var isBind = checkExist(phoneVal);
    console.log('该手机号是否被绑定', isBind);
    if (phoneVal == '') {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
                $('.phone-find-password .mobile-code-hint').text('请输入验证码');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
                $('.phone-find-password .mobile-code-hint').text('请输入验证码');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
            }
        } else {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('请输入所绑定的手机号');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
            }
        }
    } else if (!isBind) {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('请输入验证码');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('请输入验证码');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
                $('.container').unbind('click');
            }
        } else {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('该手机号未绑定');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
                $('.container').unbind('click');
            }
        }
    } else {
        //验证验证码是否正确
        var codeResult = findValidCode(phoneVal, codeVal);
        console.log('codeResult', codeResult);
        if (codeVal == '') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('');
                $('.phone-find-password .mobile-code-hint').text('请输入验证码');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('');
                $('.phone-find-password .mobile-code-hint').text('请输入验证码');
                $('.phone-find-password .mobile-password-hint').text('');
                $('#pwd-f').val('');
            }
        } else if (codeResult == 'failure') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.phone-find-password .mobile-add-hint').text('');
                $('.phone-find-password .mobile-code-hint').text('验证码不正确');
                $('.phone-find-password .mobile-password-hint').text('');
            }
        } else if (codeResult == 'success') {
            if (newPwd == '') {
                $('.phone-find-password .mobile-add-hint').text('');
                $('.phone-find-password .mobile-code-hint').text('');
                $('.phone-find-password .mobile-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                //手机号已绑定，验证码正确，密码格式正确
                restPwd(phoneVal, newPwd);
            }
        } else if (codeResult == 'expire') {
            // $('.phone-find-password .mobile-add-hint').text('');
            $('.phone-find-password .mobile-code-hint').text('验证码已超时，请重新获取');
            // $('.phone-find-password .mobile-password-hint').text('请输入新密码');
        }
    }
}
//手机密码重置
function restPwd(phoneVal, newPwd) {
    $.ajax({
        type: "GET",
        url: "/alink-hq/restPwd",
        data: {
            "mobile": phoneVal,
            // "email": email,
            "pwd": newPwd
        },
        async: false,
        success: function (res) {
            if (res == "success") {
                console.log("密码修改成功！");
                setInterval(function () {
                    location.href = "/alink-hq/home";
                }, 1000);
            }
        }
    })
}
//邮箱密码重置
function restPwd2(emailVal, newPwd) {
    $.ajax({
        type: "GET",
        url: "/alink-hq/restPwd",
        data: {
            // "mobile": phoneVal,
            "email": emailVal,
            "pwd": newPwd
        },
        async: false,
        success: function (res) {
            if (res == "success") {
                console.log("密码修改成功！");
                setInterval(function () {
                    location.href = "/alink-hq/home";
                }, 1000);
            }
        }
    })
}
// 手机号是否被绑定
function checkExist(phoneVal){
    var isBind=false;
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
                console.log('该用户名或手机号或邮箱已绑定');
            }
        }
    })
    return isBind;
}


//新密码键盘事件
function keyup(){
    var newPwd = $('#pwd-f').val();
    console.log('newPwd', newPwd);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(newPwd);
    if (!pwdResult) {
        $('.phone-find-password .mobile-password-hint').text('请输入 6-16 位数字、字母');
    } else {
        $('.phone-find-password .mobile-password-hint').text('');
    }
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
            } else {
                console.log('校验失败')
            }
        }
    })
}

//校验找回密码验证码
function findValidCode(phoneVal, codeVal) {
    var result = '';
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
                result = res;
                console.log('校验成功')
            } else {
                result = res;
                console.log('校验失败')
            }
        }
    })
    return result;
}


//邮箱找回密码
function emailFindPwd() {
    var emailVal = $('#email-e').val();
    var codeVal= $('#code-e').val();
    var newPwd = $('#pwd-e').val();
    console.log(emailVal, codeVal, newPwd);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(newPwd);
    var isBind = checkExist(emailVal);
    console.log('该邮箱是否被绑定', isBind);
    if (emailVal == '') {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
                $('.email-find-password .email-code-hint').text('请输入验证码');
                $('.email-find-password .email-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
                $('.email-find-password .email-code-hint').text('请输入验证码');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
            }
        } else {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
            }
        }
    } else if (!isBind) {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('请输入验证码');
                $('.email-find-password .email-password-hint').text('请输入新密码');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('请输入验证码');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
                $('.container').unbind('click');
            }
        } else {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('请输入新密码');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
                $('.container').unbind('click');
            }
        }
    } else {
        //验证验证码是否正确
        var codeResult = findValidCode(emailVal, codeVal);
        console.log('codeResult', codeResult);
        if (codeVal == '') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('');
                $('.email-find-password .email-code-hint').text('请输入验证码');
                $('.email-find-password .email-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('');
                $('.email-find-password .email-code-hint').text('请输入验证码');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
            }
        } else if (codeResult == 'failure') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('');
                $('.email-find-password .email-code-hint').text('验证码不正确');
                $('.email-find-password .email-password-hint').text('');
            }
        } else if (codeResult == 'success') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('请输入新密码');
            } else if (pwdResult) {
                //邮箱已绑定，验证码正确，密码格式正确
                restPwd2(emailVal, newPwd);
            }
        } else if (codeResult == 'expire') {
            // $('.phone-find-password .mobile-add-hint').text('');
            $('.email-find-password .email-code-hint').text('验证码已超时，请重新获取');
            // $('.phone-find-password .mobile-password-hint').text('请输入新密码');
        }
    }
}
//邮箱找回密码发送验证码
function emailFindPwdCode() {

    var emailVal = $('#email-e').val();
    var codeVal= $('#code-e').val();
    var newPwd = $('#pwd-e').val();
    console.log(emailVal, codeVal, newPwd);
    //密码格式是否正确
    var regPwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = regPwd.test(newPwd);
    var isBind = checkExist(emailVal);
    console.log('该邮箱是否被绑定', isBind);
    if (emailVal == '') {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
            }
        }
        if (newPwd == '') {
            $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
            $('.email-find-password .email-code-hint').text('');
            $('.email-find-password .email-password-hint').text('请输入新密码');
        } else if (pwdResult) {
            $('.email-find-password .email-add-hint').text('请输入所绑定的邮箱');
            $('.email-find-password .email-code-hint').text('');
            $('.email-find-password .email-password-hint').text('');
            $('#pwd-e').val('');
        }
    } else if (!isBind) {
        if (codeVal == '') {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('.container').unbind('click');
            }
        } else {
            if (newPwd == '') {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('.container').unbind('click');
            } else if (pwdResult) {
                $('.email-find-password .email-add-hint').text('该邮箱未绑定');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
                $('.container').unbind('click');
            }
        }
    } else {
        emailCode(emailVal);
        // var codeResult = findValidCode(emailVal, codeVal);
        // console.log('codeResult', codeResult);
        if (codeVal == '') {
            if (newPwd == '') {
                emailCode(emailVal);
            } else if (pwdResult) {
                emailCode(emailVal);
                $('.email-find-password .email-add-hint').text('');
                $('.email-find-password .email-code-hint').text('');
                $('.email-find-password .email-password-hint').text('');
                $('#pwd-e').val('');
            }
        } else if (codeResult == 'failure') {
            if (newPwd == '') {
                emailCode(emailVal)
            } else if (pwdResult) {
                emailCode(emailVal)
            }
        } else if (codeResult == 'success') {
            if (newPwd == '') {
                emailCode(emailVal)
            } else if (pwdResult) {
                emailCode(emailVal)
            }
        }
    }
}