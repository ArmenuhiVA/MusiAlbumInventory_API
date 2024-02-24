const fs = require('fs');
const { off } = require('process');
const albumsFilePath = "./data/albums.json";  

const getPosts = () => {
    let posts = [];
    return new Promise((resolve, reject) => {
      fs.readFile(albumsFilePath, (err, data) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        console.log(data);
        posts = data.toString('utf8');
        resolve(JSON.parse(posts));
      })
    })
  }
  
  const createPost = (post) => {
    return new Promise((resolve, reject) => {
      getPosts().then(data => {
        const length = data.length;
        let id;
        if (!length) {
          id = 1;
        } else {
          id = data[length - 1].id + 1;
        }
        post.id = id;
        data.push(post)
        fs.writeFile(albumsFilePath, JSON.stringify(data), (err) => {
          if (err) {
            console.error(err.message);
            reject(err);
          }
          resolve(post);
        })
      })
    })
  }
  
  const updatePost = (currentPosts, index, newData) => {
    currentPosts[index] = {...currentPosts[index], ...newData}
    return new Promise((resolve, reject) => {
      fs.writeFile(albumsFilePath, JSON.stringify(currentPosts), (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve(currentPosts[index]);
      })
    })
  }
  
  const deletePost = (receivedPosts, postIndex) => {
    receivedPosts.splice(postIndex, 1)
    return new Promise((resolve, reject) => {
      fs.writeFile(albumsFilePath, JSON.stringify(receivedPosts), (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        }
        resolve()
      })  
    })
  };

  module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
  }
  