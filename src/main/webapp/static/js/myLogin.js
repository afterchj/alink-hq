/**
 * Created by hongjian.chen on 2019/4/10.
 */
$(function () {
    var ctx = $("#ctx").val();
    // console.log("Project ContextPath:" + _ctx);
    console.log("路径:" + ctx);
    $("#title li").click(function () {
        $(this).addClass('bottom');  // 添加当前元素的样式
        $(this).siblings('li').removeClass('bottom');  // 删除其他兄弟元素的样式
    });
    //为表单的必填文本框添加提示信息（选择form中的所有后代input元素）
    $("#form1 :input.required").each(function () {
        //通过jquery api：$("HTML字符串") 创建jquery对象
        var $required = $("<strong class='high'>*</strong>");
        //添加到this对象的父级对象下
        $(this).parent().append($required);
    });

    //为表单元素添加失去焦点事件
    $("#form1 :input").blur(function () {
        var $parent = $(this).parent();
        $parent.find(".msg").remove(); //删除以前的提醒元素（find()：查找匹配元素集中元素的所有匹配元素）
        //验证姓名
        if ($(this).is("#uname")) {
            var nameVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            var regName = /[~#^$@%&!*()<>:;'"{}【】 ]/;
            if (nameVal == "" || regName.test(nameVal)) {
                var errorMsg = " 账号非空，不包含特殊字符！";
                //class='msg onError' 中间的空格是层叠样式的格式
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
            else {
                var okMsg = " 输入正确";
                $parent.find(".high").remove();
                $parent.append("<span class='msg onSuccess'>" + okMsg + "</span>");
            }
        }
        if ($(this).is("#pwd")) {
            var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (pwdVal == "") {
                var errorMsg = " 密码不能为空！";
                //class='msg onError' 中间的空格是层叠样式的格式
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
        }
        if ($(this).is("#pwd2")) {
            var pwdVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (pwdVal == "") {
                var errorMsg = " 密码不能为空！";
                //class='msg onError' 中间的空格是层叠样式的格式
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
        }
        //验证手机
        if ($(this).is("#mobile")) {
            var mobileVal = $.trim(this.value);
            var regMobile = /^[1][3,4,5,7,8,9][0-9]{9}$/;
            if (mobileVal == "" || (mobileVal != "" && !regMobile.test(mobileVal))) {
                var errorMsg = " 请输入正确的手机号！";
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
            else {
                var okMsg = " 输入正确";
                $parent.find(".high").remove();
                $parent.append("<span class='msg onSuccess'>" + okMsg + "</span>");
            }
        }
        //验证邮箱
        if ($(this).is("#email")) {
            var emailVal = $.trim(this.value);
            var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if (emailVal == "" || (emailVal != "" && !regEmail.test(emailVal))) {
                var errorMsg = " 请输入正确的手机号！";
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
            else {
                var okMsg = " 输入正确";
                $parent.find(".high").remove();
                $parent.append("<span class='msg onSuccess'>" + okMsg + "</span>");
            }
        }
        if ($(this).is("#code")) {
            var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (codeVal == "") {
                //class='msg onError' 中间的空格是层叠样式的格式
                var errorMsg = "验证码不能为空！";
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
        }
        if ($(this).is("#code2")) {
            var codeVal = $.trim(this.value); //原生js去空格方式：this.replace(/(^\s*)|(\s*$)/g, "")
            if (codeVal == "") {
                //class='msg onError' 中间的空格是层叠样式的格式
                var errorMsg = "验证码不能为空！";
                $parent.append("<span class='msg onError'>" + errorMsg + "</span>");
            }
        }
    }).keyup(function () {
        //triggerHandler 防止事件执行完后，浏览器自动为标签获得焦点
        $(this).triggerHandler("blur");
    }).focus(function () {
        $(this).triggerHandler("blur");
    });
});

function showForm(id) {
    for (var i = 1; i < 3; i++) {
        if (id == i) {
            $("#login" + id).removeClass("myDisplay");
            $("#errMsg" + id).removeClass("myDisplay");
        } else {
            $("#login" + i).addClass("myDisplay");
            $("#errMsg" + i).addClass("myDisplay");
        }
    }
}

function pushCode(flag) {
    var mobile = "";
    var email = "";
    if (flag == "mobile") {
        mobile = $("#mobile").val();
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
            if (res == "false") {
                $("#errMsg").html("<span style='font-weight: bold;color: red'>该手机号未绑定！</span>");
                $("#mobile").focus();
            }
        }
    })
}
function validate() {
    var username = $("#uname").val();
    var password = $("#pwd").val();
    var code = $("#code").val();
    var mobile = $("#mobile").val();
    var okUsername = false;
    var okPassword = false;
    var okMobile = false;
    var okCode = false;
    if (username != "") {
        okUsername = true;
    }
    if (password != "") {
        okPassword = true;
    }
    if (mobile != "") {
        okMobile = true;
    }
    if (validateCode(mobile, code) == "success") {
        okCode = true;
    } else {
        $("#errMsg2").html("<span style='font-weight: bold;color: red'>验证码不正确！</span>");
    }

    console.log("okUsername" + okUsername + ",okPassword" + okUsername + ",okPassword" + okMobile + ",okCode=" + okCode);
    if (okUsername && okPassword || (okMobile && okCode)) {
        $("#form1").submit();
    }
}
/* 检查用户名是否可用 */
function validateCode(user, code) {
    var result = "";
    $.ajax({
        type: "GET",
        url: "/alink-hq/checkCode",
        data: {
            "mobile": user,
            "email": user,
            "code": code,
        },
        async: false,
        success: function (res) {
            if (res == "success") {
                result = res;
            } else {
                result = res;
                $("#errMsg").html("<span style='font-weight: bold;color: red'>验证码不正确！</span>");
                $("#code").focus();
            }
        }
    })
    console.log("checkCode_result=" + result);
    return result;
}

function modifyPwd() {
    var mobile = $("#mobile").val();
    var email = $("#email").val();
    var confirmPwd = "";
    var code = "";
    var pwd = $("#pwd").val();
    var pwd2 = $("#pwd2").val();
    if (pwd != "") {
        confirmPwd = pwd;
    } else if (pwd2 != "") {
        confirmPwd = pwd2;
    }
    var code1 = $("#code").val();
    var code2 = $("#code2").val();
    if (code1 != "") {
        code = code1;
    } else if (code2 != "") {
        code = code2;
    }
    if (mobile != "") {
        var result = validateCode(mobile, code);
    }
    if (email != "") {
        var result = validateCode(email, code);
    }
    if (result == "success") {
        $.ajax({
            type: "GET",
            url: "/alink-hq/restPwd",
            data: {
                "mobile": mobile,
                "email": email,
                "pwd": confirmPwd
            },
            async: false,
            success: function (res) {
                if (res == "success") {
                    console.log("密码修改成功！");
                    setInterval(go(), 1000);
                }
            }
        })
    } else {
        $("#errMsg").removeClass("myDisplay");
        $("#errMsg").html("<span style='font-weight: bold;color: red'>验证码不正确！</span>");
        $("#code").focus();
    }

    function go() {
        // var flag = confirm("密码修改成功，是否直接跳转到用户列表？");
        // if (flag == true) {
        //     location.href = "/alink-hq/userList";
        // }
        alert("密码修改成功！")
        location.href = "/alink-hq/userList";
    }
}