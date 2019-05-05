//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    //  2-6 位中文、字母、数字
    var match = /^[0-9A-Za-z\u4e00-\u9fa5]{2,6}$/;
    var text = "请输入2-6 位中文、字母、数字";
    //输入框值发生改变
    $("#userNameNew").bind(
        "input propertychange change",
        // "input propertychange",
        function () {

            var context = $("#userNameNew").val();
            if (!match.test(context)) {
                $('p.use-hint').removeClass('active').text('');
                $('p.use-hint').addClass('active').text(text);
            } else {
                $.ajax({
                    type: "POST",
                    url: "/alink-hq/myAccount/getUserName",
                    data: "uname=" + context,
                    dataType: "json",
                    success: function (msg) {
                        console.log("msg: " + msg.info);
                        //存在用户名
                        if (msg.info == "true") {
                            $('p.use-hint').removeClass('active').text('');
                            $('p.use-hint').addClass('active').text('已存在，请重新输入');
                        } else {
                            $('p.use-hint').removeClass('active').text('');
                        }
                    }
                });
            }
        });
    $("#userName").bind(
        "input propertychange change",
        // "input propertychange",
        function () {
            var context = $("#userName").val();
            if (!match.test(context)) {
                $('p.use-hint').removeClass('active').text('');
                $('p.use-hint').addClass('active').text(text);
            } else {
                $.ajax({
                    type: "POST",
                    url: "/alink-hq/myAccount/getUserName",
                    data: "uname=" + context,
                    dataType: "json",
                    success: function (msg) {
                        console.log("msg: " + msg.info);
                        //存在用户名
                        if (msg.info == "true") {
                            $('p.use-hint').removeClass('active').text('');
                            $('p.use-hint').addClass('active').text('已存在，请重新输入');
                        } else {
                            $('p.use-hint').removeClass('active').text('');
                        }
                    }
                });
            }
        });

    $("#submit").click(function () {
        // $('p.use-hint').removeClass('active').text('');
        var uname = $("#userNameNew").val();
        if (uname == undefined) {
            uname = $("#userName").val();
        }
        var account = $(".account").val();
        var unameFlag = isEmpty(uname);
        var unameHint = $("p.use-hint").text();
        var hintFlag = isEmpty(unameHint);
        console.log("form: " + $("#unameForm").serialize());
        if (unameFlag) {
            $('p.use-hint').removeClass('active').text('');
            $('p.use-hint').addClass('active').text("请输入用户名");
        } else if (!hintFlag) {
            //提示框有提示
            return true;
        } else if ($(".name").val() == $.trim($("#userNameNew").val())) {
            //用户名相同
            $('p.use-hint').removeClass('active').text('');
            $('p.use-hint').addClass('active').text("用户名相同");
        } else {
            $.ajax({
                type: "POST",
                url: "/alink-hq/myAccount/changeUserName",
                data: $("#unameForm").serialize(),
                dataType: "json",
                success: function (msg) {
                    console.log("msg: " + msg.success);
                    var success = new RegExp("成功");
                    if (success.test(msg.success)) {
                        var content = msg.success + "!";
                        loadingSuccess(content, account);
                    } else {
                        var content = msg.success + "!";
                        loadingError(content);
                    }
                },
                error: function () {
                    var content = "加载失败，请重新尝试";
                    loadingError(content);

                }
            });
        }
    });
});
