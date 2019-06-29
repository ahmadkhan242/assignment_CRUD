// Requiring all packages required in this project 
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    methodOverride  = require("method-override"),
    path            = require('path')



// Requiring name route
var nameroutes   = require("./routes/name");


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.set('views', path.join(__dirname, 'views'));



// Using all routes from routes folder
app.use(nameroutes);


//connect to Localhost 
var port = 8000
app.listen(port, () => console.log(`Server running on port ${port}`));
