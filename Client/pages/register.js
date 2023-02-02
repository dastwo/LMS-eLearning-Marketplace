import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const router = useRouter();
  const {
    state: { user },
  } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLogin(true);
      const { data } = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      toast.success(data.message);
      setLogin(false);
      setEmail("");
      setName("");
      setPassword("");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
      setLogin(false);
    }
  };

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  return (
    <>
      <h1 className="text-center">Register</h1>.
      <div className="container col-md-4 offset-md-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="form-control mb-4 p-4"
            name="name"
            required
          />

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="form-control mb-4 p-4"
            name="email"
            required
          />

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="form-control mb-4 p-4"
            name="password"
            required
          />
          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!name || !email || !password || login}
          >
            {login ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center">
          Already register? <Link href={"/login"}>Login</Link>{" "}
        </p>
      </div>
    </>
  );
};

export default Register;
