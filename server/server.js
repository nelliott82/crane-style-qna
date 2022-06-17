const express = require('express');
var routerQuestions = require('./routesQuestions.js');
var routerAnswers = require('./routesAnswers.js');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());

app.use('/questions', routerQuestions);

app.use('/answers', routerAnswers);

app.get('/loaderio-d4ca651a0a4236ba0fd00d5ee7580b77', (req, res) => {
    res.sendFile(path.join(__dirname, 'loaderio-d4ca651a0a4236ba0fd00d5ee7580b77.txt'));
  }
);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
