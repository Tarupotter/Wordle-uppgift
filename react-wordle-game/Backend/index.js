import express from 'express';

const app = express();

app.get('/', (req, res) => {

});

app.use('/static', express.static('Backend'));

app.listen(5080);