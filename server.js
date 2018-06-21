const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const apiKey = 'b79e237a3329e4bfcc9992356ca18088';
const baseUrl = 'http://api.brewerydb.com/v2';
const BreweryDb = require('brewerydb-node');
const brewdb = new BreweryDb('b79e237a3329e4bfcc9992356ca18088');
const request = require('request');

// GET List of Beers
app.get('/api/beer', (req, res) => {
  brewdb.beer.find({ availableId: 1, withBreweries: 'Y'}, (init, json) => {
    res.send(json);
  });
});

// GET: Search for a beer by name
app.get('/api/beer/search', (req, res) => {
  brewdb.search.beers({ q: req.query.name }, (init, json) => {
    const resp = json !== null ? json : [];
    res.send(json);
  });
});

// GET: Search for a brewery by name
app.get('/api/brewery/search', (req, res) => {
  brewdb.search.breweries({ q: req.query.name }, (init, json) => {
    const resp = json !== null ? json : [];
    res.send(json);
  });
});

//GET: A List of beers based on Brewery Id
app.get('/api/brewery/:id/beers', (req, res) => {
  this.routeRes = res;
  const url = `${baseUrl}/brewery/${req.params.id}/beers?key=${apiKey}`;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
