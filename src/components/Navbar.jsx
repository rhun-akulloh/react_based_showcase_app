import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const link = ({ isActive }) => isActive ? 'active' : undefined

  return (
    <nav className="navbar">
      <NavLink to="/" className={link}>Home</NavLink>
      <NavLink to="/shop" className={link}>Shop</NavLink>
      <NavLink to="/admin" className={link}>Admin Portal</NavLink>
    </nav>
  )
}
