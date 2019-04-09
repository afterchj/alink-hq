//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    var match=/^(\+?0?86\-?)?1[345789]\d{9}$/;
    var text = "请输入正确的手机号";
    //鼠标点击任意一处 判断手机号是否正确
    $("#mobile").bind(
        "change",
        {context:"#mobile",hint:"#mobileHint",match:match,text:text},
        matchInput);

    //点击获取验证码
    $("#codeSubmit").click(function () {
        $("#codeHint").empty();
        var mobile = $("#mobile").val();
        var mobileFlag = isEmpty(mobile);
        var mobileHint = $("#mobileHint").text();
        var hintFlag = isEmpty(mobileHint);
        if (mobileFlag){
            //手机号为空
            $("#mobileHint").text("请输入手机号");
        }else if(!hintFlag){
            //手机号格式有误
            $("#mobileHint").text("请输入正确的手机号");
        }else {
            $("#mobileHint").empty();
            $.ajax({
                type:"POST",
                url:"/alink-hq/myAccount/sendCode",
                data:"mobile="+mobile,
                dataType:"json",
                success:function (msg) {
                    console.log("code: "+msg);
                    if (msg.info=="isBinding"){
                        $("#mobileHint").text("该手机号已绑定");
                    }else if (msg.info=="success"){
//                $("#sysCode").val(msg.sysCode);//保存系统验证码
                        sendMessage($("#codeSubmit"), 60, "获取验证码");
                    }else {
                        alert("error");
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

function clickFillSubmit(event) {
    $("#codeHint").empty();
    var mobile = $("#mobile").val();
    var code = $("#code").val();//用户输入的验证码
//          var sysCode  = $("#sysCode").val();//系统保存的验证码
    var account = $("#account").val();
    var mobileHint = $("#mobileHint").text();
    var hintFlag = isEmpty(mobileHint);
    var mobileFlag = isEmpty(mobile);
    var codeFlag = isEmpty(code);
    if (mobileFlag){
        //邮箱为空
        $("#mobileHint").text("请输入邮箱");
    }else if($.trim(mobileHint)=="请输入正确的手机号"){
        //手机号格式有误
        $("#mobileHint").text("请输入正确的手机号");
    }
    if (codeFlag){
        //激活码为空
        $("#codeHint").text("请输入激活码");
    }

    if (!mobileFlag&&!codeFlag&&hintFlag){
        //邮箱和激活码不为空
//            alert($("#mobileForm").serialize());
        if ($.trim(code).length!=6){
            //激活码不正确
            $("#codeHint").text("激活码不正确");
        }else {
            $("#mobileHint").empty();
            $.ajax({
                type:"POST",
                url:"/alink-hq/myAccount/changeMobile",
                data:$("#mobileForm").serialize(),
                dataType:"json",
                success:function (msg) {
//                  alert("msg: "+msg);
                    console.log("msg: "+msg.info);
                    var info =msg.info;
                    if (info=="codeError"){
                        //验证码不正确
                        $("#codeHint").text("激活码不正确");
                    }else if (info=="dbError"){
                        //数据库异常
                        $("#codeHint").text("加载失败,请重试");
                    }else {
                        alert(event.data.alertText);
                        //2s后跳转
                        setTimeout(function () {
                            window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
                        },2000);
                    }

                },
                error:function (err) {
                    alert("加载失败,请重试");
                    console.log("err: "+err);
                }
            });
        }
    }
}

