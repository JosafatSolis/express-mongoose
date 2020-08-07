const express = require('express');
const router = express.Router();
const User = require("../models/User");

// Sólo 2 urls por objeto
// /users/
// /users/:id

// GET
// POST
// PATCH
// PATCH

router.get('/', (req, res) => {
  User.find().then((users) => {
    res.status(200).json({ users });
  }).catch((reason) => {
    res.status(400).json(reason);
  });
});

router.post("/", (req, res) => {
  User.create(req.body).then((created) => {
    res.status(200).json({ created });
  });
});


module.exports = router;
