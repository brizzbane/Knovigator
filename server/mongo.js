const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/knovigator', function (err, db) {
	if (err) {
    console.log('Unable to connect to the server. Please start the server. Error:', err);
  } else {
    console.log('Connected to Server successfully!');
  }
});

