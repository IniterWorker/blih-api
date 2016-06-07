var blihApi = require('../source/main.js');
var should = require('should');
var blih = new blihApi();


describe('API', function () {
  it('Token is not empty', function() {
    var token = blih.generateToken("password");
    token.should.not.undefined();
  });
});
