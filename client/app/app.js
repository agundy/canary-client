//Manages general interaction with a session of the Canary application

//Establishes an Angular module to hold session information
var app = angular.module('app', [
        'ngRoute',
        'ngCookies',
        'ngResource'
])
.config(function($routeProvider, $locationProvider, $httpProvider){
    //Configuration for page redirection and loading
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
}).factory('authInterceptor', function($rootScope, $q, $cookieStore, $location){
    //Manages responses based on the current session configuration
    return {
        request(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('jwt')){
                config.headers.Authorization = $cookieStore.get('jwt');
                $rootScope.jwt = $cookieStore.get('jwt');
            }
            return config;
        },
        responseError(response) {
            if (response.status == 401) {
                $location.path('/');
                $cookieStore.remove('token');
            }
            return $q.reject(response);
        }
    };
});
