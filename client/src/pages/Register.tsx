import * as yup from "yup";

import axios from "axios";
import { useForm } from "react-hook-form";
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

  const registerAccount = async (values: RegisterAccountData) => {
    await axios.post("http://localhost:1337/api/register", values);
  };

  return (
    <div>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit(registerAccount)}>
        <input {...register("name")} type="text" placeholder="Nome" />
        <input {...register("email")} type="text" placeholder="Email" />
        <input {...register("password")} type="text" placeholder="Senha" />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}
