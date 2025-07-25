import { createBrowserRouter } from "react-router-dom";
import App from "./../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Analytics from "../pages/Analytics";
import Admin from "../pages/Admin";
import { AuthProvider } from "../contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "products", element: <Products /> },
      { path: "analytics", element: <Analytics /> },
      { path: "admin", element: <Admin /> },
      { path: "/", element: <Products /> },
    ],
  },
]);

export default router;
