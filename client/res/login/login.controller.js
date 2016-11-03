app.controller('LoginCtrl', function($scope, $location, Auth) {
    $scope.user = {
        email: '',
        password: ''
    };

    $scope.login = function() {
        Auth.login($scope.user)
            .then(function(){
                $location.path('/dashboard');
            });
    };
});
