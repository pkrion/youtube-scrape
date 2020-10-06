const express = require('express');
const scraper = require('./scraper')
const app = express();
    

var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
