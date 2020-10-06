const express = require('express');
const scraper = require('./scraper')
const app = express();
    

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Home page
app.get('/', (req, res) => {
   
    res.sendFile(__dirname + "/index.html");
});

//API route
app.get('/api/search', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    scraper.youtube(req.query.q, req.query.page)
        .then(x => res.json(x))
        .catch(e => res.send(e));
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Listening on port 8080');
});

module.exports = app;
