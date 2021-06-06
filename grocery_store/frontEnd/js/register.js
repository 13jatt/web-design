$(document).ready(function() {
    registerUser();
});

function registerUser(){
    $("#register").click(function(event){
        event.preventDefault();
        var username = $("#registerInput").val();
        var password = $("#registerPassword").val();
        $("#registerInput").val('');
        $("#registerPassword").val('');
        var url = "http://localhost:5555/register/";
        var data = {"username": username, "password": password};
        if (username == '' || password == ''){
            alert("Username or Password should not be empty!!!!!")
        }else{
            // POST AJAX request
            $.post({url: url, data: data, success: function(data){
                if(data.result == true){
                    alert("Registration Success!!!!!");
                    location.href="login.html";
                }else{
                    alert(data.msg);
                }
              }});
        }
    });
}
