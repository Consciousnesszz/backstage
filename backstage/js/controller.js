	/*---------controller module---------*/
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

controller.controller('navCtrl', function($scope, $rootScope, $location, navService){
	$scope.lookingFor = navService.lookingFor();
	$('.seek .btn').click(function(){
		var target = $(".seek .search").val(),
			listItem = $(".list div");
		for(var i = 0, len = listItem.length; i < len; i++){
			$(listItem[i]).css("background", "#f1f1f1");
			if ($(listItem[i]).text() == target) {
				$(listItem[i]).css("background", "#ff0");
				continue;
			}
		}
	})
	$rootScope.onChange = function(){
		var statu = $location.path();
		if (statu.indexOf("lient") > 0) {
			$rootScope.clients.reverse();
		}else{
			$rootScope.products.reverse();
		}
	}

	$(".add .btn").click(function(){
		$(".wadd").css("display", "block");
	})
});

controller.controller('asideCtrl', function($scope, $cookies){
	var username = $cookies.getObject('user').username;
	$scope.username = username;
});

controller.controller('clientCtrl', function($scope, $rootScope, $cookies, $location, clientService){
	clientService.clientsInfo().then(function(data){
		$rootScope.clients = data;
	});
	$scope.goDetail = function(){
		var id = $(this)[0].data.id;
		$cookies.put('page', "client_" + id);
		$location.path('/detail').replace();
	}
	$scope.change = function(index){
		$(".wchange").css("display","block");
		$rootScope.nowClient = $rootScope.clients[index];
		$(".changeName").val($rootScope.nowClient.name);
		$(".changeStatu").val($rootScope.nowClient.statu);
	}
	$scope.delete = function(index){
		$rootScope.clients.splice(index,1);
	}
	
});

$(".cancel").click(function(){
	$(".wadd").css("display","none");
	$(".wchange").css("display","none");
});

controller.controller('productCtrl', function($scope, $rootScope, $cookies, $location, productService){
	productService.productsInfo().then(function(data){
		$rootScope.products = data;
	});
	$scope.goDetail = function(){
		var id = $(this)[0].data.id;
		$cookies.put('page', "product_" + id);
		$location.path('/detail').replace();
	}
	$scope.change = function(index){
		$(".wchange").css("display","block");
		$rootScope.nowProduct = $rootScope.products[index];
		$(".changeName").val($rootScope.nowProduct.name);
		$(".changeStatu").val($rootScope.nowProduct.statu);
	}
	$scope.delete = function(index){
		$rootScope.products.splice(index,1);
	}
});

controller.controller('detailCtrl', function($scope, detailService){
	detailService.page().then(function(data){
		if(data[0].phone){
			$scope.page = {
				id : "编号： " + data[0].id,
				name : "用户名： " + data[0].name,
				statu : "状态： " + data[0].statu,
	            other : "电话： " + data[0].phone,
	            amount : ""
			}
		}else{
			$scope.page = {
				id : "编号： " + data[0].id,
				name : "商品名： " + data[0].name,
				statu : "状态： " + data[0].statu,
	            other : "产地： " + data[0].addr,
	            amount : "数量： " + data[0].amount,
			}
		}
		
	});
});


/*controller.controller('asideCtrl', function($scope, $cookies){
	var username = $cookies.getObject('user').username;
	$scope.username = username;
});

controller.controller('clientCtrl', function($scope, $rootScope, $cookies, $location, clientService){
	clientService.clientsInfo().then(function(data){
		$rootScope.clients = data;
	});
	$scope.goDetail = function(){
		var id = $(this)[0].data.id;
		$cookies.put('page', "client_" + id);
		$location.path('/detail').replace();
	}
	$scope.delete = function(index){
		$rootScope.clients.splice(index,1);
	}
});

controller.controller('productCtrl', function($scope, $rootScope, $cookies, $location, productService){
	productService.productsInfo().then(function(data){
		$rootScope.products = data;
	});
	$scope.goDetail = function(){
		var id = $(this)[0].data.id;
		$cookies.put('page', "product_" + id);
		$location.path('/detail').replace();
	}
	$scope.delete = function(index){
		$rootScope.products.splice(index,1);
	}
});

controller.controller('detailCtrl', function($scope, detailService){
	detailService.page().then(function(data){
		if(data[0].phone){
			$scope.page = {
				id : "编号： " + data[0].id,
				name : "用户名： " + data[0].name,
				statu : "状态： " + data[0].statu,
	            other : "电话： " + data[0].phone,
	            amount : ""
			}
		}else{
			$scope.page = {
				id : "编号： " + data[0].id,
				name : "商品名： " + data[0].name,
				statu : "状态： " + data[0].statu,
	            other : "产地： " + data[0].addr,
	            amount : "数量： " + data[0].amount,
			}
		}
		
	});
});*/

controller.controller('wchangeCtrl', function($scope, $rootScope, detailService){
	$scope.change = function(){
		$(".wadd").css("display","none");
		$(".wchange").css("display","none");
		console.log($rootScope.nowClient);
		if ($rootScope.nowClient) {
			$rootScope.nowClient.name = $(".changeName").val();
			$rootScope.nowClient.statu = $(".changeStatu").val();
			$rootScope.clients.splice($rootScope.nowClient.id - 1, 1, $rootScope.nowClient);
			console.log($rootScope.clients);
		}else if ($rootScope.nowProduct) {
			$rootScope.nowProduct.name = $(".changeName").val();
			$rootScope.nowProduct.statu = $(".changeStatu").val();
			$rootScope.products.splice($rootScope.nowProduct.id - 1, 1, $rootScope.nowProduct);
		}
	}
	
});

controller.controller('waddCtrl', function($scope, $rootScope, $location, detailService){
	$scope.add = function(){
		var page = $location.path();
		if (page.indexOf('lient') > 0) {
			$rootScope.clients.push({
				id : $rootScope.clients[$rootScope.clients.length - 1].id + 1,
				name : $(".addName").val(),
				statu : $(".addStatu").val()
			}) 
		}else{
			$rootScope.products.push({
				id : $rootScope.products[$rootScope.products.length - 1].id + 1,
				name : $(".addName").val(),
				amount : $(".addStatu").val()
			})
		}
		$(".wadd").css("display", "none");
	}
})
