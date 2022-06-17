const express = require('express');
var routerQuestions = require('./routesQuestions.js');
var routerAnswers = require('./routesAnswers.js');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());

app.use('/questions', routerQuestions);

app.use('/answers', routerAnswers);

app.get('/loaderio-85c27c5920b9a579eb3e384100e75c3c', (req, res) => {
    res.sendFile(path.join(__dirname, 'loaderio-85c27c5920b9a579eb3e384100e75c3c.txt'));
  }
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
