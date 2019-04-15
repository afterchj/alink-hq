$(function () {
    $(".login-in-box-tab>div:not('.icon-input')").click(function () {
        // $("div.errMsg").html("");
        $('p.add-hint').text('');
        $('p.page-hint').text('');
        $('p.password-hint').text('');
        var tab = $(this).attr('tab').trim();
        $(this).addClass('active visible').siblings().removeClass('active');
        $('.login-in-box-tab-content>div').each(function () {
            var tabContent = $(this).attr('tabContent').trim();
            if (tab == tabContent) {
                $(this).addClass('active').siblings().removeClass('active');
            }
        })
    });
    $('.forget-password').click(function () {
        $('.login-in-box-tab-content>div').each(function () {
            $("div.errMsg").html("");
            $('p.page-hint').text('');
            var tabContent = $(this).attr('tabContent').trim();
            if (tabContent == 'phone-find-password') {
                $(this).addClass('active').siblings().removeClass('active');
                $("div[tab='phone-find-password']").addClass('visible active');
                $("div[tab='email-find-password']").addClass('visible');
                $("div[tab='password-login']").removeClass('visible active');
                $("div[tab='phone-login']").removeClass('visible active');
            }
        })
    });
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


    $('.go-login').click(function () {
        $("div.errMsg").html("");
        $('p.page-hint').text('');
        $('p.mobile-add-hint').text('');
        $('.login-in-box-tab-content>div').each(function () {
            var tabContent = $(this).attr('tabContent').trim();
            console.log(tabContent);
            if (tabContent == 'password-login') {
                $(this).addClass('active ').siblings().removeClass('active');
                $("div[tab='password-login']").addClass('visible active');
                $("div[tab='phone-login']").addClass('visible').removeClass('active');
                $("div[tab='phone-find-password']").removeClass('visible active');
                $("div[tab='email-find-password']").removeClass('visible active');
            }
        })
    });

    // $('input.p-l-val').blur(function () {
    //     //验证手机号格式是否正确
    //     var accountVal = $(this).val();
    //     var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    //     var phoneResult = phone.test(accountVal);
    //     console.log(isNaN(parseInt(accountVal)));
    //     if (!isNaN(parseInt(accountVal))) {
    //         if (!phoneResult) {
    //             $('p.add-hint').addClass('active').text('请输入正确的手机号');
    //         }
    //     } else {
    //         $('p.add-hint').removeClass('active').text('');
    //     }
    // });

    //为表单元素添加失去焦点事件
    $(".login-in-box-tab-content :input").blur(function () {
        $("div.errMsg").html("");
        //检测账号格式是否正确
        if ($(this).is("#uname")) {
            var accountVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (accountVal == "") {
                //class='msg onError' 中间的空格是层叠样式的格式
                $('p.add-hint').addClass('active').text('登录账号不能为空！');
            } else {
                $('p.add-hint').html('');
            }
        }
        //验证手机
        if ($(this).is("#phone")) {
            var mobileVal = $.trim(this.value);
            var regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (mobileVal == "") {
                $('p.add-hint').addClass('active').text('手机号不能为空！');
            } else if (!regMobile.test(mobileVal)) {
                $('p.add-hint').addClass('active').text('请输入正确的手机号！');
            } else {
                $('p.add-hint').removeClass('active').text('');
            }
        }
        if ($(this).is("#code")) {
            var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (codeVal == "") {
                //class='msg onError' 中间的空格是层叠样式的格式
                $('p.password-hint').addClass('active').text('验证码不能为空！');
            } else {
                $('p.password-hint').removeClass('active').text('');
            }
        }
        if ($(this).is("#pwd")) {
            var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (pwdVal == "") {
                $('p.password-hint').addClass('active').text('密码不能为空！');
            } else {
                $('p.password-hint').removeClass('active').text('');
            }
        }
        //验证手机
        if ($(this).is("#mobile")) {
            var mobileVal = $.trim(this.value);
            var regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (mobileVal == "") {
                $('p.mobile-add-hint').addClass('active').text('手机号不能为空！');
            } else if (!regMobile.test(mobileVal)) {
                $('p.mobile-add-hint').addClass('active').text('请输入正确的手机号！');
            } else {
                $('p.mobile-add-hint').removeClass('active').text('');
            }
        }
        if ($(this).is("#code1")) {
            var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (codeVal == "") {
                //class='msg onError' 中间的空格是层叠样式的格式
                $('p.mobile-code-hint').addClass('active').text('验证码不能为空！');
            } else {
                $('p.mobile-code-hint').removeClass('active').text('');
            }
        }
        if ($(this).is("#pwd1")) {
            var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (pwdVal == "") {
                $('p.mobile-password-hint').addClass('active').text('密码不能为空！');
            } else {
                $('p.mobile-password-hint').removeClass('active').text('');
            }
        }
        //验证邮箱
        if ($(this).is("#email")) {
            var emailVal = $.trim(this.value);
            var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (emailVal == "") {
                $('p.email-add-hint').addClass('active').text('邮箱不能为空！');
            } else if (!regEmail.test(emailVal)) {
                $('p.email--add-hint').addClass('active').text('请输入正确的邮箱！');
            } else {
                $('p.email--add-hint').removeClass('active').text('');
            }
        }
        if ($(this).is("#code2")) {
            var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (codeVal == "") {
                //class='msg onError' 中间的空格是层叠样式的格式
                $('p.email-code-hint').addClass('active').text('验证码不能为空！');
            } else {
                $('p.email-code-hint').removeClass('active').text('');
            }
        }
        if ($(this).is("#pwd2")) {
            var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (pwdVal == "") {
                $('p.email-password-hint').addClass('active').text('密码不能为空！');
            } else {
                $('p.email-password-hint').removeClass('active').text('');
            }
        }
    }).keyup(function () {
        //triggerHandler 防止事件执行完后，浏览器自动为标签获得焦点
        $(this).triggerHandler("blur");
    }).focus(function () {
        $(this).triggerHandler("blur");
    });
});

