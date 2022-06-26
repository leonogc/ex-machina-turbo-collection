const express = require('express');
const fileupload = require('express-fileupload');
const routes = require('./src/routes')

const app = express();

app.use(routes);

app.use(express.static('src/temp'));

app.listen(8000, () => {
    console.log("Listening on " + 8000);
});