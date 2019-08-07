/**
 * Created by yuanjie.fang on 2019/7/26.
 */

$(function () {
    var otaName, otaID, otaDescribe;
//再想想
    $('div[openContent="add-success"] button.reduce').click(function () {
        var selector = $('div[openContent="add-success"]');
        selector.removeClass('active');
        hideOverlay();
        window.location.href = '/alink-hq/file/OTAFile';
    })
//上传新版本
    $('div[openContent="add-success"] button.yes').click(function () {
        var selector = $('div[openContent="add-success"]');
        selector.removeClass('active');
        hideOverlay();
        // window.location.href = '/alink-hq/file/uploadNewVersionOTA?id='+otaID;
        $.post("/alink-hq/file/add",{"otaName":otaName,"otaId":otaID,"otaDesc":otaDescribe},function (result) {
            console.log("id",result);
            return false;
            // window.location.href = '/alink-hq/file/OTAFile';
        });
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
        otaName = $('#otaName').val();
        otaID = $('#otaID').val();
        otaDescribe = $('#otaDescribe').val();
        if (otaName == '') {
            $('#otaName').parent().find('.verify').text('请输入固件名称');
        } else if (otaName == '已存在') {
            $('#otaName').parent().find('.verify').text('已存在，请重新输入');
        } else {
            $('#otaName').parent().find('.verify').text('');
        }
        if (otaID == '') {
            $('#otaID').parent().find('.verify').text('请输入固件ID');
        } else if (otaID == '已存在') {
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
        // console.log(otaName,otaID);
        if (otaName != '' && otaID != '') {
            //编辑
            showOverlay();
            $('#preload-anim').addClass('active');
            $('#preload-anim .title').text('保存成功');
            $('#Ota').submit();
            setTimeout(function () {
                window.location.href = '/alink-hq/file/OTAFile';
            }, 800);
            // var idUrl = GetQueryString('id');
            // console.log('idUrl', idUrl);
            // if (idUrl != '') {
            //
            // } else {
            //     //新增
            //
            //     // $('#Ota').submit();
            //     var selector = $('div[openContent="add-success"]');
            //     $('div[openContent="add-success"] .reset-pwd p').text('新增成功！');
            //     selector.addClass('active');
            //     adjust(selector);
            //     showOverlay();
            //
            //     // $.ajax({
            //     //     type: "post",
            //     //     url: "/alink-hq/file/add",
            //     //     data: {
            //     //         "otaName": otaName,
            //     //         "otaId": otaID,
            //     //         "otaDesc":otaDescribe
            //     //     },
            //     //     async: true,
            //     //     success: function (res) {
            //     //         console.log('res',res);
            //     //         return false;
            //     //     }
            //     // })
            // }
        }
    })
})
