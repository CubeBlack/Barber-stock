import { createBrowserRouter } from "react-router-dom";

import Home from "../src/pages/Home";
import RootLayout from "./pages/RootLayout";
import ListItems from "./items/ListItems";
import CreateItem from "./items/CreateItem";
import UpdateItem from "./items/UpdateItem";
import ShowItem from "./items/ShowItem";
import ItemsLayout from "./items/Layout";
/* import Items from "../pages/Items"; */

/* Usuarios */
import LayoutUsuario from "./usuarios/LayoutUsuario";
import ListUsuario from "./usuarios/ListUsuario";
import CreateUsuario from "./usuarios/CreateUsuario";
import ShowUsuario from "./usuarios/ShowUsuario";
import UpdateUsuario from "./usuarios/UpdateUsuario";
import DeleteUsuario from "./usuarios/DeleteUsuario";

/* Clientes */
import LayoutCliente from "./clientes/LayoutCliente";
import ListCliente from "./clientes/ListCliente";
import CreateCliente from "./clientes/CreateCliente";
import ShowCliente from "./clientes/ShowCliente";
import UpdateCliente from "./clientes/UpdateCliente";
import DeleteCliente from "./clientes/DeleteCliente";

/* Agendamentos */
import AgendamentoLayout from "./agendamentos/AgendamentoLayout";
import ListAgendamento from "./agendamentos/ListAgendamento";
import CreateAgendamento from "./agendamentos/CreateAgendamento";
import ShowAgendamento from "./agendamentos/ShowAgendamento";
import UpdateAgendamento from "./agendamentos/UpdateAgendamento";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "items",
        element: <ItemsLayout />,
        children: [
          { index: true, element: <ListItems /> },
          { path: "new", element: <CreateItem /> },
          { path: ":id", element: <ShowItem /> },
          { path: ":id/update", element: <UpdateItem /> },
        ],
      },

      {
        path: "agendamentos",
        element: <AgendamentoLayout />,
        children: [
          { index: true, element: <ListAgendamento /> },
          { path: "new", element: <CreateAgendamento /> },
          { path: ":id", element: <ShowAgendamento /> },
          { path: ":id/update", element: <UpdateAgendamento /> },
        ],
      },

      {
        path: "usuarios",
        element: <LayoutUsuario />,
        children: [
          { index: true, element: <ListUsuario /> },
          { path: "new", element: <CreateUsuario /> },
          { path: ":id", element: <ShowUsuario /> },
          { path: ":id/update", element: <UpdateUsuario /> },
          { path: ":id/delete", element: <DeleteUsuario /> },
        ],
      },

      {
        path: "clientes",
        element: <LayoutCliente />,
        children: [
          { index: true, element: <ListCliente /> },
          { path: "new", element: <CreateCliente />},
          { path: ":id", element: <ShowCliente />},
          { path: ":id/update", element: <UpdateCliente />},
          { path: ":id/delete", element: <DeleteCliente />}
        ],
      },


    ],
  },
]);

export default router;
