import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, registerUser } from "../store/reducer/User"; // you need loginUser too
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin) {
      try {
        // 1. Register
        const registerResponse = await dispatch(
          registerUser(formData)
        ).unwrap();
        console.log("Registered:", registerResponse);
        navigate("/");
        // 3. Redirect or show success message (optional)
        // navigate('/dashboard'); or set some "success" state
      } catch (error) {
        console.error("Registration/Login failed:", error);
      }
    } else {
      try {
        const loginfoam = {
          email: formData.email,
          password: formData.password,
        };
        const loginResponse = await dispatch(loginUser(loginfoam)).unwrap();
        navigate("/");
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div
        className="card shadow-lg p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4">
          {isLogin ? "Welcome Back!" : "Create an Account"}
        </h3>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="btn btn-link p-0"
              type="button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
