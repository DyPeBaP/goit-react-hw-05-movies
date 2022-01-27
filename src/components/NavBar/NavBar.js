import { NavLink } from "react-router-dom";
import s from "./NavBar.module.css"

export default function NavBar() {
  return (
    <div className={s.list}>
      <NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>Home</NavLink>
      <NavLink to="/movies" className={s.link} activeClassName={s.activeLink}>Movies</NavLink>
    </div>
    
  );
}
