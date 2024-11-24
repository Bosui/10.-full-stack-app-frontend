// src/App.tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import BusinessDetails from "./components/business/BusinessDetails";
import BusinessList from "./components/business/BusinessList";
import AuthLayout from "./components/layout/AuthLayout";
import RootLayout from "./components/layout/RootLayout";
import { UserProvider } from "./context/UserContext";
import AboutUs from "./pages/AboutUs";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchCategory from "./pages/SearchCategory";
import Services from "./pages/Services";
import { ROUTES } from "./router/consts";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home />,
      },
      {
        path: ROUTES.SERVICES,
        element: <Services />,
      },
      {
        path: ROUTES.ABOUT_US,
        element: <AboutUs />,
      },
      {
        path: ROUTES.SEARCH_CATEGORY,
        element: <SearchCategory />,
      },
      {
    path: "/business-details/:id", // Maršrutas verslo detalėms
    element: <BusinessDetails />,
  },
      {
    path: "/",
    element: <BusinessList />, // Sąrašo komponentas
  },
  {
    path: "/business/:id", // Detalių puslapis
    element: <BusinessDetails />, // Komponentas, kuris rodo detales
  },
    ],
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ROUTES.LOGIN,
        element: <Login />,
      },
      {
        path: ROUTES.REGISTER,
        element: <Register />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <SnackbarProvider>
          <RouterProvider router={router} />
        </SnackbarProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
