require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Attempt = require('../lib/models/Attempt');

describe('attempt routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an attempt', () => {
    return request(app)
      .post('/api/v1/attempts')
      .send({
        recipeId: 5,
        dateOfEvent: '2019-12-10',
        notes: 'this is a note',
        rating: 3
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: 5,
          dateOfEvent: new Date('2019-12-10').toISOString(),
          notes: 'this is a note',
          rating: 3,
          __v: 0
        });
      });
  });

  it('gets all attempts', async() => {
    const attempts = await Attempt.create([
      { recipeId: 5, dateOfEvent: '2019-12-10', notes: 'this is a note', rating: 3 },
      { recipeId: 6, dateOfEvent: '2019-12-09', notes: 'this is a note', rating: 2 },
      { recipeId: 7, dateOfEvent: '2019-12-08', notes: 'this is a note', rating: 1 },
    ]);

    return request(app)
      .get('/api/v1/attempts')
      .then(res => {
        attempts.forEach(attempt => {
          expect(res.body).toContainEqual({
            _id: attempt._id.toString(),
            recipeId: attempt.recipeId,
            dateOfEvent: attempt.dateOfEvent.toISOString(),
            notes: attempt.notes,
            rating: attempt.rating,
            __v: 0
          });
        });
      });
  });

  it('can get an attempt by id and update it', async() => {
    const attempt = await Attempt.create({
      recipeId: 5,
      dateOfEvent: '2019-12-10',
      notes: 'this is a note',
      rating: 3
    });

    return request(app)
      .patch(`/api/v1/attempts/${attempt._id}`)
      .send({ recipeId: 1 })
      .then(res => {
        expect(res.body).toEqual({
          _id: attempt._id.toString(),
          recipeId: 1,
          dateOfEvent: attempt.dateOfEvent.toISOString(),
          notes: 'this is a note',
          rating: 3,
          __v: 0
        });
      });
  });

  it('gets an attempt by Id', async() => {
    const attempt = await Attempt.create({
      recipeId: 5,
      dateOfEvent: '2019-12-10',
      notes: 'this is a note',
      rating: 3
    });

    return request(app)
      .get(`/api/v1/attempts/${attempt._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: attempt._id.toString(),
          recipeId: 5,
          dateOfEvent: attempt.dateOfEvent.toISOString(),
          notes: 'this is a note',
          rating: 3,
          __v: 0
        });
      });
  });
});
