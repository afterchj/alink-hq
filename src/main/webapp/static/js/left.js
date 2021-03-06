/**
 * Created by qian.chen on 2019/5/6.
 */
$(function(){
    // var isExistText=$('.reset-pwd-hint').text();
    // console.log('isExistText',isExistText);
    // if(isExistText==''){
    //     $('.pop-content p').css('margin-top','5px');
    // }else{
    //     // $('.reset-pwd-hint').parent().parent().parent('.text-msg').css('text-align','left');
    // }
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
/* 显示遮罩层 */
function showOverlay() {
    $(".hide-iframe").height(pageHeight());
    $(".hide-iframe").width(pageWidth());
    $(".hide-iframe").css('background','#333');
    // fadeTo第一个参数为速度，第二个为透明度
    // 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
    $(".hide-iframe").fadeTo(200, 0.5);
}

/* 隐藏覆盖层 */
function hideOverlay() {
    $(".hide-iframe").fadeOut(200);
}

/* 当前页面高度 */
function pageHeight() {
    return document.body.scrollHeight;
}

/* 当前页面宽度 */
function pageWidth() {
    return document.body.scrollWidth;
}

/* 定位到页面中心 */
function adjust(id) {
    var w = $(id).width();
    var h = $(id).height();

    var t = scrollY() + (windowHeight()/2) - (h/2);
    if(t < 0) t = 0;

    var l = scrollX() + (windowWidth()/2) - (w/2);
    if(l < 0) l = 0;

    $(id).css({left: l+'px', top: t+'px'});
}

//浏览器视口的高度
function windowHeight() {
    var de = document.documentElement;

    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

//浏览器视口的宽度
function windowWidth() {
    var de = document.documentElement;

    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth
}

/* 浏览器垂直滚动位置 */
function scrollY() {
    var de = document.documentElement;

    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}

/* 浏览器水平滚动位置 */
function scrollX() {
    var de = document.documentElement;
    return self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
}
$('.showList').hide();
$('.openList').click(function () {
    $(this).siblings('.showList').toggle();
    $(this).parent().parent('tr').siblings('tr').find('.showList').hide();
})

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}

$(window).keydown( function(e) {
    var key = window.event ? e.keyCode : e.which;
    if (key.toString() == "13") {
        return false;
    }
})