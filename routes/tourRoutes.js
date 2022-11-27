const express = require('express');
const { router } = require('../app');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

// app.get('/api/v1/tours', getAllTours );
// app.get('/api/v1/tours/:id', getTourByID);
// app.post('/api/v1/tours',createNewTour)
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);


tourRouter.param('id', tourController.checkID)

//Tour Router
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createNewTour);
tourRouter
  .route('/:id')
  .get(tourController.getTourByID)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
