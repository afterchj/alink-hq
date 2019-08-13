/**
 * Created by yuanjie.fang on 2019/8/13.
 */
$(function () {
    $('.select-company-th').hide();
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
        selector.removeClass('active');
        hideOverlay();
    });

    $('.select-company-i').click(function () {
        $(this).parent().find('.select-company-th').toggle();
    })
    $('.select-company-th li').click(function () {
        $(this).parent().parent('.select-company-th').hide();
    })



    //编辑版本
    $('.memo-edit-has').dblclick(function (event) {
        id = $(this).attr("alt");
        event.stopPropagation();
        var selector = $('div[openContent="memo-edit"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        var text = $(this).find('.memo-content').text().trim();
        var length = text.length;
        $('.wishContent').val(text);
        $('.wordsNum').text(length + '/200');
    });
    $('div[openContent="memo-edit"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="memo-edit"] .pop-btn .yes').click(function () {
        var selector = $('div[openContent="memo-edit"]');
        selector.removeClass('active');
        var content = $(".wishContent").val();
        console.log("id", id, "desc", content);
        $.ajax({
            type: "POST",
            url: "/alink-hq/file/updateFile",
            data: {"id": id, "otaDesc": content},
            success: function (res) {
                if (res == 'ok') {
                    location.reload();
                } else {
                    history.back();
                }
            }
        });
        hideOverlay();
    });

    //关联固件
    $('.relevance-firmware').click(function () {
        var selector = $('div[openContent="relevance-pop"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
    })
    $('div[openContent="relevance-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="relevance-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="relevance-pop"] .pop-btn .yes').click(function () {
        var selector = $('div[openContent="relevance-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
})
