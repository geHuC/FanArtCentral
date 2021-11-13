//Require packages
const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const routes = require('./routes')

//Setup configurations
require('./configurations/expressConfig')(app, express); //express
const mongoDbConnection = require('./configurations/mongooseConfig'); //mongoose

console.log(PORT);
console.log(DB_CONNECTION_STRING);
//Setup the router
app.use(routes);
// app.use(function (req, res) {
//     res.status(404);
// });
//Start sequence
//Making sure we have a DB connection before letting anyone interact with the service
mongoDbConnection(DB_CONNECTION_STRING).then(() => {
    console.log(`Connected to DB at`, DB_CONNECTION_STRING);
    //Start the server on DB connection
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    })
    })
    .catch(err => console.error('Cannot connect to database: ', err));
