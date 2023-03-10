import { useEffect, useState } from "react";

import axios from "axios";
import styles from "../styles/Username.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Recovery() {
  let username = "";

  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  const generateOTP = async (username: string) => {
    try {
      const {
        data: { code },
        status,
      } = await axios.get("/api/generateOTP", { params: { username } });

      // send mail with the OTP
      if (status === 201) {
        let {
          data: { email },
        } = await getUser({ username });
        let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
        await axios.post("/api/registerMail", {
          username,
          userEmail: email,
          text,
          subject: "Password Recovery OTP",
        });
      }
      return Promise.resolve(code);
    } catch (error) {
      return Promise.reject({ error });
    }
  };

  const verifyOTP = async ({ username, code }) => {
    try {
      const { data, status } = await axios.get("/api/verifyOTP", {
        params: { username, code },
      });
      return { data, status };
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const resendOTP = () => {
    generateOTP(username);
  };

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wront OTP! Check email again!");
    }
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Enter OTP to recover password.
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
              </div>

              <button className={styles.btn} type="submit">
                Recover
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?{" "}
              <button onClick={resendOTP} className="text-red-500">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
