/**
 * Created by qian.chen on 2019/5/6.
 */
$(function(){
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
