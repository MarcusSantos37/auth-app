const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./models/user.model");

app.use(cors());
app.use(express.json());

// Connect to mongoDB database
mongoose.connect("mongodb://localhost:27017/auth-app");

// Create an account
app.post("/api/register", async (req, res) => {
  try {
    const existingEmail = await User.findOne({ email: req.body.email });

    if (existingEmail) {
      return res.json({ success: false, message: "Esse email já existe" });
    } else {
      const newPassword = await bcrypt.hash(req.body.password, 10);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        profile: req.body.profile,
        password: newPassword,
      });
    }
    res.json({ success: true, message: "Usuário criado com sucesso" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Login account
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ success: false, message: "Esse usuário não existe" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );

    return res.json({ success: true, token });
  } else {
    return res.json({ success: false, message: "Senha inválida" });
  }
});

// Fetch user information
app.get("/api/user", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, "secret123");
    const decodedEmail = decoded.email;
    const user = await User.findOne({
      email: decodedEmail,
    });

    const { email, name, profile } = user;

    return res.json({
      success: true,
      user: {
        email,
        name,
        profile,
      },
    });
  } catch (error) {
    res.json({ success: false, message: "Usuário não encontrado" });
  }
});

app.listen("1337", () => {
  console.log("Server started on 1337");
});
