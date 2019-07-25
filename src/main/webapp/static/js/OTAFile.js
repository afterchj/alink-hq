/**
 * Created by yuanjie.fang on 2019/7/25.
 */

//备忘录
$(function () {
    // var width = window.screen.width;
    // var height = window.screen.height;
    $('body').click(function () {
        $('.memo-edit-has').parent('td').removeClass('active');
    })
    //如果备忘录不为空时
    $('.memo-edit').click(function (event) {
        event.stopPropagation();
        $(this).parent('td').addClass('active');
        $(this).parent().parent('tr').siblings('tr').children('td').removeClass('active');
    })
    $('.meno-nav img,.memo-edit2').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').addClass('active');
        $('div[openContent="memo-edit"] .pop-content').find('p.unuse').remove();
        $(".wishContent").val('');
        var content = $(this).parent().siblings('div').text();
        var account = $(this).parents('tr').children('td').eq(0).text();
        if (content != '') {
            $(".wishContent").val(content);
        }else{
            $('table tr>td:last-child').removeClass('active');
        }
        $("#memo-account").val(account);
        $(".wordsNum").html(checkStrLengths(content, 200) + '/200');
        // $('.hide-iframe').addClass('active');
        // $('.hide-iframe').css({
        //     'width': width,
        //     'height': height
        // })
        var selector=$('div[openContent="memo-edit"]');
        selector.addClass('active');
        adjust(selector)
        showOverlay()
    })
    //点击取消时
    $('div[openContent="memo-edit"] button.reduce').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector=$('div[openContent="memo-edit"]');
        selector.removeClass('active')
        hideOverlay()
    })
    //点击确定时
    $('div[openContent="memo-edit"] button.yes').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector=$('div[openContent="memo-edit"]');
        selector.removeClass('active')
        hideOverlay()
        //获取输入内容
        var content = $(".wishContent").val();
        var account = $("#memo-account").val();
        $.ajax({
            type: "POST",
            url: "/alink-hq/account/saveMemo",
            data: {account: account, content: content},
            dataType: "json",
            success: function (res) {
                // console.log(res);
                if (res.result == '000') {
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