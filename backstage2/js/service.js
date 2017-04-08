	/*---------service module---------*/
var service = angular.module('serviceModule', ['ngCookies']);

service.service('userService', function($http, $cookies, $location){
	return {
		login : function(username, password, keep){
			return $http.get('../json/userinfo.json').then(function(respose){
				var data = respose.data;
				for(i in data){
					if (data[i].username === username && data[i].password === password) {
						if (keep) {
							var date = new Date();
							date.setDate(date.getDate() + 7);
							$cookies.putObject('user', {
								username : username,
								password : password
							}, {
								path : '/',
								expires : date
							})
						}else{
							$cookies.remove('user');
						}
						$location.path('/allClient').replace();
						return true;
					}
				}
				$('#username').removeClass('fill');
				$('#password').removeClass('fill');
				return false;
			})
		},
		main : function(){},
		exit : function(){}
	}
	
})