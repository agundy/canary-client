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


//gonna test including this in this js file, will cleanup to standards after


