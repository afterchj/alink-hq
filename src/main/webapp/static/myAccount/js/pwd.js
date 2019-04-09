$(function () {
    // 6-16 位数字、字母
    var match = /^[a-zA-Z0-9]{6,16}$/;
    var text = "请输入 6-16 位数字、字母";
    //输入框值发生改变时显示提示
    $("#newPwd").bind(
        "input propertychange change",
        {context:"#newPwd",hint:".newPwdHint",match:match,text:text},
        matchInput);

    $(".submitConfirm").click(function () {
        $(".newPwdHint").empty();
        $(".confirmPwdHint").empty();
        $(".success").empty();
        var confirmPwd = $(".confirmPwd").val();
        var newPwd = $(".newPwd").val();
        var account = $(".account").val();
        var newPwdFlag = isEmpty(newPwd);
        var confirmPwdFlag = isEmpty(confirmPwd);
        if (newPwdFlag){
            $(".newPwdHint").text("请输入新密码");
        }
        if (confirmPwdFlag){
            $(".confirmPwdHint").text("请再次输入新密码");
        }
        ////新密码和确认密码不为空
        if (!newPwdFlag&&!confirmPwdFlag){
            //新密码和确认密码不一致
            if ($.trim(newPwd)!=$.trim(confirmPwd)){
                $(".confirmPwdHint").text("密码不一致");
            }else {
                $.ajax({
                    type:"POST",
                    url:"/alink-hq/myAccount/changePwd",
                    data:$("#pwdForm").serialize(),
                    dataType:"json",
                    success:function (msg) {
                        console.log("msg: "+msg.success);
                        if (msg.success=="密码修改成功"){
                            alert("密码修改成功");
                            //2s后跳转
                            setTimeout(function () {
                                window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
                            },2000);
                        }else {
                            alert(msg.success);
                        }
                    },
                    error:function (err) {
                        console.log("err: "+err);
                    }
                });
            }
        }
    })
});