// import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AdminLayout from './layouts/AdminLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthContextProvider from "./context/AuthContextProvider";
import AddThreadPage from "./pages/AddThreads";
import EditThread from "./pages/EditThreadPage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import DetailThread from "./pages/DetailThread";

//router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "threads/add",
        element: <AddThreadPage />
      },
      {
        path:"threads/edit/:id",
        element: <EditThread/>
      },
            {
        path:"/threads/detail/:id",
        element:<DetailThread/> 
      }
    ]
  },

  {
    path: "/auth",
    element: <AdminLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />
      },
    ],
  },
]);

function App() {

  return (
    <AuthContextProvider>
      <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
    </AuthContextProvider>

  )
}

export default App
