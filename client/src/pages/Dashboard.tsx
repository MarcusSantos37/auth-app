import axios from "axios";
import { decodeToken } from "react-jwt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const populateDashboard = async () => {
    const { data } = await axios.get("http://localhost:1337/api/login", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    console.log("dados", data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = decodeToken(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateDashboard();
      }
    }
  }, []);

  return <h1>Você está logado!</h1>;
}
