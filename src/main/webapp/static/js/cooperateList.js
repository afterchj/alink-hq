$(function () {
    var companyId, str;
    var status = $("#relation").val();
    let parentId = $("#parentId").val();
    $("#status").val(status);
    $('.memo-edit').click(function (event) {
        event.stopPropagation();
        companyId
        companyId = $(this).attr("alt");
        str = $(this).siblings('.memo-edit-has').find('.memo-content').text();
        if (str == '') {
            $(this).siblings('.memo-edit-has').find('.memo-content').text('');
            $('table tr>td:last-child').removeClass('active');
            // $('div[openContent="memo-edit"]').addClass('active');
            // $('.hide-iframe').addClass('active');
            // $('.hide-iframe').css({
            //     'width': width,
            //     'height': height
            // })
            var selector = $('div[openContent="memo-edit"]');
            selector.addClass('active');
            adjust(selector);
            showOverlay();
            $(".wishContent").val(str);
            $(".wordsNum").html(str.length + '/200')
        } else {
            $(this).parent('td').addClass('active');
            $(this).parent('td').parent('tr').siblings('tr').find('td').removeClass('active')
        }
    })
    $('.meno-nav img').click(function (event) {
        event.stopPropagation();
        str = $(this).parent().siblings('.memo-content').text();
        var selector = $('div[openContent="memo-edit"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        $(".wishContent").val(str);
        $(".wordsNum").html(str.length + '/200')
    })
    $('div[openContent="memo-edit"] button.reduce').click(function (event) {
        event.stopPropagation();
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
        // $('div[openContent="memo-edit"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
    })
    $('div[openContent="memo-edit"] button.yes').click(function (event) {
        event.stopPropagation();
        // $('div[openContent="memo-edit"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
        str = $(".wishContent").val();
        location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&other=' + str + '&parentId=' + parentId
    })
    $('body').click(function () {
        $('.memo-edit-has').parent('td').removeClass('active')
    })
    $('.off-or-on-coo').click(function () {
        var selector = $('div[openContent="start-use"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        var companyName = $(this).parent().siblings('.coo-name').text();
        status = parseInt($(this).attr('alt'));
        companyId = parseInt($(this).parent().siblings('.coo-name').find('a').attr('alt'));
        if (status == 0) {
            $('div[openContent="start-use"] .reset-pwd p').html('您确定要禁用 ' + '<span class="hint-font">' + companyName + '</span> ' + '？');
            $('div[openContent="start-use"] .reset-pwd-hint').text('禁用后，其名下所有账户将无法使用，请慎重！');
            // var content = '<div class="off-or-on">您确定要禁用' + companyName + '？</div><p style="color: #f9220a; font-size: 14px; font-weight: normal;margin-top:0;">禁用后，其名下所有账户将无法使用，请慎重！</p>'
            // $('div[openContent="start-use"] .text-msg').html(content);
        } else if (status == 1) {
            // var content='<div class="off-or-on p-a" style="top: 20px;">您确定要启用'+ companyName + '？'+'</div>';
            $('div[openContent="start-use"] .reset-pwd p').html('您确定要启用 ' + '<span class="hint-font">' + companyName + '</span> ' + '？');
            $('div[openContent="start-use"] .reset-pwd-hint').text('');
            $('div[openContent="start-use"] .reset-pwd p').css('margin-top', '5px');
            // $('div[openContent="start-use"] .text-msg').html(content);
        }
    })
    $('div[openContent="start-use"] button.reduce').click(function () {
        // $('div[openContent="start-use"]').removeClass('active');
        // $('.hide-iframe').removeClass('active')
        var selector = $('div[openContent="start-use"]');
        selector.removeClass('active');
        hideOverlay();
    })
    $('div[openContent="start-use"] button.yes').click(function () {
        // $('div[openContent="start-use"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector = $('div[openContent="start-use"]');
        selector.removeClass('active');
        hideOverlay();
        location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&status=' + status + '&parentId=' + parentId
    })
    $('.delete-pop').click(function () {
        companyId = $(this).attr("alt");
        // $('div[openContent="delete-pop"]').addClass('active');
        // $('.hide-iframe').addClass('active');
        // $('.hide-iframe').css({
        //     'width': width,
        //     'height': height
        // })
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        var companyName = $(this).parent().siblings('.coo-name').text();
        $.get("/alink-hq/cooperate/getCount?id=" + companyId, function (result) {
            str = result;
            if (result == 'ok') {
                $('div[openContent="delete-pop"] .reset-pwd p').html('您确定要删除 ' + '<span class="hint-font">' + companyName + '</span> ' + '信息？');
            } else {
                $('div[openContent="delete-pop"] .reset-pwd p').html('您无法删除 ' + '<span class="hint-font">' + companyName + '</span> ' + '信息');
                ;
                $('div[openContent="delete-pop"] .reset-pwd-hint').text('请将其名下所有项目进行移交!')
            }
        })
    });
    $('div[openContent="delete-pop"] button.reduce').click(function () {
        // $('div[openContent="delete-pop"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="delete-pop"] button.yes').click(function () {
        // $('div[openContent="delete-pop"]').removeClass('active');
        // $('.hide-iframe').removeClass('active');
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
        if (str == 'ok') {
            location.href = "/alink-hq/cooperate/delete?id=" + companyId + '&parentId=' + parentId
        }
    })
});
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength
    } else {
        result = str.length
    }
    return result
}
$(".wishContent").on('input propertychange', function () {
    var userDesc = $(this).val();
    var len = userDesc.length;
    if (userDesc) {
        len = checkStrLengths(userDesc, 200)
    } else {
        len = 0
    }
    $(".wordsNum").html(len + '/200')
});