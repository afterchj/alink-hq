//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    var match = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var text = "请输入正确的邮箱";
    //鼠标点击任意一处 判断邮箱是否正确
    $("#email").bind(
        "change",
        {context:"#email",hint:"#emailHint",match:match,text:text},
        matchInput);

    //点击获取激活码
    $("#codeSubmit").click(function () {
        $("#codeHint").empty();
        $("#success").empty();
        var email = $("#email").val();
        var emailFlag = isEmpty(email);
        var emailHint = $("#emailHint").text();
        var hintFlag = isEmpty(emailHint);
        if (emailFlag) {
            //邮箱为空
            $("#emailHint").text("请输入邮箱");
        } else if(!hintFlag){
            //提示框有提示
            $("#emailHint").text(text);
        }else {
            $("#emailHint").empty();
            $.ajax({
                type: "POST",
                url: "/blt-hq/myAccount/sendEmailCode",
                data: "email=" + email,
                dataType: "json",
                success: function (msg) {
                    console.log("msg: " + msg.info);
                    if (msg.info == "isBinding") {
                        $("#emailHint").text("该邮箱已绑定");
                    } else if (msg.info == "success") {
                        $("#success").text("请登录邮箱查收");
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
        $("#codeHint").empty();
        $("#success").empty();
        var email = $("#email").val();
        var emailFlag = isEmpty(email);
        var code = $("#code").val();//用户输入的验证码
        var account = $("#account").val();
        var codeFlag = isEmpty(code);
        var emailHint = $("#emailHint").text();
        var hintFlag = isEmpty(emailHint);
        if (emailFlag) {
            //手机号为空
            $("#emailHint").text("请输入邮箱");
        }else if($.trim(emailHint)==text){
            //提示框有提示
            $("#emailHint").text(text);
        }
        if (codeFlag) {
            //验证码为空
            $("#codeHint").text("请输入激活码");
        }

        if (!emailFlag && !codeFlag && hintFlag) {
            //手机号和验证码不为空
            var length = $.trim(code).length;
            if (length != 6) {
                //激活码不正确
                $("#codeHint").text("激活码不正确");
                console.log("激活码不正确")
            } else {
                $("#emailHint").empty();
                $.ajax({
                    type: "POST",
                    url: "/blt-hq/myAccount/changeEmail",
                    data: $("#emailForm").serialize(),
                    dataType: "json",
                    success: function (msg) {
//                  alert("msg: "+msg);
                        console.log("msg: " + msg.info);
                        var info = msg.info;
                        if (info == "codeError") {
                            //验证码不正确
                            $("#codeHint").text("激活码不正确");
                        } else if (info == "dbError") {
                            //数据库异常
                            $("#codeHint").text("加载失败,请重试");
                        } else {
                            alert("绑定成功");
                            //2s后跳转
                            setTimeout(function () {
                                window.location.href = "http://localhost:8080/blt-hq/myAccount/myAccount?account=" + account;
                            }, 2000);
                        }

                    },
                    error: function (err) {
                        alert("加载失败,请重试");
                        console.log("err: " + err);
                    }
                });
            }
        }
    });
});