<!--
@Author: Walter Bonetti <IniterWorker>
@Date:   2016-05-27T23:25:24+02:00
@Email:  walter.bonetti@epitech.eu
@Last modified by:   IniterWorker
@Last modified time: 2016-06-06T01:47:57+02:00
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
var Blih = new blihApi('login_x', 'UnixPassword');

Blih.getRepositories(function (data) {
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
