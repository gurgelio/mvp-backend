import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <header className="bg-primary-500">
      <Link to="/" className="flex h-16 items-center px-6">
        <img src="/images/logo-feso.webp" alt="" />
      </Link>

      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/">
          <Home className="size-4" /> Início
        </NavLink>
      </nav>
    </header>
  );
}
