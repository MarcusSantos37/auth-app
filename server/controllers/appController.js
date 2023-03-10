import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

/** Create a user account */
export async function register(req, res) {
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
}

/** Login account */
export async function login(req, res) {
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
        id: user.id,
      },
      "secret123"
    );

    return res.json({ success: true, token });
  } else {
    return res.json({ success: false, message: "Senha inválida" });
  }
}

/** Fetch User Informations */
export async function user(req, res) {
  try {
    const token = req.headers["x-access-token"];
    const { id } = jwt.verify(token, "secret123");

    const user = await User.findOne({
      _id: id,
    });

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({ success: false, message: "Usuário não encontrado" });
  }
}

/** Update User Informations */
export async function updateUser(req, res) {
  try {
    const token = req.headers["x-access-token"];
    const { id } = await jwt.verify(token, "secret123");

    const user = await User.findOne({
      _id: id,
    });

    if (user) {
      const body = req.body;

      const updateUserData = {
        $set: {
          ...body,
        },
      };

      await User.updateOne({ _id: id }, updateUserData);

      return res.json({
        success: true,
        message: "Usuário editado com sucesso!",
      });
    } else {
      return res.json({
        success: false,
        message: "Não foi possível editar o usuário, tente novamente!",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Não foi possível editar o usuário, tente novamente!",
    });
  }
}
