const express = require('express');
const app = express();
const port = 3002;
const signUp = require('./controller/signInController.js')

const db = {
    users: {
      id: 0,
      data: [],
    },
    profiles: {
      id: 0,
      data: [], 
    },
    posts: {
      id: 0,
      data: [],
    },
    comments: {
      id: 0,
      data: [],
    },
  }; 

app.set('db', db);
app.use(express.json())

app.post('/sign-up', signUp.create)
app.get('/debug', signUp.debug)
app.patch('/profile/:userId', signUp.update)
app.post('/posts', signUp.post)
app.post('/comments', signUp.comment)
app.get('/profile', signUp.fetch)
app.get('/posts/:postId', signUp.fetchPostComment)
app.get('/user/:usersId/posts', signUp.fetchPost);

app.listen(port, () => {
    console.log(`Server Listening on port : ${port}`);
})  