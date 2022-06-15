const { Pool } = require('pg');
require("dotenv").config();


const pool = new Pool(
  {
    user: `${process.env.PGUSER}`,
    host: `${process.env.PGHOSTPROD}`,
    port: `${process.env.PGPORT}`,
    database: `${process.env.PGDATABASE}`,
    password: `${process.env.PGPASSWORD}`
  }
);

pool.connect();

module.exports = {
  get: function (question_id, page, count, callback) {
    count = count || 5;
    var offset = page ? (page * count) - count : 0;
    page = page || 1;
    pool.query(`SELECT array_to_json(
                        array_agg(
                          json_build_object(
                            'answer_id', a.id,
                            'body', a.body,
                            'date', a.date_written,
                            'answerer_name', a.answerer_name,
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
                      )
                      FROM answers a
                      WHERE a.question_id = ${question_id}
                      AND a.reported = 0`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        var answers = {
          question: question_id,
          page,
          count
        }
        if (results.rows[0].array_to_json) {
          var limited = results.rows[0].array_to_json.slice(offset, offset + count);
          answers.results = limited;

          for (let answer of answers.results) {
            answer.date = new Date(answer.date);
          }
        } else {
          answers.results = [];
        }
        callback(null, answers);
      }
    });
  },
  post: function (body, callback) {
    var date_written = new Date().getTime();
    body.body = body.body.replace(/'/g, "''");
    pool.query(`INSERT INTO answers
                (question_id ,
                 body ,
                 date_written ,
                 answerer_name ,
                 answerer_email ,
                 reported,
                 helpful
                )
                VALUES
                (${body.question_id} ,
                 '${body.body}' ,
                 ${date_written} ,
                 '${body.answerer_name}' ,
                 '${body.answerer_email}' ,
                 0 ,
                 0
                )
                RETURNING id`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        var photosValues = body.photos.map(url => `(${results.rows[0].id},'${url}')`).join(',')
        pool.query(`INSERT INTO photos
                    (answer_id ,
                     url
                    )
                    VALUES
                    ${photosValues}`, (err, results) => {
          if (err) {
            callback(err)
          } else {
            callback(null, results);
          }
        })
      }
    });
  },
  putHelpful: function (answer_id, callback) {
    pool.query(`UPDATE answers
                SET helpful = helpful + 1
                WHERE id = ${answer_id}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
  putReported: function (answer_id, callback) {
    pool.query(`UPDATE answers
                SET reported = 1
                WHERE id = ${answer_id}`, (err, results) => {
      if (err) {
        callback(err);
      } else {
        callback(null, results);
      }
    });
  },
};