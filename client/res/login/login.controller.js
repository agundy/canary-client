app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.user = {
        email: '',
        password: '',
        name:''
    };

    $scope.login = function() {
        Auth.login($scope.user)
            .then(function(){
                $location.path('/dashboard');
            });
    };
    $scope.register = function() {
        Auth.register($scope.user)
            .then(function(){
                $location.path('/dashboard');
            });
    };
});


//gonna test including this in this js file, will cleanup to standards after

window.onload=function(){ 
    var flag_register = 0;
    var registration = document.getElementById("register");
    var login = document.getElementById("login");
    var authform = document.getElementById("auth");

    var reg_info = document.getElementsByName("name")[0];

    function register() {
        flag_register = 1;
        reg_info.className = "in";
        reg_info.required = true;
        registration.innerHTML = "Just Kidding";
        login.innerHTML = "Register";
        authform.attr("ng-submit","register()");
    }

    function unregister() {
        flag_register = 0;
        reg_info.className = "in hide";
        reg_info.required = false;
        reg_info.value = "";
        registration.innerHTML = "Register";
        login.innerHTML = "Login";
        authform.attr("ng-submit","login()");
    }

    registration.addEventListener('click', function() {
        flag_register == 0 ? register(): unregister() ;

    }, false);
};
