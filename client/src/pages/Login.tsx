import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import avatar from "../assets/profile.png";
import axios from "axios";
import { decodeToken } from "react-jwt";
import styles from "../styles/Username.module.css";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      if (user) {
        navigate("/");
      }
    }
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Olá novamente!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore mais conectando-se conosco.
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit(loginAccount)}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...register("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email"
              />
              <input
                {...register("password")}
                className={styles.textbox}
                type="password"
                placeholder="Senha"
              />
              <button className={styles.btn} type="submit">
                Entrar
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Não é um membro?{" "}
                <Link className="text-red-500" to="/register">
                  Crie sua conta
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
