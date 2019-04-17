$(function () {
    //为表单元素添加失去焦点事件
    // $("div.errMsg").html("");
    //检测账号格式是否正确
    // if ($(this).is("#uname")) {
    //     var accountVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
    //     if (accountVal == "") {
    //         //class='msg onError' 中间的空格是层叠样式的格式
    //         $('p.add-hint').addClass('active').text('登录账号不能为空！');
    //     } else {
    //         $('p.add-hint').html('');
    //     }
    // }
    // if ($(this).is("#pwd")) {
    //     var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
    //     if (pwdVal == "") {
    //         $('p.password-hint').addClass('active').text('密码不能为空！');
    //     } else {
    //         $('p.password-hint').removeClass('active').text('');
    //     }
    // }
    // //验证手机
    // if ($(this).is("#phone")) {
    //     var mobileVal = $.trim(this.value);
    //     var regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    //     if (mobileVal == "") {
    //         $('p.add-hint').addClass('active').text('手机号不能为空！');
    //     } else if (!regMobile.test(mobileVal)) {
    //         $('p.add-hint').addClass('active').text('请输入正确的手机号！');
    //     } else {
    //         $('p.add-hint').removeClass('active').text('');
    //     }
    // }
    $("#code").blur(function () {
        var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
        if (codeVal == "") {
            //class='msg onError' 中间的空格是层叠样式的格式
            $('p.password-hint').addClass('active').text('验证码不能为空！');
        } else {
            $('p.password-hint').removeClass('active').text('');
        }
    });
    //验证手机
    $("#mobile").blur(function () {
        var mobileVal = $.trim(this.value);
        var regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
        if (mobileVal == "") {
            $('p.mobile-add-hint').addClass('active').text('手机号不能为空！');
        } else if (!regMobile.test(mobileVal)) {
            $('p.mobile-add-hint').addClass('active').text('请输入正确的手机号！');
        } else {
            $('p.mobile-add-hint').removeClass('active').text('');
        }
    });
    $("#code1").blur(function () {
        var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
        if (codeVal == "") {
            //class='msg onError' 中间的空格是层叠样式的格式
            $('p.mobile-code-hint').addClass('active').text('验证码不能为空！');
        } else {
            $('p.mobile-code-hint').removeClass('active').text('');
        }
    });
    $("#pwd1").blur(function () {
        var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
        if (pwdVal == "") {
            $('p.email-password-hint').addClass('active').text('密码不能为空！');
        } else {
            $('p.email-password-hint').removeClass('active').text('');
        }
    });
    //验证邮箱
    $("#email").blur(function () {
        var emailVal = $.trim(this.value);
        var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (emailVal == "") {
            $('p.email-add-hint').addClass('active').text('邮箱不能为空！');
        } else if (!regEmail.test(emailVal)) {
            $('p.email-add-hint').addClass('active').text('请输入正确的邮箱！');
        } else {
            $('p.email-add-hint').removeClass('active').text('');
        }
    });
    $("#code2").blur(function () {
        var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
        if (codeVal == "") {
            //class='msg onError' 中间的空格是层叠样式的格式
            $('p.email-code-hint').addClass('active').text('验证码不能为空！');
        } else {
            $('p.email-code-hint').removeClass('active').text('');
        }
    });
    $("#pwd2").blur(function () {
        var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
        if (pwdVal == "") {
            $('p.email-password-hint').addClass('active').text('密码不能为空！');
        } else {
            $('p.email-password-hint').removeClass('active').text('');
        }
    });
});

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
        async: true,
        success: function (res) {
            console.log("result=" + res + ",mobile=" + mobile);
            if (res == "mobile_failure") {
                $('p.mobile-add-hint').addClass('active').text('该手机号未绑定！');
                $('p.add-hint').addClass('active').text('该手机号未绑定！');
                // $("#mobile").focus();
            } else if (res == "email_failure") {
                $('p.email-add-hint').addClass('active').text('该邮箱未绑定！');
            } else {
                $('p.email-add-hint').removeClass('active').text('');
            }
        }
    })
}

function validate() {
    $("div.errMsg").html("");
    var uname = $("#uname").val();
    var pwd = $("#pwd").val();
    var phone = $("#phone").val();
    var code = $("#code").val();
    var flag = validateCode(phone, code);
    if (uname != "" && pwd != "") {
        $("form:eq(0)").submit();
    } else {
        console.log("uname=" + uname + ",pwd=" + pwd + ",phone=" + phone + ",code=" + code + ",flag=" + flag);
    }
    if (flag == "success" && phone != "") {
        $("form:eq(1)").submit();
    } else {
        console.log("flag=" + flag);
        // $('p.page-hint').addClass('active').text('验证码不正确！');
        // $("div.errMsg").html("<span style='font-weight: bold;color: red'>验证码不正确！</span>");
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
            "code": code
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
            $('p.page-hint').addClass('active').text('验证码不正确！');
            $("#code1").focus();
        } else if (email != "") {
            $('p.page-hint').addClass('active').text('验证码不正确！');
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
