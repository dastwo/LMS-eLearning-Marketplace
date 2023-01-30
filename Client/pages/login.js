import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import {useRouter} from 'next/router'
const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState(false);

  const { state:{user}, dispatch } = useContext(Context);

  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLogin(true);
      const { data } = await axios.post("/api/login", { email, password });
      // toast.success(data.message)
      dispatch({
        type: "LOGIN",
        payload: data,
      });
      localStorage.setItem('user', JSON.stringify(data))
      setLogin(false);
      router.push('/')
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
      setLogin(false);
    }
  };

  useEffect(()=>{
    if(user !== null) router.push('/')
  },[user])

  return (
    <>
      <h1>Login</h1>.
      <div className="container col-md-4 offset-md-4">
        <form onSubmit={handleSubmit}>
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
            disabled={!email || !password || login}
          >
            {login ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center">
          Not register? <Link href={"/register"}>Register</Link>{" "}
        </p>
        <p className="text-center ">
          <Link className="text-danger" href={"/forget-password"}>Forget password</Link>{" "}
        </p>
      </div>
    </>
  );
};

export default Login;
