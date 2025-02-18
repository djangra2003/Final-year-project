import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutUs from "./Pages/AboutUs";
import BeachesPage from "./Pages/BeachesPage";
import ContactUs from "./Pages/ContactUs";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/signup",
      element:<SignupPage/>
    },
    {
      path:"/contact",
      element:<ContactUs />
    },
    {
      path: "/about",
      element: <AboutUs />
    },
    {
      path: "/beaches",
      element: <BeachesPage />
    },
    {
      path: "/forgot-password",
      element: <ForgotPasswordPage/>
    },
  ])
  return (
    <div className="font-sans bg-gray-50">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
