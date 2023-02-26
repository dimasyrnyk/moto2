const { Router } = require("express");
const Product = require("../models/Product");
const role = require("../middleware/role.middleware");
const router = Router();

router.get("/category/:link", async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.link });

    res.json(products);
  } catch (e) {
    res.status(500).json({ message: "Товарів не знайдено" });
  }
});

router.get("/homepage", async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: -1 }).limit(10);

    res.json(products);
  } catch (e) {
    res.status(500).json({ message: "Товарів не знайдено" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "Товар не знайдено" });
  }
});

router.post("/create", role(["ADMIN"]), async (req, res) => {
  try {
    const {
      title,
      src,
      category,
      producer,
      code,
      quantity,
      status,
      price,
      businessPrice,
      shortDesc,
      fullDesc,
    } = req.body;

    const product = new Product({
      title,
      src,
      category,
      producer,
      code,
      quantity,
      status,
      price,
      businessPrice,
      shortDesc,
      fullDesc,
    });

    await product.save();

    res.status(201).json({ message: "Товар успішно створено", product });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте ще раз" });
  }
});

router.get("/search/s", async (req, res) => {
  try {
    const searchValue = req.query.q;

    const products = await Product.find({
      title: { $regex: new RegExp(searchValue, "i") },
    });

    res.json(products);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте ще раз" });
  }
});

router.patch("/edit/:id", role(["ADMIN"]), async (req, res) => {
  try {
    const {
      title,
      src,
      category,
      producer,
      code,
      quantity,
      status,
      price,
      businessPrice,
      shortDesc,
      fullDesc,
    } = req.body;

    await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        src,
        category,
        producer,
        code,
        quantity,
        status,
        price,
        businessPrice,
        shortDesc,
        fullDesc,
      }
    );

    res.status(200).json({ message: "Зміни успішно збережено" });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте ще раз" });
  }
});

router.delete("/delete/:id", role(["ADMIN"]), async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Товар видалено" });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте ще раз" });
  }
});

module.exports = router;
