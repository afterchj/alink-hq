/**
 * Created by qian.chen on 2019/5/27.
 */
$(function () {
    var width = window.screen.width;
    var height = window.screen.height;
    var companyId, status, str;
    var status = $("#relation").val();
    $("#status").val(status);
    $('.memo-edit').click(function (event) {
        event.stopPropagation();
        companyId = $(this).attr("alt");
        str = $(this).siblings('.memo-edit-has').find('.memo-content').text();
        if (str == '') {
            //如果备忘录为空时
            $(this).siblings('.memo-edit-has').find('.memo-content').text('')
            $('div[openContent="memo-edit"]').addClass('active');
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        } else {
            //如果备忘录不为空时
            $(this).parent('td').addClass('active');
            $(this).parent('td').parent('tr').siblings('tr').find('td').removeClass('active');
        }
    })
    $('.meno-nav').click(function (event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').addClass('active');
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })

        $(".wishContent").text(str);
        // var userDesc = $('.wishContent').val();
        // var len=userDesc.length;
        // console.log('开始len',len);
        $(".wordsNum").html(str.length + '/200');
    })
    $('div[openContent="memo-edit"] button.reduce').click(function (event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    $('div[openContent="memo-edit"] button.yes').click(function (event) {
        event.stopPropagation();
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        str = $(".wishContent").val();
        console.log("id", companyId, 'str', str);
        location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&other=' + str;
    })
    $('body').click(function () {
        $('.memo-edit-has').parent('td').removeClass('active');
    })
    //启用禁用
    $('.off-or-on-coo').click(function () {
        $('div[openContent="start-use"]').addClass('active');
        // var width = window.screen.width;
        // var height = window.screen.height;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
        var companyName = $(this).parent().siblings('.coo-name').text();
        status = parseInt($(this).attr('alt'));
        companyId = parseInt($(this).parent().siblings('.coo-name').find('a').attr('alt'));
        // console.log('status',status,'companyName',companyName);
        if (status == 0) {
            //如果已经启用，则禁用
            var content = '<div>您确定要禁用' + companyName + '？</div><p style="color: red; font-size: 14px; font-weight: normal;margin-top: 20px;">禁用后，其名下所有账户将无法使用，请慎重！</p>'
            $('div[openContent="start-use"] .off-or-on').html(content);
        } else if (status == 1) {
            //如果已经禁用，则启用
            $('div[openContent="start-use"] .off-or-on').text('您确定要启用' + companyName + '？')
        }
    })
    $('div[openContent="start-use"] button.reduce').click(function () {
        $('div[openContent="start-use"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    $('div[openContent="start-use"] button.yes').click(function () {
        $('div[openContent="start-use"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&status=' + status;
    })

    //重命名
    // $('.reset-name').click(function () {
    //     companyId = $(this).attr("alt");
    //     $('div[openContent="reset-name"]').addClass('active');
    //     // var width = window.screen.width;
    //     // var height = window.screen.height;
    //     $('.hide-iframe').addClass('active');
    //     $('.hide-iframe').css({
    //         'width': width,
    //         'height': height
    //     })
    // })
    // $('div[openContent="reset-name"] button.reduce').click(function () {
    //     $('div[openContent="reset-name"]').removeClass('active');
    //     $('.hide-iframe').removeClass('active');
    // })
    // //重命名判断
    // $('div[openContent="reset-name"] button.yes').click(function () {
    //     var rename = $('#rename').val();
    //     var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    //     var renameResult = regName.test(rename);
    //     if (rename != '' && renameResult) {
    //         location.href = "/alink-hq/cooperate/saveUpdate?id=" + companyId + '&coname=' + rename;
    //     }
    // });
    //删除公司信息
    $('.delete-project').click(function () {
        companyId = $(this).attr("alt");
        $('div[openContent="delete-project"]').addClass('active');
        // var width = window.screen.width;
        // var height = window.screen.height;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
        var companyName = $(this).parent().siblings('.coo-name').text();
        console.log(companyName);
        //该公司所有账号下是否有项目,若没有项目
        $.get("/alink-hq/cooperate/getCount?id=" + companyId, function (result) {
            str = result;
            if (result == 'ok') {
                //无项目
                $('div[openContent="delete-project"] .reset-pwd').text('您确定要删除' + companyName + '信息？');

            } else {
                //有项目
                $('div[openContent="delete-project"] .reset-pwd').text('您无法删除' + companyName + '信息');
                $('div[openContent="delete-project"] .reset-pwd-hint').text('请将其名下所有项目进行移交');
            }
        });
    });
    $('div[openContent="delete-project"] button.reduce').click(function () {
        $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    });
    $('div[openContent="delete-project"] button.yes').click(function () {
        $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
        console.log("result", str);
        if (str == 'ok') {
            location.href = "/alink-hq/cooperate/delete?id=" + companyId
        }
    })
});
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
    var len=userDesc.length;
    //判断字数
    if (userDesc) {
        len = checkStrLengths(userDesc, 200);
    } else {
        len = 0
    }
    //显示字数
    $(".wordsNum").html(len + '/200');
});
// function validateInput(id) {
//     var name=$();
//
// }