require('dotenv').config();
const express = require("express");
const app = express();
const route = require('./routes/index');
const moviesRouter = require('./routes/moviesRouter')
const cors = require('cors');
const connectDB = require('./DB/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


// var options = {
//   explorer: true
// };

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json());
app.use(cors());

//Routes
app.use('/', route);
app.use('/movies', moviesRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Sorry, we couldn't find that resource." });
});

//Error handler
app.use((err,req,res,next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({ message: err.message || "oh no! Something went wrong on the server."});
});

const port = process.env.PORT || 5500

connectDB()
app.listen(port, ()=> {
    console.log(`connected with port ${port}`)
})