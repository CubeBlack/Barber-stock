import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <h1>Controle de Estoque Barbearia</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="items">items</Link>
      </nav>
    </header>
  );
}
