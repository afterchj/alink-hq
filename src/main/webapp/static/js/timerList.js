/**
 * Created by qian.chen on 2019/5/28.
 */
//日期选择
laydate.render({
    elem: '#start-time',
    range: true
});
laydate.render({
    elem: '#end-time',
    range: true
});
$(function(){
    //重命名弹框
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
    //取消按钮
    $('.pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
})