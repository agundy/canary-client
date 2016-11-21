//Authentication factory for base user functionality 
app.factory('Auth', function($http, $rootScope, $cookieStore, $location) {
    return {
        //Login function
        login(user){
            return $http.post("/api/login", user)
                .then(function(resp) {
                    $rootScope.token = resp.data.token;
                    $cookieStore.put('jwt', resp.data.token);
                });
        },
        //Registration function
        signup(user){
            return $http.post("/api/signup", user)
                .then(function(resp) {
                    $rootScope.token = resp.data.token;
                    $cookieStore.put('jwt', resp.data.token);
                });
        },
        //Logout function
        logout(){
            $rootScope.token = null;
            $cookieStore.remove('jwt');
            $location.path('/');
        },
        //Checks if user is logged in
        isLoggedIn(){
            return $rootScope.token !== null;
        }
    };
});

