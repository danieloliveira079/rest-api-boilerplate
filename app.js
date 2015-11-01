var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test')
  db = mongoose.connect('mongodb://localhost/bemcomvcAPI_test');
else {
  db = mongoose.connect('mongodb://localhost/bemcomvc');
}

var Profile = require('./models/profileModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var profileRouter = require('./routes/profileRoutes')(Profile);

app.use('/api/profiles', profileRouter);

app.get('/', function(req, res){
  res.send('Welcome to my API');
});

app.listen(port, function(){
  console.log('Server API Running on PORT: ' + port);
});

module.exports = app;
