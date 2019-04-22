//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    var match = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var text = "请输入正确的邮箱";
    //鼠标点击任意一处 判断邮箱是否正确
    $("#email").bind(
        "change",
        function () {
            $('p.email-hint').removeClass('active').text('');
            var context = $("#email").val();
            if (!match.test(context)) {
                $('p.email-hint').addClass('active').text(text);
            } else {
                $('p.email-hint').removeClass('active').text('');
            }
        });

    //点击获取激活码
    $("#codeSubmit").click(function () {
        $('p.code-hint').removeClass('active').text('');
        var email = $("#email").val();
        var emailFlag = isEmpty(email);
        var emailHint = $("p.email-hint").text();
        var hintFlag = isEmpty(emailHint);
        if (emailFlag) {
            //邮箱为空
            $('p.email-hint').addClass('active').text("请输入邮箱");
        } else if (!hintFlag) {
            //提示框有提示
            $('p.email-hint').removeClass('active').text('');
            $('p.email-hint').addClass('active').text(text);
        } else {
            $('p.email-hint').removeClass('active').text('');
            $.ajax({
                type: "POST",
                url: "/alink-hq/myAccount/sendEmailCode",
                data: "email=" + email,
                dataType: "json",
                success: function (msg) {
                    console.log("msg: " + msg.info);
                    if (msg.info == "isBinding") {
                        $('p.email-hint').addClass('active').text("该邮箱已绑定");
                    } else if (msg.info == "success") {
                        sendMessage($("#codeSubmit"), 60, "获取激活码");
                    } else {
                        alert("加载失败,请重试");
                    }
                },
                error: function (err) {
                    alert("加载失败,请重试");
                    console.log("err: " + err);
                }
            });
        }
    });

    //点击立即绑定
    $("#fillSubmit").click(function () {
        $('p.code-hint').removeClass('active').text('');
        var email = $("#email").val();
        var emailFlag = isEmpty(email);
        var code = $("#code").val();//用户输入的验证码
        var account = $(".account").val();
        var codeFlag = isEmpty(code);
        var emailHint = $("p.email-hint").text();
        var hintFlag = isEmpty(emailHint);
        if (emailFlag) {
            //手机号为空
            $('p.email-hint').removeClass('active').text('');
            $('p.email-hint').addClass('active').text("请输入邮箱");
        } else if ($.trim(emailHint) == text) {
            //提示框有提示
            $('p.email-hint').removeClass('active').text('');
            $('p.email-hint').addClass('active').text(text);
        }
        if (codeFlag) {
            //验证码为空
            $('p.code-hint').removeClass('active').text('');
            $('p.code-hint').addClass('active').text("请输入激活码");
        }
        if (!emailFlag && !codeFlag && hintFlag) {
            //手机号和验证码不为空
            var length = $.trim(code).length;
            if (length != 6) {
                //激活码不正确
                $('p.code-hint').removeClass('active').text('');
                $('p.code-hint').addClass('active').text("激活码不正确");
                // console.log("激活码不正确");
            } else {
                $('p.email-hint').removeClass('active').text('');
                $.ajax({
                    type: "POST",
                    url: "/alink-hq/myAccount/changeEmail",
                    data: $("#emailForm").serialize(),
                    dataType: "json",
                    success: function (msg) {
//                  alert("msg: "+msg);
                        console.log("msg: " + msg.info);
                        var info = msg.info;
                        if (info == "codeError") {
                            //验证码不正确
                            $('p.code-hint').removeClass('active').text('');
                            $('p.code-hint').addClass('active').text("激活码不正确");
                        } else if (info == "dbError") {
                            //数据库异常
                            var content = "加载失败，请重新尝试";
                            loadingError(content);
                        } else {
                            var flag = $("#flag").val();
                            var content;
                            if (flag=='2'){
                                content = "绑定成功！";
                            }else {
                                content = "修改绑定成功！";
                            }
                            loadingSuccess(content, account);
                        }
                    },
                    error: function () {
                        var content = "加载失败，请重新尝试";
                        loadingError(content);
                    }
                });
            }
        }
    });
});