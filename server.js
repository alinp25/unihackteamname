const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

const PORT = 8000;

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})