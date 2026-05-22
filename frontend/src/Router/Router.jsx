import { createBrowserRouter } from "react-router";
import RootsLayout from "../Layouts/RootsLayout";
import HomePage from "../Pagess/HomePage.jsx/HomePage";
import AboutUs from "../Components/NavbarPage/AboutUs";
import ServicesPage from "../Components/NavbarPage/ServicesPage";
import Login from "../Components/NavbarPage/Login";
import Register from "../Components/NavbarPage/Register";
import SelfAssessment from "../Pagess/SelfAssessment/SelfAssessment";
import ResouceHub from "../Components/NavbarPage/ResouceHub";
import KothaBot from "../Pagess/ChatBot/KothaBot";
import AnalyticsDashboard from "../Pagess/Analytics/AnalyticsDashboard";
import SelfReferralForm from "../Pagess/Referral/SelfReferralForm";
import UserProfile from "../Pagess/Profile/UserProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootsLayout />,
    children: [
      { index: true,             element: <HomePage /> },
      { path: "/aboutus",        element: <AboutUs /> },
      { path: "/service",        element: <ServicesPage /> },
      { path: "/login",          element: <Login /> },
      { path: "/register",       element: <Register /> },
      { path: "/selfassessment", element: <SelfAssessment /> },
      { path: "/familycare",     element: <SelfAssessment /> },
      { path: "/resource",       element: <ResouceHub /> },
      { path: "/kotha",          element: <KothaBot /> },
      { path: "/analytics",      element: <AnalyticsDashboard /> },
      { path: "/referral",       element: <SelfReferralForm /> },
      { path: "/profile",        element: <UserProfile /> },
    ],
  },
]);

export default router;
