var path = require('path')
var mongoose = require('mongoose');
var express= require('express')
var colors = require('colors')
var morgan = require('morgan')

var { notFound, errorHandler } =  require('./middleware/errorMiddleware.js')

var userRoutes = require('./routes/userRoutes.js')

var connection = mongoose.connect('mongodb://localhost:27017/FYP', 
    { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('strictQuery', true);
var app = express();
connection.then((db) => {
    console.log("Connected correctly to server");
  },
   (err) => {  
      console.log(err); 
    });



if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/users', userRoutes)

var __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('Server is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
