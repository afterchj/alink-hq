/**
 * Created by hongjian.chen on 2019/4/24.
 */
$(function () {
    myBrowser();
    var height = $(document).height();
    $('.main-left').css('height', height);
    $('.one-list li').each(function () {
        $('.main-left>ul>li.one-list:eq(0)').find('.on-off-triangle').attr('src', '/alink-hq/static/img/right-triange-un.png');
        $('.main-left>ul>li.one-list:eq(0)').find('.two-list').addClass('active');
        var tab = $(this).attr('tab');
        if (tab == 'groupList') {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
    var id;
    //重命名弹框
    $('.rename').click(function () {
        id = $(this).attr("alt");
        $('div[openContent="reset-name"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    });
    //重命名确定
    $('div[openContent="reset-name"] button.yes').click(function () {
        var name = $('#rename').val();
        var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var userNameResult = regUserName.test(name);
        if (name == '') {
            $('p.rename-hint').text('请输入新名称');
        } else if (!userNameResult) {
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
        } else {
            $.ajax({
                type: "post",
                url: "/alink-hq/group/rename",
                data: {
                    "name": name,
                    "id": id
                },
                async: true,
                success: function (res) {
                    if (res == "ok") {
                        location.reload();
                    } else {
                        alert("组名称不能重复！");
                    }
                }
            })
        }
    });
    //重命名取消
    $('div[openContent="reset-name"] button.reduce').click(function () {
        $('.hide-iframe').removeClass('active');
        $('div[openContent="reset-name"]').removeClass('active');
    });
    //删除弹框出现--单选
    $('#singleDel').click(function () {
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    });
    //删除确定--单选
    $('div[openContent="delete-mesh"] button.yes').click(function () {

    });
    // $(".rename").click(function () {
    //     var id = $(this).attr("alt");
    //     var name = prompt("新名称：");
    //     if (name == '')return;
    //     console.log("id=" + id + ",name=" + name);
    //     $.ajax({
    //         type: "post",
    //         url: "/alink-hq/group/rename",
    //         data: {
    //             "name": name,
    //             "id": id
    //         },
    //         async: true,
    //         success: function (res) {
    //             if (res == "ok") {
    //                 location.reload();
    //             }
    //         }
    //     });
    //     // location.href = "/alink-hq/mesh/rename?mid=" + mid + "&name=" + name;
    // });

    var ids = [];//定义一个数组
    $("#multiMove").click(function () {
        var ids = [];//定义一个数组
        $('input[name="ids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        location.href = "/alink-hq/group/move?ids=" + ids;
    });

    $("#multiDel").click(function () {
        var ids = [];//定义一个数组
        $('input[name="ids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
            ids.push($(this).val());//将选中的值添加到数组chk_value中
        });
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        });
        // var flag = confirm("您确定要删除所选的区域吗？");
        // if (flag) {
        //     location.href = "/alink-hq/group/delete?ids=" + ids;
        // }
    })
    //单选删除
    // var ids;
    // $('#singleDel').click(function () {
    //     ids = $(this).parent().siblings('.checkbox').find('input').val();
    //     $('div[openContent="delete-mesh"]').addClass('active');
    //     var width = document.body.scrollWidth;
    //     var height = document.body.scrollHeight;
    //     $('.hide-iframe').addClass('active');
    //     $('.hide-iframe').css({
    //         'width': width,
    //         'height': height
    //     });
    // });
    // $('.pop-btn .reduce').click(function () {
    //     $('div[openContent="delete-mesh"]').removeClass('active');
    //     // $('div[openContent="delete-project"]').removeClass('active');
    //     $('.hide-iframe').removeClass('active');
    // });
    // $('.pop-btn .yes').click(function () {
    //     deleteMesh(ids);
    // });
    // function deleteMesh(ids) {
    //     if (ids) {
    //         location.href = "/alink-hq/group/delete?ids=" + ids;
    //     }
    // }
});