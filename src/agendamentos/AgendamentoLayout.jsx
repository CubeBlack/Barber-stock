import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function AgendamentoLayout() {
  const { pathname } = useLocation();
  return (
    <main>
      <h1>Agendamentos</h1>
      <div className="tabs">
        <Link
          to="/agendamentos"
          className={`tab ${pathname === "/agendamentos" ? "active" : ""}`}
        >
          Todos os agendamentos
        </Link>
        <Link
          to="/agendamentos/new"
          className={`tab ${pathname === "/agendamentos/new" ? "active" : ""}`}
        >
          Novo agendamento
        </Link>
      </div>
      <Outlet />
    </main>
  );
}
