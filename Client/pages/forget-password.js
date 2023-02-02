import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { Context } from "../context";

const forgetPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);
  const router = useRouter();
  useEffect(() => {
    if (user !== null) router.push("/");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forget-password", { email });
      setSuccess(true);
      toast.success("Check your email for the secret code");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setCode("");
      setEmail("");
      setNewPassword("");
      setLoading(false);
      router.push('/login')
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className="text-center ">Forget password</h1>
      <div class="container col-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className="form-control mb-4"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {success && (
            <>
              <input
                type="text"
                className="form-control mb-4"
                placeholder="Enter secret code"
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mb-4"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </>
          )}
          <button
            type="submit"
            className="btn  btn-primary "
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default forgetPassword;
