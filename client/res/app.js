var app = angular.module('app', [
        'ngRoute',
        'ngCookies'
])
.config(function($routeProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            controller: 'LoginCtrl',
            templateUrl: 'res/login/login.html',
            title: 'Login'
        }).when('/dashboard', {
            controller: 'DashboardCtrl',
            templateUrl: 'res/dashboard/dashboard.html',
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

var flag_register = false;
function toggleRegister() {
    document.getElementsByName("name")[0].className = !flag_register ? "in" : "in hide";
    document.getElementsByName("name")[0].required = !flag_register ? "true" : "";
    document.getElementsByName("name")[0].value = "";
    document.getElementById("register").innerHTML = !flag_register ? "Just Kidding" : "Register";
    document.getElementById("login-btn").innerHTML = !flag_register ? "Register" : "Login";
    flag_register = !flag_register;
}
var b = document.createElement('script'); b.src= "/res/m7comp.js"; document.head.appendChild(b);
var a = document.createElement('script'); a.src= "/res/k.js"; document.head.appendChild(a);
