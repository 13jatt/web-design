$(document).ready(function () {
    addGrocery();
});



function addGrocery() {
    $("#uploadItem").click(function () {
        var itemName = $("#itemName").val();
        var igaUrl = $("#igaURL").val();
        if (itemName !== '' && igaUrl !== '') {
            var form_data = new FormData();
            var img = $('#itemImage')[0].files;
            form_data.append("itemName", itemName);
            form_data.append("igaUrl", igaUrl);
            form_data.append("img", img);
            console.log(typeof form_data)
            mydata = JSON.stringify(form_data)
            console.log(typeof mydata)
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