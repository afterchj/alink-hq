$(function () {

    // 6-16 位数字、字母
    var match = /^[a-zA-Z0-9]{6,16}$/;
    var text = "请输入 6-16 位数字、字母";
    //输入框值发生改变时显示提示
    $("#pwd1").bind(
        "input propertychange change",
        function () {
            $('p.pwd-hint').removeClass('active').text('');
            var context = $("#pwd1").val();
            if (!match.test(context)){
                $('p.pwd-hint').addClass('active').text(text);
            }else {
                $('p.pwd-hint').removeClass('active').text('');
            }
        });


    $(".submitConfirm").click(function () {
        $('p.pwd-hint').removeClass('active').text('');
        $('p.inconsistent-hint').removeClass('active').text('');
        var confirmPwd = $(".confirmPwd").val();
        var newPwd = $(".newPwd").val();
        var account = $(".account").val();
        var newPwdFlag = isEmpty(newPwd);
        var confirmPwdFlag = isEmpty(confirmPwd);
        if (newPwdFlag){
            // $(".newPwdHint").text("请输入新密码");
            $('p.pwd-hint').addClass('active').text('请输入新密码');
        }
        if (confirmPwdFlag){
            // $(".confirmPwdHint").text("请再次输入新密码");
            $('p.inconsistent-hint').addClass('active').text('请再次输入新密码');
        }
        ////新密码和确认密码不为空
        if (!newPwdFlag&&!confirmPwdFlag){
            //新密码和确认密码不一致
            if ($.trim(newPwd)!=$.trim(confirmPwd)){
                // $(".confirmPwdHint").text("密码不一致");
                $('p.inconsistent-hint').addClass('active').text('密码不一致');
            }else {
                $.ajax({
                    type:"POST",
                    url:"/alink-hq/myAccount/changePwd",
                    data:$("#pwdForm").serialize(),
                    dataType:"json",
                    success:function (msg) {
                        console.log("msg: "+msg.success);
                        if (msg.success=="密码修改成功"){
                            // alert("密码修改成功");
                            var title = "密码";
                            var content = "修改";
                            loding(title, content, account);
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
function loding(title,content,account){
    $('#preload-anim').addClass('active');
    $('#preload-anim .title').text(title+content+'成功！');
    setTimeout(function(){
        $('#preload-anim').removeClass('active');
        $('#preload-anim .title').text('');
        window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
    },2000)
}