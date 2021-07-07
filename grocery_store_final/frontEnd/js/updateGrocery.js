$(document).ready(function () {
    // var credential = localStorage.getItem('credentialCheck');
    // if (credential == 'false' || credential == null) {
    //     location.href = "login.html";
    // }
    showTableBasedOnId();
    updateBook();
});

function showTableBasedOnId(id) {
    // $("#updateBookTable").hide();
    // $("#updateBookForm").show();
    console.log('upload')
    var url = "http://localhost:5555/getBookInfoBasedOnId/" + id;
    $("#books").empty();
    $.ajax({
        url: url, success: function (data) {
            var result = data["result"];
            // console.log(result)
            if (result !== null) {
                $("#updateBookName").val(result['bookName']);
                $("#updateAmazonUrl").val(result['amazonUrl']);
                $("#updateBookFormId").val(result['id']);
            }
        }
    });
}

function hideShow(){
        $("#updateBookTable").hide();
    $("#updateBookForm").show();
    console.log('show')
}

function updateBook() {
    $("#uploadBookById").click(function () {
        console.log('upload')
    //     $("#updateBookTable").hide();
    // $("#updateBookForm").show();
        var bookName = $("#updateBookName").val();
        var amazonUrl = $("#updateAmazonUrl").val();
        var bookId = $("#updateBookFormId").val();
        if (bookName !== '' && amazonUrl !== '') {
            var url = "http://localhost:5555/updateBook/" + bookId;
            var data = { "bookName": bookName, "amazonUrl": amazonUrl };
            $.post({
                url: url, data: data, success: function (data) {
                    if (data.result == true) {
                        alert("Item Updated!");
                        location.href = "updateBook.html";
                    } else {
                        alert("Item Updation Failed!");
                    }
                }
            });
        } else {
            alert("BookName and AmazonUrl are mandatory fields!");
        }
    });
}