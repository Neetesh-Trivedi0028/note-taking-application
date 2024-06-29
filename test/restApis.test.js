const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
require("dotenv").config();

let token;
let id;

beforeAll(async () => {
  const mongoUri = "mongodb://127.0.0.1:27017/rest-api";
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe("api Testing", () => {
  // --------  ------ test case for login api --------
  it("login api ", async () => {
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
    };
    const loginData = {
      email: "rajesh.trivedi@yopmail.com",
      password: "user@1234",
    };
    const res = await request(app)
      .post("/api/users/login")
      .set(headers)
      .send(loginData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body).toHaveProperty("data.token");
    expect(res.body).toHaveProperty("data.user._id");
    expect(res.body).toHaveProperty("data.user.username");
    expect(res.body).toHaveProperty("data.user.email");
    token = res.body.data.token;
  });

  // Test Cases  for notes .....

  // --------- create a new note -------

  it("create a new note  ", async () => {
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const bodyData = {
      title: "Test Title New",
      content: "Notes in details New",
      tags: "",
    };
    const res = await request(app)
      .post("/api/note/notes")
      .set(headers)
      .send(bodyData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("createdNote");

    const note = res.body.data.createdNote;
    expect(note).toHaveProperty("_id");
    expect(note).toHaveProperty("title");
    expect(note).toHaveProperty("content");
    expect(note).toHaveProperty("tags");
    expect(note).toHaveProperty("created");
    expect(note).toHaveProperty("updated");
  });

  // ----------------- test cases for find all notes -------------
  it("find all notes ", async () => {
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await request(app).get("/api/note/notes").set(headers).send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("findAllNotes");
    expect(Array.isArray(res.body.data.findAllNotes)).toBe(true);
    if (res.body.data.findAllNotes.length > 0) {
      expect(res.body.data.findAllNotes[0]).toHaveProperty("_id");
      expect(res.body.data.findAllNotes[0]).toHaveProperty("title");
      expect(res.body.data.findAllNotes[0]).toHaveProperty("content");
      expect(res.body.data.findAllNotes[0]).toHaveProperty("tags");
      expect(res.body.data.findAllNotes[0]).toHaveProperty("created");
      expect(res.body.data.findAllNotes[0]).toHaveProperty("updated");
      id = res.body.data.findAllNotes[0]._id;
    }
  });

  // ------------ find singe note by id -------

  it("find singel notes by id ", async () => {
    // const id = "667eeb1a2d88d425175dc4a9";
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await request(app)
      .get(`/api/note/notes/${id}`)
      .set(headers)
      .send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("findSingleNote");

    const note = res.body.data.findSingleNote;
    expect(note).toHaveProperty("_id", id);
    expect(note).toHaveProperty("title");
    expect(note).toHaveProperty("content");
    expect(note).toHaveProperty("tags");
    expect(note).toHaveProperty("created");
    expect(note).toHaveProperty("updated");
  });

  // ------   Update a note by id ----------

  it("update a note by id ", async () => {
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const bodyData = {
      title: "Updated Title",
      content: "Updated content of the note",
      tags: "",
    };
    const res = await request(app)
      .put(`/api/note/notes/${id}`)
      .set(headers)
      .send(bodyData);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("findSingleNote");

    const note = res.body.data.findSingleNote;
    expect(note).toHaveProperty("_id");
    expect(note).toHaveProperty("title");
    expect(note).toHaveProperty("content");
    expect(note).toHaveProperty("tags");
    expect(note).toHaveProperty("created");
    expect(note).toHaveProperty("updated");
  });

  // ---  delete a note by id -------

  it("delete singel notes by id ", async () => {
    // const id = "667eeb1a2d88d425175dc4a9";
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await request(app)
      .delete(`/api/note/notes/${id}`)
      .set(headers)
      .send();
    expect(res.statusCode).toEqual(200);
  });

  // ------ logout api test case ------
  it("logout api ", async () => {
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await request(app).get("/api/users/logout").set(headers).send();
    expect(res.statusCode).toEqual(200);
  });

  // Test case for register new user   -------

  it("create a new user  ", async () => {
    const headers = {
      accept: "application/json",
      "x-notes-platform": "ios",
      "x-notes-version": "1.0.0",
      "Content-Type": "application/json",
    };
    const bodyData = {
      username: "Neetesh Trivedi",
      email: "neetesh.trivedi@yopmail.com",
      password: "user@123",
    };
    const res = await request(app)
      .post("/api/users/register")
      .set(headers)
      .send(bodyData);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("success", true);
    expect(res.body.data).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("registerdUser");

    const registerdUser = res.body.data.registerdUser;
    expect(registerdUser).toHaveProperty("_id");
    expect(registerdUser).toHaveProperty("username");
    expect(registerdUser).toHaveProperty("email");
  });
});
