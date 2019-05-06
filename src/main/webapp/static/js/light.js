/**
 * Created by hongjian.chen on 2019/4/24.
 */
// $(function () {
//     myBrowser();
//     var tabs="lightList";
//     var index=0;
//     left(tabs,index);
//     $(".rename").click(function () {
//         var id = $(this).attr("alt");
//         var name = prompt("新名称：");
//         if (name == '')return;
//         console.log("id=" + id + ",name=" + name);
//         $.ajax({
//             type: "post",
//             url: "/alink-hq/light/rename",
//             data: {
//                 "name": name,
//                 "id": id
//             },
//             async: true,
//             success: function (res) {
//                 if (res == "success") {
//                     location.reload();
//                 }
//             }
//         });
//         // location.href = "/alink-hq/light/rename?mid=" + mid + "&name=" + name;
//     });
//     $("#multiMove").click(function () {
//         var ids = [];//定义一个数组
//         $('input[name="ids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
//             ids.push($(this).val());//将选中的值添加到数组chk_value中
//         });
//         location.href = "/alink-hq/light/move?ids=" + ids;
//     });
//
//     $("#multiDel").click(function () {
//         var ids = [];//定义一个数组
//         $('input[name="ids"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数
//             ids.push($(this).val());//将选中的值添加到数组chk_value中
//         });
//         var flag = confirm("您确定要删除所选的灯吗？");
//         if (flag) {
//             location.href = "/alink-hq/light/delete?ids=" + ids;
//         }
//     })
// });
$(function () {
    myBrowser();
    var tabs="lightList";
    var index=0;
    left(tabs,index);
    var id;
    var ids=[];
    //重命名弹框
    $('.rename').click(function(){
        id = $(this).attr("alt");
        $('div[openContent="reset-name"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    //重命名确定
    $('div[openContent="reset-name"] button.yes').click(function(){
        var name=$('#rename').val();
        var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
        var userNameResult = regUserName.test(name);
        if(name==''){
            $('p.rename-hint').text('请输入新名称');
        }else if(!userNameResult){
            $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
        }else{
            $.ajax({
                type: "post",
                url: "/alink-hq/light/rename",
                data: {
                    "name": name,
                    "id": id
                },
                async: true,
                success: function (res) {
                    console.log(res);
                    if (res == "success") {
                        location.reload();
                    }
                }
            })
        }
    })
    //重命名取消
    $('div[openContent="reset-name"] button.reduce').click(function(){
        $('.hide-iframe').removeClass('active');
        $('div[openContent="reset-name"]').removeClass('active');
    })

    //删除弹框出现--单选
    $('.singleDel').click(function(){
        id = $(this).attr("alt");
        ids.push(id);
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    //删除确定--单选或复选框
    $('div[openContent="delete-mesh"] button.yes').click(function(){
        console.log(ids);
        if(ids){
            location.href = "/alink-hq/group/delete?ids=" + ids;
            ids=[];
        }
    })
    //删除取消--单选或复选框
    $('div[openContent="delete-mesh"] button.reduce').click(function(){
        $('.hide-iframe').removeClass('active');
        $('div[openContent="delete-mesh"]').removeClass('active');
    })
    //删除多选
    $("#multiDel").click(function () {
        var idss=[];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        ids=idss;
        console.log(ids);
        $('div[openContent="delete-mesh"]').addClass('active');
        var width = document.body.scrollWidth;
        var height = document.body.scrollHeight;
        $('.hide-iframe').addClass('active');
        $('.hide-iframe').css({
            'width': width,
            'height': height
        })
    })
    //移交
    $("#multiMove").click(function () {
        var idss = [];
        $('input[name="ids"]:checked').each(function () {
            idss.push($(this).val());
        });
        console.log(idss);
        if(idss.length>0){
            location.href = "/alink-hq/group/move?ids=" + idss;
        }
    })
})
function nameKeyUp(){
    var name=$('#rename').val();
    var regUserName = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,6}$/;
    var userNameResult = regUserName.test(name);
    if(name!='' && !userNameResult){
        $('p.rename-hint').text('请输入 2-6 位汉字、字母、数字');
    }else{
        $('p.rename-hint').text('');
    }
}