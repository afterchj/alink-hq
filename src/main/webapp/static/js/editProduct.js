/**
 * Created by yuanjie.fang on 2019/8/14.
 */
$(function () {
    //监听公司select选择
    $('#belongCompany').change(function () {
        var belongCompany=$(this).children('option:selected').val();
        if(belongCompany==''){
            $('#belongCompany').prev('.verify').text('请选择隶属公司');
        }else{
            $('#belongCompany').prev('.verify').text('');
        }
    })
    $('.submit button').click(function () {
        var productName=$('#productName').val();
        var productType=$('#productType').val();
        var productId=$('#productId').val();//产品id
        var belongCompany=$('#belongCompany option:selected').text();//公司id
        var firmware=$("input[name='firmware']:checked").next().next().val();//固件id
        var productExplain=$('#productExplain').val();
        var id = $("#productName").next().val();

        //同一个公司的产品名称、代码号（产品 ID）不能重复，若重复,提示已存在请重新输入
        var isTrue1=false;
        if(productName==''){
            $('#productName').prev('.verify').text('请输入产品名称');
        }else{
            $('#productName').prev('.verify').text('');
            isTrue1=true;
        }

        var isTrue2=false;
        if(productId==''){
            $('#productId').prev('.verify').text('请输入代码号（产品 ID）');
        }else{
            $('#productId').prev('.verify').text('');
            isTrue2=true;
        }

        var isTrue3=false;
        if(belongCompany=='' || belongCompany=='请选择隶属公司' ){
            $('#belongCompany').prev('.verify').text('请选择隶属公司');
        }else{
            $('#belongCompany').prev('.verify').text('');
            isTrue3=true;
        }

        console.log(isTrue1,isTrue2,isTrue3);
        if(isTrue1 && isTrue2 && isTrue3){
            $.ajax({
                type:"POST",
                url:"/alink-hq/product/updateEdit",
                data:{productName:productName,type:productType,productId:productId,coname:belongCompany,otaId:firmware,description:productExplain,id:id},
                dataType: 'json',
                success:function (data) {
                    var success = data.success;
                    var repeatName = data.repeatName;
                    var productNameNum;
                    var productIdNum;
                    if (repeatName!=undefined){
                        productNameNum = repeatName.productNameNum;
                        productIdNum = repeatName.productIdNum;
                        if (productNameNum==1){
                            $('#productName').prev('.verify').text('已存在，请重新输入');
                        }
                        if (productIdNum == 1){
                            $('#productId').prev('.verify').text('已存在，请重新输入');
                        }
                    }else if (success == 'success'){
                        //保存成功！
                        var selector = $('div[openContent="loading"]');
                        $('div[openContent="loading"] .title').text('保存成功');
                        selector.addClass('active');
                        showOverlay();
                        setTimeout(function () {
                            location.href="/alink-hq/product/list";
                        },1500)
                    }else {
                        var selector = $('div[openContent="loading"]');
                        $('div[openContent="loading"] .title').text('保存失败，请重新尝试');
                        selector.addClass('active');
                        showOverlay();
                        setTimeout(function () {
                            selector.removeClass('active');
                            hideOverlay();
                        },1500);
                    }
                },
                error: function(data){
                    var selector = $('div[openContent="loading"]');
                    $('div[openContent="loading"] .title').text('保存失败，请重新尝试');
                    selector.addClass('active');
                    showOverlay();
                    setTimeout(function () {
                        selector.removeClass('active');
                        hideOverlay();
                    },1500);
                    // alert("操作异常");
                }
            })

        }
    })
})

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
