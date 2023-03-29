const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app)

let initialBlogLength = 0

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    initialBlogLength = blogs.length
    return blogs.map(blog => blog.toJSON())
}

describe('integration testing', () => {

    test('notes are returned as json',  async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of blog posts are returned' , async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogLength)
    })

    test('id is defined as id and not _id', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body.forEach(item => {
            expect(item.id).toBeDefined()
            expect(item._id).toBe(undefined)
        }))
    })

    test('notes are getting added successfully', async () => {

        const newBlog = {
            title : "Destros De Lestro",
            author : "Bach",
            url : "www.youtube.com/wathc?=wjhgefuyq7846784rsd",
            likes : 123054653
        }
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await blogsInDb()

        const blogsContent = blogsAtEnd.map(r => r.title)
        expect(blogsContent).toContain(
            "Destros De Lestro"
        )
            
    })

    test('missing likes property defaults to zero', async () => {
        const missingLikeBlog = {
            title : "Take My Breath",
            author : "Abel Washington",
            url : "https://www.youtube.com/watch?v=u9BQhXf4yQc"
        }

        await api
            .post("/api/blogs")
            .send(missingLikeBlog)
            .expect(200)

        expect(missingLikeBlog.likes)
    })

    test('missing properties' , async () => {
        const missingPropertiesObjectOne = {
            author : "Justin Bieber",
            url : "www.youtube.com/watch?o=halisdb25r3hgb57"
        }
        const missingPropertiesObjectTwo = {
            title : "Boyfriend",
            author : "Chunky Pandey"
        }

        await api
            .post('/api/blogs')
            .send(missingPropertiesObjectOne)
            .expect(400)

        expect(missingPropertiesObjectOne.author)

    },30000)

})

describe( "put request" , () => {

    test('updating likes' , async () => {
        const modifiedBlog = {
            title : "Watch Me Sleep",
            author : "Gustavo",
            url : "www.youtube.com/watch?=bc349873f98",
            likes : 300
        }

    const blogs = await blogsInDb()
    const blogToBeChanged = blogs.filter(blog => blog.title === modifiedBlog.title)
    const blogToBeChangedId = blogToBeChanged[0].id

    await api
        .put(`/api/blogs/${blogToBeChangedId}`)
        .send(modifiedBlog)
        .expect(200)

    expect(blogToBeChanged[0].likes).toBe(300)
    })
})

describe( "delete request", () => {

    test.only('checking whether the blog exists' , async () => {
        const blogs = await blogsInDb() //asynchronous function to fetch all the blogs in the db
        const blogToBeDeleted = blogs[0]
        const blogToBeDeletedId = blogToBeDeleted.id

        await api
            .get(`/api/blogs/${blogToBeDeletedId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test.only('deleting blogs' , async () =>  {
        const blogsInStart = await blogsInDb() //asynchronous function to fetch all the blogs in the db
        const blogToBeDeleted = blogsInStart[0]
        const blogToBeDeletedId = blogToBeDeleted.id
        
        await api
            .delete(`/api/blogs/${blogToBeDeletedId}`)
            .send(blogToBeDeleted)
            .expect(204)

    })
})


afterAll(async () => {
    await mongoose.connection.close()
})