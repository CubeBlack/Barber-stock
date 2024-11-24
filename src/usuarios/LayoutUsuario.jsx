import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function LayoutUsuario() {
  const { pathname } = useLocation();
  return (
    <main>
      <h1>Usuarios</h1>
      <div className="tabs">
        <Link
          to="/usuarios"
          className={`tab ${pathname === "/usuarios" ? "active" : ""}`}
        >
          Todos os usuarios
        </Link>
        <Link
          to="/usuarios/new"
          className={`tab ${pathname === "/usuarios/new" ? "active" : ""}`}
        >
          Novo usuario
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
