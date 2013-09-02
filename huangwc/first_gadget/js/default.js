function CourseCtrl($scope)
{
	$scope.courses = [];
	$scope.init = function(){
		var connection = gadget.getContract("basic.teacher");
		connection.send({
			service: "beta.GetMyCourse",
			body: '<Request><Condition></Condition></Request>',
			result: function (response, error, http) {
					if (!error) {
						angular.forEach(response.Result.Course,
							function(value){
								var course = {};
								course.id = value.CourseId;
								course.name = value.Subject;
								$scope.courses.push(course);
							});
						$scope.$apply(); //trigger view update
					}
				}
			});
	}
}