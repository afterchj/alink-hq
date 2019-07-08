$(function() {
    var width = window.screen.width;
    var height = window.screen.height;
    var companyId, status, str;
    var status = $("#relation").val();
    $("#status").val(status);
    $('.memo-edit').click(function(event) {
        event.stopPropagation();
        companyId = $(this).attr("alt");
        str = $(this).siblings('.memo-edit-has').find('.memo-content').text();
        if (str == '') {
            $(this).siblings('.memo-edit-has').find('.memo-content').text('');
            $('table tr>td:last-child').removeClass('active');
            $('div[openContent="memo-edit"]').addClass('active');
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            }) 
            $(".wishContent").val(str);
            $(".wordsNum").html(str.length + '/200')
        } else {
            $(this).parent('td').addClass('active');
            $(this).parent('td').parent('tr').siblings('tr').find('td').removeClass('active')
        }
    }) 
    $('.meno-nav img').click(function(event) {
        event.stopPropagation();
        str = $(this).parent().siblings('.memo-content').text();
        $('div[openContent="memo-edit"]').addClass('active');
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        }) 
        $(".wishContent").val(str);
        $(".wordsNum").html(str.length + '/200')
    }) 
    $('div[openContent="memo-edit"] button.reduce').click(function(event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active')
    }) 
    $('div[openContent="memo-edit"] button.yes').click(function(event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        str = $(".wishContent").val();
        location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&other=' + str
    }) 
    $('body').click(function() {
        $('.memo-edit-has').parent('td').removeClass('active')
    }) 
    $('.off-or-on-coo').click(function() {
        $('div[openContent="start-use"]').addClass('active');
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
        var companyName = $(this).parent().siblings('.coo-name').text();
        status = parseInt($(this).attr('alt'));
        companyId = parseInt($(this).parent().siblings('.coo-name').find('a').attr('alt'));
        if (status == 0) {
            var content = '<div>您确定要禁用' + companyName + '？</div><p style="color: red; font-size: 14px; font-weight: normal;margin-top: 20px;">禁用后，其名下所有账户将无法使用，请慎重！</p>'
            $('div[openContent="start-use"] .off-or-on').html(content)
        } else if (status == 1) {
            $('div[openContent="start-use"] .off-or-on').text('您确定要启用' + companyName + '？')
        }
    }) 
    $('div[openContent="start-use"] button.reduce').click(function() {
        $('div[openContent="start-use"]').removeClass('active');
        $('.hide-iframe').removeClass('active')
    }) 
    $('div[openContent="start-use"] button.yes').click(function() {
        $('div[openContent="start-use"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&status=' + status
    }) 
    $('.delete-project').click(function() {
        companyId = $(this).attr("alt");
        $('div[openContent="delete-project"]').addClass('active');
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        }) 
        var companyName = $(this).parent().siblings('.coo-name').text();
        $.get("/alink-hq/cooperate/getCount?id=" + companyId, function(result) {
            str = result;
            if (result == 'ok') {
                $('div[openContent="delete-project"] .reset-pwd').text('您确定要删除' + companyName + '信息？')
            } else {
                $('div[openContent="delete-project"] .reset-pwd').text('您无法删除' + companyName + '信息');
                $('div[openContent="delete-project"] .reset-pwd-hint').text('请将其名下所有项目进行移交')
            }
        })
    });
    $('div[openContent="delete-project"] button.reduce').click(function() {
        $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active')
    });
    $('div[openContent="delete-project"] button.yes').click(function() {
        $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        if (str == 'ok') {
            location.href = "/alink-hq/cooperate/delete?id=" + companyId
        }
    })
});
var checkStrLengths = function(str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength
    } else {
        result = str.length
    }
    return result
}
$(".wishContent").on('input propertychange', function() {
    var userDesc = $(this).val();
    var len = userDesc.length;
    if (userDesc) {
        len = checkStrLengths(userDesc, 200)
    } else {
        len = 0
    }
    $(".wordsNum").html(len + '/200')
});