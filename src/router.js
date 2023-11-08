import { createBrowserRouter, redirect } from "react-router-dom";
import AppLayout from "layouts/AppLayout";
// import AppLayoutAntD from "layouts/AppLayout"
import Login from "smart/Login";
import Register from "smart/Register";
import Dashboard from "smart/Dashboard";
import Profile from "smart/profile/Profile";
import ProfileManagement from "smart/profileManagement/ProfileManagement";
import Logout from "smart/Logout";
import ShowUserDetails from "smart/ShowUserDatails";
import { AppProvider } from "contexts/app.context";
import LoginAndRegisterLayout from "layouts/LoginAndRegisterLayout";
import { checkIsAuth } from "helpers/auth.helper";
import { notification } from "helpers/notification.helper";
import UpdatePortfolio from "smart/portfolio/UpdatePortfolio";
import ShowPortfolioDetail from "smart/portfolio/ShowPortfolioDetail";
import ServicePage from "smart/service/ServicePage";
import ManageService from "smart/service/ManageService";
import AdminPanelPage from "smart/adminPanel/AdminPanelPage";

import PrivateRoute from "smart/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppProvider>
        <AppLayout />
      </AppProvider>
    ),
    //   errorElement: <ErrorPage />,
    children: [
      { path: "/logout", element: <Logout /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/service-list",
        element: <ServicePage />,
      },
      {
        path: "/update-portfolio",
        element: <UpdatePortfolio />,
      },
      {
        path: "/user/:userId",
        element: <ShowUserDetails />,
      },
      {
        element: <LoginAndRegisterLayout />,
        loader: () => {
          const isAuth = checkIsAuth();
          if (isAuth) {
            notification({
              type: "warning",
              message: "Warning",
              description: "You already have loged in into the system!",
            });
            return redirect("/dashboard");
          }
          return null;
        },
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },


      {
        path: "/profile-management",
        element: (
          <PrivateRoute>
            <ProfileManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-service",
        element: (
          <PrivateRoute>
            <ManageService />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin-panel",
        element: (
          <PrivateRoute>
            <AdminPanelPage />
          </PrivateRoute>
        ),
      },
      { path: "/view-portfolio", element: <ShowPortfolioDetail /> },
    ],
  },
]);
