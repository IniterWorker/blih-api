/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-05-31T22:04:29+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-05T22:55:10+02:00
* @License: MIT
*/

var crypto  = require('crypto');
var request = require('request');

function Blih(username, password)
{
  this.data = {
    username: username,
    token: '',
    baseUrl: 'https://blih.epitech.eu/',
  }
  this.setPassword(password);
}

Blih.prototype.setPassword = function (password) {
  var token = crypto.createHash('sha512');
  token.update(password, 'utf8');
  this.data.token = token.digest('hex');
};

Blih.prototype.getToken = function (password) {
  return (this.data.token);
};

Blih.prototype.setBaseUrl = function (baseUrl) {
  this.data.baseUrl = baseUrl;
};

Blih.prototype.getRepositories = function (callback)
{
  this.createRequest({verb: "GET", path: "repositories"}, undefined, callback);
};

Blih.prototype.getAcl = function (repository, callback)
{
  this.createRequest({verb: "GET", path: "repositories/" + repository + "/acl"}, undefined, callback);
};

Blih.prototype.getRepositoriesInfo = function (repository, callback)
{
  this.createRequest({verb: "GET", path: "repositories/" + repository}, undefined, callback);
};

Blih.prototype.getSshKey = function (callback)
{
  this.createRequest({verb: "GET", path: "sshkey"}, undefined, callback);
};

Blih.prototype.createRepository = function (repository, callback)
{
  this.createRequest({verb: "POST", path: "repositories"}, {name: repository, type: "git"}, callback);
};

Blih.prototype.setAcl = function (repository, username, rights, callback)
{
  this.createRequest({verb: "POST", path: "repositories/" + repository + "/acl"}, {acl: rights, user: username}, callback);
};

Blih.prototype.setSshKey = function (sshkey, callback)
{
  this.createRequest({verb: "POST", path: "sshkey"}, {sshkey: key}, callback);
};

Blih.prototype.deleteSshKey = function (keyid, callback)
{
  this.createRequest({verb: "DELETE", path: "sshkey/" + keyid}, undefined, callback);
};

Blih.prototype.deleteRepository = function (repository, callback)
{
  this.createRequest({verb: "DELETE", path: "repositories/" + repository}, undefined, callback);
};

Blih.prototype.sendRequest = function (signed_json, verb, path, callback) {

	if (verb !== 'GET' && verb !== 'POST' && verb !== 'DELETE')
		return (console.error('Error: Invalid http method'));

	if (path.substring(0,12) !== 'repositories' && path.substring(0,6) !== 'sshkey')
		return (console.error('Error: Invalid path data'));

	var options = {
		uri: this.data.baseUrl + "user/" + path,
		method: verb,
		json: signed_json
	};

	return (request(options, function (error, response, body) {
		callback(body);
	}));
}

Blih.prototype.createRequest = function (argData, postData, callback)
{
  var signatureData = {
    user: "",
    signature: ""
  }

  signatureData.user = this.data.username;
  var hashing = crypto.createHmac('sha512', this.data.token);
  hashing.update(this.data.username);
  if (postData !== undefined)
  {
    var string = JSON.stringify(postData, null, 4);
    hashing.update(string);
    signatureData.data = postData;
  }
  signatureData.signature = hashing.digest('hex').toString();
  return (this.sendRequest(signatureData, argData.verb, argData.path, callback));
};

Blih.prototype.print = function() {
  console.log(this.data);
};

module.exports = Blih;
