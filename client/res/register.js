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
						//document.getElementById("main").style.height = "25vh";
            login.innerHTML = "Register";
        }
}

function unregister() {
    flag_register = 0;
        for (i = 0; i < reg_info.length; i++) {
            reg_info[i].className = "in hide";
            reg_info[i].required = false;
						//document.getElementById("main").style.height = "20vh";
            registration.innerHTML = "Register";
            login.innerHTML = "Login";
        }
}

function sendForm(){
    formData = $("#auth").serializeObject();
    $.ajax({
        url: '/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success:function(e){}
    });
}

registration.addEventListener('click', function() {
    flag_register == 0 ? register(): unregister() ;
    
}, false);