/**
 * @Author: Walter Bonetti <IniterWorker>
 * @Date:   2016-05-31T22:04:29+02:00
 * @Email:  walter.bonetti@epitech.eu
 * @Last modified by:   IniterWorker
 * @Last modified time: 2016-06-06T01:36:48+02:00
 * @License: MIT
 */

var crypto = require('crypto');
var request = require('request');

/**
 * Blih Class
 * @constructor
 * @param  {string} username Unix login_x
 * @param  {string} password Unix password
 */
function Blih(login, password) {
    this.data = {
        baseUrl: 'https://blih.epitech.eu/',
    }

    this.setUserData(login, password);
}

/**
 * Blih function - change userData
 * @param  {string} username Unix login_x
 * @param  {string} password Unix password
 */
Blih.prototype.setUserData = function(login, password) {
    this.userData = {
        login: login,
        password: password,
        token: this.generateToken(password)
    };
}

/**
 * Blih function - generate Token Unix
 * @param  {string} password Unix password
 * @return {string}
 */
Blih.prototype.generateToken = function(password) {
    return (crypto.createHash('sha512').update(password, 'utf8').digest('hex'));
};

/**
 * Blih function - set base url (server blih epitech)
 * @param  {string} url base reference
 */
Blih.prototype.setBaseUrl = function(baseUrl) {
    this.data.baseUrl = baseUrl;
};


/**
 * Blih function - get all repositories name
 * @param  {function} callback function(data)
 */
Blih.prototype.getRepositories = function(callback) {
    this.createRequest(this.userData, {
        verb: "GET",
        path: "repositories"
    }, undefined, callback);
};

/**
 * Blih function - set acl on one repository
 * @param  {string} repository name
 * @param  {function} callback function(data)
 */
Blih.prototype.getAcl = function(repository, callback) {
    this.createRequest(this.userData, {
        verb: "GET",
        path: "repositories/" + repository + "/acl"
    }, undefined, callback);
};

/**
 * Blih function - get info on one repository
 * @param  {string} repository name
 * @param  {function} callback function(data)
 */
Blih.prototype.getRepositoriesInfo = function(repository, callback) {
    this.createRequest(this.userData, {
        verb: "GET",
        path: "repositories/" + repository
    }, undefined, callback);
};

/**
 * Blih function - list all sshkey
 * @param  {function} callback function(data)
 */
Blih.prototype.getSshKey = function(callback) {
    this.createRequest(this.userData, {
        verb: "GET",
        path: "sshkey"
    }, undefined, callback);
};

/**
 * Blih function - create a repository
 * @param  {string} repository name
 * @param  {function} callback function(data)
 */
Blih.prototype.createRepository = function(repository, callback) {
    this.createRequest(this.userData, {
        verb: "POST",
        path: "repositories"
    }, {
        name: repository,
        type: "git"
    }, callback);
};

/**
 * Blih function - getAcl on repository
 * @param  {string} repository name
 * @param  {function} callback function(data)
 */
Blih.prototype.getAcl = function(repository, callback) {
    this.createRequest(this.userData, {
        verb: "GET",
        path: "repositories/" + repository + "/acl"
    }, undefined, callback);
};

/**
 * Blih function - create a repository
 * @param  {string} repository name
 * @param  {string} unserame login_x
 * @param  {string} rights [rwa]
 * @param  {function} callback function(data)
 */
Blih.prototype.setAcl = function(repository, username, rights, callback) {
    this.createRequest(this.userData, {
        verb: "POST",
        path: "repositories/" + repository + "/acl"
    }, {
        acl: rights,
        user: username
    }, callback);
};

/**
 * Blih function - upload sshkey
 * @param  {string} rights [rwa]
 * @param  {function} callback function(data)
 */
Blih.prototype.setSshKey = function(sshkey, callback) {
    this.createRequest(this.userData, {
        verb: "POST",
        path: "sshkey"
    }, {
        sshkey: key
    }, callback);
};

/**
 * Blih function - delete sshkey
 * @param  {string} keyid the id
 * @param  {function} callback function(data)
 */
Blih.prototype.deleteSshKey = function(keyid, callback) {
    this.createRequest(this.userData, {
        verb: "DELETE",
        path: "sshkey/" + keyid
    }, undefined, callback);
};

/**
 * Blih function - delete repository
 * @param  {string} repository name
 * @param  {function} callback function(data)
 */
Blih.prototype.deleteRepository = function(repository, callback) {
    this.createRequest(this.userData, {
        verb: "DELETE",
        path: "repositories/" + repository
    }, undefined, callback);
};

/**
 * Blih function - PRIVATE - send a request at epitech blih server
 * @param  {json} signed_json the data signed
 * @param  {string} verb method request
 * @param  {string} path url target
 * @param  {function} callback function(data)
 */
Blih.prototype.sendRequest = function(signed_json, verb, path, callback) {

    if (verb !== 'GET' && verb !== 'POST' && verb !== 'DELETE')
        return (console.error('Error: Invalid http method'));

    if (path.substring(0, 12) !== 'repositories' && path.substring(0, 6) !== 'sshkey')
        return (console.error('Error: Invalid path data'));

    var options = {
        uri: this.data.baseUrl + "user/" + path,
        method: verb,
        json: signed_json
    };

    return (request(options, function(error, response, body) {
        callback(body);
    }));
}

/**
 * Blih function - create a request at epitech blih server
 * @param  {json} argData the arguments data
 * @param  {json} postData the post data information
 * @param  {function} callback function(data)
 */
Blih.prototype.createRequest = function(argData, postData, callback) {
    var signatureData = {
        user: this.userData.login,
        signature: ""
    }

    var hashing = crypto.createHmac('sha512', this.userData.token);
    hashing.update(this.userData.login);
    if (postData !== undefined) {
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
    console.log("Blih fn(print)");
    console.log("Blih - BASE_URL : " + this.baseUrl);
    console.log("Blih - Login : " + this.userData.login);
    console.log("Blih - Password :" + this.userData.password);
    console.log("Blih - Token :" + this.userData.token);
};

module.exports = Blih;
