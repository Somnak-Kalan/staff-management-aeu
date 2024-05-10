import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// layout
import ContentLayout from "../layout/layout";
//

import Dashboard from "../pages/DashboardPage/Index";
import NotFound from "../pages/NotFound";

// *-------------------ROUTES--------------------*//

// import ProtectedRoute from "./ProtectedRoute";

// *------------------END ROUTES-------------------*//

//
//
//

const authRoute = () => {
  const routes = [
    {
      path: "/",
      element: (
        // <ProtectedRoute>
        <ContentLayout />
        // </ProtectedRoute>
      ),
      children: [
        {
          path: "*",
          element: <Navigate to="/404" />,
        },
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/404",
          element: <NotFound />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
      ],
    },
  ];
  return routes;
};

export { authRoute };
