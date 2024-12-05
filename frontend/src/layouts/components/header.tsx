import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <header className="bg-primary-500 flex h-16 items-center gap-12 px-6">
      <Link to="/" className="flex h-full">
        <img src="/images/logo-feso.webp" alt="" className="max-h-full" />
      </Link>

      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/">
          <Home className="size-4" /> Início
        </NavLink>
      </nav>
    </header>
  );
}
