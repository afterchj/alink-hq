/**
 * Created by qian.chen on 2019/5/6.
 */
$(function(){
    // var scroll=$('.c-container').height();
    // console.log('scroll',scroll);
    // $('html').css({'height':scroll,'overflow-y':'hidden'})
    var height=$(document).height();
    $('.main-left').css('height',height);
    // $('html').css({'overflow-y':'visible','height':height});
    $('.on-off-triangle').click(function () {
        var imgUrl = $(this).attr('src');
        if(imgUrl == '/alink-hq/static/img/left-reduce.png') {
            $(this).attr('src', '/alink-hq/static/img/left-add.png');
            $(this).parent().parent('.one-list').removeClass('active');
            // $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
        }else if(imgUrl == '/alink-hq/static/img/left-add.png'){
            $(this).attr('src', '/alink-hq/static/img/left-reduce.png');
            $(this).parent().parent('.one-list').addClass('active');
        }
    })
});
