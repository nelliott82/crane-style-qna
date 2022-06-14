const path = require('path');
require("dotenv").config();
const { Pool } = require('pg');

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

pool.query(`DROP TABLE IF EXISTS questions`, (err, res) => {
  if (err) {

  } else {
    pool.query(`CREATE TABLE IF NOT EXISTS questions
                (id BIGSERIAL UNIQUE PRIMARY KEY ,
                product_id INT NOT NULL ,
                body VARCHAR(300) ,
                date_written BIGINT ,
                asker_name VARCHAR(50) ,
                asker_email VARCHAR(255) ,
                reported INT NOT NULL,
                helpful INT NOT NULL
                )`, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    pool.query(`COPY questions from '${path.join(__dirname, 'questions.csv')}' WITH DELIMITER ',' CSV HEADER`, (err, res) => {
                      if (err) {
                        console.log(err);
                      } else {
                        pool.query(`SELECT setval('questions_id_seq', (SELECT max(id) FROM questions))`, (err, res) => {

                          pool.query(`CREATE INDEX id_questions ON questions(product_id)`);
                        });
                      }
                    });
                }
        });
    }
});

pool.query(`DROP TABLE IF EXISTS answers`, (err, res) => {
  if (err) {

  } else {
    pool.query(`CREATE TABLE IF NOT EXISTS answers
                (id BIGSERIAL UNIQUE PRIMARY KEY ,
                question_id INT NOT NULL ,
                body VARCHAR(300) ,
                date_written BIGINT ,
                answerer_name VARCHAR(50) ,
                answerer_email VARCHAR(255) ,
                reported INT NOT NULL,
                helpful INT NOT NULL
                )`, (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  pool.query(`COPY answers from '${path.join(__dirname, 'answers.csv')}' WITH DELIMITER ',' CSV HEADER`, (err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      pool.query(`SELECT setval('answers_id_seq', (SELECT max(id) FROM answers))`, (err, res) => {

                        pool.query(`CREATE INDEX id_answers ON answers(question_id)`);
                      });
                    }
                  });
              }
          });
    }
});

pool.query(`DROP TABLE IF EXISTS photos`, (err, res) => {
  if (err) {

  } else {
    pool.query(`CREATE TABLE IF NOT EXISTS photos
                (id BIGSERIAL UNIQUE PRIMARY KEY ,
                answer_id INT NOT NULL ,
                url VARCHAR(1000)
                )`, (err, res) => {
                if (err) {
                  console.log(err);
                } else {
                  pool.query(`COPY photos from '${path.join(__dirname, 'answers_photos.csv')}' WITH DELIMITER ',' CSV HEADER`, (err, res) => {
                    if (err) {
                      console.log(err);
                    } else {
                      pool.query(`SELECT setval('photos_id_seq', (SELECT max(id) FROM photos))`, (err, res) => {

                        pool.query(`CREATE INDEX id_photos ON photos(answer_id)`);
                      });
                    }
                  });
              }
          });
    }
});

// module.exports = { pool }