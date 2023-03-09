import { useCallback, useEffect, useState } from "react";

import axios from "axios";
import { decodeToken } from "react-jwt";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  const populateDashboard = useCallback(async () => {
    const { data } = await axios.get("http://localhost:1337/api/user", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (data.success) {
      setUser(data.user);
    } else {
      toast.error(data.message);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedUser = decodeToken(token);
      if (!decodedUser) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        populateDashboard();
      }
    } else {
      navigate("/login");
    }
  }, [populateDashboard, navigate]);

  return (
    <div>
      <h1>Olá: {user?.name}, seja bem vindo!</h1>
    </div>
  );
}
