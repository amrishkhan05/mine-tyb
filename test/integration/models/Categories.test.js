describe('Categories Model', function(done) {
  it("should be able to create model", function(done) {
      var catData = {
          category_id: "IOT",
          name: "Internet of things",
          app_icon: "./assets/images/category/iot.svg"
        };
    Categories.create(catData, function (err, cat){
        if (err) {
        console.log("Failed to create category! Error below:");
        console.log(err);
      }else {
        console.log("Category in model created successfully:");
        //console.log(cat);
      }
      done(err, sails);
    })
  });


//   it("should be able to destroy", function(done) {
//     Users.destroy({email: "johnnybegood@example.com"}, function(err) {
//       assert.equal(true, true);
//     });
//   });

});