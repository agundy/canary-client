app.factory('Auth', function($http, $rootScope, $cookieStore, $location) {
    return {
        login(user){
            return $http.post("/api/login", user)
                .then(function(resp) {
                    $rootScope.token = resp.data.token;
                    $cookieStore.put('jwt', resp.data.token);
                });
        },
        signup(user){
            return $http.post("/api/signup", user)
                .then(function(resp) {
                    $rootScope.token = resp.data.token;
                    $cookieStore.put('jwt', resp.data.token);
                });
        },
        logout(){
            $rootScope.token = null;
            $cookieStore.remove('jwt');
            $location.path('/');
        },
        isLoggedIn(){
            return $rootScope.token !== null;
        }
    };
});

