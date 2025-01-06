
import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from '../assets/loginf.png'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: localStorage.getItem("email") || "",
    pwd: "",
    cpwd: "",
    phone: "",
    category: "buyer", // Added category state, default is 'buyer'
    address: "", // Added address state
  });

  // Update formData with email from localStorage
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      email: localStorage.getItem("email") || "",
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post("http://localhost:3001/api/adduser", formData);
      console.log(res);
      if (res.status === 201) {
        alert(res.data.msg);
        localStorage.removeItem("email");
        navigate("/login");
      } else {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Left Side */}
        <div className="left-sider">
            <h1>Sign Up</h1>
            <p>Sign up with your personal details to get started</p>
            <img src={loginimg} alt=""  className="img2"/>
        </div>

        {/* Right Side */}
        <div className="right-sider">
          <form onSubmit={handleSubmit} method="post" style={{ width: "80%" }}>
            <div className="forms-group">
              <input
              className="in2"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="forms-group">
              <input
                className="in2"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="forms-group">
              <input
                className="in2"
                type="password"
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="forms-group">
              <input
                className="in2"
                type="password"
                name="cpwd"
                value={formData.cpwd}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="forms-group">
              <input
                className="in2"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>

            <div className="forms-group">
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>

           
            <div className="con2">
              By signing up, you agree to our{" "}
              <span className="le2"> Terms , Privacy Policy</span> and{" "}
              <span className="le2"> Cookies Policy .</span>
            </div>
            <button type="submit" className="btn-submit">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
