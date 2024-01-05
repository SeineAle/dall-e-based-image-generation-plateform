import { logo } from "../../assets";
import { Link } from "react-router-dom";
import { headerClasses, linktoHomeLogoImageClasses, linktoCreatePostClasses} from "./TW";

const Header = () => {
    return(
        <header className = {headerClasses}>
            <Link to = "/">
                <img src = {logo} alt = "logo" className = {linktoHomeLogoImageClasses} />
            </Link>
            <Link to = "/create-post" className = {linktoCreatePostClasses} >
                Create
            </Link>
        </header>
    );
}

export {
    Header
};