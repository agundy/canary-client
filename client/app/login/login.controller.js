app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.modeRegister = false;

    $scope.loginUser = {
        email: '',
        password: '',
    };

    $scope.registerUser = {
        email: '',
        password: '',
        name:''
    };

    $scope.login = function() {
        Auth.login($scope.loginUser)
            .then(function(){
                $location.path('/dashboard');
            });
    };

    $scope.register = function() {
        Auth.signup($scope.registerUser)
            .then(function(){
                $location.path('/dashboard');
            });
    };

    $scope.toggleRegisterLogin = function() {
        $scope.modeRegister = !$scope.modeRegister;
    };
});
