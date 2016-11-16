app.factory('Auth', function($http, $rootScope, $cookieStore, $location) {
    return {
        login(user){
            var target = "/api/login";
            return $http.post(target, user)
                .then(function(resp) {
                    $rootScope.token = resp.data.token;
                    $cookieStore.put('jwt', resp.data.token);
                });
        },
        signup(user){
            var target = "/api/signup";
            return $http.post(target, user)
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

