const request = require('supertest');
const app = require('../index.js');

const Post = require('../models/Post.js');

describe('testing/post_CRUD',()=>{

    const post = [
        {
            title:'Titulo prueba 1',
            body: 'tengo que añadir el js al lorem del code :) 1'
        },
        {
            title:'Titulo prueba 2',
            body: 'tengo que añadir el js al lorem del code :( 2'
        },
        {
            title:'Titulo prueba 3',
            body: 'tengo que añadir el js al lorem del code :/ 3'
        }
    ]

    beforeEach(async () => await Post.deleteMany({}));
    afterEach(async () => await Post.deleteMany({}));

    describe('POST /create',()=>{
        test('Test : new post creation',async ()=>{
            let postCount = await Post.countDocuments({});
            expect(postCount).toBe(0);
    
            const newPost = await request(app).post('/create').send(post[0]).expect(201);
    
            postCount = await Post.countDocuments({});
            expect(postCount).toBe(1);
    
            expect(newPost.body._id).toBeDefined();
            expect(newPost.body.title).toBe(post[0].title);
            expect(newPost.body.body).toBe(post[0].body);
            expect(newPost.body.createdAt).toBeDefined();
            expect(newPost.body.updatedAt).toBeDefined();
        })
    })
    describe('GET /',()=>{
        test('Test : view all posts',async ()=>{

            const newPosts = await Post.create(post);
            const allPosts = await request(app).get('/').expect(201);

            expect(allPosts.body.length).toBe( newPosts.length);
    
            expect(allPosts.body[0].title).toBe(post[0].title);
            expect(allPosts.body[0].body).toBe(post[0].body);

            expect(allPosts.body[1].title).toBe(post[1].title);
            expect(allPosts.body[1].body).toBe(post[1].body);
            
            expect(allPosts.body[2].title).toBe(post[2].title);
            expect(allPosts.body[2].body).toBe(post[2].body);

        })
    })
    
})