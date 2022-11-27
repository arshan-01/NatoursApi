const fs = require('fs');
const express = require('express');
const { constants } = require('buffer');
const app = express();
const port = process.env.PORT || 3000;


//express.json() is middleware is func that modify incoming req data.middle of req and res.
app.use(express.json())              

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', function (req, res) {
  res.status(200).json({
    status: 'success',
    results : tours.length,
    data: {
      tours: tours,
    },
  });
});
app.get('/api/v1/tours/:id', function (req, res) {
    const id = req.params.id*1;       //convert string to number
    const tour = tours.find(el=> el.id === id)
    console.log(tour)
    if(!tour){
        res.status(404).json({
            status: 'page not found'})
            return;
    }
        res.status(200).json({
            status: 'success',
            data: {
                tours: tour,
            },
        });  
});

app.post('/api/v1/tours',(req,res)=>{
    const newId = tours[tours.length-1].id+1;
    const newTour = Object.assign({id:newId},req.body)
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), error =>{
        res.status(201).json({
            status: 'success',
            results : tours.length,
            data: {
              tours: newTour,
            },
          });  
    })
})


app.patch('/api/v1/tours/:id', function (req, res) {
    const id = req.params.id*1;       //convert string to number
    const tour = tours.find(el=> el.id === id)

    if(!tour){
        res.status(404).json({
            status: 'page not found'})
            return;
    }
        res.status(200).json({
            status: 'success',
            results : tours.length,
            data: {
                tours: "tour updated",
            },
        });  
});


app.delete('/api/v1/tours/:id', function (req, res) {
    const id = req.params.id*1;       //convert string to number

    const tour = tours.find(el=> el.id === id)
    const index = tours.indexOf(tour);
    tours.splice(index,1)

    if(!tour){
        res.status(404).json({
            status: 'page not found'})
            return;
    }
        res.status(204).json({
            status: 'success',
            data: {
                tours: null,
            },
        });  
});



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
