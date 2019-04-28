/**
 * Created by hongjian.chen on 2019/4/28.
 */
$(function () {
    var size = $("#pageSize").val();
    $("#size").val(size);
    var amount = localStorage.getItem("amount");
    if (amount != null) {
        $(".amount").text(amount);
    }
    //给全选的复选框添加事件
    $("#all").click(function () {
        // this 全选的复选框
        var checked = this.checked;
        //获取name=mids的复选框 遍历输出复选框
        $("input[name=pids]").each(function () {
            this.checked = checked;
        });
        if (checked) {
            localStorage.setItem("amount", size);
            $(".amount").text(size);
        } else {
            localStorage.setItem("amount", 0);
            $(".amount").text(0);
        }
    });
    //给name=mids的复选框绑定单击事件
    $("input[name=pids]").click(function () {
        //获取选中复选框长度
        var length = $("input[name=pids]:checked").length;
        //未选中的长度
        var len = $("input[name=pids]").length;
        if (length == len) {
            $("#all")[0].checked = true;
        } else {
            $("#all")[0].checked = false;
        }
        localStorage.setItem("amount", length);
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
        $("form:eq(0)").submit();
    });
    $("#skip").click(function () {
        $("form:eq(0)").submit();
    });
    $(".rename").click(function () {
        var id = $(this).attr("alt");
        var name = prompt("新名称：");
        console.log("id=" + id + ",name=" + name);
        $.ajax({
            type: "post",
            url: "/alink-hq/place/rename",
            data: {
                "name": name,
                "id": id
            },
            async: true,
            success: function (res) {
                if (res == "success") {
                    location.reload();
                }
            }
        });
        // location.href = "/alink-hq/mesh/rename?mid=" + mid + "&name=" + name;
    });
    $("#multiMove").click(function () {
        var pids = [];//定义一个数组
        $('input[name="pids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            pids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        var flag = confirm("您确定要删除所选的区域吗？");
        if (flag) {
            location.href = "/alink-hq/place/move?pids=" + pids;
        }
    });
});
