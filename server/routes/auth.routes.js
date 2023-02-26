const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Role = require("../models/Role");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post(
  "/register",
  [
    check("email", "Не коректний email").notEmpty().isEmail(),
    check(
      "password",
      "Ваш пароль повинен бути не менше 6 та не більше 15 символів"
    )
      .notEmpty()
      .isLength({ min: 6 }),
    check("firstname", "Ваше ім'я повинне бути не менше 3 символів")
      .notEmpty()
      .isLength({ min: 6 }),
    check("lastname", "Ваша фамілія повинна бути не менше 3 символів")
      .notEmpty()
      .isLength({ min: 6 }),
    check("phone", "Введіть коректний номер телефону").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Не вірні дані при реєстрації",
          errors: errors.array(),
        });
      }

      const { email, password, firstname, lastname, phone, avatar } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач з таким email вже існує" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        phone,
        avatar,
        roles: [userRole.value],
        discount: 0,
        cart: {},
        orders: [],
      });

      await user.save();

      res.status(201).json({ message: "Користувача створено" });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Будь ласка, введіть коректний email").isEmail(),
    check("password", "Будь ласка, введіть коректний пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Не вірні дані", errors: errors.array() });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Не вірний пароль, спробуйте ще" });
      }

      const token = jwt.sign(
        { userId: user._id, roles: user.roles },
        process.env.JWT_SECTRET,
        { expiresIn: "24h" }
      );

      res.json({
        message: `Ваш вхід був успішний. Ласкаво просимо, ${user.firstname}!`,
        token,
        user: {
          _id: user._id,
          roles: user.roles,
          firstname: user.firstname,
          cart: user.cart,
        },
      });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }
);

router.get("/:id", auth, async (req, res) => {
  try {
    const activeUser = await User.findById(req.params.id);

    res.json(activeUser);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
  }
});

module.exports = router;
