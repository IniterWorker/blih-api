<!--
@Author: Walter Bonetti <IniterWorker>
@Date:   2016-05-27T23:25:24+02:00
@Email:  walter.bonetti@epitech.eu
@Last modified by:   initerworker
@Last modified time: 2016-06-12T22:54:35+02:00
@License: MIT
-->

# blih-api
A simple interface in JavaScript to use the Epitech system.


#### 1. Install

```sh
npm install --save blih-api
```

#### 2. Starter

```js
var blihApi = require('blih-api');
var Blih = new blihApi();

var userdata {
  login: 'login_x',
  password: '******',
  token: Blih.generateToken('******')
};

Blih.getRepositories(userData, function (data) {
  for (key in data.repositories)
  {
    console.log(key);
  }
});
```

#### 3. Generate Documentation
```sh
gulp doc
```

#### Auteur
Walter Bonetti (bonett_w Epitech Lyon 2020)

_MIT_
