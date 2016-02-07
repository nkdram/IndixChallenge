



var app = require('./config/app')();

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(5000);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('Indix APP started on port 5000');