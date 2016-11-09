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
