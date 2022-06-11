var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.questions.get(req.params.product_id, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
  post: function (req, res) {
    models.questions.post(req.body, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(201);
      }
    });
  },
  putHelpful: function (req, res) {
    models.questions.putHelpful(req.params.question_id, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(204);
      }
    });
  },
  putReported: function (req, res) {
    models.questions.putReported(req.params.question_id, function(err, results) {
      if (err) {
        res.statusCode = 400;
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(204);
      }
    });
  },
};