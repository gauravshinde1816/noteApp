const jwt = require('jsonwebtoken');
const server = require("../../server");
const { disconnectDB } = require("../../config/db");
const supertest = require("supertest");
const Note = require("../../models/Note")
const User = require("../../models/User")

process.env.NODE_ENV = 'test';
let token 
let userID


beforeAll(async () => {
  await Note.deleteMany({});
  await User.deleteMany({});
  const testUser = await User.create({ name: "test user", email: "testuser123@gmail.com" , password : "123456"})
  token = await createMockJWToken(testUser)
  userID = testUser._id
});

test("GET /api/notes", async () => {
  const note = await Note.create({ title: "Note 1", content: "Lorem ipsum", createdBy: userID });
  await supertest(server)
    .get("/api/notes")
    .set('Authorization', `${token}`)
    .expect(200)
    .then((response) => {
      // Check type and length
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toEqual(1);

      // Check data
      expect(response.body[0].title).toBe(note.title);
      expect(response.body[0].content).toBe(note.content);
    })
});


test("POST /api/notes", async () => {
  const newNoteData = { title: "New Note", content: "New Content" };
  await supertest(server)
    .post("/api/notes")
    .set('Authorization', `${token}`)
    .send(newNoteData)
    .expect(201)
    .then((response) => {
      // Check data
      expect(response.body.title).toBe(newNoteData.title);
      expect(response.body.content).toBe(newNoteData.content);
    });
});

test("GET /api/notes/:id", async () => {
  const note = await Note.create({ title: "Note 1", content: "Lorem ipsum", createdBy: userID });
  await supertest(server)
    .get(`/api/notes/${note._id}`)
    .set('Authorization', `${token}`)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body.title).toBe(note.title);
      expect(response.body.content).toBe(note.content);
    });
});

test("PUT /api/notes/:id", async () => {
  const note = await Note.create({ title: "Note 1", content: "Lorem ipsum", createdBy: userID });
  const updatedNoteData = { title: "Updated Note", content: "Updated Content" };
  await supertest(server)
    .put(`/api/notes/${note._id}`)
    .set('Authorization', `${token}`)
    .send(updatedNoteData)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body.title).toBe(updatedNoteData.title);
      expect(response.body.content).toBe(updatedNoteData.content);
    });
});

test("DELETE /api/notes/:id", async () => {
  const note = await Note.create({ title: "Note 1", content: "Lorem ipsum", createdBy: userID });
  await supertest(server)
    .delete(`/api/notes/${note._id}`)
    .set('Authorization', `${token}`)
    .expect(200);

  // Check if the note is deleted
  const deletedNote = await Note.findById(note._id);
  expect(deletedNote).toBeNull();
});

test("POST /api/notes/:id/share", async () => {
  const note = await Note.create({ title: "Note 1", content: "Lorem ipsum", createdBy: userID });
  const shareWithData = { sharedUserId: "6594f8607366fb54845737a7" };
  await supertest(server)
    .post(`/api/notes/${note._id}/share`)
    .set('Authorization', `${token}`)
    .send(shareWithData)
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body.sharedWith).toContain(shareWithData.sharedUserId);
    });
});


afterAll(async () => {
  await server.close()
  console.log("Test Server Closed")
  await disconnectDB()
});


const createMockJWToken = async (user) => {
  const payload = {
    user: {
      id: user._id
    }
  };
  const token = await jwt.sign(
    payload,
    "secret",
    { expiresIn: '5 days' },

  );
  return token
}