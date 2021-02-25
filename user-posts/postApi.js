const axios = require('axios');

const host = 'https://jsonplaceholder.typicode.com';

var getUser = async (userId) => {

  const url = `${host}/users/${userId}`;
  try {
    const user = await axios.get(url);
    return user.data;

  } catch (e) {
    console.log(e);
    throw new Error(`Unable to get user from ${url}`);
  }
}

var getUserPosts = async (userId) => {
  const url = `${host}/posts?userId=${userId}`;
  try {
    const posts = await axios.get(url);
    return posts.data;

  } catch (e) {
    console.log(e);
    throw new Error(`Unable to get posts from ${url}`);
  }
}


var getUserAndPosts = async (userId) => {
  const result = await Promise.all([getUser(userId), getUserPosts(userId)]);
  return { user: result[0], posts: result[1] };
}

var createPost = async (post) => {
  const url = `${host}/posts`;
  try {
    const result = await axios.post(url, post);
    return result.data;
  }
  catch (e) {
    console.log(e);
    throw new Error(`Unable to create post at ${url}`);
  }
}

var updatePost = async (post) => {
  const url = `${host}/posts/${post.id}`;
  try {
    const result = await axios.patch(url, post);
    return result.data;
  }
  catch (e) {
    console.log(e);
    throw new Error(`Unable to update post at ${url}`);
  }
}

var deletePost = async (postId) => {

  const url = `${host}/posts/${postId}`;

  try {
    const result = await axios.delete(url);
    return result.data;

  } catch (e) {
    throw new Error(`Unable to delete data from ${url}`);
  }

}


module.exports = { getUserAndPosts, createPost, updatePost, deletePost };