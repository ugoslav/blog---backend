const dummyWork = require("../utils/for_testing").dummyFunction
const likeCalculator = require("../utils/for_testing").likeCalculator
const favouriteBlog = require("../utils/for_testing").favouriteBlog
const mostBlogs = require("../utils/for_testing").mostBlogs
const mostLikes =  require("../utils/for_testing").mostLikes

describe('case 1' , () => {
    
    test('Dummy returns one' , () => {
        const result = dummyWork()
    
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('likes calculated adds up',  () => {

    const result = likeCalculator(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favourite blog', () => {
    const listOfBlogs = [
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'Strasse von dir',
      author: 'Raghob Boaal',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'Strasse von mir',
      author: 'Alan Walker',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'Strasse von Vivaldi',
      author: 'Joseph Goebels',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f4',
      title: 'Strasse von Bach',
      author: 'Edgar Allan Poe',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 29,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f5',
      title: 'Strasse von Jenkins',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 85,
      __v: 0
    }
]

    test('blog with most number of likes', () => {
        const result = favouriteBlog(listOfBlogs)
        expect(result).toStrictEqual(
        {
            title: "Strasse von Jenkins",
            author: "Edsger W. Dijkstra",
            likes: 85
        }
    )
    })
})

describe('most blogs', () => {
  test('author with the most number of blogs', () => {
    const listOfData = [
      {
        id : "kuydhgcvugy674256",
        author : "Ankur Warikoo",
        blogs : 9,
        likes : 99
      },
      {
        id : "ieurfuirfguygwd1324",
        author : "Doughlas Murray",
        blogs : 29,
        likes : 2
      },
      {
        id : "kuhdgviuviuhqfqiuh2615",
        author : "Steve Jones",
        blogs : 22,
        likes : 18
      },
      {
        id : "uyfqwuygqwuygcqyg",
        author : "Otto Von Bismarck",
        blogs : 18,
        likes : 77
      }
    ]

    const result = mostBlogs(listOfData)

    expect(result).toEqual(
      {
        author : "Doughlas Murray",
        blogs : 29
      }
    )
  })
  
})

describe('most likes' , () => {
  test('author with most likes', () => {
    
    const listOfData = [
      {
        id : "kuydhgcvugy674256",
        author : "Ankur Warikoo",
        blogs : 9,
        likes : 99
      },
      {
        id : "ieurfuirfguygwd1324",
        author : "Doughlas Murray",
        blogs : 29,
        likes : 2
      },
      {
        id : "kuhdgviuviuhqfqiuh2615",
        author : "Steve Jones",
        blogs : 22,
        likes : 18
      },
      {
        id : "uyfqwuygqwuygcqyg",
        author : "Otto Von Bismarck",
        blogs : 18,
        likes : 77
      }
    ]

    const result = mostLikes(listOfData)

    expect(result).toEqual(
      {
        author : "Ankur Warikoo",
        likes : 99
      }
    )

  })
})