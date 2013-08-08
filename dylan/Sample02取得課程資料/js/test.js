$(document).ready(function () {
    var conn = gadget.getContract("basic.teacher");
    conn.send({
        service: "GetMyCourse",
        body: "",
        result: function (response, error, http) {
            if (error === null) {
                alert("讀取成功!!");
                var courseString = '';
                $(response.Course).each(function (index, item) {
                    courseString += "<tr>";
                    courseString += "<td>" + item.CourseId + "</td>";
                    courseString += "<td>" + item.CourseName + "</td>";
                    courseString += "<td>" + item.Subject + "</td>";
                    courseString += "<td>" + item.SchoolYear + "</td>";
                    courseString += "<td>" + item.Semester + "</td>";
                    courseString += "<td>" + item.Sequence + "</td>";
                    courseString += '</tr>';
                });
                $('#tbodyIsTrue').html(courseString);
            }
            else {
                alert(error);
            };
        }
    })
});