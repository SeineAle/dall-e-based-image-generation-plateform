import { Route, Routes } from "react-router-dom";
import { mainClasses } from "./TW";
import { Home, CreatePost } from "../../pages";

const Main = () => {
    return(
        <main className = {mainClasses}>
            <Routes>
                <Route path = "/" element = {<Home/>} />
                <Route path = "/create-post" element = {<CreatePost/>} />
            </Routes>
        </main>
    )
}

export{
    Main
}