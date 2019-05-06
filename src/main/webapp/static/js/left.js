/**
 * Created by qian.chen on 2019/5/6.
 */
$(function(){
    var height=$(document).height();
    $('.main-left').css('height',height);
    // $('.one-list li').each(function () {
    //     $('.main-left>ul>li.one-list:eq(0)').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
    //     $('.main-left>ul>li.one-list:eq(0)').find('.two-list').addClass('active');
    //     var tab = $(this).attr('tab');
    //     if (tab == 'groupList') {
    //         $(this).addClass('active').siblings().removeClass('active');
    //     }
    // })
})
function left(tabs,index){
    $('.one-list li').each(function () {
        $('.main-left>ul>li.one-list:eq('+index+')').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
        $('.main-left>ul>li.one-list:eq('+index+')').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == tabs) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
}
$('.on-off-triangle').click(function () {
    var imgUrl = $(this).attr('src');
    if (imgUrl == '/alink-hq/static/img/bottom-triangle-un.png') {
        $(this).attr('src', '/alink-hq/static/img/right-triange-un.png');
        $(this).parent().parent('.one-list').find('.two-list').addClass('active');
    } else {
        $(this).attr('src', '/alink-hq/static/img/bottom-triangle-un.png');
        $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
    }
})