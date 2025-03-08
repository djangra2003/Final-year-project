import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatBot from "./Components/ChatBot";
import AboutUs from "./Pages/AboutUs";
import BeachesPage from "./Pages/BeachesPage";
import ContactUs from "./Pages/ContactUs";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SignupPage from "./Pages/SignupPage";
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

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
    {
      path: "/profile",
      element: <ProfilePage />
    }
  ])
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="font-sans bg-gray-50">
          <RouterProvider router={router} />
          <ChatBot />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
