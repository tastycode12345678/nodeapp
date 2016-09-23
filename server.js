var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var path = require("path");
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./serverApp/config/init')[env];

require('./serverApp/config/express')(express, app, config);

require('./serverApp/config/mongoose')(config.dbUrl);

require('./serverApp/routes/userRoutes')(app);
require('./serverApp/routes/roleRoutes')(app);
require('./serverApp/routes/groupRoutes')(app);
require('./serverApp/routes/orderRoutes')(app);
require('./serverApp/routes/trackingRoutes')(app);

app.listen(port, function() {
    console.log('Server listening on port ...'+ port);
});