/**
 * Created by yuanjie.fang on 2019/7/26.
 */

// $(function(){
//     var hasUpload=GetQueryString('hasUpload');
//     console.log('是否已经上传过新版本',hasUpload);
//     if(hasUpload==0){
//         //没有上传新版本
//         $('form.noUpload').addClass('active').siblings('form').removeClass('active');
//     }else if(hasUpload==1){
//         //已经上传新版本
//         $('form.hasUpload').addClass('active').siblings('form').removeClass('active');
//     }
// })

$(".trueFile").on("change",function (e) {
    var e = e || window.event;
    //获取 文件 个数 取消的时候使用
    var files = e.target.files;
    if(files.length>0){
        // 获取文件名 并显示文件名
        var fileName = files[0].name;
        $(".falseFile").val(fileName);
    }else{
        //清空文件名
        $(".falseFile").val("");
    }
});
// $('#submitNewVersion').click(function () {
//     var otaVersion=$('#otaVersion').val();
//     var that=$('#otaVersion');
//     // console.log('otaVersion',otaVersion);
//     if(otaVersion==''){
//         that.prev('.verify').text('请输入固件版本');
//     }else if(otaVersion=='已存在'){
//         that.prev('.verify').text('已存在，请重新输入');
//     }else{
//         that.prev('.verify').text('');
//         $('.hasUpload').submit();
//     }
// })
$('#uploaded').click(function () {
    var newFile=$('#newFile').val();
    console.log('newFile',newFile);
    if(newFile==''){
        $('#newFile').siblings('.verify').text('请选择文件');
    }else{
        $('#newFile').siblings('.verify').text('');
        $('.noUpload').submit();
    }
})