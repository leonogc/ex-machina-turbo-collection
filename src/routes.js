const express = require('express');

const routes = express.Router();

const filesController = require('./Controllers/filesController');

routes.get('/', (req, res) => {
    res.send("Working...");
});

routes.post('/api/uploadimage', filesController.uploadImage);

routes.post('/api/uploadvideo', filesController.uploadVideo);

routes.get('/api/listfiles', filesController.listFiles);

routes.get('/api/remove', filesController.removeFile);

module.exports = routes;