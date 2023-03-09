import * as yup from "yup";

import { Link, useNavigate } from "react-router-dom";

import avatar from "../assets/profile.png";
import axios from "axios";
import convertToBase64 from "../utils/convert";
import styles from "../styles/Username.module.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

interface RegisterAccountData {
  email: string;
  password: string;
  name: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

export function Register() {
  const { register, handleSubmit } = useForm<RegisterAccountData>({
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState<string | undefined>();

  const navigate = useNavigate();

  const registerAccount = async (values: RegisterAccountData) => {
    const { data } = await axios.post("http://localhost:1337/api/register", {
      ...values,
      profile: file || "",
    });
    if (data.success) {
      toast.success(data.message);
      navigate("/login");
    } else {
      toast.error(data.message);
    }
  };

  const onUpload = async (e: any) => {
    const base64 = (await convertToBase64(e.target.files[0])) as string;
    setFile(base64);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Registrar</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Seja bem vindo!
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit(registerAccount)}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...register("email")}
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                {...register("name")}
                className={styles.textbox}
                type="text"
                placeholder="Nome*"
              />
              <input
                {...register("password")}
                className={styles.textbox}
                type="text"
                placeholder="Senha*"
              />
              <button className={styles.btn} type="submit">
                Registrar
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Possui uma conta?{" "}
                <Link className="text-red-500" to="/">
                  Entre agora
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
