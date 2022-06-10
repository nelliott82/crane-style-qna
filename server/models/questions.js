const { Pool } = require('pg');
require("dotenv").config();


const pool = new Pool(
  {
    user: `${process.env.PGUSER}`,
    host: `${process.env.PGHOST}`,
    port: `${process.env.PGPORT}`,
    database: `${process.env.PGDATABASE}`,
    password: `${process.env.PGPASSWORD}`
  }
);

pool.connect();

module.exports = {
  get: function (product_id, callback) {
    pool.query(`SELECT array_to_json(
                        array_agg(
                          json_build_object(
                            'question_id', q.id,
                            'question_body', q.body,
                            'question_date', q.date_written,
                            'question_reported', q.reported,
                            'question_helpful', q.helpful,
                            'answers', (SELECT json_object_agg(
                                             a.id, json_build_object(
                                            'body', a.body,
                                            'date', a.date_written,
                                            'answerer_name', a.answerer_name,
                                            'reported', a.reported,
                                            'helpfulness', a.helpful,
                                            'photos', (SELECT
                                                        array_to_json(
                                                          array_agg(
                                                            json_build_object(
                                                              'id', p.id,
                                                              'url', p.url
                                                            )
                                                          )
                                                        )
                                                        FROM photos p
                                                        WHERE a.id = p.answer_id
                                                      )
                                            )
                                          )
                                          FROM answers a
                                          WHERE q.id = a.question_id
                                          AND a.reported = 0
                                        )
                          )
                        )
                      )
                      FROM questions q
                      WHERE q.product_id = ${product_id}
                      AND q.reported = 0`, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        var questions = {
          product_id,
          results: results.rows[0].array_to_json
        }
        for (let question of questions.results) {
          question.question_date = new Date(question.question_date).toISOString();
          for (let answer in question.answers) {
            question.answers[answer].date = new Date(question.answers[answer].date);
          }
        }
        callback(null, questions);
      }
    });
  },
  post: function (body, callback) {
    var date_written = new Date().getTime();
    console.log(date_written)
    pool.query(`INSERT INTO questions
                (product_id ,
                 body ,
                 date_written ,
                 asker_name ,
                 asker_email ,
                 reported,
                 helpful
                )
                VALUES
                (${body.product_id} ,
                 '${body.body}' ,
                 ${date_written} ,
                 '${body.asker_name}' ,
                 '${body.asker_email}' ,
                 0 ,
                 0
                )`, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  put: function (callback) {
    pool.query(``, null, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  }
};