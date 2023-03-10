import * as yup from "yup";

import { useEffect, useState } from "react";

import avatar from "../assets/profile.png";
import axios from "axios";
import convertToBase64 from "../utils/convert";
import { decodeToken } from "react-jwt";
import extend from "../styles/Profile.module.css";
import styles from "../styles/Username.module.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginAccountData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

export function Dashboard() {
  const { register, handleSubmit } = useForm<LoginAccountData>({
    resolver: yupResolver(schema),
  });

  const { getUser, user } = useUser();

  const navigate = useNavigate();

  const [file, setFile] = useState<string | undefined>();

  const editProfile = async (values: LoginAccountData) => {
    const { data } = await axios.put(
      "http://localhost:1337/api/updateuser",
      { ...values },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };

  const onUpload = async (e) => {
    const base64 = (await convertToBase64(e.target.files[0])) as string;
    setFile(base64);
  };

  const logoutAccount = () => {};

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = decodeToken(token);
      if (!decodedUser) {
        localStorage.removeItem("token");
        navigate("/login");
      } else if (!user) {
        getUser();
      }
    } else {
      navigate("/login");
    }
  }, [getUser, navigate]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Perfil</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Você pode atualizar os detalhes.
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit(editProfile)}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={user?.profile || file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
                className={`${styles.textbox} ${extend.textbox}`}
                type="text"
                placeholder="Email*"
              />
              <button className={styles.btn} type="submit">
                Editar
              </button>
            </div>

            <div className="text-center py-4">
              <button onClick={logoutAccount} className="text-red-500">
                Sair da conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
