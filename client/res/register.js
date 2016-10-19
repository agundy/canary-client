var flag_register = 0;
var registration = document.getElementById("register");
var login = document.getElementById("login");

var reg_info = [document.getElementsByName("name")[0],document.getElementsByName("email")[0]];
console.log(reg_info);

function register() {
    flag_register = 1;
        for (i = 0; i < reg_info.length; i++) {
            reg_info[i].className = "in";
            reg_info[i].required = true;
            registration.innerHTML = "Just Kidding";
            login.innerHTML = "Register";
        }
}

function unregister() {
    flag_register = 0;
        for (i = 0; i < reg_info.length; i++) {
            reg_info[i].className = "in hide";
            reg_info[i].required = false;
            registration.innerHTML = "Register";
            login.innerHTML = "Login";
        }
}

registration.addEventListener('click', function() {
    flag_register == 0 ? register(): unregister() ;
    
}, false);