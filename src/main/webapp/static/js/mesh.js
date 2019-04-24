/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    var size = $("#pageSize").val();
    console.log("type:" + typeof size + ",value=" + size);
    $("#size").val(size);
    //给全选的复选框添加事件
    $("#all").click(function () {
//            var length = $("input[name=mids]").length;
        // this 全选的复选框
        var checked = this.checked;
        //获取name=mids的复选框 遍历输出复选框
        $("input[name=mids]").each(function () {
            this.checked = checked;
        });
        if (checked) {
            $(".amount").text(size);
        } else {
            $(".amount").text(0);
        }
    });
    //给name=mids的复选框绑定单击事件
    $("input[name=mids]").click(function () {
        //获取选中复选框长度
        var length = $("input[name=mids]:checked").length;
        //未选中的长度
        var len = $("input[name=mids]").length;
        if (length == len) {
            $("#all")[0].checked = true;
        } else {
            $("#all")[0].checked = false;
        }
        $(".amount").text(length);
    });
    $("#prev").click(function () {
        var page = $("#page").val();
        if (page > 1) {
            page--;
            $("#page").val(page);
            console.log("page=" + page);
            $("form:eq(0)").submit();
        }
    });
    $("#next").click(function () {
        var page = $("#page").val();
        var pages = parseInt($("#pages").text());
        if (page < pages) {
            page++;
            $("#page").val(page);
            console.log("page=" + page + ",pages=" + pages);
            $("form:eq(0)").submit();
        }
    });
    $("#size").change(function () {
//            var page = $("#page").val();
//            var size = $("#size option:selected").val();
//            console.log("size=" + size);
//            location.href = "/alink-hq/mesh/list?pageNum=" + page + "&pageSize=" + size;
        $("form:eq(0)").submit();
    });
    $("#skip").click(function () {
        $("form:eq(0)").submit();
//            var page = $("#page").val();
//            var size = $("#size option:selected").val();
//            console.log("page=" + page + ",size=" + size);
//            location.href = "/alink-hq/mesh/list?pageNum=" + page + "&pageSize=" + size;
    });
    $("#multiMove").click(function () {
        var mids = [];//定义一个数组
        $('input[name="mids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            mids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        console.log("mids=" + typeof mids + ",value=" + mids);
        location.href = "/alink-hq/mesh/move?mids=" + mids;
    });

});
$('.on-off-triangle').click(function () {
    var imgUrl = $(this).attr('src');
    if (imgUrl == '/alink-hq/static/img/bottom-triangle-un.png') {
        $(this).attr('src', '/alink-hq/static/img/right-triange-un.png');
        $(this).parent().parent('.one-list').find('.two-list').addClass('active');
    } else {
        $(this).attr('src', '/alink-hq/static/img/bottom-triangle-un.png');
        $(this).parent().parent('.one-list').find('.two-list').removeClass('active');
    }
});