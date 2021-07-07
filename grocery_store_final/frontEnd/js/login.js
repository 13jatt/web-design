$(document).ready(function() {
    getLoginCredentials();
});

function getLoginCredentials(){
    $("#login").click(function(event){
        event.preventDefault();
        var username = $("#loginInput").val();
        var password = $("#loginPassword").val();
        $("#loginInput").val('');
        $("#loginPassword").val('');
        var url = "http://localhost:5555/login/";
        var data = {"username": username, "password": password};
        
        // POST AJAX Request
        $.post({url: url, data: data, success: function(data){
            if(data.result == true){
                // localStorage.setItem('credentialCheck', 'true');
               
                alert('Login Successful')
            
                 location.href="home.html";
            }else{
                // localStorage.setItem('credentialCheck', 'false');
                alert("Login Failed!!!!!");
            }
          }});
    });
}