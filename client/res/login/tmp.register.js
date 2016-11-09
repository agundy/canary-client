function a() {
    var flag_register = false;
    var registration = document.getElementById("register");
    var login = document.getElementById("login-btn");
    var reg_info = document.getElementsByName("name")[0];

    function register() {
        reg_info.className = !flag_register ? "in" : "in hide";
        reg_info.required = !reg_info.required;
        registration.innerHTML = !flag_register ? "Just Kidding" : "Register";
        login.innerHTML = !flag_register ? "Register" : "Login";
        flag_register = !flag_register;
    }
    
    registration.addEventListener('click', function() { register(); }, false);
}

setTimeout(function(){a();}, 500);

