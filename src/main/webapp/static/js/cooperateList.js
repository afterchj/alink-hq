/**
 * Created by qian.chen on 2019/5/27.
 */
$(function () {
    //如果备忘录为空时
    // $('.memo-edit').click(function(){
    //     $('div[openContent="memo-edit"]').addClass('active');
    //     var width = window.screen.width;
    //     var height = window.screen.height;
    //     $('.hide-iframe').addClass('active');
    //     $('.hide-iframe').css({
    //         'width': width,
    //         'height': height
    //     })
    // })
    // $('div[openContent="memo-edit"] button.reduce').click(function(){
    //     $('div[openContent="memo-edit"]').removeClass('active');
    //     $('.hide-iframe').removeClass('active');
    // })
    //如果备忘录不为空时
    $('.memo-edit').click(function () {
        $(this).parent('td').addClass('active');
    })
    $('.meno-nav').click(function () {
        $('div[openContent="memo-edit"]').addClass('active');
        var width = window.screen.width;
        var height = window.screen.height;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    $('div[openContent="memo-edit"] button.reduce').click(function () {
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
    //启用禁用
    $('.off-or-on-coo').click(function () {
        $('div[openContent="start-use"]').addClass('active');
        var width = window.screen.width;
        var height = window.screen.height;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })

        //如果已经禁用，则启用
        var companyName = $(this).siblings('.coo-name').text();
        console.log(companyName)
        $('div[openContent="start-use"] .off-or-on').text('您确定要启用' + companyName + '？')
        //如果已经启用，则禁用
        var content = '<div>您确定要禁用' + companyName + '？</div><p style="color: red; font-size: 14px; font-weight: normal;margin-top: 20px;">禁用后，其名下所有账户将无法使用，请慎重！</p>'
        $('div[openContent="start-use"] .off-or-on').html(content);
    })
    $('div[openContent="start-use"] button.reduce').click(function () {
        $('div[openContent="start-use"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })

    //重命名
        $('.reset-name').click(function () {
            $('div[openContent="reset-name"]').addClass('active');
            var width = window.screen.width;
            var height = window.screen.height;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
        })
        $('div[openContent="reset-name"] button.reduce').click(function () {
            $('div[openContent="reset-name"]').removeClass('active');
            $('.hide-iframe').removeClass('active');
        })
        //重命名判断
       $('div[openContent="reset-name"] button.yes').click(function(){
           var rename = $('#rename').val();
           var regName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
           var renameResult = regName.test(rename);
       })
       //删除公司信息
       $('.delete-project').click(function(){
           $('div[openContent="delete-project"]').addClass('active');
           var width = window.screen.width;
           var height = window.screen.height;
           $('.hide-iframe').addClass('active');
           $('.hide-iframe').css({
               'width': width,
               'height': height
           })
           var companyName = $(this).parent().siblings('.coo-name').text();
           console.log(companyName)
           //该公司所有账号下是否有项目,若没有项目
           $('div[openContent="delete-project"] .reset-pwd').text('您确定要删除' + companyName + '信息？');
           //有项目
           $('div[openContent="delete-project"] .reset-pwd').text('您无法删除' + companyName + '信息');
           $('div[openContent="delete-project"] .reset-pwd-hint').text('请将其名下所有项目进行移交');
       })
    $('div[openContent="delete-project"] button.reduce').click(function () {
        $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
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
    console.log(len);
    //显示字数
    $(".wordsNum").html(len + '/200');
});
