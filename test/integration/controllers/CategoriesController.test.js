var url = 'http://localhost:1337/';
var request = require('supertest');
    should = require('should');

// describe("category model",function(){
//     it("insert new record into category",function(done){
//         var req = request(sails.hooks.http.app).post("/categories");
//         req.send({
           
//                 category_id:"IOT",
//                 name:"Internet of things",
//                 app_icon:"./assets/images/category/iot.svg"
            
//         })
//         req.end(function(err,res){
//             if(err){
//                 throw err;
//             }
//             console.log(res.text);
//             done();
//         })
//     })
//})

describe('The CategoryController', function () {


var createdPostId = 0;

it('should create a category', function (done) {
   request(sails.hooks.http.app)
     .post('/categories')
     .set('Accept', 'application/json')
     .send({
        "category_id" : "IV",
        "name" : "Invision",
        "app_icon" : "./assets/images/category/googleglasses.svg"
        })
      .expect('Content-Type', /json/)
     //.expect(200)
     .end(function (err, result) {
       if (err) {
         console.log("Category in controller not created successfully");
         return done(err);
       } else {
         //result.body.should.be.an('object');
        // result.body.should.have.property('id');
         //result.body.should.have.property('category_id', 'ALL');
         //result.body.should.have.property('name', 'All Categories');
         //result.body.should.have.property('app_icon', './assets/images/category/stack.svg');
         createdPostId = result.body.id;
         console.log("Category in controller created successfully");
         //should.exist(result.body)
         done();
       }
     });
});


it('should get data', function (done) {
        request(sails.hooks.http.app)
            .get('/categories/Artificial Intelligence')
            //.send({name: 'Artificial Intelligence'})
            .expect(200)
            .end(function (err, res) {
                if (err) {
                  console.log('Search unsuccess');
                  return done(err)
                }else {
                  console.log('Searched successfully');
                  should.exist(res.body);
                }
                done();
            });
    });

})
