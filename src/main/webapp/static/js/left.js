/**
 * Created by qian.chen on 2019/5/6.
 */
$(function(){
    var height=$(document).height();
    $('.main-left').css('height',height);
})
function left(tabs,index){
    $('.one-list li').each(function () {
        // $('.main-left>ul>li.one-list:eq('+index+')').find('.on-off-triangle').attr('src', '/alink-hq/static/img/left-fewer.png');
        // $('.main-left>ul>li.one-list:eq('+index+')').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == tabs) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    })
}
$('.on-off-triangle').click(function () {
    var imgUrl = $(this).attr('src');
    // if (imgUrl == '/alink-hq/static/img/left-unfold.png') {
    //     $(this).attr('src', '/alink-hq/static/img/left-fewer.png');
    //     $(this).parent().parent('.one-list').addClass('active');
    // } else if(imgUrl == '/alink-hq/static/img/left-fewer.png') {
    //     $(this).attr('src', '/alink-hq/static/img/left-open.png');
    //     $(this).parent().parent('.one-list').removeClass('active');
    //     // $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
    // }else if(imgUrl == '/alink-hq/static/img/left-open.png'){
    //     $(this).attr('src', '/alink-hq/static/img/left-fewer.png');
    //     $(this).parent().parent('.one-list').addClass('active');
    // }
    if(imgUrl == '/alink-hq/static/img/left-fewer.png') {
        $(this).attr('src', '/alink-hq/static/img/left-open.png');
        $(this).parent().parent('.one-list').removeClass('active');
        // $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
    }else if(imgUrl == '/alink-hq/static/img/left-open.png'){
        $(this).attr('src', '/alink-hq/static/img/left-fewer.png');
        $(this).parent().parent('.one-list').addClass('active');
    }
})