const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');

const UserService = require('./services/user-service');
const app = express();

//importing routes
const apiRoutes = require('./routes/index');

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    
    app.use('/api',apiRoutes);

    app.listen(5001, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        
        // const service = new UserService();
        // const response = service.createToken({email: 'sanket@admin.com', id: 1});
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNjcyOTQ1NDQ3LCJleHAiOjE2NzI5NDU0Nzd9.J9R2GKRtYDZgkr92yVVmnd48QSX5YVoZTiWsbtL8vvQ';
        // const response = service.verifyToken(token);
        // console.log(response);
    })
}

prepareAndStartServer();