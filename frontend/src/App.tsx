// import "./style.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/Home";
import store from "./redux/store";
import RouteProtect from "./RouteProtected";
import { UserContextProvider } from "./context/User";
import Layout from "./components/Dashboard/Layout/Layout";
import CreateTrip from "./pages/Dashboard/CreateTrip";
import GetTrip from "./pages/Dashboard/GetTrip";
import AllTrip from "./pages/Dashboard/AllTrip";
import OrganizerPersonalForm from "./pages/Dashboard/OrganizerPersonalForm";
import AdminLogin from "./pages/AdminLogin";
import AdminOrganizerList from "./pages/Dashboard/AdminOrganizerList";
import { ADMIN, ORGANIZER, USER } from "./contracts/constants/roleConstant";
import GetBooking from "./pages/Dashboard/GetBooking";
// import SingleTripView from './pages/Dashboard/SingleTripView';
//import { TripsShow } from "./components/landingPage/TripsShow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/dashboard",
    element: (
      <RouteProtect authorizedRoles={[ORGANIZER]} element={<Layout />} />
    ),
    children: [
      {
        path: "*",
        index: true,
        element: <CreateTrip />,
      },
      {
        path: "trip/:id/:status?",
        element: <CreateTrip />,
      },
      {
        path: "organizer-verification",
        element: <OrganizerPersonalForm />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RouteProtect authorizedRoles={[USER]} element={<Layout />} />,
    children: [
      {
        path: "trip",
        element: <AllTrip />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RouteProtect authorizedRoles={[ADMIN]} element={<Layout />} />,
    children: [
      {
        path: "admin-organizer",
        element: <AdminOrganizerList />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <RouteProtect
        authorizedRoles={[ADMIN, ORGANIZER, USER]}
        element={<Layout />}
      />
    ),
    children: [
      {
        path: "bookings",
        element: <GetBooking />,
      },
      {
        path: "all-trip",
        element: <GetTrip />,
      },
    ],
  },
 
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="268770122624-igrqs8psmqocfu7pksaa4m2ab73bjt2t.apps.googleusercontent.com">
          <UserContextProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </UserContextProvider>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default App;
