const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blog_lists) => {
  const reducer = (a, b) => {
    return {likes: a.likes + b.likes}
  }
  return blog_lists.length === 0
    ? 0
    : blog_lists.reduce(reducer).likes
}

const favoriteBlog = (blog_lists) => {
  const reducer = (current_fav, blog) => {
    return current_fav.likes > blog.likes ? current_fav : blog
  }
  return blog_lists.length === 0
      ? null
      : blog_lists.reduce(reducer)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
