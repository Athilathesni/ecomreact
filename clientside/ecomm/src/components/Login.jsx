import React, { useState } from "react";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import loginimg from '../assets/loginf.png'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData)
      const res=await axios.post("http://localhost:3001/api/login",formData)
      console.log(res.data)
      // console.log(res.data.token)
      
      if(res.status==201){
        localStorage.setItem('token',res.data.token)
        alert("successfully logined!")
        navigate('/')
      }else{
        alert(res.data.msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="login-container">
    <div className="login-box">
      <div className="login-left">
        <h2 className="h2">𝗟𝗢𝗚𝗜𝗡</h2>
        <p>Get access to your Orders, Wishlist, and Recommendations</p>
        <img src={loginimg} alt=""  className="img1"/>
      </div>
      
      <div className="login-right">
        <form>
        <div className="form-group">
              <input
                className="in1"
                type="tel"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <input
                className="in1"
                type="password1"
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
             </div>
             <button type="submit" className="btn-login" onClick={handleSubmit}> Login </button>
        </form>
        <div className="form-footer">
           <Link to={"/#"} className="forgot-password-link">
             Forgot Password?
           </Link>
         </div>
         <div className="und">
           <Link to={"/register"} className="signup-link">
             <span className="sp">Don't have an account?</span>
             Sign Up
           </Link>
         </div>
      </div>
    </div>
  </div>
);
};
export default Login