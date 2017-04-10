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
	}).state("VIPClient", {
      url: '/VIPClient',
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
  }).state("normalClient", {
      url: '/normalClient',
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
	}).state("saleProduct", {
      url: '/saleProduct',
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
  }).state("underProduct", {
      url: '/underProduct',
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
  }).state("detail", {
      url: '/detail',
      views:{
        'nav':{
          templateUrl: '/html/nav.html'
        },
        'aside':{
          templateUrl: '/html/aside.html'
        },
        'article':{
          templateUrl: '/html/detail.html'
        }
      }
  });
})