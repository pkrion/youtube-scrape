const express = require('express');
const scraper = require('./scraper')
const app = express();
    

var cors = require('cors');
var bodyParser = require('body-parser');

//enables cors
app.options('*', cors()); 

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

//Home page
app.get('/', (req, res) => {
   
    res.sendFile(__dirname + "/index.html");
});

//API route
app.get('/api/search', (req, res) => {
    
    scraper.youtube(req.query.q, req.query.page)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;
