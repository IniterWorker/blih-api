<!--
@Author: Walter Bonetti <IniterWorker>
@Date:   2016-05-27T23:25:24+02:00
@Email:  walter.bonetti@epitech.eu
@Last modified by:   initerworker
@Last modified time: 2016-06-12T22:54:35+02:00
@License: MIT
-->

[![npm version](https://badge.fury.io/js/blih-api.svg)](https://badge.fury.io/js/blih-api)

# blih-api
A simple interface in JavaScript to use the Epitech system.


#### 1. Install

```sh
npm install --save blih-api
```

#### 2. Starter

```js
var blihApi = require('blih-api');
var Blih = new blihApi("email", "passwordUnix");

/**
 * Blih function - get all repositories name
 * @param  {function} callback function(error, data)
 */
Blih.getRepositories(function (error, data) {
  if (error)
    console.error(error);

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
