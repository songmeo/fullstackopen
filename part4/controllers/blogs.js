const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  if (! blog.author || ! blog.title) {
    response.status(400).send("Bad Request")
  }
  else if (! blog.likes) {
    blog.likes = 0
  }

  blog.save()
    .then(result => {
        response.status(201).json(result)    
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  console.log(body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  .then(updatedBlog => {
    response.json(updatedBlog)
  })
  .catch(error => next(error))
})

module.exports = blogsRouter
