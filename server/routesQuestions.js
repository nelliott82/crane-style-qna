var controller = require('./controllers');
var routerQuestions = require('express').Router();

//Connect controller methods to their corresponding routes
routerQuestions.get('/:product_id', controller.questions.get);

routerQuestions.post('/', controller.questions.post);

routerQuestions.put('/:question_id/helpful', controller.questions.putHelpful);

routerQuestions.put('/:question_id/report', controller.questions.putReported);


module.exports = routerQuestions;