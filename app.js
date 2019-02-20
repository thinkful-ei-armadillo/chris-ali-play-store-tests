'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common'));

const playstore = require('./playstore.js');
// console.log(playstore);

app.get('/apps', (req, res) => {
  const { search = '', sort = '', genre } = req.query;

  if(sort) {
    if(!['App', 'Rating'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of App or Rating');
    }
  }

  if(genre){
    if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)){
      return res
        .status(400)
        .send('Genre must be Action, Puzzle, Strategy, Casual, Arcade, or Card'); 
    }
  }

  let results = playstore.filter(store => store.App.toLowerCase().includes(search.toLowerCase()));
  if(sort) {
    results
    // WHAT IS GOING ON HERE??
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
  }

  if(genre){
    results = results.filter((program) => {
      return program.Genres.includes(genre);
    }); 
  }

  res.json(results);
});

module.exports = app; 

