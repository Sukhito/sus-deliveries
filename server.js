var express         =   require('express');
var cors            =   require('cors');
var app             =   express();
var ip				=   require('ip');

var mongoose        =   require('mongoose');
var bodyParser      =   require('body-parser');
var methodOverride  =   require('method-override');

var db = require('./config/db');
var connection = mongoose.connect(db.url);
var port = process.env.PORT || 8084;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

require('./app/routes/item')(app);
require('./app/routes/delivery')(app);
require('./app/routes/supplier')(app);


app.listen(port);