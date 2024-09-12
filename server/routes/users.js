const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const {sign} = require('jsonwebtoken');
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
  
    // Check if the username already exists
    const existingUser = await Users.findOne({ where: { username: username } });
  
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }
  
    // Hash the password with salt round = 10 
    const hash = await bcrypt.hash(password, 10);
    
    // Create the user with the hashed password
    await Users.create({
      username: username,
      password: hash,
    });
  
    res.json("Success");
});
  
  
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in the database
        const user = await Users.findOne({ where: { username: username } });

        // If user doesn't exist, send error response
        if (!user) {
        return res.json({ error: "User does not exist" });
        }

        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
            return res.json({ error: "Wrong password" });
        }

        const accessToken = sign(
            {username: user.username, id: user.id}, 
            "importantsecret"
        );

        res.json({token: accessToken, username: username, id:user.id });

        });

    } catch (error) {
        // If any error occurs, log it and prevent server crash
        console.error("Login error:", error);
        res.status(500).json({ error: "An internal server error occurred" });
    }
});
  
router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.get("/basicInfo/:id", async (req, res) => {
    const id = req.params.id;  
    const basicInfo = await Users.findByPk(id, 
        {attributes: {exclude : ['password']}}
    );

    res.json(basicInfo);
})

// change password
router.put("/changepassword", validateToken, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    // find username and match password
    const user = await Users.findOne({ where: { username: req.user.username } });
    const match = await bcrypt.compare(oldPassword, user.password);
    
    if (!match) {
        return res.json({ error: "Wrong password" });
    }

    // hash new password and update
    const hash = await bcrypt.hash(newPassword, 10);
    await Users.update({ password: hash }, { where: { username: req.user.username } });

    res.json('Password updated successfully');
});


module.exports = router