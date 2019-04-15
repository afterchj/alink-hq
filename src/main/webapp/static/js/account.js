// $(function (){
//     $('.submit-btn button').click(function(){
//         var phoneVal=$('#phone').val();
//         //验证手机号是否正确
//         var phone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
//         var phoneResult = phone.test(phoneVal);
//         if(!phoneResult){
//             $('p.phone-hint').addClass('active');
//             return false;
//         }else{
//             $('p.phone-hint').removeClass('active');
//         }

//         //验证邮箱
//         var emailVal=$('#email').val();
//         var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
//         var emailResult=regEmail.test(emailVal);
//         if(!emailResult){
//             $('p.email-hint').addClass('active');
//             return false;
//         }else{
//             $('p.email-hint').removeClass('active');
//         }

//         //验证密码
//         var pwdVal=$('#pwd').val();
//         var  pwd1Val=$('#pwd1').val();
//         var pwd2Val=$('#pwd2').val();
//         if(pwdVal>16 || pwdVal<6){
//             $('.pwd-hint').addClass('active');
//             return false;
//         }else{
//             $('p.pwd-hint').removeClass('active');
//         }


//         //验证两次密码是否一致
//         // var  pwd1Val=$('#pwd1').val();
//         // var pwd2Val=$('#pwd2').val();
//         if(pwd1Val!=pwd2Val){
//             $('p.inconsistent-hint').addClass('active');
//             return false;
//         }else{
//             $('p.inconsistent-hint').removeClass('active');
//         }
        
//         //检测用户名是否正确
//         var userVal=$('#userName').val();
//         var userName=/^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
//         var userNameResult=userName.test(userVal);
//         console.log('userNameResult',userNameResult);
//         if(!userNameResult){
//             $('p.use-hint').addClass('active');
//             return false;
//         }else{
//             $('p.use-hint').removeClass('active');
//         }
//     })
// })

// function pwd(){
//     //验证两次密码是否一致
//     var  pwd1Val=$('#pwd1').val();
//     var pwd2Val=$('#pwd2').val();
//     if(pwd1Val>16 || pwd1Val<6){
//         $('p.pwd-hint').text('cicii');
//         console.log('jjjkj');
//         return false;
//     }else{
//         $('p.pwd-hint').removeClass('active');
//         return true;
//     }
//     if(pwd2Val>16 || pwd2Val<6){
//         $('p.pwd-hint').addClass('active');
//         return false;
//     }else{
//         $('p.pwd-hint').removeClass('active');
//     }
//     if(pwd1Val!=pwd2Val){
//         $('p.inconsistent-hint').addClass('active');
//         return false;
//     }else{
//         $('p.inconsistent-hint').removeClass('active');
//     }
// }

