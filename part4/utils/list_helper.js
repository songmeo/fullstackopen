const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blog_lists) => {
  const reducer = (a, b) => {
    return {likes: a.likes + b.likes}
  }
  return blog_lists.length === 0
    ? blog_lists[0].likes
    : blog_lists.reduce(reducer).likes
}

module.exports = {
  dummy,
  totalLikes
}
