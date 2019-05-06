/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    myBrowser();
    var tabs="lightList";
    var index=0;
    left(tabs,index);
    $(".rename").click(function () {
        var id = $(this).attr("alt");
        var name = prompt("新名称：");
        if (name == '')return;
        console.log("id=" + id + ",name=" + name);
        $.ajax({
            type: "post",
            url: "/alink-hq/light/rename",
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
        // location.href = "/alink-hq/light/rename?mid=" + mid + "&name=" + name;
    });
    $("#multiMove").click(function () {
        var ids = [];//定义一个数组
        $('input[name="ids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        location.href = "/alink-hq/light/move?ids=" + ids;
    });

    $("#multiDel").click(function () {
        var ids = [];//定义一个数组
        $('input[name="ids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        var flag = confirm("您确定要删除所选的灯吗？");
        if (flag) {
            location.href = "/alink-hq/light/delete?ids=" + ids;
        }
    })
});
