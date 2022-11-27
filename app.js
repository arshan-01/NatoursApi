const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const express = require('express');
const { constants } = require('buffer');
const app = express();
const port = process.env.PORT || 3000;


//express.json() is middleware is func that modify incoming req data.middle of req and res.
app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;