/**
 * Created by yuanjie.fang on 2019/7/26.
 */

//取消
$('div[openContent="add-OTA"] button.reduce').click(function () {
    var selector = $('div[openContent="add-OTA"]');
    selector.removeClass('active');
    hideOverlay();
})
//确定
$('div[openContent="add-OTA"] button.yes').click(function () {
    var selector = $('div[openContent="add-OTA"]');
    selector.removeClass('active');
    hideOverlay();
})
//表单输入框验证
$('#otaName').bind('input propertychange', function () {
    var val = $(this).val();
    if (val == '') {
        $(this).parent().find('.verify').text('请输入固件名称');
    } else {
        $(this).parent().find('.verify').text('');
    }
});
$('#otaID').bind('input propertychange', function () {
    var val = $(this).val();
    if (val == '') {
        $(this).parent().find('.verify').text('请输入固件ID');
    } else {
        $(this).parent().find('.verify').text('');
    }
});
// $('#otaDescribe').keyup(function () {
//     var val = $(this).val();
//     if (val == '') {
//         $(this).parent().find('.verify').text('请输入固件描述');
//     } else {
//         $(this).parent().find('.verify').text('');
//     }
// });
$('.submit button').click(function () {
    var otaName = $('#otaName').val();
    var otaID = $('#otaID').val();
    var otaDescribe = $('#otaDescribe').val();
    if (otaName == '') {
        $('#otaName').parent().find('.verify').text('请输入固件名称');
    }else if(otaName=='已存在'){
        $('#otaName').parent().find('.verify').text('已存在，请重新输入');
    }else {
        $('#otaName').parent().find('.verify').text('');
    }
    if (otaID == '') {
        $('#otaID').parent().find('.verify').text('请输入固件ID');
    }else if(otaID=='已存在'){
        $('#otaID').parent().find('.verify').text('已存在，请重新输入');
    } else {
        $('#otaID').parent().find('.verify').text('');
    }
    // if (otaDescribe == '') {
    //     $('#otaDescribe').parent().find('.verify').text('请输入固件描述');
    // }else if(otaDescribe=='已存在'){
    //     $('#otaDescribe').parent().find('.verify').text('已存在，请重新输入');
    // }  else {
    //     $('#otaDescribe').parent().find('.verify').text('');
    // }
    console.log(otaName,otaID,otaDescribe);
    if(otaName!= '' &&  otaID!='' && otaDescribe!=''){
        //确定新增
        var selector = $('div[openContent="add-OTA"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
    }
})