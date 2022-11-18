const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blogs')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])  
  await blogObject.save()

})

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(2)
}, 100000)

test('unique identifier is named id', async () => {
  const response = await api
    .get('/api/blogs')

  expect(response.body[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close()
})

test('post request works', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: 'test',
    likes: 45
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
}, 100000)
