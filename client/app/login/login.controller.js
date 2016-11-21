app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.modeRegister = false;
    $scope.badCreds = false;
    $scope.userExists = false;

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
                $scope.badCreds = false;
                $location.path('/dashboard');
            }, function(rej) {
                if(rej.data == "Error logging in") {
								    $scope.badCreds = true;
                }
            });
    };

    $scope.register = function() {
        Auth.signup($scope.registerUser)
            .then(function(){
                $scope.userExists = true;
                $location.path('/dashboard');
            }, function(rej) {
                if(rej.data == "Error creating user") {
                    $scope.userExists = true;
                }
            });
    };

    $scope.toggleRegisterLogin = function() {
        $scope.modeRegister = !$scope.modeRegister;
    };
});
