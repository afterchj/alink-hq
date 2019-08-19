/**
 * Created by yuanjie.fang on 2019/8/13.
 */
var thisId;
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



    //编辑产品说明
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
        console.log("id", id, "description", content);
        $.ajax({
            type: "POST",
            url: "/alink-hq/product/update",
            data: {"id": id, "description": content},
            success: function (res) {
                if (res.success == 'success') {
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
        var checkedRadio = $(":radio:checked[value=0]").next().text();
        if (checkedRadio.length>0){
            // console.log(checkedRadio);

        }
    });

    //删除产品
    $('.single-delete').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        var type = $(this).parent().parent().parent().find("td:eq(1)").text();
        thisId = $(this).parent().parent().parent().find("td:eq(0)>input:eq(1)").val();
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除'+type+'？');
        $('div[openContent="delete-pop"] .reset-pwd p').css('margin-top','10px');
        // $('div[openContent="delete-pop"] .reset-pwd-hint').text('（XXX 项目，隶属 XX 账号，包含 X 个网络、 X 个区域、X 个组、X 个灯）');
        adjust(selector);
        showOverlay();

    });
    $('div[openContent="delete-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="delete-pop"] .pop-btn .yes').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.removeClass('active');
        hideOverlay();
        deleteProduct("right");
    });
})
$(function () {
    //选择页数变化
    $('#page-select option').each(function () {
        if ($(this).val() == $("#pageSize").val()) {
            $(this).attr("selected", "selected");
        }
    })
    $('#page-select').change(function () {
        var pageSize = $(this).children('option:selected').val();
        var pageNum = $('.pages').text();
        condition(pageSize, pageNum);
    });
    //跳转页数变化
    $('#skipPageBtn').click(function () {
        var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        condition(pageSize, pageNum);
    });
    //删除
    $("#multiMove").click(function () {
        deleteProduct("up");
    });

    //点击查询
    $("#productSearch").click(function () {
        var pageNum = $(".pages").text();
        var pageSize = $("#pageSize").val();
        var url = "/alink-hq/product/list?pageNum=" +pageNum + "&pageSize=" + pageSize + "&type=" + $("#name").val() + "&coname=" +$("#productSelect").val();
        window.location.href = url;
    });


});
function deleteProduct(type) {
    var pageNum = $(".pages").text();
    var pageSize = $("#pageSize").val();
    var ids=[];
    if (type == 'up'){
        var checkeds = $("input:checkbox:checked[name='ids']");
        checkeds.each(function () {
            ids.push($(this).next().val());
        });
    }else if (type == 'right'){
        console.log(thisId);
        ids.push(thisId);
    }

    $.ajax({
        type:"POST",
        url:"/alink-hq/product/delete",
        data:{ids:ids},
        dataType: 'json',
        traditional: true,
        success:function (data) {
            var result = data.success;
            if (result=='success'){
                var url = "/alink-hq/product/list?pageNum=" +pageNum + "&pageSize=" + pageSize + "&type=" + $('#type').val() + "&coname=" +$('#coname').val();
                window.location.href = url;
            }
        },
        error: function(data){
            alert("操作异常");
        }
    })
}
function isEmpty(value) {
    if (value == null || value == "" || value == "undefined" || value == undefined) {
        return true;
    }
    else {
        value = value.replace(/\s/g, "");
        if (value == "") {
            return true;
        }
        return false;
    }
}
function condition(pageSize, pageNum) {
    var url = window.location.href;
    var test = new RegExp("\\?");
    if (test.test(url)) {
        url = url.substring(0, url.lastIndexOf("?"));
    }
    var newUrl = url + '?pageNum=' + pageNum + '&pageSize=' + pageSize + '&type=' +$('#type').val() + '&coname=' +$('#coname').val();
    location.href = newUrl;
}


