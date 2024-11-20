import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <hr />
      <div>
        <Outlet />
      </div>
      <footer>
        <hr />
        Feito com React Router DOM
      </footer>
    </>
  );
}
