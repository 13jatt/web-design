var express = require('express'); // Telling nodeJs that we gonna use Express
var cors = require('cors');
var bodyParser = require('body-parser')
var fs = require('fs');
var { v4: uuidv4 } = require('uuid');

var app = express(); // Express is sleeping and we want awake it. So, we are calling it.
var users = require('./json/users.json');
var igaItems = require('./json/grocery.json');
// var users = [];

var port = 5555;  // We are assigning address to the server.

app.use(cors());
app.use(express.static('images'));

// for parsing application/xwww-
app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello!')
})

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var result = null;
  for (var i = 0; i < users.length; i++) {
    if (users[i]["username"] == username && users[i]["password"] == password) {
      result = true;
      break;
    } else {
      result = false;
    }
  }
  res.json({ "result": result });
});


app.post('/register', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  users = JSON.stringify(users);
  users = JSON.parse(users);
  var usernameExist = false;
  for (var i = 0; i < users.length; i++) {
    if (users[i]["username"] == username) {
      usernameExist = true;
    }
  }
  if (usernameExist) {
    result = { "result": false, "msg": "Username already exist. Try Login!" };
  } else {
    users.push({ "username": username, "password": password });
    users = JSON.stringify(users);
    fs.writeFileSync('json/users.json', users);
    result = { "result": true, "msg": "Username does not exist!" };
  }
  res.json(result);
});

app.get('/getAllItems', (req, res) => {
  res.json({ igaItems });
});

app.get('/getAllItems/:id', (req, res) => {
  var itemName = req.params.id; // Getting the book name.
  var result = null;  // This variable will tell if we have a book or not.
  for (var i = 0; i < igaItems.length; i++) {
    if (igaItems[i]["productName"] == itemName) result = igaItems[i];
  }
  // console.log(result);
  res.json({ result });
});



app.post('/addGrocery', (req, res) => {
  console.log(`Req.body ${req.body}`)
  var itemName = req.body.productName;
  var igaUrl = req.body.igaUrl;
  var img = req.body.img;
  console.log(itemName, igaUrl, img)
  igaItems.push({ "id": uuidv4(), "productName": itemName, "igaUrl": igaUrl, "imageName": img });
  items = JSON.stringify(igaItems);
  fs.writeFileSync('json/grocery.json', items);
  res.json({ "result": true });
});

app.post('/addBook', (req, res) => {
  var bookName = req.body["bookName"];
  var amazonUrl = req.body["amazonUrl"];
  console.log(bookName)
  igaItems.push({ id: uuidv4(), "bookName": bookName, "amazonUrl": amazonUrl, "imageName": "book1.jpg" });
  books = JSON.stringify(igaItems);
  fs.writeFileSync('json/books.json', books);
  res.json({ "result": true });
});


app.listen(port, () => {
  console.log(`Backend of Grocery Store is listening at http://localhost:${port}`);
})