const { Router } = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const ResetCode = require("../models/ResetCode");
const router = Router();

const getResetCode = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const sendMail = (email, code) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      accessToken: process.env.OAUTH_ACCESS_TOKEN,
    },
  });

  let mailOptions = {
    from: process.env.FROM_EMAIL_ADDRESS,
    to: email || process.env.TO_EMAIL_ADDRESS,
    subject: "[Moto2] Запит на зміну паролю",
    text: "Ваш код для для зміни паролю " + code + " дійсний 5 хвилин",
    html: `<p>
        <h1 style="text-align:center">Ми отримали ваш запит на зміну паролю до профілю MOTO2</h1>
        <p style="text-align:center">Щоб змінити пароль будь ласка введіть код нижче</p>
        <h2 style="text-align:center; background-color:#EAFAF1; width:200px; padding:10px; margin:0 auto"><b>${code}</b></h2>
        <p style="text-align:center; font-size:14px">Це повідомлення було відправлено автоматично. Будь ласка не відповідайте на нього.</p>
    </p>`,
  };

  return transporter.sendMail(mailOptions);
};

router.post(
  "/userconfirm",
  [check("email", "Введіть email").notEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Введіть email", errors: errors.array() });
      }

      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено" });
      }

      let code = await ResetCode.findOne({ userId: user._id });
      if (code) await code.deleteOne();
      let resetCode = getResetCode(100100, 1000000);

      try {
        await sendMail(email, resetCode);
      } catch (e) {
        return res.status(500).json({ message: "Збій відправлення" });
      }

      await new ResetCode({
        userId: user._id,
        code: resetCode,
        createdAt: Date.now(),
      }).save();

      res
        .status(201)
        .json({
          message: "Код відправлено на Email",
          confirmUser: true,
          userId: user._id,
        });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.post(
  "/emailconfirm",
  [check("code", "Ведіть код").notEmpty().isLength({ min: 6 }, { max: 6 })],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Не коректний код", errors: errors.array() });
      }

      const { id, code } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено" });
      }

      const resetCode = await ResetCode.findOne({ userId: user._id });
      if (!resetCode) {
        return res.status(400).json({ message: "Не дійсний код" });
      }

      if (resetCode.code !== code) {
        return res.status(400).json({ message: "Не дійсний код" });
      }

      res
        .status(201)
        .json({
          message: "Код підтверджено",
          confirmEmail: true,
          userId: user._id,
        });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.post(
  "/resetpass",
  [
    check(
      "password",
      "Ваш пароль повинен бути не менше 6 та не більше 15 символів"
    )
      .notEmpty()
      .isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Не вірні дані", errors: errors.array() });
      }

      const { id, password } = req.body;

      const user = await User.findById(id);
      if (!user) {
        return res.status(400).json({ message: "Користувача не знайдено" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await User.updateOne({ _id: id }, { password: hashedPassword });

      res.status(201).json({ message: "Пароль оновлено", status: true });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так, спробуйте знову" });
    }
  }
);

module.exports = router;
