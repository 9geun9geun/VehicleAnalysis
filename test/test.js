// var assert = require('assert');
//
// describe('Math suite', function(){
//   function add(a,b){
//     return a+b
//   };
//
//   before(function(){
//     console.log("Shows once before test")
//   });
//
//   beforeEach(function(){
//     console.log("Shows before each test")
//   });
//
//   after(function(){
//     console.log("Shows once after test")
//   });
//
//   afterEach(function(){
//     console.log("Shows after every test")
//   });
//
//   it('should add 2 numbers correctly', function(){
//     var result = 2;
//
//     assert.equal(add(1,1), result);
//   })
// })
let chai = require('chai');
let chaiHttp = require('chai-http');
//
// let fs = require('fs');
//
let should = chai.should();
//
chai.use(chaiHttp);
//
// var fileName = 'van.jpg';
//
// describe('/PUT file', () => {
//     it('Should PUT a file', (done) => {
//         let file = {
//             fileName: "van.jpg",
//         }
//         chai.request('http://localhost:3000')
//             // .put('/bucket/user2/files/')
//             .set('secret_key', 'user2SecretKey')
//             .set('Content-Type', 'application/x-www-form-urlencoded')
//             .field('Content-Type', 'multipart/form-data')
//             .field('fileName', 'van.jpg')
//             .attach('files', "C:\Users\rnrms\Desktop\aws_rekognition\images\van.jpg")
//             .send(file)
//             .end((err, res) => {
//                 if (err) {
//                     console.log(err)
//                 } else {
//
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have.property('data').eql('File Uploaded')
//                 }
//                 done();
//             })
//     })
// })
//var should = require('should'),
    supertest = require('supertest');
var request = supertest('localhost:3000');

describe('file', function() {
    it('includes van in image name', function(done) {
       request.post('/upload')

              .field('fileName', 'images/van.jpg')
              .attach('file', 'images/convertible.jpg')


              .end(function(err, res) {
//              res.should.have.status(200) // 'success' status
                  done()
              });
    });
});
