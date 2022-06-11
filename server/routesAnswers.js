var controller = require('./controllers');
var routerAnswers = require('express').Router();

//Connect controller methods to their corresponding routes
routerAnswers.get('/:question_id', controller.answers.get);

routerAnswers.post('/', controller.answers.post);

// router.put('/answers/helpful', controller.answers.putHelpful);

// router.put('/answers/report', controller.answers.putReport);


module.exports = routerAnswers;