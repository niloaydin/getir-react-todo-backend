const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const connectDatabase = require("../db/connection");
const TodoModel = require("../models/todoModel");

describe("Todo test", () => {
  it("Todo Test", () => {
    expect(true).toEqual(true);
  });
});

//create mock user to test
const newTodo = {
  text: "test",
  completed: true,
};

//Before running the tests, create this user in the test database
beforeAll(async () => {
  connectDatabase();
  await TodoModel.create(newTodo);
});

//After tests are finished, delete everything from the test database
afterAll(async () => {
  await TodoModel.deleteMany();
  await mongoose.connection.close();
});

describe("Testing if todo controllers work correctly", () => {
  it("GET /api should retrieve all the todos", (done) => {
    supertest(app)
      .get(`/api`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) return done(err);
        expect(res.body[0].text).toEqual(newTodo.text);
        expect(res.body[0].completed).toEqual(newTodo.completed);
        return done();
      });
  });
});
