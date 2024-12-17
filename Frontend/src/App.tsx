import Home from "./Pages/Home";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import { createBrowserRouter , RouterProvider } from "react-router-dom";

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

  ])
  return (
    <div className="font-sans bg-gray-50">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
