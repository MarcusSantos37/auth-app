import { useEffect, useState } from "react";

import axios from "axios";
import { decodeToken } from "react-jwt";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");

  const updateQuote = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      "http://localhost:1337/api/quote",
      { quote: tempQuote },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    if (data.status === "ok") {
      setTempQuote("");
      setQuote(tempQuote);
    } else {
      alert(data.error);
    }
  };

  const populateDashboard = async () => {
    const { data } = await axios.get("http://localhost:1337/api/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
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

  return (
    <div>
      <h1>Your quote: {quote || "No quote found"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value="Update quote" />
      </form>
    </div>
  );
}
