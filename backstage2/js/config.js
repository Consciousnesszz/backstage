	/*---------config module---------*/
var app = angular.module('pro', ['ui.router', 'serviceModule', 'controllerModule']);

app.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.when("","/login");

  	$stateProvider.state("login", {
  		url: '/login',
  		views:{
  			'login':{
  				templateUrl: '/html/login.html'
  			}
  		}
	}).state("allClient", {
  		url: '/allClient',
  		views:{
  			'nav':{
  				templateUrl: '/html/nav.html'
  			},
  			'aside':{
  				templateUrl: '/html/aside.html'
  			},
  			'article':{
  				templateUrl: '/html/client.html'
  			}
  		}
	}).state("allProduct", {
  		url: '/allProduct',
  		views:{
  			'nav':{
  				templateUrl: '/html/nav.html'
  			},
  			'aside':{
  				templateUrl: '/html/aside.html'
  			},
  			'article':{
  				templateUrl: '/html/product.html'
  			}
  		}
	});;
})