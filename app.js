// Modules
var express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),
	cons = require('consolidate'),
	dust = require('dustjs-helpers'),
	pg = require('pg'),
	app = express();

// DB Connect String
var connect = 'postgres://' + process.env.POSTGRES_USER + ':' + process.env.POSTGRES_PASSWORD + '@localhost:5431/recipebookdb';


// Assign Dust Engine To .dust Files
app.engine('dust', cons.dust);

// Set Default Ext .dust
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query('SELECT * FROM carads', function(err, result) {
	    if(err) {
	      return console.error('error running query', err);
	    }
	    res.render('index', {carads: result.rows});
	    done();				// pass on results from query 'SELECT * FROM carads'
	  });
	});
});

app.post('/add',function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query("INSERT INTO carads(adtitle, carbrand, carmodel, type, mileage, fuel, numberdoors, state) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
	  	[req.body.adtitle, req.body.carbrand, req.body.carmodel, req.body.type, req.body.mileage, req.body.fuel, req.body.numberdoors, req.body.state]);
	
		done();
		res.redirect('/');
	});
});

app.delete('/delete/:id', function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query("DELETE FROM carads WHERE id = $1",
	  	[req.params.id]);
	
		done();
		res.send(200);
	});
});

app.post('/edit', function(req, res){
	// PG Connect
	pg.connect(connect, function(err, client, done) {
	  if(err) {
	    return console.error('error fetching client from pool', err);
	  }
	  client.query("UPDATE carads SET adtitle=$1, carbrand=$2, carmodel=$3, type=$4, mileage=$5, fuel=$6, numberdoors=$7, state=$8 WHERE id = $9",
	  	[req.body.adtitle, req.body.carbrand, req.body.carmodel, req.body.type, req.body.mileage, req.body.fuel, req.body.numberdoors, req.body.state,req.body.id]);
	
		done();
		res.redirect('/');
	});
});

// Server
app.listen(3000, function(){
	console.log('Server Started On Port 3000');
});