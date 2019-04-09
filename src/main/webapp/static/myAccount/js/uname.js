//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    //  2-6 位中文、字母、数字
    var match = /^[0-9A-Za-z\u4e00-\u9fa5]{2,6}$/;
    var text = "请输入2-6 位中文、字母、数字";
    //输入框值发生改变
    $("#uname").bind(
        "input propertychange change",
        {context:"#uname",hint:"#unameHint",match:match,text:text},
        matchInput);

    $("#submit").click(function () {
        $("#unameHint").empty();
        var uname = $("#uname").val();
        var account = $("#account").val();
        var unameFlag = isEmpty(uname);
        var unameHint = $("#unameHint").text();
        var hintFlag = isEmpty(unameHint);
        console.log("form: "+$("#unameForm").serialize());
        if (unameFlag){
            $("#unameHint").text("请输入用户名");
        }else if(!hintFlag){
            //提示框有提示
            $("#unameHint").text(text);
        }else if ($(".name").val()==$.trim($("#uname").val())){
            //用户名相同
            $("#unameHint").text("用户名相同");
        }else {
            $.ajax({
                type:"POST",
                url:"/blt-hq/myAccount/changeUserName",
                data:$("#unameForm").serialize(),
                dataType:"json",
                success:function (msg) {
                    console.log("msg: "+msg.success);
                    var success = new RegExp("成功");
                    if (success.test(msg.success)){
                        alert(msg.success);
                        //2s后跳转
                        setTimeout(function () {
                            window.location.href = "http://localhost:8080/blt-hq/myAccount/myAccount?account="+account;
                        },2000);
                    }else {
                        alert(msg.success);
                    }
                },
                error:function (err) {
                    alert("加载失败,请重试");
                    console.log("err: "+err);
                }
            });
        }
    });
});