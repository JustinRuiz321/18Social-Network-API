const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;