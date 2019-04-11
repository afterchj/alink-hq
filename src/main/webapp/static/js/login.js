$(".login-in-box-tab>div:not('.icon-input')").click(function(){
   var tab=$(this).attr('tab').trim();
    $(this).addClass('active visible').siblings().removeClass('active');
   $('.login-in-box-tab-content>div').each(function(){
       var tabContent=$(this).attr('tabContent').trim();
       if(tab==tabContent){
           $(this).addClass('active').siblings().removeClass('active');
       }
   })
})
$('.forget-password').click(function(){
   $('.login-in-box-tab-content>div').each(function(){
       var tabContent=$(this).attr('tabContent').trim();
     if(tabContent=='phone-find-password'){
         $(this).addClass('active').siblings().removeClass('active');
          $("div[tab='phone-find-password']").addClass('visible active');
           $("div[tab='email-find-password']").addClass('visible');
           $("div[tab='password-login']").removeClass('visible active');
          $("div[tab='phone-login']").removeClass('visible active');
        }
   })
})
$('.go-login').click(function(){
    $('.login-in-box-tab-content>div').each(function(){
        var tabContent=$(this).attr('tabContent').trim();
        console.log(tabContent);
        if(tabContent=='password-login'){
            $(this).addClass('active ').siblings().removeClass('active');
            $("div[tab='password-login']").addClass('visible active');
            $("div[tab='phone-login']").addClass('visible').removeClass('active');
            $("div[tab='phone-find-password']").removeClass('visible active');
            $("div[tab='email-find-password']").removeClass('visible active');
        }
    })
})
function toVaild1(){
    var accountVal=$('input.p-l-val').val();
    var passwordVal=$('input.p-l-password-val').val();
    //检测账号是否正确
    var account=/^[a-z A-Z]{5}[0-9]{3}/;
    var accountResult=account.test(accountVal);
    //检测用户名是否正确
    var userName=/^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult=userName.test(accountVal);
    //验证邮箱是否正确
    var email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var emailResult=email.test(accountVal);
    //验证手机号是否正确
    var phone=/^1[3|4|5|8][0-9]\d{4,8}$/;
    var phoneResult=phone.test(accountVal);
    if(accountVal==''){
        if(passwordVal==''){
            $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
            $('p.password-hint').addClass('active').text('请输入密码');
            return false;
        }else if(passwordVal.length>=6 && passwordVal.length<=16){
            $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
            $('p.password-hint').removeClass('active').text('');
            $('input.p-l-password-val').val('');
            return false;
        }else{
            $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
            $('p.password-hint').removeClass('active').text('');
            $('input.p-l-password-val').val('');
            return false;
        }
    }else if(!accountResult || !userNameResult){
        if(passwordVal==''){
            $('p.add-hint').addClass('active').text('登录名错误');
            $('p.password-hint').addClass('active').text('请输入密码');
            return false;
        }else if(passwordVal.length>=6 && passwordVal.length<=16){
            // $('p.page-hint').addClass('active').text('登录名密码不正确');
            // $('input.p-l-password-val').val('');
            return true;
        }else{
            $('p.page-hint').addClass('active').text('登录名密码不正确');
            $('input.p-l-password-val').val('');
            return true;
        }
    }else if(!emailResult){
        $('input.p-l-val').blur(function(){
            $('p.add-hint').addClass('active').text('请输入正确的邮箱');
            return false;
        });
    }else if(emailResult){
        if(passwordVal==''){
            $('p.add-hint').addClass('active').text('该邮箱未绑定');
            $('p.password-hint').addClass('active').text('请输入密码');
            return false;
        }else{
            $('p.add-hint').addClass('active').text('该邮箱未绑定');
            $('p.password-hint').removeClass('active').text('');
            $('input.p-l-password-val').val('');
            return false;
        }
    }
}
/*
//账号密码验证
function toVaild1(){
    var accountTip=checkAccount();
    var passwordTip=checkPassword();
    console.log('accountTip',accountTip);
    console.log('passwordTip',passwordTip);
   /!* return false;*!/
    console.log(accountTip && passwordTip);
    return accountTip && passwordTip;
}
function checkAccount(){
    var accountVal=$('input.p-l-val').val();
    //检测账号是否正确
    var account=/^[a-z A-Z]{5}[0-9]{3}/;
    var accountResult=account.test(accountVal);
    //检测用户名是否正确
    var userName=/^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult=userName.test(accountVal);
    //验证邮箱是否正确
    var email=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var emailResult=email.test(accountVal);
    //验证手机号是否正确
    var phone=/^1[3|4|5|8][0-9]\d{4,8}$/;
    var phoneResult=phone.test(accountVal);

    //输入框判断
    if(accountVal==''){
        //什么都没有输入
       $('p.add-hint').addClass('active').text('请输入账号/用户名/邮箱/手机号');
        return false;
    }else if(accountVal!='' &&  accountResult){
        console.log('输入的是账号');
        return true;
     /!*   return false;*!/

    }else if(accountVal!='' &&  userNameResult){
        console.log('输入的是用户名');
        return true;
       /!* return false;*!/

    }else if(accountVal!='' &&   emailResult){
        console.log('输入的是邮箱');
        return true;
     /!*   return false;*!/

    }else if(accountVal!='' &&  phoneResult){
        console.log('输入的是手机号');
        return true;
       /!* return false;*!/

    }
}

function checkPassword(){
    var passwordVal=$('input.p-l-password-val').val();
    var length=passwordVal.length;
    //密码判断
    if(passwordVal==''){
        //未输入密码
        $('p.password-hint').addClass('active').text('请输入密码');
        return false;
    }else if(length>16 || length<6){
        $('p.false-alert').addClass('active').siblings('p').removeClass('active');
        console.log('密码长度有误');
        return false;
    }else {
        return true;
    }
}*/
