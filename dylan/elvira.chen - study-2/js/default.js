jQuery(function () {
    ScoreManager.init();
});

ScoreManager = function() {
    var _connection_basicTeacher = gadget.getContract("basic.teacher");
    var _col_courses = [];

    var main = function() {
        // 取得所有學年度學期的授課課程
        _connection_basicTeacher.send({
            service: "GetMyCourse",
            body: {},
            result: function (response, error, http) {
                if (error !== null) {
                    set_error_message('#mainMsg', 'GetMyCourse', error);
                } else {
                    if (response.Course) {
                        // 印出取回的課程資料
                        console.log(response.Course);

                        $(response.Course).each(function(index, item) {
                            // 確認是否已有此學年度學期
                            if (!_col_courses['sy' + item.SchoolYear + item.Semester]) {
                                var data = {
                                    SchoolYear: item.SchoolYear,
                                    Semester: item.Semester,
                                    Courses: []
                                };

                                _col_courses['sy' + item.SchoolYear + item.Semester] = data;
                                _col_courses.push(data);
                            }

                            // 將課程塞入此學年度學期之中
                            _col_courses['sy' + item.SchoolYear + item.Semester].Courses.push(item);
                        });

                        // 印出分類後的課程資料
                        console.log(_col_courses);
                    }
                }
            }
        });
    };

    // 錯誤訊息
    var set_error_message = function(select_str, serviceName, error) {
        if (serviceName) {
            var tmp_msg = '<i class="icon-white icon-info-sign my-err-info"></i><strong>呼叫服務失敗或網路異常，請稍候重試!</strong>(' + serviceName + ')';
            if (error !== null) {
                if (error.dsaError) {
                    if (error.dsaError.status === "504") {
                        switch (error.dsaError.message) {
                            case '501':
                                tmp_msg = '<strong>很抱歉，您無讀取資料權限！</strong>';
                                break;
                            default:
                                tmp_msg = '<strong>' + error.dsaError.message + '</strong>';
                        }
                    } else if (error.dsaError.message) {
                        tmp_msg = error.dsaError.message;
                    }
                } else if (error.loginError.message) {
                    tmp_msg = error.loginError.message;
                } else if (error.message) {
                    tmp_msg = error.message;
                }
                $(select_str).html("<div class='alert alert-error'>\n  <button class='close' data-dismiss='alert'>×</button>\n  " + tmp_msg + "\n</div>");
                $('.my-err-info').click(function(){alert('請拍下此圖，並與客服人員連絡，謝謝您。\n' + JSON.stringify(error, null, 2))});
            }
        } else {
            $(select_str).html("<div class='alert alert-error'>\n  <button class='close' data-dismiss='alert'>×</button>\n  " + error + "\n</div>");
        }
        $('body').scrollTop(0);
    };

    return {
        init: function() {
            main();
        }
    }
}();
