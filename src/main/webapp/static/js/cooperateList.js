/**
 * Created by qian.chen on 2019/5/27.
 */
$(function(){
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
    $('.memo-edit').click(function(){
       $(this).parent('td').addClass('active');
    })
    $('.meno-nav').click(function(){
        $('div[openContent="memo-edit"]').addClass('active');
            var width = window.screen.width;
            var height = window.screen.height;
            $('.hide-iframe').addClass('active');
            $('.hide-iframe').css({
                'width': width,
                'height': height
            })
    })
    $('div[openContent="memo-edit"] button.reduce').click(function(){
        $('div[openContent="memo-edit"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
})
// $('#license').click(function(){
//     $('#file-img').tigger('click');
// })

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
