import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { SyncOutlined } from "@ant-design/icons"
import Link from "next/link"

const Register = () => {
  const [user, setUser] = useState({name:'', email:'', password:''})
  const [login, setLogin] = useState(false)
  const handleSubmit = async e =>{
    e.preventDefault();
   try {
    setLogin(true)
    const {data} = await axios.post('/api/register', {user})
    toast.success(data.message)
    setLogin(false)
   } catch (err) {
    console.log(err);
    toast.error(err.response.data.message )
    setLogin(false)
   }
  }
  const handleInputChange = e =>{
    const {name, value} = e.target
    setUser({...user, [name]:value})
  }
  return (
    <>
    <h1>
      Register
    </h1>

    .<div className="container col-md-4 offset-md-4">
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={handleInputChange} placeholder='Enter your name' className="form-control mb-4 p-4" name="name" required/>

        <input type='email' onChange={handleInputChange} placeholder='Enter your email' className="form-control mb-4 p-4" name="email" required/>

        <input type='password' onChange={handleInputChange} placeholder='Enter your password' className="form-control mb-4 p-4" name="password" required/>
        <button type="submit" className="btn btn-block btn-primary" disabled={!user.name || !user.email || !user.password || login}>{login ? <SyncOutlined spin/> : 'Submit'}</button>
      </form>
      <p className="text-center">Already register? {' '} <Link href={'/login'}>Login</Link> </p>
    </div>
    </>
  )
}

export default Register