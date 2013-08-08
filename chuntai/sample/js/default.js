$(function () {
    $("#editModal").modal({
        show: false
    });
    $("#editModal").on("hidden", function () {
        $("#editModal #errorMessage").html("");
    });
    $("#editModal").on("show", function () {
        $("#editModal #save-data").button("reset");
    });
    $("#editModal #save-data").click(function () {
        $(this).button("loading");
    });

    // 取得學生資訊
    var connection = gadget.getContract("basic.teacher");
    connection.send({
        service: "beta.GetMyCourse",
        body: '<Request></Request>',
        result: function (response, error, http) {
            if (error !== null) {
                $("#mainMsg").html("<div class='alert alert-error'>\n  <button class='close' data-dismiss='alert'>×</button>\n  <strong>呼叫服務失敗或網路異常，請稍候重試!</strong>(GetMyCourse)\n</div>");
            } else {
                // 成功
                var ret = '';
                var _ref;
                    if(response.Result)
                    {
                    $(response.Result.Course).each(function(index, item) {
                        ret = '<p>課程編號：' + (item.CourseId || '') + '</p>' +
                            '<p>學年度：' + (item.SchoolYear || '') + '</p>' +
                            '<p>學期：' + (item.Semester || '') + '</p>' +
                            '<p>科目名稱：' + (item.Subject || '') + '</p>';

                    });
                    $('#container-main').html(ret);
}
            }
        }
    });
})();