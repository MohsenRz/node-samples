const api = require('./postApi');


api.getUserAndPosts(1).then(res => console.log(res)).catch(e => console.log(e));

// api.createPost({ title: 'title', body: 'body', userId: 1 }).then(res => console.log(res)).catch(e => console.log(e));

// api.updatePost({ title: 'new title', body: 'new body', userId: 1 }).then(res => console.log(res)).catch(e => console.log(e));

// api.deletePost(1).then(res => console.log(res)).catch(e => console.log(e));

