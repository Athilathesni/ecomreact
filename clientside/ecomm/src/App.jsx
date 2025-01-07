import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from "react"
import "./App.css"
import ChangePass from "./components/Changepass"
import Verify from "./components/Verify"
import Register from "./components/Register"
import Login from "./components/Login"
import HomePage from "./components/Homepage"
import Nav from "./components/Nav"
import Sellpro from "./components/Sellpro"
import AddData from "./components/AddData"
import EditUserData from "./components/EditUserData"
import AddPost from "./components/AddPost"
import ViewUserPost from "./components/ViewUserPost"
import ViewPost from "./components/ViewPost"
import EditPost from "./components/EditPost"

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
          <Route path="/sellpro" element={<Sellpro/>} />
          
          <Route path="/addData" element={<AddData/>}></Route>
          <Route path="/editUserData" element={<EditUserData />}></Route>
          <Route path="/addPost" element={<AddPost />}></Route>
          <Route path="/viewUserPost/:id" element={<ViewUserPost />}></Route>
          <Route path="/viewPost/:id" element={<ViewPost />}></Route>
          <Route path="/editPost/:id" element={<EditPost />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App