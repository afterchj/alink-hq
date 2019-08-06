/**
 * Created by yuanjie.fang on 2019/7/25.
 */
var id;
$('.singleDel').click(function () {
    id = $(this).attr("alt");
    var fileName=$(this).parent().siblings('.otaName').text();
    var selector = $('div[openContent="delete-pop"]');
    selector.addClass('active');
    $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除 '+fileName+' 固件？');
    $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后， '+fileName+' 固件所有历史版本将均被删除，请慎重！');
    adjust(selector);
    showOverlay();
});
$('div[openContent="delete-pop"] .pop-btn .reduce').click(function () {
    var selector = $('div[openContent="delete-pop"]');
    selector.removeClass('active')
    hideOverlay()
});
$('div[openContent="delete-pop"] .pop-btn .yes').click(function () {
    $.get("/alink-hq/file/deleteFileById?id=" + id, function (res) {
        console.log("res", res);
        location.reload();
    });
    var selector = $('div[openContent="delete-pop"]');
    selector.removeClass('active')
    hideOverlay()
});
//备忘录
$(function () {
    var id;
    // $('body').click(function () {
    //     $('.memo-edit-has').parent('td').removeClass('active');
    // })
    //如果备忘录不为空时
    $('.memo-edit').click(function () {
        // event.stopPropagation();
        $(this).parent('td').addClass('active');
        $(this).parent().parent('tr').siblings('tr').children('td').removeClass('active');
    })
    $('.meno-nav img,.memo-edit2').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').addClass('active');
        var content = $(this).siblings('div').text();
        id = $(this).attr("alt");
        if (content != '') {
            $(".wishContent").val(content);
        } else {
            $('table tr>td:last-child').removeClass('active');
        }
        $('div[openContent="memo-edit"] .pop-content').find('p.unuse').remove();
        $(".wordsNum").html(checkStrLengths(content, 200) + '/200');
        var selector = $('div[openContent="memo-edit"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
    })
    //点击取消时
    $('div[openContent="memo-edit"] button.reduce').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
    })
    //点击确定时
    $('div[openContent="memo-edit"] button.yes').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
        //获取输入内容
        var content = $(".wishContent").val();
        console.log("desc", content);
        $.ajax({
            type: "POST",
            url: "/alink-hq/file/saveUpdate",
            data: {"id":id,"otaDesc": content},
            success: function (res) {
                if (res == 'ok') {
                    location.reload();
                }
            }
        });
        $(this).parents('.pop-iframe').removeClass('active');
    })
})

//封装一个限制字数方法
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

//监听输入
$(".wishContent").on('input propertychange', function () {
    //获取输入内容
    var userDesc = $(this).val();
    //判断字数
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 200);
    } else {
        len = 0
    }
    //显示字数
    $(".wordsNum").html(len + '/200');
});