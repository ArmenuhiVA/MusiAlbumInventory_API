
const express = require('express');

const {albumSchema, validate } = require('../validations/validations.js');
const {getPosts, createPost, deletePost, updatePost} = require('../controllers/albumController.js');

const router = express.Router(); 

router.post('/', validate(albumSchema), (req, res) => {
    createPost(req.body).then(createdPost =>{
      res.status(201).send(createdPost);
    }).catch(err => {
      console.error("error", err);
      res.status(500).send({
        message: "Something went wrong."
      })
    }) 
  });
  
  router.get('/', (req, res) => {
    getPosts().then(posts => {
      res.status(200).send(posts);
    }).catch(err => {
      console.error("error", err);
      res.status(500).send({
        message: "Something went wrong."
      })
    })
  })
  
  router.get('/:id', (req, res) => {
    const id = req.params.id;
    // console.log(req.params)
    getPosts().then(receivedPosts => {
      const postIndex = receivedPosts.findIndex((el) => el.id == id);
      if (postIndex === -1) {
        res.status(404).send({
          message: "Post not found."
        })
      }else{
        res.status(200).send(receivedPosts[postIndex])
      }
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).send({
        message: "Something went wrong."
      })
    }) 
  })
  
  router.put('/:id',  validate(albumSchema), (req, res) => {
    const id = req.params.id;
    const updatedPost = req.body;
    getPosts().then(receivedPosts => {
      const postIndex = receivedPosts.findIndex((el) => el.id == id);
      if (postIndex === -1) {
          res.status(404).send({
          message: "Post not found."
        })
      } else {
        updatePost(receivedPosts, postIndex, updatedPost).then(post => {
          console.log("post updated", post);
          res.status(200).send(post);
        })
      }; 
    })
    .catch(err => {
      console.error("error", err);
      res.status(500).send({
        message: validation.error.message
      })
    })
  })

  router.delete('/:id', (req, res) =>{
    getPosts().then(receivedPosts => {
      const id = req.params.id;
        const postIndex = receivedPosts.findIndex((el) => el.id == id);
        if (postIndex === -1) {
          res.status(404).send({
            message: "Post not found."
          })
        }else{
          deletePost(receivedPosts, postIndex).then(() => {
            res.status(200).send({
                message: `Post with id - ${id} successfully deleted`
            })
          }) .catch(err => {
            console.error("error", err)
            res.status(500).send({
            message: "Something went wrong."
            })
          })
        }
      }) 
  })

  module.exports = router