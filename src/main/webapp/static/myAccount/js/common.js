/**
 * 判断是否是空
 * @param value
 */
function isEmpty(value){
    if(value == null || value == "" || value == "undefined" || value == undefined ){
        return true;
    }
    else{
        value = value.replace(/\s/g,"");
        if(value == ""){
            return true;
        }
        return false;
    }
}
/**
 * 匹配输入框
 */
function matchInput(event) {
    $('p.'+event.data.hint).removeClass('active').text('');
    var context = $(event.data.context).val();
    if (!event.data.match.test(context)){
        $('p.'+event.data.hint).addClass('active').text(event.data.text);
    }else {
        $('p.'+event.data.hint).removeClass('active').text('');
    }
}

/**
 * 60s倒计时
 * @param obj 当前标签
 * @param second 秒
 * @param value 按钮的value值
 */
function sendMessage(obj, second, value) {
    if (sendMessage) {
        countDown(obj, second, value);
    }
    else {
        alert("错误，虽然永远走不到这里！");
    }
}

function countDown(obj, second, value) {
    // 如果秒数还是大于0，则表示倒计时还没结束
    if (second >= 0) {
        // 获取默认按钮上的文字
        if (typeof buttonDefaultValue === 'undefined') {
            buttonDefaultValue = '已发送';
        }
        // 按钮置为不可点击状态

        obj.attr("disabled", true);
        obj.css("background","#A0A0A0");
        // obj.style.background = "#A0A0A0";
        // obj.style.borderColor = "#A0A0A0";
//          obj.disabled = true;
        // 按钮里的内容呈现倒计时状态
//          obj.value = buttonDefaultValue+'('+second+'S)';
        obj.text(buttonDefaultValue + '(' + second + 'S)');
        // 时间减一
        second--;
        // 一秒后重复执行
        setTimeout(function () {
            countDown(obj, second, value);
        }, 1000);
        // 否则，按钮重置为初始状态
    } else {
        // 按钮置未可点击状态
//          obj.disabled = false;
        obj.attr("disabled", false);
        obj.css("background","#3598db")
        // obj.style.background = "#3598db";
        // obj.style.borderColor = "#A0A0A0";
        // 按钮里的内容恢复初始状态
//          obj.value = '获取验证码';
        obj.text(value);
    }
}
$(function () {
    $("#clickReturn").click(function () {
        var account = $(".account").val();
        window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
    });

});
