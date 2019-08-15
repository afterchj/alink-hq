/**
 * Created by yuanjie.fang on 2019/7/26.
 */
//日期选择
laydate.render({
    elem: '#update-time',
    range: true
});
$(function () {
    var id;
    $('.singleDel').click(function () {
        id = $(this).attr("alt");
        console.log("id", id);
        var otaVersion=$(this).parent().siblings('.otaVersion').text();
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除 '+otaVersion+' ？');
        $('div[openContent="delete-pop"] .reset-pwd p').css('margin-top','10px');
        adjust(selector);
        showOverlay();
    });
    $('div[openContent="delete-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="delete-pop"] .pop-btn .yes').click(function () {
        $.get("/alink-hq/file/deleteHistoryById?id=" + id, function (res) {
            console.log("res", res);
            location.reload();
        });
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');

        // $('div[openContent="delete-pop"] .reset-pwd-hint').text('删除后，所选组中所有信息将会被删除，请慎重！');
        hideOverlay();
    });
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

//重命名
    $('.singleEdit').click(function (event) {
        id = $(this).attr("alt");
        event.stopPropagation();
        var selector = $('div[openContent="reset-name"]');
        selector.addClass('active');
        $('div[openContent="reset-name"] label').text('固件版本');
        $('div[openContent="reset-name"] input').attr('placeholder',"请输入固件版本");
        adjust(selector);
        showOverlay();
    });
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="reset-name"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="reset-name"] .pop-btn .yes').click(function () {
        var selector = $('div[openContent="reset-name"]');
        $('.rename-hint').text('');
        var val = $('#rename').val();
        if (val == '') {
            $('.rename-hint').text('请输入固件版本');
        } else {
            $('.rename-hint').text('');
            selector.removeClass('active');
            hideOverlay();
        }
        console.log("id", id, "version", val);
        $.ajax({
            type: "POST",
            url: "/alink-hq/file/updateFile",
            data: {"id": id, "otaVersion": val},
            success: function (res) {
                if (res == 'ok') {
                    location.reload();
                } else {
                    $('.rename-hint').text('已存在请重新输入');
                }
            }
        });
    });
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
        //显示字数
        $(".wordsNum").html(len + '/200');
    });
    $('#rename').bind('input propertychange', function () {
        var val = $(this).val();
        if (val == '') {
            $('.rename-hint').text('请输入固件版本');
        } else {
            $('.rename-hint').text('');
        }
    });
})
