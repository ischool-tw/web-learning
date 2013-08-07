    function gadget_scope($scope){
        $scope.errmsg = 'yaoming'
        $scope.keyin = 'beta.GetMyCourse';

        $scope.init = function() {
            var connection = gadget.getContract("basic.teacher");
            connection.send({
                service: $scope.keyin,
                body: '<Request><Condition></Condition></Request>',
                result: $scope.result
            });
        }

        $scope.result = function (response, error, http) {
            $('#container-main').html('');
            
            if (error) {
                $scope.seterr('errors');
            } else {               
                var str = '<table class="table">';
                $(response.Result.Course).each(function(index, item){
                    str += '<tr><td>' + item.Subject + '</td></tr>';
                })
                str+='<table>';

                $('#container-main').html(str);
            }
        }

        $scope.seterr = function(msg) {
            $scope.errmsg = msg;
        }
    }

/*
$(function () {
    // 取得學生資訊

    var connection = gadget.getContract("basic.teacher");
        connection.send({
        service: "beta.GetMyCourse",
        body: '<Request><Condition></Condition></Request>',
        result: function (response, error, http) {
            if (error) {
                $("#mainMsg").html("<div class='alert alert-error'>\n  <button class='close' data-dismiss='alert'>×</button>\n  <strong>呼叫服務失敗或網路異常，請稍候重試!</strong>(GetMyCourse)\n</div>");
            } else {
                var str = '<table class="table">';
                $(response.Result.Course).each(function(index, item){
                    str += '<tr><td>' + item.Subject + '</td></tr>';
                })
                str+='<table>';

                $('#container-main').html(str);
            }
        }
    });
});*/
