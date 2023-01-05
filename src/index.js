const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

// const UserRepository = require('./repository/user-repository');
const app = express();

//importing routes
const apiRoutes = require('./routes/index');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.use('/api',apiRoutes);

    app.listen(5001, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        // const repo = new UserRepository();

        // const response = await repo.getById(3);
        // console.log(response);
    })
}

prepareAndStartServer();