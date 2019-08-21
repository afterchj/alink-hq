/**
 * Created by yuanjie.fang on 2019/7/25.
 */

$(function () {
    $('body').click(function (event) {
        event.stopPropagation();
        $('.memo-edit').parent('td').removeClass('active');
    })
    var id;
    $('.singleDel').click(function () {
        id = $(this).attr("alt");
        var fileName = $(this).parent().siblings('.otaName').text();
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除 ' + fileName + ' 固件？');
        $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后， ' + fileName + ' 固件所有历史版本将均被删除，请慎重！');
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


    $('.memo-edit').click(function (event) {
        event.stopPropagation();
        id = $(this).find('.meno-img').attr('alt');
        var isEmpty = $(this).find('.memo-content').text() == '' ? true : false;
        console.log('isEmpty', isEmpty);
        console.log('我被点击了', $(this), 'id', id);
        //如果备忘录为空时
        if (isEmpty) {
            var selector = $('div[openContent="memo-edit"]');
            selector.addClass('active');
            $(".wishContent").val('');
            $(".wordsNum").html(checkStrLengths('', 200) + '/200');
            $(this).parent('td').removeClass('active');
            $(this).parent().parent('tr').siblings('tr').children('td').removeClass('active');
            adjust(selector);
            showOverlay();
        } else {
            $(this).parent('td').addClass('active');
            $(this).parent().parent('tr').siblings('tr').children('td').removeClass('active');
        }
    });
    $('.meno-nav img').click(function (event) {
        event.stopPropagation();
        var selector = $('div[openContent="memo-edit"]');
        $(this).parent().parent().parent().parent().removeClass('active');
        selector.addClass('active');
        var content = $(this).parent().siblings('.memo-content').text();
        if (content != '') {
            $(".wishContent").val(content);
        } else {
            $('table tr>td:last-child').removeClass('active');
        }
        $('div[openContent="memo-edit"] .pop-content').find('p.unuse').remove();
        $(".wordsNum").html(checkStrLengths(content, 200) + '/200');
        adjust(selector);
        showOverlay();
    })
    //点击取消时
    $('div[openContent="memo-edit"] button.reduce').click(function (event) {
        event.stopPropagation();
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
    })
    //点击确定时
    $('div[openContent="memo-edit"] button.yes').click(function (event) {
        event.stopPropagation();
        console.log('idds', id);
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
        //获取输入内容
        var content = $(".wishContent").val();
        console.log("content", content, 'id', id);
        $.ajax({
            type: "POST",
            url: "/alink-hq/file/saveUpdate",
            data: {"id": id, "otaDesc": content},
            success: function (res) {
                console.log('res',res);
                if (res == 'ok') {

                    location.reload();
                }
            }
        });
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