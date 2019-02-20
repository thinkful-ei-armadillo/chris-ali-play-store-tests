'use strict'; 

const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest'); 

describe('PlayStore', () => {
  it('should throw error if sort is not App or Rating', () =>{
    return request(app)
      .get('/apps')
      .query({sort: 'Type'})
      .expect(400); 
  });
  
  it('should sort alphabetically if sort is App', () =>{
    return request(app)
      .get('/apps')
      .query({sort: 'App'})
      .expect(200)
      .then(res => {
        expect(res.body[0]).includes({App: 'Angry Birds Rio'});
        expect(res.body[1]).includes({App: 'Block Puzzle'});
        expect(res.body[19]).includes({App: 'slither.io'}); 
      });
  });

  it('should sort by rating if sort is Rating', () =>{
    return request(app)
      .get('/apps')
      .query({sort: 'Rating'})
      .expect(200)
      .then(res => {
        expect(res.body[0]).includes({App: 'Hello Kitty Nail Salon'});
        expect(res.body[1]).includes({App: 'Helix Jump'});
        expect(res.body[19]).includes({App: 'Solitaire'}); 
      }); 
  });

});