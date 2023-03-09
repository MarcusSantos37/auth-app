import * as yup from "yup";

import axios from "axios";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useEffect } from "react";
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

    if (data.token) {
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      navigate("/dashboard");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      if (user) {
        navigate("/dashboard");
      }
    }
  }, []);

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
