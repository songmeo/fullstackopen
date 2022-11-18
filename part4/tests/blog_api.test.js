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

test('likes property will be 0 if not exist in request', async () => {
  const newBlog = {
    title: 'test',
    author: 'test',
    url: 'test'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body[helper.initialBlogs.length].likes).toEqual(0)
}, 100000)

test('returns 400 if title or author not exist', async () => {
  const newBlog = {
    url: 'test'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

}, 100000)

test('likes property will be 0 if not exist in request', async () => {
  const newBlog = {
    url: 'test'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

}, 100000)

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const blogs = blogsAtEnd.map(r => r.title)

    expect(blogs).not.toContain(blogToDelete.title)
  })
})

describe('update of a blog', () => {
  test('succeeds with updating a blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]

    const updatedBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 10
    }

    response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    expect(response.body.likes).toEqual(updatedBlog.likes)
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})
