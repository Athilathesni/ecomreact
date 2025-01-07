import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import "./App.css"

import Register from "./components/Register"
import Login from "./components/Login"
import HomePage from "./components/Homepage"
import Nav from "./components/Nav"

import Profile from "./components/Profile"


function App() {
  const [setUser] = useState("")
  return (
    <>
      <BrowserRouter>
        { <Nav/>}
        <Routes>
          <Route path="/" element={<HomePage setUser={setUser}/>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App