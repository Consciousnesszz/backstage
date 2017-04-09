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
							$cookies.putObject('user', {
								username : username,
								password : password
							}, {
								path : '/'
							})
						}
						$location.path('/allClient').replace();
						return true;
					}
				}
				$('#username').removeClass('fill');
				$('#password').removeClass('fill');
				return false;
			})
		}
	}
})

service.service('navService', function($http, $cookies, $location){
	return {
		lookingFor : function(){
			var lookingType = $location.path();
			if (lookingType === '/allClient') {
				return "所有账户";
			}else if(lookingType === '/VIPClient'){
				return "VIP 账户";
			}else if(lookingType === '/normalClient'){
				return "普通账户";
			}else if(lookingType === '/allProduct'){
				return "所有商品";
			}else if(lookingType === '/saleProduct'){
				return "折扣商品";
			}else if(lookingType === '/underProduct'){
				return "下架商品";
			}else if(lookingType === '/detail'){
				return "详细信息";
			}
		}
	}
})

service.service('clientService', function($http, $cookies, $location){
	return {
		clientsInfo : function(){
			return $http.get('../json/client.json').then(function(respose){
				var lookingType = $location.path(),
					clients = respose.data;
				if (lookingType === '/allClient') {
					return clients;
				}else if(lookingType === '/VIPClient'){
					var VIPClient = [];
					for(var i =0, len = clients.length; i < len; i++){
						if (clients[i].statu === 'vip') {
							VIPClient.push(clients[i]);
						}
					}
					return VIPClient;
				}else if(lookingType === '/normalClient'){
					var normalClient = [];
					for(var i =0, len = clients.length; i < len; i++){
						if (clients[i].statu === 'normal') {
							normalClient.push(clients[i]);
						}
					}
					return normalClient;
				}
			})
		}
	}
	
})

service.service('productService', function($http, $cookies, $location){
	return {
		productsInfo : function(){
			return $http.get('../json/product.json').then(function(respose){
				var lookingType = $location.path(),
					products = respose.data;
				if (lookingType === '/allProduct') {
					return products;
				}else if(lookingType === '/saleProduct'){
					var saleProduct = [];
					for(var i =0, len = products.length; i < len; i++){
						if (products[i].statu === 'sale') {
							saleProduct.push(products[i]);
						}
					}
					return saleProduct;
				}else if(lookingType === '/underProduct'){
					var underProduct = [];
					for(var i =0, len = products.length; i < len; i++){
						if (products[i].statu === 'under') {
							underProduct.push(products[i]);
						}
					}
					return underProduct;
				}
			})
		}
	}
})

service.service('detailService', function($http, $cookies, $http){
	return {
		page : function(){
			var pagePath = '../json/' + $cookies.get('page') + '.json';
			return $http.get(pagePath).then(function(response){
				return response.data;
			})
		}
	}
})