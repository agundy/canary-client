var app = angular.module('app', [
        'ngRoute',
        'ngCookies'
])
.config(function($routeProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            controller: 'LoginCtrl',
            templateUrl: 'app/login/login.html',
            title: 'Login'
        }).when('/dashboard', {
            controller: 'DashboardCtrl',
            templateUrl: 'app/dashboard/dashboard.html',
            title: 'Dashboard'
        });
    ;
    $httpProvider.interceptors.push('authInterceptor');
}).factory('authInterceptor', function($rootScope, $q, $cookieStore){
    return {
        request(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('jwt')){
                config.headers.Authorization = $cookieStore.get('jwt');
                $rootScope.jwt = $cookieStore.get('jwt');
            }
            return config;
        }
    };
});
