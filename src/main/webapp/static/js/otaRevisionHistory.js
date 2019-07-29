/**
 * Created by yuanjie.fang on 2019/7/26.
 */
//日期选择
laydate.render({
    elem: '#update-time',
    range: true
});
$('.singleDel').click(function() {
    var selector = $('div[openContent="delete-revision"]');
    selector.addClass('active');
    adjust(selector);
    showOverlay();
});
$('div[openContent="delete-revision"] .pop-btn .reduce').click(function() {
    var selector = $('div[openContent="delete-revision"]');
    selector.removeClass('active');
    hideOverlay();
});
$('div[openContent="delete-revision"] .pop-btn .yes').click(function() {
    var selector = $('div[openContent="delete-revision"]');
    selector.removeClass('active');
    hideOverlay();
});
//编辑版本
$('.memo-edit-has').dblclick(function(event) {
    event.stopPropagation();
    var selector = $('div[openContent="memo-edit"]');
    selector.addClass('active');
    adjust(selector);
    showOverlay();
    var text=$(this).find('.memo-content').text().trim();
    var length=text.length;
    $('.wishContent').val(text);
    $('.wordsNum').text(length+'/200');
});
$('div[openContent="memo-edit"] .pop-btn .reduce').click(function() {
    var selector = $('div[openContent="memo-edit"]');
    selector.removeClass('active');
    hideOverlay();
});
$('div[openContent="memo-edit"] .pop-btn .yes').click(function() {
    var selector = $('div[openContent="memo-edit"]');
    selector.removeClass('active');
    hideOverlay();
});

//重命名
$('.singleEdit').click(function(event) {
    event.stopPropagation();
    var selector = $('div[openContent="reset-name"]');
    selector.addClass('active');
    adjust(selector);
    showOverlay();
});
$('div[openContent="reset-name"] .pop-btn .reduce').click(function() {
    var selector = $('div[openContent="reset-name"]');
    selector.removeClass('active');
    hideOverlay();
});
$('div[openContent="reset-name"] .pop-btn .yes').click(function() {
    var selector = $('div[openContent="reset-name"]');
    $('.rename-hint').text('');
    var val = $('#rename').val();
    if (val == '') {
        $('.rename-hint').text('请输入固件版本');
    }else if(val == '已存在'){
        $('.rename-hint').text('已存在请重新输入');
    } else {
        $('.rename-hint').text('');
        selector.removeClass('active');
        hideOverlay();
    }

});
//封装一个限制字数方法
var checkStrLengths = function (str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
    } else {
        result = str.length;
    }
    return result;
}

//监听输入
$(".wishContent").on('input propertychange', function () {
    //获取输入内容
    var userDesc = $(this).val();
    //判断字数
    var len;
    if (userDesc) {
        len = checkStrLengths(userDesc, 200);
    } else {
        len = 0
    }
    //显示字数
    $(".wordsNum").html(len + '/200');
});
$('#rename').bind('input propertychange', function () {
    var val = $(this).val();
    if (val == '') {
        $('.rename-hint').text('请输入固件版本');
    } else {
        $('.rename-hint').text('');
    }
});
// $('.lorem-limit').hover(function () {
//     // $(this).siblings('.memo-edit-has').addClass('active');
// });