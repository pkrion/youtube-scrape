const express = require('express');
const scraper = require('./scraper')
const app = express();
    

var cors = require('cors');
var bodyParser = require('body-parser');

//enables cors
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));


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
