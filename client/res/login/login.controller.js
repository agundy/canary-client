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
