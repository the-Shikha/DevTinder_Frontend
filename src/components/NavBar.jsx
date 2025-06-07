import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user=useSelector(store=>store.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  //console.log(user)

  const handleLogout=async ()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{withCredentials:true})
      dispatch(removeUser())
      return navigate("/login")
    }
    catch(err){
      console.log(err.message)
      
      //console.log(err.message)
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* Left: Logo */}
      <div className="flex-1">
      {user?<Link to="/" className="btn btn-ghost normal-case text-xl">DevTinder</Link>:<a className="btn btn-ghost normal-case text-xl">DevTinder</a>}
       
       
      </div>

      
      
      {user && (<div className=" md:flex items-center gap-2">
       
        <div className="dropdown dropdown-end flex">
          <div className="px-4 py-1">Welcome, {user.firstName}</div>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="User avatar"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">Edit</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>)}

      
    </div>
  );
};

export default NavBar;
