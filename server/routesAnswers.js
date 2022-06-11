var controller = require('./controllers');
var routerAnswers = require('express').Router();

//Connect controller methods to their corresponding routes
routerAnswers.get('/:question_id', controller.answers.get);

routerAnswers.post('/', controller.answers.post);

routerAnswers.put('/:answer_id/helpful', controller.answers.putHelpful);

routerAnswers.put('/:answer_id/report', controller.answers.putReported);

module.exports = routerAnswers;