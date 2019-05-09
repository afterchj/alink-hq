/**
 * Created by qian.chen on 2019/5/9.
 */
// function mouseDown() {
//     $('.btn-bottom button').addClass('active');
// }
// function mouseUp() {
//     $('.btn-bottom button').removeClass('active');
// }
//返回点击
function backBtnMouseDown(){
    $('.goBack').addClass('active');
}
function backBtnMouseUp(){
    $('.goBack').removeClass('active');
}
//创建点击
function createBtnMouseDown(){
    $('.create').addClass('active');
}
function createBtnMouseUp(){
    $('.create').removeClass('active');
}
//移动
function exchangeBtnMouseDown(){
    $('#transfer-project').addClass('active');
    $('#multiMove').addClass('active');

}
function exchangeBtnMouseUp(){
    $('#transfer-project').removeClass('active');
    $('#multiMove').removeClass('active');
}
//删除
function deleteBtnMouseDown(){
    $('#delete-project').addClass('active');
    $('#multiDel').addClass('active');
}
function deleteBtnMouseUp(){
    $('#delete-project').removeClass('active');
    $('#multiDel').removeClass('active');
}
//跳转
function skipBtnMouseDown(){
    $('#skipPageBtn').addClass('active');
    $('#skip').addClass('active');
}
function skipBtnMouseUp(){
    $('#skipPageBtn').removeClass('active');
    $('#skip').removeClass('active');
}