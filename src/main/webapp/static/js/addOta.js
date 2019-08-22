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
        $.post("/alink-hq/file/add",{"otaName":otaName,"otaId":otaID,"otaDesc":otaDescribe},function (result) {
            console.log("id",result);
            // return false;
            window.location.href = '/alink-hq/file/uploadNewVersionOTA?id='+result;
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
        var otaNameRepetResult= otaNameRepet(otaName);
        var otaIdRepetResult= otaIdRepet(otaID);

        var otaNameIsTrue=false;
        var otaIdIsTrue=false;
        if (otaName == '') {
            $('#otaName').parent().find('.verify').text('请输入固件名称');
        } else if (!otaNameRepetResult) {
            $('#otaName').parent().find('.verify').text('已存在，请重新输入');
        } else {
            otaNameIsTrue=true;
            $('#otaName').parent().find('.verify').text('');
        }
        if (otaID == '') {
            $('#otaID').parent().find('.verify').text('请输入固件ID');
        } else if (!otaIdRepetResult) {
            $('#otaID').parent().find('.verify').text('已存在，请重新输入');
        } else {
            otaIdIsTrue=true;
            $('#otaID').parent().find('.verify').text('');
        }
        console.log('固件名称',otaName);
        console.log('固件ID',otaID);
        console.log(otaName+'固件名称是否一致',otaNameRepetResult);
        console.log(otaID+'固件ID是否一致',otaIdRepetResult);
        console.log(otaName+'固件名称是否不为空且一致',otaNameIsTrue);
        console.log(otaID+'固件是否不为空且一致',otaIdIsTrue);
        // if (otaDescribe == '') {
        //     $('#otaDescribe').parent().find('.verify').text('请输入固件描述');
        // }else if(otaDescribe=='已存在'){
        //     $('#otaDescribe').parent().find('.verify').text('已存在，请重新输入');
        // }  else {
        //     $('#otaDescribe').parent().find('.verify').text('');
        // }
        // console.log(otaName,otaID);

        // var selector = $('div[openContent="add-success"]');
        // $('div[openContent="add-success"] .reset-pwd p').text('新增成功！');
        // selector.addClass('active');
        // adjust(selector);
        // showOverlay();
        if (otaNameIsTrue && otaIdIsTrue) {
            //编辑
            // showOverlay();
            // $('#preload-anim').addClass('active');
            // $('#preload-anim .title').text('保存成功');
            $('#Ota').submit();
            var selector = $('div[openContent="add-success"]');
            $('div[openContent="add-success"] .reset-pwd p').text('新增成功！');
            selector.addClass('active');
            adjust(selector);
            showOverlay();
            // setTimeout(function () {
            //     window.location.href = '/alink-hq/file/OTAFile';
            // }, 800);
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
        // if (otaName != '' && otaID != '') {
        //
        //     var idUrl = GetQueryString('id');
        //     console.log('idUrl', idUrl);
        //     if (idUrl != '') {
        //         //编辑
        //         showOverlay();
        //         $('#preload-anim').addClass('active');
        //         $('#preload-anim .title').text('保存成功');
        //         $('#Ota').submit();
        //         setTimeout(function () {
        //             window.location.href = '/alink-hq/file/OTAFile';
        //         }, 800);
        //     } else {
        //         //新增
        //
        //         // $('#Ota').submit();
        //         var selector = $('div[openContent="add-success"]');
        //         $('div[openContent="add-success"] .reset-pwd p').text('新增成功！');
        //         selector.addClass('active');
        //         adjust(selector);
        //         showOverlay();
        //
        //         // $.ajax({
        //         //     type: "post",
        //         //     url: "/alink-hq/file/add",
        //         //     data: {
        //         //         "otaName": otaName,
        //         //         "otaId": otaID,
        //         //         "otaDesc":otaDescribe
        //         //     },
        //         //     async: true,
        //         //     success: function (res) {
        //         //         console.log('res',res);
        //         //         return false;
        //         //     }
        //         // })
        //     }
        // }
    })
})
//判断固件名称是否一致
function otaNameRepet(otaName) {
    var result;
    $.ajax({
        type: "post",
        url: "/alink-hq/file/checkCount",
        data: {
            "otaName": otaName,
            // "otaId": ''
        },
        async:false,
        success: function (res) {
            // console.log('固件名称是否一致', res);
            if(res=='ok'){
                result=true;
                // return true;
            }else{
                result=false;
                // return false;
            }
        }
    })
    return result;
}
//判断固件名称是否一致
function otaIdRepet(otaId) {
    var result;
    $.ajax({
        type: "post",
        url: "/alink-hq/file/checkCount",
        data: {
            // "otaName": '',
            "otaId": otaId,
        },
        async:false,
        success: function (res) {
            // console.log('固件ID是否一致', res);
            if(res=='ok'){
                console.log('ID一致')
                result=true;
            }else{
                console.log('ID不一致')
                result=false;
            }
        }
    })
    return result;
}

