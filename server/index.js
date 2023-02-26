const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/reset", require("./routes/reset.routes"));
app.use("/api/product", require("./routes/product.routes"));
app.use("/api/category", require("./routes/category.routes"));
app.use("/api/user", require("./routes/user.routes"));

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../", "client", "build")));

  app.get("*", (req, res) => {
    res.send(path.resolve(__dirname, "../", "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () =>
      console.log(`Server hes been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
