//Starting point of the App
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');

const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
const uri = 'mongodb://localhost:27017/db';
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
})
//App Setup
app.use(morgan('combined'));
app.use(cors())
app.use(bodyParser.json({ type: '*/*' }));
router(app);
//Server Setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log(`server listening on ${port}`);
