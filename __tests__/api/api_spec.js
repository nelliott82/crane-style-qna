const frisby = require('frisby');
const Joi = frisby.Joi;

describe('GET Questions', function () {
  var url = 'http://localhost:8080';
  var route = '/questions/';
  var product_id = 1;

  var schemaQuestions = Joi.object({
    product_id: Joi.string().required(),
    results: Joi.array().required()
  })

  var schemaResults = Joi.object({
    question_id: Joi.number().required(),
    question_body: Joi.string().required(),
    question_date: Joi.date().required(),
    question_reported: Joi.number().required(),
    question_helpful: Joi.number().required(),
    answers: Joi.object()
  })

  var schemaAnswers = Joi.object({
    body: Joi.string().required(),
    date: Joi.date().required(),
    answerer_name: Joi.string().required(),
    reported: Joi.number().required(),
    helpfulness: Joi.number().required(),
    photos: Joi.array()
  })

  var schemaPhotos = Joi.object({
    id: Joi.number().required(),
    url: Joi.string().required()
  })

  it('should get a 200 response when getting questions', function () {
    return frisby.get(url + route + product_id)
      .expect('status', 200)
  });

  it('should get a json response in the correct format when getting questions', function () {
    return frisby.get(url + route + product_id)
    .then(results => {
      expect(schemaQuestions.validate(JSON.parse(results._body)).error).toBe(null);
      var results = JSON.parse(results._body).results.filter(question => { return question.answers !== null })
      expect(schemaResults.validate(results[0]).error).toBe(null);
      var answer_id
      for (let answer in results[0].answers) {
        if (results[0].answers[answer].photos) {
          answer_id = answer;
        }
      }
      expect(schemaAnswers.validate(results[0].answers[answer_id]).error).toBe(null);
      expect(schemaPhotos.validate(results[0].answers[answer_id].photos[0]).error).toBe(null);
    })
  });

})

describe('POST Question', function () {
  var url = 'http://localhost:8080';
  var route = '/questions';
  var product_id = 10;
  var body = 'Test body';
  var asker_name = 'Test name';
  var asker_email = 'Test email';

  it('should get a 201 response when posting a question', function () {
    var postBody = {
      body: {
        product_id,
        body,
        asker_name,
        asker_email
      }
    }

    return frisby.post(url + route, postBody)
      .expect('status', 201);
  });

})

describe('PUT Question Helpful', function () {
  var url = 'http://localhost:8080';
  var route = '/questions/';
  var question_id = 3;
  var put = '/helpful'

  it('should get a 204 response when putting a question as helpful', function () {

    return frisby.put(url + route + question_id + put)
      .expect('status', 204);
  });

})

describe('PUT Question Reported', function () {
  var url = 'http://localhost:8080';
  var route = '/questions/';
  var question_id = 3;
  var put = '/report'

  it('should get a 204 response when putting a question as reported', function () {

    return frisby.put(url + route + question_id + put)
      .expect('status', 204);
  });

})


describe('GET Answers', function () {
  var url = 'http://localhost:8080';
  var route = '/answers/';
  var question_id = 1;
  var schemaAnswers = Joi.object({
    question: Joi.string().required(),
    page: Joi.number().required(),
    count: Joi.number().required(),
    results: Joi.array().required()
  })

  var schemaResults = Joi.object({
    answer_id: Joi.number(),
    body: Joi.string(),
    date: Joi.date(),
    answerer_name: Joi.string(),
    photos: Joi.array()
  })

  var schemaPhotos = Joi.object({
    id: Joi.number(),
    url: Joi.string()
  })

  it('should get a 200 response when getting answers', function () {
    return frisby.get(url + route + question_id)
      .expect('status', 200)
  });

  it('should get a json response in the correct format when getting answers', function () {
    return frisby.get(url + route + question_id)
    .then(results => {
      expect(schemaAnswers.validate(JSON.parse(results._body)).error).toBe(null);
      var results = JSON.parse(results._body).results.filter(answer => { return answer.photos !== null });
      expect(schemaResults.validate(results[0]).error).toBe(null);
      expect(schemaPhotos.validate(results[0].photos[0]).error).toBe(null);
    })
  });

})

describe('POST Answer', function () {
  var url = 'http://localhost:8080';
  var route = '/answers';
  var question_id = 10;
  var body = 'Test body';
  var answerer_name = 'Test name';
  var answerer_email = 'Test email';

  it('should get a 201 response when posting an answer', function () {
    var postBody = {
      body: {
        question_id,
        body,
        answerer_name,
        answerer_email
      }
    }

    return frisby.post(url + route, postBody)
      .expect('status', 201);
  });

})

describe('PUT Answer Helpful', function () {
  var url = 'http://localhost:8080';
  var route = '/answers/';
  var answer_id = 1;
  var put = '/helpful'

  it('should get a 204 response when putting an answer as helpful', function () {

    return frisby.put(url + route + answer_id + put)
      .expect('status', 204);
  });

})

describe('PUT Answer Reported', function () {
  var url = 'http://localhost:8080';
  var route = '/answers/';
  var answer_id = 1;
  var put = '/report'

  it('should get a 204 response when putting an answer as reported', function () {

    return frisby.put(url + route + answer_id + put)
      .expect('status', 204);
  });

})