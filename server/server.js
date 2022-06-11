const express = require('express');
var routerQuestions = require('./routesQuestions.js');
var routerAnswers = require('./routesAnswers.js');
var morgan = require('morgan');
var cors = require('cors');
const app = express();
const port = 8080;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/questions', routerQuestions);

app.use('/answers', routerAnswers);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
