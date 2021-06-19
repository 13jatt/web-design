$(document).ready(function () {
    addGrocery();
});

function addGrocery() {
    $("#uploadItem").click(function () {
        var itemName = $("#itemName").val();
        var igaUrl = $("#igaURL").val();

        if (itemName !== '' && igaUrl !== '') {
            var img = $('#itemImage')[0].files;
            console.log(itemName, igaUrl)
            var form_data = {
                productName: itemName,
                igaUrl: igaUrl,
                img: img
            }
            myData = JSON.stringify(form_data)
            console.log(myData)
            var url = "http://localhost:5555/addGrocery/";
            $.post({
                url: url, data: myData, contentType: false, processData: false, success: function (data) {
                    if (data.result == true) {
                        alert("Item is added successfully!");
                        console.log(data)
                        location.href = "home.html";
                    } else {
                        alert("There is some error while adding new book.");
                    }
                }
            });
        } else {
            alert("ProductName and IgaUrl are mandatory fields!");
        }

    });
}