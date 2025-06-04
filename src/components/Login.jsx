import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId,setEmailId]=useState("shikha@gmail.com")
  const [password,setPassword]=useState("Shikha@111")
  const dispatch= useDispatch();
  const navigate=useNavigate()
  const [error,setError]=useState()

  const handleLogin= async ()=>{
    try{
      const res=await axios.post(BASE_URL+"/login",{
        emailId,password
      },{withCredentials:true})
      // alert("User logged in successfully")
      // console.log(res.data)
      dispatch(addUser(res.data))
      return navigate("/feed")
    }
    catch(err){
      setError(err.response.data)
      console.log(err)
    }
  }

  return (
   <div className="flex items-center justify-center  bg-base-200 px-4 sm:px-6 md:px-8 lg:px-10 py-12">
  <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-sm mx-auto">
    <div className="card bg-base-100 shadow-2xl p-6 sm:p-8 md:p-10">
      <div className="card-body">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <div className="space-y-6">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              value={emailId}
              onChange={e=>setEmailId(e.target.value)}
              type="email"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label"  htmlFor="password">Password</label>
            <input
              value={password}
              onChange={e=>setPassword(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div className="text-red-600">
            {error}
          </div>
          <div>

            <button className="btn btn-primary w-full" onClick={handleLogin}>Login</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Login;

