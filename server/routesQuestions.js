var controller = require('./controllers');
var routerQuestions = require('express').Router();

//Connect controller methods to their corresponding routes
routerQuestions.get('/:product_id', controller.questions.get);

routerQuestions.post('/:product_id', controller.questions.post);

// router.put('/helpful', controller.questions.putHelpful);

// router.put('/report', controller.questions.putReport);


module.exports = routerQuestions;