const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const {validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => 
{
    const listOfPosts = await Posts.findAll({ include: [Likes]});

    const likedPosts = await Likes.findAll({where : {UserId: req.user.id }});
    res.json({listOfPosts : listOfPosts, likedPosts : likedPosts});
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.post("/",validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;
    await Posts.create(post);

    res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => 
{   
    const postId = req.params.postId;
    await Posts.destroy( { where : { id:postId }});

    res.json("deleted success");
});

//get post by user id
router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
        where: {UserId: id}, 
        include: [Likes]
    });
    res.json(listOfPosts);
})

router.put("/title",validateToken, async (req, res) => {
    const {newTitle, id} = req.body;
    await Posts.update({title: newTitle}, {where: {id:id}})

    res.json(newTitle);
});

router.put("/postText",validateToken, async (req, res) => {
    const {newPostText, id} = req.body;
    await Posts.update({postText: newPostText}, {where: {id:id}})

    res.json(newPostText);
});

module.exports = router