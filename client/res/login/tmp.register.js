function a() {
    var flag_register = 0;
    var registration = document.getElementById("register");
    var login = document.getElementById("login-btn");
    var reg_info = document.getElementsByName("name")[0];

    function register() {
        flag_register = 1;
        reg_info.className = "in";
        reg_info.required = true;
        registration.innerHTML = "Just Kidding";
        login.innerHTML = "Register";
        $("#auth").attr("ng-submit","register()");
    }

    function unregister() {
        flag_register = 0;
        reg_info.className = "in hide";
        reg_info.required = false;
        reg_info.value = "";
        registration.innerHTML = "Register";
        login.innerHTML = "Login";
        $("#auth").attr("ng-submit","login()");
    }

    registration.addEventListener('click', function() {
        flag_register == 0 ? register(): unregister() ;
    }, false);
}

setTimeout(function(){a();}, 500);

