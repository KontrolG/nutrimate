import { NavLink } from "react-router-dom";
import { withButton } from "./Button";

const NavLinkWithButton = withButton(NavLink);

export default NavLinkWithButton;
