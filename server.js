const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const passport      = require('passport');

const users         = require('./routes/api/users');

const app = express();

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// DataBase config
const dbConnection = require('./config/keys').mongoURI;
mongoose.connect(dbConnection, {useNewUrlParser: true })
        .then(() => console.log('MongoDB successfully connected!'))
        .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

// Routes
app.use('/api/users', users);

// Server settings
const PORT = process.env.PORT || 5000;

// Server start
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))