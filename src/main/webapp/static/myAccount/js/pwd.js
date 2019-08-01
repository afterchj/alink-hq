$(function () {
    // 6-16 位数字、字母
    var match = /^[a-zA-Z0-9]{6,16}$/;
    var text = "请输入 6-16 位数字、字母";
    //输入框值发生改变时显示提示
    $("#pwd1").bind(
        "input propertychange change",
        {hint:"pwd-hint",context:"#pwd1",text:text,match:match},
        matchInput);

    $(".submitConfirm").click(function () {
        $('#pwd1').prev('.verify').removeClass('active').text('');
        $('#pwd2').prev('.verify').removeClass('active').text('');
        var context = $("#pwd1").val();
        var confirmPwd = $(".confirmPwd").val();
        var newPwd = $(".newPwd").val();
        // var account = $(".account").val();
        var newPwdFlag = isEmpty(newPwd);
        var confirmPwdFlag = isEmpty(confirmPwd);
        var pwdMatch = match.test(context);
        if (newPwdFlag){
            //新密码为空
            // $(".newPwdHint").text("请输入新密码");
            $('#pwd1').prev('.verify').addClass('active').text('请输入新密码');
        }else {
            //新密码不为空
            if (!pwdMatch){
                //新密码不匹配
                $('#pwd1').prev('.verify').addClass('active').text(text);
            }
        }
        if (confirmPwdFlag){
            //确认密码为空
            // $(".confirmPwdHint").text("请再次输入新密码");
            $('#pwd2').prev('.verify').addClass('active').text('请再次输入新密码');
        }
        //新密码和确认密码不为空以及新密码匹配规则
        if (!newPwdFlag&&!confirmPwdFlag&&pwdMatch){
            //新密码和确认密码不一致
            if ($.trim(newPwd)!=$.trim(confirmPwd)){
                // $(".confirmPwdHint").text("密码不一致");
                $('#pwd2').prev('.verify').addClass('active').text('密码不一致');
            }else {
                $.ajax({
                    type:"POST",
                    url:"/alink-hq/myAccount/changePwd",
                    data:$("#pwdForm").serialize(),
                    dataType:"json",
                    success:function (msg) {
                        console.log("msg: "+msg.success);
                        if (msg.success=="密码修改成功"){
                            var content = msg.success+"!";
                            loadingSuccess(content);
                        }else {
                            var content = msg.success;
                            loadingError(content);
                        }
                    },
                    error:function () {
                        var content = "加载失败，请重新尝试";
                        loadingError(content);
                    }
                });
            }
        }
    })
});