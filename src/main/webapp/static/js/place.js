/**
 * Created by hongjian.chen on 2019/4/28.
 */
$(function () {
    myBrowser()
    $('.one-list li').each(function () {
        $('.main-left>ul>li.one-list:eq(0)').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
        $('.main-left>ul>li.one-list:eq(0)').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == 'placeList') {
            $(this).addClass('active').siblings().removeClass('active');
        }
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
    })
});
$(function () {
    var size = $("#pageSize").val();
    $("#size").val(size);
    var length = $("input[name=pids]:checked").length;
    $("#amount").text(length);
    //给全选的复选框添加事件
    $("#all").click(function () {
        // this 全选的复选框
        var checked = this.checked;
        //获取name=mids的复选框 遍历输出复选框
        $("input[name=pids]").each(function () {
            this.checked = checked;
        });
        if (checked) {
            // localStorage.setItem("amount", size);
            $("#amount").text(size);
        } else {
            // localStorage.setItem("amount", 0);
            $("#amount").text(0);
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
        // localStorage.setItem("amount", length);
        $("#amount").text(length);
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
    // $(".rename").click(function () {
    //     var id = $(this).attr("alt");
    //     var name = prompt("新名称：");
    //     console.log("id=" + id + ",name=" + name);
    //     $.ajax({
    //         type: "post",
    //         url: "/alink-hq/place/rename",
    //         data: {
    //             "name": name,
    //             "id": id
    //         },
    //         async: true,
    //         success: function (res) {
    //             if (res == "success") {
    //                 location.reload();
    //             }
    //         }
    //     });
    //     // location.href = "/alink-hq/mesh/rename?mid=" + mid + "&name=" + name;
    // });
    $("#multiMove").click(function () {
        var pids = [];//定义一个数组
        $('input[name="pids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            pids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        $('div[openContent="delete-place"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
        // var flag = confirm("您确定要删除所选的区域吗？");
        // if (flag) {
        //     location.href = "/alink-hq/place/move?pids=" + pids;
        // }
        $('.pop-btn .yes').click(function(){
            console.log(pids);
            deletePlace(pids);
        })
    });
});
//单选重命名
$(function(){
    var id;
    $('.reset-name').click(function () {
        id = $(this).attr("alt");
        // projectName=$(this).parent().siblings('.project-name').find('a').text();
        // account=$(this).parent().siblings('.project-account').text();
        $('div[openContent="reset-name"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    })
    $('div[openContent="reset-name"]  .pop-btn .yes').click(function(){
        var name=$('#rename').val();
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
        })
    })
    //取消按钮
    $('div[openContent="reset-name"] .pop-btn .reduce').click(function () {
        $('div[openContent="reset-name"]').removeClass('active');
        // $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })
})
//重命名校验
function nameKeyUp(){
    var rename = $('#rename').val();
    var regreName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,16}$/;
    var renameResult = regreName.test(rename);
    if(rename!='' && !renameResult){
        $('p.rename-hint').text('请输入 2-16 位汉字、字母、数字');
    }else{
        $('p.rename-hint').text('');
    }
}
//单选删除
$(function(){
    var pids;
    $('.singleDel').click(function(){
        pids=$(this).parent().siblings('.checkbox').find('input').val();
        $('div[openContent="delete-place"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
    })
    $('.pop-btn .reduce').click(function () {
        $('div[openContent="delete-place"]').removeClass('active');
        // $('div[openContent="delete-project"]').removeClass('active');
        $('.hide-iframe').removeClass('active');
    })

    $('.pop-btn .yes').click(function(){
        console.log(pids);
        deletePlace(pids);
    })
})
function deletePlace(pids){
    if(pids){
        location.href = "/alink-hq/place/move?pids=" + pids;
    }
}