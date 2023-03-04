const { Router } = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.get("/filter/:value", auth, async (req, res) => {
  try {
    const users = await User.find({
      email: { $regex: new RegExp(req.params.value, "gim") },
    });

    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
  }
});

router.patch("/update-cart/:id", auth, async (req, res) => {
  try {
    const { cart } = req.body;
    console.log(cart);

    await User.findOneAndUpdate({ _id: req.params.id }, { cart });

    res.status(200).json({ message: "Зміни в кошику були успішно збережені" });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так" });
  }
});

module.exports = router;
