import { createBrowserRouter } from "react-router-dom";

import Home from "../src/pages/Home";
import RootLayout from "./pages/RootLayout";
import ListItems from "./items/ListItems";
import CreateItem from "./items/CreateItem";
import UpdateItem from "./items/UpdateItem";
import ShowItem from "./items/ShowItem";
import ItemsLayout from "./items/Layout";
/* import Items from "../pages/Items"; */

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
    ],
  },
]);

export default router;
