var blihApi = require('../source/main.js');
var should = require('should');
var blih = new blihApi("login_x", "password");


describe('API', function () {
  it('Token is not empty', function() {
    var token = blih.generateToken("password");
    console.log(token);
    token.should.not.undefined();
  });
});
