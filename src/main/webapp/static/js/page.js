/**
 * Created by hongjian.chen on 2019/4/30.
 */
$(function () {
    var size = $("#pageSize").val();
    var length = $("input[name=ids]:checked").length;
    $("#amount").text(length);
    $("#size").val(size);
    //给全选的复选框添加事件
    $("#all,#addAll").click(function () {
        // this 全选的复选框

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
    $("input[name=ids]").click(function () {
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
            $("form:eq(0)").submit();
        }
    });
    $("#size").change(function () {
        $("form:eq(0)").submit();
    });
    $("#skip").click(function () {
        $("form:eq(0)").submit();
    });
    var page = parseInt($('#pageNum').text());
    var pageTotal = parseInt($('#pages').text());
    if (page == 1) {
        $('.prev').removeClass('active');
        $(".prev").addClass('disabled');
    } else {
        $('.prev').addClass('active');
    }
    if (page == pageTotal) {
        $('.next').removeClass('active');
        $(".next").addClass('disabled');
    } else {
        $(".next").addClass('active');
    }
})

// //创建点击
// function createBtnMouseDown(){
//     $('.create').addClass('active');
// }
// function createBtnMouseUp(){
//     $('.create').removeClass('active');
// }
// //移动
// function exchangeBtnMouseDown(){
//     $('#transfer-project').addClass('active');
// }
// function exchangeBtnMouseUp(){
//     $('#transfer-project').removeClass('active');
// }
// //删除
// function deleteBtnMouseDown(){
//     $('#delete-project').addClass('active');
// }
// function deleteBtnMouseUp(){
//     $('#delete-project').removeClass('active');
// }
// //跳转
// function skipBtnMouseDown(){
//     $('#skipPageBtn').addClass('active');
// }
// function skipBtnMouseUp(){
//     $('#skipPageBtn').removeClass('active');
// }