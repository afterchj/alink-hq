//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    //  2-6 位中文、字母、数字
    var match = /^[0-9A-Za-z\u4e00-\u9fa5]{2,6}$/;
    var text = "请输入2-6 位中文、字母、数字";
    //输入框值发生改变
    $("#userNameNew").bind(
        "input propertychange change",
        function () {
            $('p.use-hint').removeClass('active').text('');
            var context = $("#userNameNew").val();
            if (!match.test(context)){
                $('p.use-hint').addClass('active').text(text);
            }else {
                $('p.use-hint').removeClass('active').text('');
            }});
    $("#userName").bind(
        "input propertychange change",
        function () {
            $('p.use-hint').removeClass('active').text('');
            var context = $("#userName").val();
            if (!match.test(context)){
                $('p.use-hint').addClass('active').text(text);
            }else {
                $('p.use-hint').removeClass('active').text('');
            }});

    $("#submit").click(function () {
        $('p.use-hint').removeClass('active').text('');
        var uname = $("#userNameNew").val();
        if (uname='undefined'){
            uname = $("#userName").val();
        }
        var account = $(".account").val();
        var unameFlag = isEmpty(uname);
        var unameHint = $("#use-hint").text();
        var hintFlag = isEmpty(unameHint);
        console.log("form: "+$("#unameForm").serialize());
        if (unameFlag){
            $('p.use-hint').addClass('active').text("请输入用户名");
        }else if(!hintFlag){
            //提示框有提示
            // $("#unameHint").text(text);
            $('p.use-hint').addClass('active').text(text);
        }else if ($(".name").val()==$.trim($("#userNameNew").val())){
            //用户名相同
            // $("#unameHint").text("用户名相同");
            $('p.use-hint').addClass('active').text("用户名相同");
        }else {
            $.ajax({
                type:"POST",
                url:"/alink-hq/myAccount/changeUserName",
                data:$("#unameForm").serialize(),
                dataType:"json",
                success:function (msg) {
                    console.log("msg: "+msg.success);
                    var success = new RegExp("成功");
                    if (success.test(msg.success)){
                        // alert(msg.success);
                        //2s后跳转
                        // setTimeout(function () {
                        //     window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
                        // },2000);
                        // var title = "用户名";
                        var content = msg.success;
                        loding( content, account);
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
function loding(content,account){
    $('#preload-anim').addClass('active');
    $('#preload-anim .title').text(content+'！');
    setTimeout(function(){
        $('#preload-anim').removeClass('active');
        $('#preload-anim .title').text('');
        window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
    },2000)
}