import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <h1>Barbearia</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="items">Estoque</Link>
        <Link to="agendamentos">Agendamentos</Link>
        <Link to="clientes">Clientes</Link>
        <Link to="clientes">Clientes</Link>
        <Link to="clientes">Sair</Link>
      </nav>
    </header>
  );
}

