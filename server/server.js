const express = require('express');
const app = express();
const port = 8080;

var routerQuestions = require('./routesQuestions.js');
var routerAnswers = require('./routesAnswers.js');

app.use(express.json());

app.use('/questions', routerQuestions);

app.use('/answers', routerAnswers);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
