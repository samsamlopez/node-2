
module.exports = {
    create: function(req, res) {
        const db = req.app.get('db')
        const { email, password } = req.body;
        const id = db.users.id
        db.users.data.push({ id, email, password })
        db.users.id++;

        const idProfile = db.profiles.id
        db.profiles.data.push({idProfile})
        db.profiles.id++;
        res.status(201).json(db)
        
    },
    debug: function(req, res) {
        const db = req.app.get('db')
        res.status(200).json(db);
    }, 
    update: function(req, res){
        const db = req.app.get('db')
        const {userId} = req.params
        const profileIndex = db.profiles.data.findIndex(val => val.idProfile === parseInt(userId));
        
        const profile = [db.profiles.data[profileIndex]];
        Object.assign(...profile, req.body);

        res.status(200).json(db.profiles.data[profileIndex]);
    },
    post: function(req, res){
        const db = req.app.get('db')
        const {userId,content} = req.body;
        const postId = db.posts.id
        db.posts.data.push({postId,userId,content})
        db.posts.id++;
        res.status(201).json(db.posts)


    },
    comment: function(req, res){
        const db = req.app.get('db')
        const {userId,postId,content} = req.body

        const commentId = db.comments.id
        db.comments.data.push({commentId,postId,userId,content})
        db.comments.id++;
        res.status(201).json(db.comments)

    },
    fetch: function(req, res){
        const db = req.app.get('db')
        if(req.query.email){
            const userIndex = db.users.data.findIndex(val => val.email === req.query.email );
            res.status(200).json(db.users.data[userIndex]);
        }else if(req.query.userId){
            const userIndex = db.users.data.findIndex(val => val.id === parseInt(req.query.userId) );
            res.status(200).json(db.users.data[userIndex]);
        }else{
            res.status(200).json(db.users.data);
        }
    },
    fetchPostComment: function(req, res){
        const db = req.app.get('db')
        const {postId} = req.params
        const commentArr = []
        const postIndex = db.posts.data.findIndex(val => val.postId === parseInt(postId));
        if(req.query.comments===""){
            db.comments.data.map(val => {
                if(val.postId=== parseInt(postId)){
                    commentArr.push(val)
                }
                return commentArr;
             })  
        }else{
            commentArr.push(db.posts.data[postIndex])
        }
        res.status(200).json(commentArr)
        
    },
    fetchPost: function(req, res) {
        const db = req.app.get('db');
        const { usersId } = req.params
        let posts = [];
        db.posts.data.map(post => {
          if(post.userId === parseInt(usersId)){
            posts.push(post);
          }
          return posts;
        })
        res.status(200).json(posts)
      }
}