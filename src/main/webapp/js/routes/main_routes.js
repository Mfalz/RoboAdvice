
RoboAdviceApp.controller("CheckUserLogged",function($scope,$location){
  if(!$scope.user.isLogged())
  $location.path("/");
});

RoboAdviceApp.controller("newUserConstraint",function(userService, $location){
  if(!userService.hasStrategies())
    $location.path("wizard");
});

RoboAdviceApp.config([
    '$provide',
    function($provide) {
        $provide.decorator('$log', [
            '$delegate',
            function logDecorator($delegate) {
                let myLog = {
                    warn: function(msg) {
                        log(msg, 'warn');
                    },
                    error: function(msg) {
                        log(msg, 'error');
                    },
                    info: function(msg) {
                        log(msg, 'info');
                    },
                    debug: function(msg) {
                        log(msg, 'debug');
                    },
                    log: function(msg) {
                        log(msg, 'log');
                    },
                    stack: []
                };

                function log(msg, type) {
                    myLog.stack.push({ type: type, message: msg.toString() });
                    if (console && console[type]) console[type](msg);
                }

                return myLog;

            }
        ])
    }
]);
RoboAdviceApp.config(function($routeProvider) {
    $routeProvider
    // route for the home page
        .when('/', {
            templateUrl : 'html/home.html'
        })
        .when('home', {
            templateUrl: 'html/home.html'
        })
        .when('/contact', {
            templateUrl : 'html/contact.html'
        })
        .when('/sign', {
            templateUrl : 'html/sign.html'
        })
        .when('/prewizard',{
            templateUrl : 'html/pre_wiz.html'
        })
        .when('/wizard', {
            templateUrl : 'html/wizard.html',
            controller: "CheckUserLogged"
        })
        .when('/wizard-1', {
            templateUrl : 'html/wizard-1.html',
            controller: "CheckUserLogged"
        })
        .when('/wizard-2', {
            templateUrl : 'html/wizard-2.html',
            controller: "CheckUserLogged"
        })
        .when('/wizard-3', {
            templateUrl : 'html/wizard-3.html',
            controller: "CheckUserLogged"
        })

        .when('/support', {
            templateUrl : 'html/support.html'
        })
        .when('/user-profile', {
            templateUrl : 'html/user-profile.html',
            controller: "CheckUserLogged"
        })
        .when('/history', {
            templateUrl : 'html/history.html',
            controller: "newUserConstraint"
        })
        .when('/worth', {
            templateUrl : 'html/worth.html',
            controller: "newUserConstraint"
        })
        .when('/portfolio', {
            templateUrl : 'html/portfolio.html',
            controller: function(userService,$location){
              if(!userService.hasStrategies()){
                $location.path("wizard");
              }else if(!userService.hasCurrentPortfolio()){
                $location.path("demo");
              }
            }
        })
        .when('/worthgraph' | '/dashboard', {
            templateUrl : 'html/portfolio.html',
            controller: "newUserConstraint"
        })
        .when('/advice', {
            templateUrl: "html/advice.html",
            controller: function(strategyService,$location){
              if(strategyService.getLastStrategy() == null){
                $location.path("demo");
              }
            }
        })
        .when('/backtesting', {
            templateUrl : 'html/backtesting.html',
            controller: function(strategyService,$location){
              if(strategyService.getLastStrategy() == null){
                $location.path("demo");
              }
            }
        })
        .when('/forecast', {
            templateUrl : 'html/forecast.html',
            controller: function(strategyService,$location){
              if(strategyService.getLastStrategy() == null){
                $location.path("demo");
              }
            }
        })
        .when('/privacy', {
            templateUrl : "html/privacy.html"
        })
        .when('/cookie', {
            templateUrl : "html/cookie.html"
        })

});
