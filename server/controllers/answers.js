var models = require('../models');

module.exports = {
  get: function (req, res) {
    models.answers.get(req.params.question_id, req.query.page, req.query.count, function(err, results) {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end(JSON.stringify(err));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(results));
      }
    });
  },
  post: function (req, res) {
    models.answers.post(req.body, function(err, results) {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(201);
      }
    });
  },
  putHelpful: function (req, res) {
    models.answers.putHelpful(req.params.answer_id, function(err, results) {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(204);
      }
    });
  },
  putReported: function (req, res) {
    models.answers.putReported(req.params.answer_id, function(err, results) {
      if (err) {
        res.statusCode = 500;
        console.log(err);
        res.end(JSON.stringify(err));
      } else {
        res.sendStatus(204);
      }
    });
  },
};