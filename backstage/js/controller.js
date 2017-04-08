	/*---------login module---------*/
var controller = angular.module('controllerModule', ['ngCookies', 'serviceModule']);
controller.controller('loginCtrl', function($scope, $http, $cookies, userService){

	var username, password, keep;
	var oldUser = $cookies.getObject('user');
	if (oldUser) {
		$scope.username = oldUser.username;
		$scope.password = oldUser.password;
		$('#username').addClass('fill');
		$('#password').addClass('fill');
	}
	$("#username").blur(function(){
		if ($scope.username != "" && $scope.username != undefined) {
			$('#username').addClass('fill');
			$('#username').removeClass('notfill');
		}else{
			$('#username').addClass('notfill');
			$('#username').removeClass('fill');
		}
	})
	
	$("#password").blur(function(){
		if ($scope.password != "" && $scope.password != undefined) {
			if ($scope.username != "" && $scope.username != undefined) {
				$('#password').addClass('fill');
				$('#username').removeClass('notfill');
			}else{
				$('#username').addClass('notfill');
				$('#username').removeClass('fill');
			}
		}
	})
	
	keep = true;
	$('#check').click(function(){
		keep = !keep;
		console.log(keep);
	});

	$scope.login = function(){
		var promise = userService.login($scope.username, $scope.password, keep);
		promise.then(function(data){
			if(data){
				console.log('yes');
				$scope.fail = false;
			}else{
				$scope.fail = true;
			}
		})
		
	}
});

controller.controller('navCtrl', function($scope){

});

controller.controller('asideCtrl', function($scope){

});

controller.controller('clientCtrl', function($scope){

});

controller.controller('productCtrl', function($scope){

});
