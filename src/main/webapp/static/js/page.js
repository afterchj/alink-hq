/**
 * Created by hongjian.chen on 2019/4/30.
 */
$(function () {
    var size = $("#pageSize").val();
    var length = $("input[name=ids]:checked").length;
    $("#amount").text(length);
    console.log("type:" + typeof size + ",value=" + size);
    $("#size").val(size);
    //给全选的复选框添加事件
    $("#all").click(function () {
        // this 全选的复选框
        var checked = this.checked;
        //获取name=mids的复选框 遍历输出复选框
        $("input[name=ids]").each(function () {
            this.checked = checked;
        });
        if (checked) {
            $("#amount").text(size);
        } else {
            $("#amount").text(0);
        }
    });
    //给name=mids的复选框绑定单击事件
    $("input[name=ids]").click(function () {
        //获取选中复选框长度
        var length = $("input[name=ids]:checked").length;
        //未选中的长度
        var len = $("input[name=ids]").length;
        if (length == len) {
            $("#all")[0].checked = true;
        } else {
            $("#all")[0].checked = false;
        }
        $("#amount").text(length);
    });
    $("#prev").click(function () {
        var page = $("#page").val();
        if (page > 1) {
            page--;
            $("#page").val(page);
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
});
$(function () {
    var page = parseInt($('#pageNum').text());
    var pageTotal = parseInt($('#pages').text());
    if (page == 1) {
        $('#prev').attr('src', '/alink-hq/static/img/left-arrow.png');
        $("#prev").addClass('disabled');
    } else {
        $('#prev').attr('src', '/alink-hq/static/img/left-arrow-color.png');
    }
    if (page == pageTotal) {
        $('#next').attr('src', '/alink-hq/static/img/right-arrow.png');
        $("#next").addClass('disabled');
    } else {
        $('#next').attr('src', '/alink-hq/static/img/right-arrow-color.png');
    }
})