function validaccountPassword() {
    $("#errMsg").html("");
    var accountVal = $('input.p-l-val').val();
    var passwordVal = $('input.p-l-password-val').val();

    //检测账号格式是否正确
    var account = /^[a-z A-Z]{5}[0-9]{3}/;
    var accountResult = account.test(accountVal);
    //检测用户名格式是否正确
    var userName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult = userName.test(accountVal);
    //验证邮箱格式是否正确
    var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var emailResult = email.test(accountVal);
    //验证手机号格式是否正确
    var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = phone.test(accountVal);

    //密码格式是否正确
    var pwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = pwd.test(passwordVal);
    //登录名未输入
    if (accountVal == '') {
        if (passwordVal == '') {
            $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
            $('p.password-hint').addClass('active').text('请输入密码');
            return false;
        } else if (passwordVal.length >= 6 && passwordVal.length <= 16) {
            $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
            $('p.password-hint').removeClass('active').text('');
            $('input.p-l-password-val').val('');
            return false;
        } else {
            $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
            $('p.password-hint').removeClass('active').text('');
            $('input.p-l-password-val').val('');
            return false;
        }
        //登录名为账号或用户名
    } else if (accountResult || userNameResult) {
        if (passwordVal == '') {
            $('p.password-hint').addClass('active').text('请输入密码');
            return false;
        } else {
            $.ajax({
                type: "GET",
                url: "/alink-hq/login",
                data: {
                    "uname": accountVal,
                    "pwd": passwordVal
                },
                async: false,
                success: function (res) {
                    console.log(res);
                },
                error: function (res) {

                }
            })

        }
    } else if (phoneResult) {
        if (passwordVal == '') {
            $('p.password-hint').addClass('active').text('请输入密码');
            return false;
        } else {
            var result = true;
            $.ajax({
                type: "GET",
                url: "/alink-hq/login",
                data: {
                    "uname": accountVal,
                    "pwd": passwordVal
                },
                async: false,
                success: function (res) {
                    console.log(res);
                },
                error: function (res) {
                    result = false;
                }
            })
            return result;
        }
    }
}

function validPhoneCode() {
    var phoneVal = $('.phone-login input[type="phone"]').val();
    var codeVal = $('.phone-login input[type="text"]').val();
    //验证手机号格式是否正确
    var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = phone.test(phoneVal);
    console.log(phoneVal);
    console.log(codeVal);

    if (phoneVal == '') {
        $('.p.add-hint').addClass('active').text('请输入手机号！');
        return false;
    } else {
        if (!phoneResult) {
            $('p.add-hint').addClass('active').text('手机号格式不正确！');
            return false;
        } else {
            if (codeVal == '') {
                $('.password-hint').addClass('active').text('请输入验证码');
                return false;
            } else {
                validateCode(phoneVal, codeVal);
            }
        }
    }
}

//手机找回密码
function phoneFindPassword() {
    var phoneVal = $('.phone-find-password input[type="phone"]').val();
    var codeVal = $('.phone-find-password input[type="text"]').val();
    var newPassword = $('.phone-find-password input[type="password"]').val();
    //验证手机号格式是否正确
    var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    var phoneResult = phone.test(phoneVal);
    console.log(phoneResult);
    //密码格式是否正确
    var pwd = /^[a-z0-9]{6,16}$/;
    var pwdResult = pwd.test(newPassword);
    console.log(pwdResult);
    if (phoneVal == '') {
        $('.p.add-hint').addClass('active').text('请输入手机号！');
        return false;
    } else {
        if (!phoneResult) {
            $('p.add-hint').addClass('active').text('手机号格式不正确！');
            return false;
        } else {
            if (codeVal == '') {
                $('p.code-hint').addClass('active').text('请输入验证码！');
                return false;
            } else if (newPassword == '') {
                $('p.password-hint').addClass('active').text('请输入新密码！');
                return false;
            } else if (!pwdResult) {
                $('p.password-hint').addClass('active').text('密码格式不正确！');
                return false;
            } else {
                return true;
            }
        }
    }
}


