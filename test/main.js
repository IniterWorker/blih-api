var blihApi = require('../source/main.js');
var should = require('should');
var email = "email";
var password = "******";

var blih = new blihApi(email, password);

describe('API', function () {
  it('Token is not empty', function() {
    var token = blih.generateToken(email);
    console.log(token);
    token.should.not.undefined();
  });
  it('simple connexion', function(done) {
    blih.getRepositories(function (error, data) {
      error.should.undefined();
      data.sould.not.undefined();
      done();
    });
  });
});
