const dummyFunction = () => {
    return 1
}

const likeCalculator = (blogArray) => {
    let sum = 0
    blogArray.forEach(item => {
        sum = sum + item.likes
    })
    return sum
}

const favouriteBlog = (blogArray) => {
    let toBeReturnedObject = {}

    let mostLikes = 0
    let matchId = ""
    blogArray.forEach(item => {
        if(item.likes > mostLikes)
        {
            mostLikes = item.likes
            matchId = item._id.toString()
        }
    })
    const result = blogArray.filter(item => item._id.toString() === matchId)

    toBeReturnedObject = {
        title: result[0].title,
        author : result[0].author,
        likes: result[0].likes
    }

    return toBeReturnedObject
}

const mostBlogs = (blogArray) => {
  let toBeReturnedObject = {}

  let mostBlogs = 0
  let matchId = ""
  blogArray.forEach(item => {
    if(item.blogs > mostBlogs)
    {
      mostBlogs = item.blogs
      matchId = item.id
    }
  })
  const result = blogArray.filter(item => item.id === matchId)

  toBeReturnedObject = {
    author : result[0].author,
    blogs : result[0].blogs
  }

  return toBeReturnedObject
}

const mostLikes = (blogArray) => {
  let toBeReturnedObject = {}

  let mostLikes = 0
  let matchId = ""
  blogArray.forEach(item => {
    if(item.blogs > mostLikes)
    {
      mostLikes = item.likes
      matchId = item.id
    }
  })
  const result = blogArray.filter(item => item.id === matchId)

  toBeReturnedObject = {
    author : result[0].author,
    likes : result[0].likes
  }

  return toBeReturnedObject
}

module.exports = {dummyFunction , likeCalculator , favouriteBlog, mostBlogs, mostLikes}