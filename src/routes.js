const express = require('express');

const routes = express.Router();

const filesController = require('./Controllers/filesController');

routes.get('/', (req, res) => {
    res.send("Working...");
});

routes.post('/api/uploadimage', filesController.uploadImage);

routes.post('/api/uploadvideo', filesController.uploadVideo);

module.exports = routes;