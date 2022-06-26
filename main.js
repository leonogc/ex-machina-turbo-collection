const express = require('express');
const fileupload = require('express-fileupload');
const routes = require('./src/routes')

const app = express();

app.use(routes);

app.use(express.static('src/temp'));

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});