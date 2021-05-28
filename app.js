const express = require("express")
const app = express();
const itemRoutes = require('./itemRoutes');
const NotFound = require('./error');
const morgan = require('morgan');

//interpret all requests as JSON
app.use(express.json());
//use morgan logger for each request
app.use(morgan('dev'));
//use /items before each route path
app.use('/items', itemRoutes);

/** 404 Handler */
app.use(function(req, res, next) {
    let err = new NotFound('404 Not Found.', 404);
    return next(err);
});

/** General Error Handler */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    return res.json({
        error: err.msg
    });
});

module.exports = app;
