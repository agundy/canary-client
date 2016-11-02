var flag_register = 0;
var registration = document.getElementById("register");
var login = document.getElementById("login");

var reg_info = document.getElementsByName("name")[0]
console.log(reg_info);

function register() {
    flag_register = 1;
    reg_info.className = "in";
    reg_info.required = true;
    registration.innerHTML = "Just Kidding";
    login.innerHTML = "Register";
}

function unregister() {
    flag_register = 0;
    reg_info.className = "in hide";
    reg_info.required = false;
    registration.innerHTML = "Register";
    login.innerHTML = "Login";
}

function sendForm(){
    formData = $("#auth").serializeObject();
    if (document.getElementById("login").innerHTML == "Login"){
        $.ajax({
            url: '/api/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'json',
            success:function(e){}
        });
    } else {
        $.ajax({
            url: '/api/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'json',
            success:function(e){}
        });
    }
}

registration.addEventListener('click', function() {
    flag_register == 0 ? register(): unregister() ;
    
}, false);