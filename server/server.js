const express = require('express');
var routerQuestions = require('./routesQuestions.js');
var routerAnswers = require('./routesAnswers.js');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());

app.use('/questions', routerQuestions);

app.use('/answers', routerAnswers);

app.get('/loaderio-234f1cb7a527c2b22493aed25dd6f349', (req, res) => {
    res.sendFile('loaderio-234f1cb7a527c2b22493aed25dd6f349.txt');
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
