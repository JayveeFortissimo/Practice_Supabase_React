import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Outlets from "@/Outlets";
import Homepage from "@/page/HomePage";
import AboutPage from "@/page/AboutPage";
import Blogs from "@/page/Blogs";
import Login from "@/page/auth/Login";
import Register from "@/page/auth/Register";
import Profile from "@/page/Profile";
import ViewMore from "@/page/ViewMore";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Outlets />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "blogs/:blogId",
          element: <ViewMore />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