// 发送验证码
function pushCode(flag) {
    var mobile = $("#mobile").val();
    var email = "";
    if (flag == "mobile") {
        mobile == "" ? mobile = $("#phone").val() : mobile;
    } else {
        email = $("#email").val();
    }
    $.ajax({
        type: "GET",
        url: "/alink-hq/verify/",
        data: {
            "mobile": mobile,
            "email": email
        },
        async: false,
        success: function (res) {
            console.log("result=" + res + ",mobile=" + mobile);
            if (res == "mobile_failure") {
                $('p.page-hint').addClass('active').text('该手机号未绑定！');
                // $("#mobile").focus();
            } else if (res == "email_failure") {
                $('p.page-hint').addClass('active').text('该邮箱未绑定！');
            } else {
                $('p.page-hint').removeClass('active').text('');
            }
        }
    })
}

function validate() {
    $("p.page-hint").html("");
    var uname = $("#uname").val();
    var pwd = $("#pwd").val();
    var phone = $("#phone").val();
    var code = $("#code").val();
    if (uname != "" && pwd != "") {
        $("form:eq(0)").submit();
    } else {
        var flag = validateCode(phone, code);
        console.log("uname=" + uname + ",pwd=" + pwd + ",phone=" + phone + ",code=" + code + ",flag=" + flag);
        if (flag == "success" && phone != "") {
            $("form:eq(1)").submit();
        } else {
            console.log("flag=" + flag);
            $('div.page-hint').addClass('dsp').text('验证码不正确！');
            // $("div.errMsg").html("<span style='font-weight: bold;color: red'>验证码不正确！</span>");
        }
    }
}
/* 校验验证码 */
function validateCode(user, code) {
    var result = "";
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkCode",
        data: {
            "mobile": user,
            "code": code,
        },
        async: false,
        success: function (res) {
            if (res == "success") {
                result = res;
            } else {
                result = res;
                $('p.page-hint').addClass('active').text('验证码不正确！');
                // $("#code").focus();
            }
        }
    })
    console.log("user=" + user + ",checkCode_result=" + result);
    return result;
}

function modifyPwd() {
    $("div.errMsg").html("");
    var email = $("#email").val();
    var mobile = $("#mobile").val();
    var temp = "";
    var pwd = "";
    var code = "";
    var pwd1 = $("#pwd1").val();
    var pwd2 = $("#pwd2").val();
    if (pwd1 != "") {
        pwd = pwd1;
    } else if (pwd2 != "") {
        pwd = pwd2;
    }
    var code1 = $("#code1").val();
    var code2 = $("#code2").val();
    if (code1 != "") {
        code = code1;
    } else if (code2 != "") {
        code = code2;
    }
    if (mobile != "") {
        temp = mobile;
        var result = validateCode(mobile, code);
    }
    if (email != "") {
        temp = email;
        var result = validateCode(email, code);
    }
    // var flag = phoneFindPassword();
    var flag = false;
    if (temp != "" && code != "" && pwd != "") {
        flag = true;
    }
    console.log("flag=" + flag + ",code=" + code + ",pwd=" + pwd + ",result=" + result);
    if (flag) {
        if (result == "success") {
            $.ajax({
                type: "GET",
                url: "/alink-hq/restPwd",
                data: {
                    "mobile": mobile,
                    "email": email,
                    "pwd": pwd
                },
                async: false,
                success: function (res) {
                    if (res == "success") {
                        console.log("密码修改成功！");
                        setInterval(go(), 1000);
                    }
                }
            })
        } else if (mobile != "") {
            // $("div.errMsg").html("<span style='font-weight: bold;color: red'>验证码不正确！</span>");
            $('div.page-hint').addClass('dsp').text('验证码不正确！');
            $("#code1").focus();
        } else if (email != "") {
            $('div.page-hint').addClass('dsp').text('验证码不正确！');
            $("#code2").focus();
        }
    }
    console.log("mobile=" + mobile + ",email=" + email);
}

function go() {
    var flag = confirm("密码修改成功，是否直接跳转到用户列表？");
    if (flag == true) {
        location.href = "/alink-hq/userList";
    } else {
        location.href = "/alink-hq/userList";
    }
}

window.onbeforeunload = function () {
    var uid = $("#uid").val();
    var n = window.event.screenX - window.screenLeft;
    var b = n > document.documentElement.scrollWidth - 20;
    if (b && window.event.clientY < 0 || window.event.altKey) {
        console.log("这是一个关闭操作而非刷新");
        $.ajax({
            type: "GET",
            url: "/alink-hq/logOut",
            data: {
                "id": uid,
            },
            async: false,
            success: function () {
                console.log("uid=" + uid);
            }
        })
    } else {
        console.log("这是一个刷新操作而非关闭");
        //此处放你想要操作的代
    }
};

