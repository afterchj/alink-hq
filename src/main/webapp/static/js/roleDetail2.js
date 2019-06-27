$(function () {
    $("button").click(function () {
        var permissions = $("input:checked");
        var permissionsArr = [];
        var count=0;
        var roleId = $("#roleId").val();
        $.each(permissions,function () {
            var inputAlt = $(this).attr('alt');
            if (inputAlt!=undefined ){
                permissionsArr[count]=inputAlt;
                count++;
            }
        });
        permissionsArr.push(roleId);
        $.ajax({
            type:"POST",
            url:"/alink-hq/rolePer/updateRolePermission",
            dataType:"json",
            data:JSON.stringify(permissionsArr),
            contentType:"application/json",
            success:function (msg) {
                loadingSuccess("保存成功")
            },
            error:function () {
                loadingError("保存失败，请重新尝试")
            }
        });
    })

    //保存成功跳转到角色列表
    function loadingSuccess(content){
        $('#preload-anim').addClass('active');
        $('#preload-anim .title').text(content);
        setTimeout(function(){
            $('#preload-anim').removeClass('active');
            $('#preload-anim .title').text('');
            window.location.href = "/alink-hq/role/list";
        },2000)
    }
    //保存失败提示失败信息
    function loadingError(content){
        $('#preload-anim').addClass('active');
        $('#preload-anim .title').text(content);
        setTimeout(function(){
            $('#preload-anim').removeClass('active');
            $('#preload-anim .title').text('');
        },2000)
    }


})