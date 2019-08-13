/**
 * Created by yuanjie.fang on 2019/8/13.
 */
$(function () {
    $('.single-updown').click(function () {
        // id = $(this).attr("alt");
        // var fileName=$(this).parent().siblings('.otaName').text();
        var selector = $('div[openContent="export-pop"]');
        selector.addClass('active');
        $('div[openContent="export-pop"] .reset-pwd p').text('您确定要导出 XXX 项目下所有信息吗？');
        $('div[openContent="export-pop"] .reset-pwd-hint').text('（XXX 项目，隶属 XX 账号，包含 X 个网络、 X 个区域、X 个组、X 个灯）');
        adjust(selector);
        showOverlay();
    });
    $('div[openContent="export-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="export-pop"]');
        selector.removeClass('active')
        hideOverlay()
    });
    $('div[openContent="export-pop"] .pop-btn .yes').click(function () {
        // $.get("/alink-hq/file/deleteFileById?id=" + id, function (res) {
        //     console.log("res", res);
        //     location.reload();
        // });
        var selector = $('div[openContent="export-pop"]');
        selector.removeClass('active')
        hideOverlay()
    });
})