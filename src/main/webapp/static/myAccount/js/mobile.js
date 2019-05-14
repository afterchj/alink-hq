//导入外部js文件
// document.write("<script src='/blt-hq/static/myAccount/js/common.js'></script>");
$(function () {
    var match=/^(\+?0?86\-?)?1[345789]\d{9}$/;
    var text = "请输入正确的手机号";
    //鼠标点击任意一处 判断手机号是否正确
    // $("#phone").bind("change", function () {
    //         var context = $("#phone").val();
    //         if (!match.test($.trim(context))){
    //             $('p.phone-hint').removeClass('active').text('');
    //             $('p.phone-hint').addClass('active').text(text);
    //         }else {
    //             $('p.phone-hint').removeClass('active').text('');
    //         }
    //     });
    $("#phone").bind(
        "change",
        {hint:"phone-hint",context:"#phone",text:text,match:match},
        matchInput);
    //点击获取验证码
    $("#codeSubmit").click(function () {
        $("p.code-hint").removeClass('active').text('');
        var mobile = $("#phone").val();
        var mobileFlag = isEmpty(mobile);
        var mobileHint = $("p.phone-hint").text();
        var hintFlag = isEmpty(mobileHint);
        if (mobileFlag){
            //手机号为空
            $("p.phone-hint").removeClass('active').text('');
            $("p.phone-hint").addClass('active').text("请输入手机号");
        }else if(!hintFlag){
            //手机号格式有误
            $("p.phone-hint").removeClass('active').text('');
            $("p.phone-hint").addClass('active').text(mobileHint);
        }else {
            $.ajax({
                type:"POST",
                url:"/alink-hq/myAccount/sendCode",
                data:"mobile="+mobile,
                dataType:"json",
                success:function (msg) {
                    console.log("code: "+msg);
                    if (msg.info=="isBinding"){
                        $("p.phone-hint").removeClass('active').text('');
                        $("p.phone-hint").addClass('active').text("该手机号已绑定");
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
    var mobile = $("#phone").val();
    var code = $("#code").val();//用户输入的验证码
//          var sysCode  = $("#sysCode").val();//系统保存的验证码
    var account = $(".account").val();
    var mobileHint = $("p.phone-hint").text();
    var hintFlag = isEmpty(mobileHint);
    var mobileFlag = isEmpty(mobile);
    var codeFlag = isEmpty(code);
    if (mobileFlag){
        //为空
        $("p.phone-hint").removeClass('active').text('');
        $("p.phone-hint").addClass('active').text("请输入手机号");
    }else if($.trim(mobileHint)=="请输入正确的手机号"){
        //手机号格式有误
        $("p.phone-hint").removeClass('active').text('');
        $("p.phone-hint").addClass('active').text("请输入正确的手机号");
    }
    if (codeFlag){
        //激活码为空
        $("p.code-hint").removeClass('active').text('');
        $("p.code-hint").addClass('active').text("请输入验证码");
    }
    if (!mobileFlag&&!codeFlag&&hintFlag){
        //邮箱和激活码不为空
        if ($.trim(code).length!=6){
            //激活码不正确
            $("p.code-hint").removeClass('active').text('');
            $("p.code-hint").addClass('active').text("验证码不正确");
        }else {
            $("p.phone-hint").removeClass('active').text('');
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
                        $("p.code-hint").removeClass('active').text('');
                        $("p.code-hint").addClass('active').text("验证码不正确");
                    }
                    // else if (info=="codeTimeOut"){
                    //     //验证码超时
                    //     $("p.code-hint").removeClass('active').text('');
                    //     $("p.code-hint").addClass('active').text("验证码已超时，请重新获取");
                    // }
                    else if (info=="dbError"){
                        //数据库异常
                        var content = "加载失败，请重新尝试";
                        loadingError(content);
                    }else {
                        var content = event.data.alertText;
                        loadingSuccess(content);
                    }
                },
                error:function () {
                    var content = "加载失败，请重新尝试";
                    loadingError(content);
                }
            });
        }
    }
}

