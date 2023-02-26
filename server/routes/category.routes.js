const { Router } = require("express");
const Category = require("../models/Category");
const router = Router();

router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find();

    res.json(categories);
  } catch (e) {
    res.status(500).json({ message: "Категорій не знайдено" });
  }
});

router.get("/:link", async (req, res) => {
  try {
    const category = await Category.find({ link: req.params.link });

    res.json(category[0]);
  } catch (e) {
    res.status(500).json({ message: "Категорію не знайдено" });
  }
});

module.exports = router;
