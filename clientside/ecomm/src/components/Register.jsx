// import React, { useEffect, useState } from "react"
// import "./Register.css"
// import { useNavigate } from "react-router-dom"
// import axios from 'axios'

// const Register = () => {
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     username: "",
//     email: localStorage.getItem('email') || "",
//     pwd: "",
//     cpwd: "",
//   })
//   formData.email=localStorage.getItem('email')

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       console.log(formData)
//       const res=await axios.post("http://localhost:3000/api/adduser",formData)
//       console.log(res)
//       if(res.status==201){
//         alert(res.data.msg)
//         localStorage.removeItem('email')
//         navigate('/login')
//       }else{
//         alert(res.data.msg)
//       }
//     } catch (error) {
      
//     }
//   };

//   return (
//     <div className="register-page">
//       <div className="register-container">
//         <div className="register-header">
//           <h1>𝖎𝖓𝖘𝖙𝖆𝖗𝖌𝖗𝖆𝖒</h1>
//         </div>
//         <form onSubmit={handleSubmit} method="post">
//           <div className="forms-group">
//             {/* <label>Username</label> */}
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               placeholder="Enter your username"
//               required
//             />
//           </div>
//           <div className="forms-group">
//             {/* <label>Password</label> */}
//             <input
//               type="password"
//               name="pwd"
//               value={formData.pwd}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               required
//             />
//           </div>
//           <div className="forms-group">
//             {/* <label>Confirm Password</label> */}
//             <input
//               type="password"
//               name="cpwd"
//               value={formData.cpwd}
//               onChange={handleChange}
//               placeholder="Confirm your password"
//               required
//             />
//           </div>
//           <div className="con1">
//           People who use our service may have uploaded your contact information to Instagram.<span className="le2"> Learn More</span>
//           </div>
//           <div className="con2">
//           By signing up, you agree to our <span className="le2"> Terms , Privacy Policy</span> and <span className="le2"> Cookies Policy .</span>
//           </div>
//           <button type="submit" className="btn-submit">
//             Sign up
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Register

import React, { useEffect, useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: localStorage.getItem("email") || "",
    pwd: "",
    cpwd: "",
    phone: "", // Added phone number state
    category: "buyer", // Added category state, default is 'buyer'
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
      const res = await axios.post("http://localhost:3000/api/adduser", formData);
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
        <div className="register-header">
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} method="post">
          <div className="forms-group">
            <input
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
              type="password"
              name="cpwd"
              value={formData.cpwd}
              onChange={handleChange}
              placeholder="Confirm your password"
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

          <div className="con1">
            People who use our service may have uploaded your contact information to Instagram.
            <span className="le2"> Learn More</span>
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
  );
};

export default Register;
