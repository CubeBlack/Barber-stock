import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function LayoutUsuario() {
  const { pathname } = useLocation();
  return (
    <main>
      <h1>Usuarios</h1>
      <div className="tabs">
        <Link
          to="/agendamentos"
          className={`tab ${pathname === "/agendamentos" ? "active" : ""}`}
        >
          Todos os usuarios
        </Link>
        <Link
          to="/agendamentos/new"
          className={`tab ${pathname === "/agendamentos/new" ? "active" : ""}`}
        >
          Novo usuario
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
