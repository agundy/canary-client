//Controls UI components for login and registration pages
app.controller('LoginCtrl', function($scope, $location, Auth) {
    //Visibility state of login page and registration page
		$scope.modeRegister = false;
    //Visibility state of alert for mismatching login credentials
    $scope.badCreds = false;
    //Visibility state for attempted registration with an email already in use
    $scope.userExists = false;

    //Values for login credentials
    $scope.loginUser = {
        email: '',
        password: '',
    };

    //Values for registration credentials
    $scope.registerUser = {
        email: '',
        password: '',
        name:''
    };

    //Logins the user if the email and password are matching credentials
    //Otherwise, alerts the user to mismatching credentials
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

    //Registers the new user if the email is not already in use
    //Otherwise, alerts user to the fact that email is in use
    $scope.register = function() {
        Auth.signup($scope.registerUser)
            .then(function(){
                $scope.userExists = false;
                $location.path('/dashboard');
            }, function(rej) {
                if(rej.data == "Error creating user") {
                    $scope.userExists = true;
                }
            });
    };
    
    //Toggles between login page and registration page
    $scope.toggleRegisterLogin = function() {
        $scope.modeRegister = !$scope.modeRegister;
    };
});
