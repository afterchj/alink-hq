/**
 * Created by yuanjie.fang on 2019/8/16.
 */
$(function () {
    $('.search-result table tbody tr').each(function () {
        var haschild=$(this).attr('haschild');
        console.log('haschild',haschild);
        if(haschild=='true'){
            $(this).find('.treeOpen').hide();
        }else{
            $(this).find('.treeOpen,.treeClose').hide();
        }
    })
    $('.tree-icon').click(function () {
        $(this).hide().siblings('i').show();
    })
})
