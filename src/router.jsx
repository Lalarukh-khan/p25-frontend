import { createBrowserRouter } from "react-router-dom";
import Login from "./views/auth/Login";
import NotFound from "./views/NotFound";
import UserDashboard from "./views/userpanel/Dashboard";
import UserLayout from "./views/layouts/UserLayout";
import AuthLayout from "./views/layouts/AuthLayout";
import MaterialCategory from "./views/userpanel/material/category";
import AddMaterial from "./views/userpanel/material/add";
import AddSerial from "./views/userpanel/material/serial";
import AddShipment from "./views/userpanel/material/shipment";
const router = createBrowserRouter([
    {
        path: "/",
        element: <UserLayout />,
        children: [
            {
                path: "/",
                element: <UserDashboard />,
            },
            {
                path: "/material-category",
                element: <MaterialCategory />,
            },
            {
                path: "/add-material",
                element: <AddMaterial />,
            },
            {
                path: "/add-shipment",
                element: <AddShipment />,
            },
            {
                path: "/add-serial",
                element: <AddSerial />,
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
