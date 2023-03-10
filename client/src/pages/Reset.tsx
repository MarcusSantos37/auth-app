import * as yup from "yup";

import axios from "axios";
import styles from "../styles/Username.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface LoginAccountData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

export default function Reset() {
  const { register, handleSubmit } = useForm<LoginAccountData>({
    resolver: yupResolver(schema),
  });

  const resetPassword = async ({ password }) => {
    let username = "";

    try {
      const { data, status } = await axios.put("/api/resetPassword", {
        username,
        password,
      });
      return Promise.resolve({ data, status });
    } catch (error) {
      return Promise.reject({ error });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Redefinir</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Digite a nova senha.
            </span>
          </div>

          <form className="py-20" onSubmit={handleSubmit(resetPassword)}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...register("password")}
                className={styles.textbox}
                type="text"
                placeholder="Nova senha"
              />
              <input
                {...register("confirmPassword")}
                className={styles.textbox}
                type="text"
                placeholder="Repita a senha"
              />
              <button className={styles.btn} type="submit">
                Redefinir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
