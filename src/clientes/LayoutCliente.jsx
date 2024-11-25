import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function LayoutCliente() {
  const { pathname } = useLocation();
  return (
    <main>
      <h1>Clientes</h1>
      <div className="tabs">
        <Link
          to="/clientes"
          className={`tab ${pathname === "/clientes" ? "active" : ""}`}
        >
          Todos os clientes
        </Link>
        <Link
          to="/clientes/new"
          className={`tab ${pathname === "/clientes/new" ? "active" : ""}`}
        >
          Novo cliente
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
