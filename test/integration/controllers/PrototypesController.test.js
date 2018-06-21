var url = 'http://localhost:1337/';
var request = require('supertest');
var   should = require('should');

describe('The PrototypesController', function () {

it('search data when it has value', function (done) {
        request(sails.hooks.http.app)
            .post('/searchData')
            .send({query: 'res',lang: 'en'})
            .expect(200)
            .end(function (err, res) {
                if (err) {
                  console.log('Search unsuccess');
                  return done(err)
                } else {
                  console.log('Searched successfully');
                  res.body[1][0].prototype_id.should.be.eql("p1");
                  //console.log(res.body[1][0].prototype_id);
                }
                done();
            });
    });

    it('search data when it does not have value', function (done) {
        request(sails.hooks.http.app)
            .post('/prototypesSearch')
            .send({query: 'All Categories',userGroup: 'CUSTOMER'})
            .expect(200)
            .end(function (err, res) {
                if (err) {
                  console.log('Search unsuccess');
                  return done(err)
                } else {
                  console.log('Searched successfully');
                  res.body[1].length.should.be.eql(48);
                  //console.log(res.body[1].length);
                }
                done();
            });
    });

    it('Filter data', function (done) {
        var showfilterArray = {
            'domain': ["Travel & Hospitality"],
            'Technology': [],
            'prototype_type': []};
        var prototypeFileName = "All Categories";
        var data=[showfilterArray,prototypeFileName];
        request(sails.hooks.http.app)
            .post('/getFilterPrototypes')
            .send(data)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                  console.log('Filter unsuccess');
                  return done(err)
                } else {
                  console.log('Filtered successfully');
                  res.body.length.should.be.eql(5);
                  //console.log(res.body.length);
                }
                done();
            });
    });

    it('Displays particular category prototypes', function (done) {
        var data={
                  fileName: "All Categories",
                  userGroup: "CUSTOMER"
              };
        request(sails.hooks.http.app)
            .post('/prototypesFilter')
            .send(data)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                  console.log('getting prototypes unsuccess');
                  return done(err)
                } else {
                  console.log('got prototypes successfully');
                  res.body.length.should.be.eql(48);
                  //console.log(res.body.length);
                }
                done();
            });
    });


});
