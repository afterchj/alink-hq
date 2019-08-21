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

    // $('.select-company-i').click(function () {
    //     $(this).parent().find('.select-company-th').toggle();
    // })
    // $('.select-company-th li').click(function () {
    //     $(this).parent().parent('.select-company-th').hide();
    // })


    // $('.show-lorem').hover(function (event) {
    //     event.stopPropagation();
    //     var isEmpty=$(this).text();
    //     console.log('isEmpty',isEmpty);
    //     if(isEmpty==''){
    //         $(this).unbind('hover');
    //     }
    // })
    //产品说明为空时直接弹出编辑框
    $('.empty-edit').click(function (event) {
        event.stopPropagation();
        id = $(this).find('.memo-edit-has').attr("alt");
        var selector = $('div[openContent="memo-edit"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        $('.wishContent').val('');
        $('.wordsNum').text('0/200');
    })
    //编辑产品说明
    $('.memo-edit-has').dblclick(function (event) {
        event.stopPropagation();
        id = $(this).attr("alt");
        var isEmpty=$(this).text();
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
    //关联固件
    $('.relevance-firmware').click(function () {
        var selector = $('div[openContent="relevance-pop"]');
        selector.addClass('active');
        adjust(selector);
        showOverlay();
        thisId = $(this).parent().parent().parent().parent().find("td:eq(0)>input:eq(1)").val();
    });
    $('div[openContent="relevance-pop"] .pop-btn .reduce').click(function () {
        var selector = $('div[openContent="relevance-pop"]');
        selector.removeClass('active');
        hideOverlay();
    });
    $('div[openContent="relevance-pop"] .pop-btn .yes').click(function () {
        var pageNum = $(".pages").text();
        var pageSize = $("#pageSize").val();
        var selector = $('div[openContent="relevance-pop"]');
        selector.removeClass('active');
        hideOverlay();
        var OTAName = $(":radio:checked[value=0]").next().text();
        var OTAId = $(":radio:checked[value=0]").next().next().val();
        console.log(OTAName,OTAId,thisId);
        if (OTAName.length>0){
            $.ajax({
                type:"POST",
                url:"/alink-hq/product/binding",
                data:{oId:OTAId,id:thisId},
                dataType: 'json',
                // traditional: true,
                success:function (data) {
                    var result = data.success;
                    if (result=='success'){
                        document.currentForm.submit();
                        // var url = "/alink-hq/product/list?pageNum=" +pageNum + "&pageSize=" + pageSize + "&type=" + $('#type').val() + "&coname=" +$('#coname').val();
                        // window.location.href = url;
                    }
                },
                error: function(data){
                    alert("操作异常");
                }
            })
        }
    });

    //删除产品
    $('.single-delete,#multiMove').click(function () {
        var selector = $('div[openContent="delete-pop"]');
        selector.addClass('active');
        var type ;
        thisId = $(this).parent().parent().parent().find("td:eq(0)>input:eq(1)").val();
        var checkeds = $("input:checkbox:checked[name='ids']");
        $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除所选的产品？');

        if (isEmpty(thisId) && checkeds.length>0){
        }else if(!isEmpty(thisId)){
            type = $(this).parent().parent().parent().find("td:eq(1)").text();
            $('div[openContent="delete-pop"] .reset-pwd p').text('您确定要删除'+type+'？');
        }else {
            selector.removeClass('active');
            return;
        }
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
        deleteProduct();
    });


    $("#all,#addAll").click(function (event) {
        // this 全选的复选框
        event.stopPropagation();
        $("#all,#addAll").prop('checked',$(this).prop('checked'));
        var checked = this.checked;
        //获取name=mids的复选框 遍历输出复选框
        $("input[name=ids]").each(function () {
            this.checked = checked;
        });
        if (checked) {
            var len = $("input[name=ids]:checked").length;
            $("#amount").text(len);
        } else {
            $("#amount").text(0);
        }
    });
    //给name=mids的复选框绑定单击事件
    $("input[name=ids]").click(function (event) {
        event.stopPropagation();
        //获取选中复选框长度
        var length = $("input[name=ids]:checked").length;

        //未选中的长度
        var len = $("input[name=ids]").length;
        if (length == len) {
            $("#all,#addAll").prop('checked',true);
            // [0].checked = true;
        } else {
            $("#all,#addAll").prop('checked',false);
        }
        $("#amount").text(length);
    });
})
$(function () {
    //选择页数变化
    $('#page-select option').each(function () {
        if ($(this).val() == $("#pageSize").val()) {
            $(this).attr("selected", "selected");
        }
    });
    $('#page-select').change(function () {
        var pageSize = $(this).children('option:selected').val();
        // var pageNum = $('.pages').text();
        $("form[name='selectForm']>input[name='pageSize']").val(pageSize)
        document.selectForm.submit();
        // condition(pageSize, pageNum);
    });
    //跳转页数变化
    $('#skipPageBtn').click(function () {
        // var pageSize = $('#page-select option:selected').val();
        var pageNum = $('#skipPage').val();
        $("form[name='skipForm']>input[name='pageNum']").val(pageNum);
        document.skipForm.submit();
        // condition(pageSize, pageNum);
    });

    //点击查询
    // $("#productSearch").click(function () {
    //     var pageNum = $(".pages").text();
    //     var pageSize = $("#pageSize").val();
    //     var url = "/alink-hq/product/list?pageNum=" +pageNum + "&pageSize=" + pageSize + "&type=" + $("#name").val() + "&coname=" +$("#productSelect").val();
    //     window.location.href = url;
    // });


});
//删除产品
function deleteProduct() {
    // var pageNum = $(".pages").text();
    var pageSize = $("#pageSize").val();
    var ids=[];
    if (isEmpty(thisId)){
        var checkeds = $("input:checkbox:checked[name='ids']");
        checkeds.each(function () {
            ids.push($(this).next().val());
        });
    }else {
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
                document.currentForm.submit();
                // var url = "/alink-hq/product/list?pageNum=" +pageNum + "&pageSize=" + pageSize + "&type=" + $('#type').val() + "&coname=" +$('#coname').val();
                // window.location.href = url;
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
// function condition(pageSize, pageNum) {
//     var url = window.location.href;
//     var test = new RegExp("\\?");
//     if (test.test(url)) {
//         url = url.substring(0, url.lastIndexOf("?"));
//     }
//     var newUrl = url + '?pageNum=' + pageNum + '&pageSize=' + pageSize + '&type=' +$('#type').val() + '&coname=' +$('#coname').val();
//     location.href = newUrl;
// }

// function clickLink(page) {
//     var pageSize = $("#pageSize").val();
//     var pageNum;
//     if (page == 'pre'){
//         pageNum = $("#prePage").val();
//     }else if (page == 'next'){
//         pageNum = $("#nextPage").val();
//     }
//     var url = "/alink-hq/product/list?pageNum=" +pageNum + "&pageSize=" + pageSize + "&type=" + $('#type').val() + "&coname=" +$('#coname').val();
//     window.location.href = url;
// }
$(function () {
    //编辑产品
   $(".product.edit").click(function () {
        // console.log($(this).attr('alt'));
       var url = "/alink-hq/product/editProduct?id="+$(this).attr('alt');
       window.location.href = url;
   });
    //翻页 左翻
    $(".prev-page-link").click(function () {
        document.preForm.submit();
    });
    //翻页 右翻
    $(".next-page-link").click(function () {
        document.nextForm.submit();
    });
});

