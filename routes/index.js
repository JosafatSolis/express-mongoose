const express = require("express");
const router = express.Router();
const Restaurant = require("../models/Restaurant");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/restaurants", (req, res) => {
  Restaurant.find().populate('owner').then((restaurants) => {
    res.status(200).json(restaurants);
  });
});

router.post("/restaurants", (req, res) => {
  // req.body ya es un objeto porque ya se importó express.json
  Restaurant.create(req.body)
    .then((inserted) => {
      res.status(201).json(inserted);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// Root params: /restaurants/:id
router.patch("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  console.log("Id: ", id);
  // Restaurant.findByIdAndUpdate(id, req.body, (err, rest) => {
  //   if (err) {
  //     console.log("Error: ", err);
  //   } else {
  //     return new Promise((resolve) => {return rest})
  //   }
  // }).then((rest) => {
  //   console.log(`Updated: ${rest}`);
  //   res.json({rest});
  // });

  Restaurant.findByIdAndUpdate(id, req.body, { new: true }).then(
    (restaurant) => {
      res.json({ restaurant });
    }
  );
});

router.delete("/restaurants/:id", (req, res) => {
  const { id } = req.params;
  Restaurant.findByIdAndDelete(id).then((restaurant) => {
    res.json({ restaurant });
  });
});

module.exports = router;
