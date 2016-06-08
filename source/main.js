/**
* @Author: Walter Bonetti <IniterWorker>
* @Date:   2016-05-31T22:04:29+02:00
* @Email:  walter.bonetti@epitech.eu
* @Last modified by:   IniterWorker
* @Last modified time: 2016-06-06T01:36:48+02:00
* @License: MIT
*/

var crypto  = require('crypto');
var request = require('request');

/**
 * Blih Class
 * @constructor
 * @param  {string} username Login
 * @param  {string} password Unix password
 */
function Blih()
{
  this.data = {
    baseUrl: 'https://blih.epitech.eu/',
  }
}

/**
 * Blih function - generate Token Unix
 * @param  {string} password Unix password
 * @return {string}
 */
Blih.prototype.generateToken = function (password) {
  var token = crypto.createHash('sha512');
  token.update(password, 'utf8');
  return (token.digest('hex'));
};

/**
* Blih function - set base url (server blih epitech)
* @param  {string} url base reference
*/
Blih.prototype.setBaseUrl = function (baseUrl) {
  this.data.baseUrl = baseUrl;
};


/**
* Blih function - get all repositories name
* @param  {json} userData {login: "", token: ""}
* @param  {function} callback function(data)
*/
Blih.prototype.getRepositories = function (userData, callback)
{
  this.createRequest(userData, {verb: "GET", path: "repositories"}, undefined, callback);
};

/**
* Blih function - set acl on one repository
* @param  {json} userData {login: "", token: ""}
* @param  {string} repository name
* @param  {function} callback function(data)
*/
Blih.prototype.getAcl = function (userData, repository, callback)
{
  this.createRequest(userData, {verb: "GET", path: "repositories/" + repository + "/acl"}, undefined, callback);
};

/**
* Blih function - get info on one repository
* @param  {json} userData {login: "", token: ""}
* @param  {string} repository name
* @param  {function} callback function(data)
*/
Blih.prototype.getRepositoriesInfo = function (userData, repository, callback)
{
  this.createRequest(userData, {verb: "GET", path: "repositories/" + repository}, undefined, callback);
};

/**
* Blih function - list all sshkey
* @param  {json} userData {login: "", token: ""}
* @param  {function} callback function(data)
*/
Blih.prototype.getSshKey = function (userData, callback)
{
  this.createRequest(userData, {verb: "GET", path: "sshkey"}, undefined, callback);
};

/**
* Blih function - create a repository
* @param  {json} userData {login: "", token: ""}
* @param  {string} repository name
* @param  {function} callback function(data)
*/
Blih.prototype.createRepository = function (userData, repository, callback)
{
  this.createRequest(userData, {verb: "POST", path: "repositories"}, {name: repository, type: "git"}, callback);
};

/**
* Blih function - getAcl on repository
* @param  {json} userData {login: "", token: ""}
* @param  {string} repository name
* @param  {function} callback function(data)
*/
Blih.prototype.getAcl = function (userData, repository, callback)
{
  this.createRequest(userData, {verb: "GET", path: "repositories/" + repository + "/acl"}, undefined, callback);
};

/**
* Blih function - create a repository
* @param  {json} userData {login: "", token: ""}
* @param  {string} repository name
* @param  {string} unserame
* @param  {string} rights [rwa]
* @param  {function} callback function(data)
*/
Blih.prototype.setAcl = function (userData, repository, username, rights, callback)
{
  this.createRequest(userData, {verb: "POST", path: "repositories/" + repository + "/acl"}, {acl: rights, user: username}, callback);
};

/**
* Blih function - upload sshkey
* @param  {json} userData {login: "", token: ""}
* @param  {string} rights [rwa]
* @param  {function} callback function(data)
*/
Blih.prototype.setSshKey = function (userData, sshkey, callback)
{
  this.createRequest(userData, {verb: "POST", path: "sshkey"}, {sshkey: key}, callback);
};

/**
* Blih function - delete sshkey
* @param  {json} userData {login: "", token: ""}
* @param  {string} keyid the id
* @param  {function} callback function(data)
*/
Blih.prototype.deleteSshKey = function (userData, keyid, callback)
{
  this.createRequest(userData, {verb: "DELETE", path: "sshkey/" + keyid}, undefined, callback);
};

/**
* Blih function - upload sshkey
* @param  {json} userData {login: "", token: ""}
* @param  {string} rights [rwa]
* @param  {function} callback function(data)
*/
Blih.prototype.deleteRepository = function (userData, repository, callback)
{
  this.createRequest(userData, {verb: "DELETE", path: "repositories/" + repository}, undefined, callback);
};

/**
* Blih function - PRIVATE - send a request at epitech blih server
* @param  {json} signed_json the data signed
* @param  {string} verb method request
* @param  {string} path url target
* @param  {function} callback function(data)
*/
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

/**
* Blih function - create a request at epitech blih server
* @param  {json} userData {login: "", token: ""}
* @param  {json} argData the arguments data
* @param  {json} postData the post data information
* @param  {function} callback function(data)
*/
Blih.prototype.createRequest = function (userData, argData, postData, callback)
{
  var signatureData = {
    user: userData.login,
    signature: ""
  }

  var hashing = crypto.createHmac('sha512', userData.token);
  hashing.update(userData.login);
  if (postData !== undefined)
  {
    var string = JSON.stringify(postData, null, 4);
    hashing.update(string);
    signatureData.data = postData;
  }
  signatureData.signature = hashing.digest('hex').toString();
  return (this.sendRequest(signatureData, argData.verb, argData.path, callback));
};

/**
* Blih function - print all data of this Class
*/
Blih.prototype.print = function() {
  console.log(this.data);
};

module.exports = Blih;
