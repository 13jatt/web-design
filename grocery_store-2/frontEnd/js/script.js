$(document).ready(function () {
    // var credential = localStorage.getItem('credentialCheck');
    // if (credential == 'false' || credential == null) {
    //     // location.href = "login.html";
    // }
    getItemName();
    getAllItems();
});

function getItemName() {
    $("#ItemSearch").keyup(function () {
        var bookToSearch = $("#ItemSearch").val();
        var url = "http://localhost:5555/getAllItems/" + bookToSearch;
        $("#display").empty();
        $.ajax({
            url: url, success: function (data) {
               var result = data["result"];
                console.log("data :>", result)
                console.log(result.imageName)
                if (result !== null) {
                    $("#display").append(
                        '<div class="col-md-3">' +
                        '<div class="card">' +
                        '<img src="http://localhost:5555/' + result.imageName + '" class="card-img-top" alt="...">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + result.productName + '</h5>' +
                        '<a href="' + result.igaUrl + '" target="_blank">Go to IGA</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }

            }
        });
    });
}

function getAllItems() {
    var url = "http://localhost:5555/getAllItems/";
    $.ajax({
        url: url, success: function (data) {
            console.log(data)
            var result = data["igaItems"];
            for (var i = 0; i < result.length; i++) {
                if (data["result"] !== null) {
                    $("#display").append(
                        '<div class="col-md-3">' +
                        '<div class="card">' +
                        '<img src="http://localhost:5555/' + result[i]["imageName"] + '" class="card-img-top" alt="...">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + result[i]["productName"] + '</h5>' +
                        '<a href="' + result[i]["igaUrl"] + '" target="_blank">Go to IGA</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>');
                }
            }
        }
    });
}