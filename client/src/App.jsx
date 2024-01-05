import React from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home, CreatePost } from "./pages";
import { Header, Main } from "./components";

const  App = () => {
  return(
    <div>
      <BrowserRouter>
        <Header/>
        <Main/>
      </BrowserRouter>
    </div>
  )
}

export default App
