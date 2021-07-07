$(document).ready(function () {
    addGrocery();
});



function addGrocery() {
    $("#uploadItem").click(function () {
        console.log("upload grocery")
        var itemName = $("#itemName").val();
        var igaUrl = $("#igaURL").val();
        if (itemName !== '' && igaUrl !== '') {
            // var form_data = new FormData();
            var img = $('#itemImage')[0].files;
            var form_data = {
                itemName, igaUrl, img
            }
            console.log(form_data)
            mydata = JSON.stringify(form_data)
            console.log(mydata)
            var url = "http://localhost:5555/addGrocery/";
            $.post({
                url: url, data: mydata, contentType: false, processData: false, success: function (data) {
                    if (data.result == true) {
                        alert("Product is added successfully!");
                        location.href = "home.html";
                    } else {
                        alert("There is some error while adding new book.");
                    }
                }
            });
        } else {
            alert("BookName and AmazonUrl are mandatory fields!");
        }

    });
}