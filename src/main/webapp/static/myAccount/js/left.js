$(function () {
    $("#myAccount").click(function () {
        var account = $('#getSessionAccount').val();
        window.location.href = "http://localhost:8080/alink-hq/myAccount/myAccount?account="+account;
    });
})