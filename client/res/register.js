var flag_register = 0;
var registration = document.getElementById("register");
var login = document.getElementById("login");
var authform = document.getElementById("auth");

var reg_info = document.getElementsByName("name")[0];

function register() {
    flag_register = 1;
    reg_info.className = "in";
    reg_info.required = true;
    registration.innerHTML = "Just Kidding";
    login.innerHTML = "Register";
    authform.ng-submit="register()";
}

function unregister() {
    flag_register = 0;
    reg_info.className = "in hide";
    reg_info.required = false;
    reg_info.value = "";
    registration.innerHTML = "Register";
    login.innerHTML = "Login";
    authform.ng-submit="register()";
}

function sendForm(){
    formData = $("#auth").serializeObject();
    console.log(formData);
    var data = formData;
    if (document.getElementById("login").innerHTML == "Login"){
        console.log(formData);
        delete formData.name;
        var form = {
            email: formData.email,
            password: formData.password
        };
        

        $.ajax({
            url: '/api/login',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({email: "admin@admin.com", password: "admin"}),
            dataType: 'json',
            success:function(e){
                $('body').hideLoading();
                alert('data: ' + e);
            }
        });

        console.log(form);
        console.log(JSON.stringify(form));
        $.post('/api/login', JSON.stringify(form)).success(function(data){
            console.log(data);
        });
    } else {
        console.log(formData);
        $.ajax({
            url: '/api/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            dataType: 'json',
            success:function(e){
                $('body').hideLoading();
                alert('data: ' + e);
            }
        });
    }
}

registration.addEventListener('click', function() {
    flag_register == 0 ? register(): unregister() ;
    
}, false);
