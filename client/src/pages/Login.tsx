import * as yup from "yup";

import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginAccountData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export function Login() {
  const { register, handleSubmit } = useForm<LoginAccountData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const loginAccount = async (values: LoginAccountData) => {
    const { data } = await axios.post(
      "http://localhost:1337/api/login",
      values
    );

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login bem sucedido");
      navigate("/dashboard");
    } else {
      alert("Por favor, verifique seu email e senha");
    }
  };

  return (
    <div>
      <h1>Entrar</h1>
      <form onSubmit={handleSubmit(loginAccount)}>
        <input {...register("email")} type="text" placeholder="Email" />
        <input {...register("password")} type="text" placeholder="Senha" />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
