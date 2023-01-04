const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const app = express();

//importing routes
const apiRoutes = require('./routes/index');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.use('/api',apiRoutes);

    app.listen(5001, () => {
        console.log(`Server Started on Port: ${PORT}`);
    })
}

prepareAndStartServer();