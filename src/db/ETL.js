const fs = require('fs');
const path = require('path');
require("dotenv").config();
const { Pool, Client } = require('pg');

const pool = new Pool(
  {
    user: `${process.env.PGUSER}`,
    host: `${process.env.PGHOST}`,
    database: `${process.env.PGDATABASE}`,
    password: `${process.env.PGPASSWORD}`
  }
);

pool.connect();

pool.query(`DROP TABLE IF EXISTS questions`, (err, res) => {
  if (err) {

  } else {
    pool.query(`CREATE TABLE IF NOT EXISTS questions
                                          (id INT NOT NULL PRIMARY KEY ,
                                          product_id INT NOT NULL ,
                                          body VARCHAR(300) ,
                                          date_written BIGINT ,
                                          asker_name VARCHAR(50) ,
                                          asker_email VARCHAR(255) ,
                                          reported INT NOT NULL,
                                          helpful INT NOT NULL
                                          )`, (err, res) => {
                                            if (err) {

                                            } else {
                                              pool.query(`COPY questions from '${path.join(__dirname, 'questions.csv')}' WITH DELIMITER ',' CSV HEADER`);
                                          }
            });
    }
});

pool.query(`DROP TABLE IF EXISTS answers`, (err, res) => {
  if (err) {

  } else {
    pool.query(`CREATE TABLE IF NOT EXISTS answers
                                            (id INT NOT NULL PRIMARY KEY ,
                                            question_id INT NOT NULL ,
                                            body VARCHAR(300) ,
                                            date_written BIGINT ,
                                            answerer_name VARCHAR(50) ,
                                            answerer_email VARCHAR(255) ,
                                            reported INT NOT NULL,
                                            helpful INT NOT NULL
                                            )`, (err, res) => {
                                            if (err) {

                                            } else {
                                              pool.query(`COPY answers from '${path.join(__dirname, 'answers.csv')}' WITH DELIMITER ',' CSV HEADER`);
                                          }
            });
    }
});

pool.query(`DROP TABLE IF EXISTS photos`, (err, res) => {
  if (err) {

  } else {
    pool.query(`CREATE TABLE IF NOT EXISTS photos
                                            (id INT NOT NULL PRIMARY KEY ,
                                            answer_id INT NOT NULL ,
                                            url VARCHAR(1000)
                                            )`, (err, res) => {
                                            if (err) {

                                            } else {
                                              pool.query(`COPY photos from '${path.join(__dirname, 'answers_photos.csv')}' WITH DELIMITER ',' CSV HEADER`);
                                          }
            });
    }
});
