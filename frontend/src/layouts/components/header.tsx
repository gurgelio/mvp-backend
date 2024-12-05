import { Clock8, GraduationCap, Home, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <header className="bg-primary flex h-20 items-center gap-12 px-6 py-2">
      <Link to="/" className="flex h-full">
        <img
          src="/images/logo-feso.webp"
          alt=""
          className="max-h-full object-contain"
        />
      </Link>

      <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavLink to="/">
          <Home className="size-4" /> Início
        </NavLink>
        <NavLink to="/students">
          <GraduationCap className="size-4" /> Alunos
        </NavLink>
        <NavLink to="/appointments">
          <Clock8 className="size-4" /> Horários
        </NavLink>
        <NavLink to="/users">
          <User2 className="size-4" /> Usuários
        </NavLink>
      </nav>
    </header>
  );
}
