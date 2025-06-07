import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoginForm, setIsLoginForm] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateSignUpData = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!emailId.trim()) newErrors.emailId = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(emailId)) newErrors.emailId = "Enter a valid email.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, { withCredentials: true });

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "Login failed. Try again.");
      console.log(err);
    }
  };

  const handleSignUp = async () => {
    if (!validateSignUpData()) return;

    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password,
      }, { withCredentials: true });

      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Signup failed. Try again.");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center bg-base-200 px-4 sm:px-6 md:px-8 lg:px-10 py-12">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-sm mx-auto">
        <div className="card bg-base-100 shadow-2xl p-6 sm:p-8 md:p-10">
          <div className="card-body">
            <h2 className="text-2xl font-semibold text-center mb-6">{isLoginForm ? "Login" : "SignUp"}</h2>
            <div className="space-y-6">

              {!isLoginForm && (
                <>
                  <div>
                    <label className="label">First Name</label>
                    <input
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      type="text"
                      className="input input-bordered w-full"
                    />
                    {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="label">Last Name</label>
                    <input
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      type="text"
                      className="input input-bordered w-full"
                    />
                    {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
                  </div>
                </>
              )}

              <div>
                <label className="label">Email</label>
                <input
                  value={emailId}
                  onChange={e => setEmailId(e.target.value)}
                  type="email"
                  className="input input-bordered w-full"
                />
                {errors.emailId && <p className="text-red-600 text-sm">{errors.emailId}</p>}
              </div>

              <div>
                <label className="label">Password</label>
                <input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  className="input input-bordered w-full"
                />
                {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}

              <div className="cursor-pointer text-blue-600 hover:underline" onClick={() => {
                setIsLoginForm(value => !value);
                setError("");
                setErrors({});
              }}>
                {isLoginForm ? "New User? Sign up here" : "Existing user? Login here"}
              </div>

              <div>
                <button
                  className="btn btn-primary w-full"
                  onClick={isLoginForm ? handleLogin : handleSignUp}
                >
                  {isLoginForm ? "Login" : "SignUp"}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


