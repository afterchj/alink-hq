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
       var productId=$('#productId').val();
       var belongCompany=$('#belongCompany option:selected').val();
       var firmware=$("input[name='firmware']:checked").val();
       var productExplain=$('#productExplain').val();
       console.log('产品名称',productName);
       console.log('产品型号',productType);
       console.log('代码号',productId);
       console.log('隶属公司',belongCompany);
       console.log('关键固件',firmware);
       console.log('产品说明',productExplain);

        //同一个公司的产品名称、代码号（产品 ID）不能重复，若重复,提示已存在请重新输入
       var isTrue1=false;
       if(productName==''){
           $('#productName').prev('.verify').text('请输入产品名称');
       }else if(productName=='重复'){
           $('#productName').prev('.verify').text('已存在，请重新输入');
       }else{
           $('#productName').prev('.verify').text('');
           isTrue1=true;
       }

       var isTrue2=false;
       if(productId==''){
           $('#productId').prev('.verify').text('请输入代码号（产品 ID）');
       }else if(productName=='重复'){
           $('#productId').prev('.verify').text('已存在，请重新输入');
       }else{
           $('#productId').prev('.verify').text('');
           isTrue2=true;
       }

       var isTrue3=false;
       if(belongCompany==''){
           $('#belongCompany').prev('.verify').text('请选择隶属公司');
       }else if(productName=='重复'){
           $('#belongCompany').prev('.verify').text('已存在，请重新输入');
       }else{
           $('#belongCompany').prev('.verify').text('');
           isTrue3=true;
       }

       console.log(isTrue1,isTrue2,isTrue3);
        if(isTrue1 && isTrue2 && isTrue3){
            //新增成功！
            var selector = $('div[openContent="loading"]');
            $('div[openContent="loading"] .title').text('新增成功！即将跳转产品列表');
            selector.addClass('active');
            showOverlay();
            setTimeout(function () {
                location.href="/alink-hq/productList";
            },800)
        }
   })

})