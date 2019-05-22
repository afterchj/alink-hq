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

    // $(document).scroll(function() {
    //
    //         var scroH = $(document).scrollTop();  //滚动高度
    //         var viewH = $(window).height();  //可见高度
    //         var contentH = $(document).height();  //内容高度
    //         var scroW= $(document).scrollLeft();
    //         var viewW = $(window).width();
    //         console.log(scroW,viewW);
    //         if (scroW > 0) {  //距离顶部大于100px时
    //             $('.main-left').addClass('scroll');
    //             $('.must').addClass('scroll');
    //             // console.log(scroW,viewW);
    //         }else{
    //             $('.main-left').addClass('scroll');
    //             $('.must').addClass('scroll');
    //         }
    //         // if (contentH - (scroH + viewH) <= 100) {  //距离底部高度小于100px
    //         //
    //         // }
    //         // if (contentH = (scroH + viewH)) {  //滚动条滑到底部啦
    //         //
    //         // }
    //     }
    //     )
});
