$(document).ready(function () {
    var conn = gadget.getContract("basic.public");

    conn.send({
        service: "beta.GetCurrentSemester",
        body: "",
        result: function (response, error, http) {
            if (error === null) {
                alert(response);
                $("#test").html("<p>現在學年度為:" + response.SchoolYear + "</p><p>現在學期為:" + response.Semester + "</p>");
                //$("#test").html("<p>現在學年度為:</p><p>現在學期為:</p>");
            }
            else {
                alert(error);
            };
        }
    });
});