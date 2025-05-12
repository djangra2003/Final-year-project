import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BeachDetails from "./Components/BeachDetails";
import ChatBot from "./Components/ChatBot";
import AboutUs from "./Pages/AboutUs";
import BeachesPage from "./Pages/BeachesPage";
import ContactUs from "./Pages/ContactUs";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import Home from "./Pages/Home"; // ✅ Home already contains Reviews
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SignupPage from "./Pages/SignupPage";
import UserProfile from "./Pages/UserProfile";
import AddReviewPage from "./Pages/AddReviewPage"; // ✅ Import the Add Review Page
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Wishlist from './Pages/Wishlist';

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/", element: <Home /> }, // ✅ Home (contains Reviews)
  { path: "/signup", element: <SignupPage /> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/beaches", element: <BeachesPage /> },
  { path: "/beaches/:beachId", element: <BeachDetails /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/user-profile", element: <UserProfile /> },
  { path: "/add-review", element: <AddReviewPage /> },
  {path: "/wishlist", element: <Wishlist/>},
]);

const App: React.FC = () => {
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