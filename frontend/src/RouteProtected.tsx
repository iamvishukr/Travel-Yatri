import { Navigate, useLocation } from "react-router-dom";

import {
  ADMIN,
  AuthorizedRoles,
  ORGANIZER,
} from "./contracts/constants/roleConstant";
import { useUserContext } from "./context/User";

interface IRouteProtect {
  element: React.JSX.Element;
  authorizedRoles: AuthorizedRoles[];
}

export const RouteProtect = ({ element, authorizedRoles }: IRouteProtect) => {
  // const user = useTypedSelector(selectAuthUser)
  const { user, isLoading } = useUserContext();
  const location = useLocation();
  // console.log(user, ">>>>>>>>>>>>>>>>uuuuu", location)

  if (isLoading) {
    return <>Loading</>;
  }

  if (user && user?.role && authorizedRoles.includes(user?.role)) {
    if (
      user?.role === ORGANIZER &&
      !user?.isVerified &&
      location.pathname != "/dashboard/organizer-verification"
    ) {
      return <Navigate to="/dashboard/organizer-verification" />;
    }
    if (
      user?.role === ORGANIZER &&
      user?.isVerified &&
      location.pathname === "/dashboard/organizer-verification"
    ) {
      return <Navigate to="/dashboard" />;
    }

    return element;
  } else if (user) {
    if (user?.role === ORGANIZER) {
      return <Navigate to="/dashboard" />;
    } else if (user?.role === ADMIN) {
      return <Navigate to="/dashboard/admin-organizer" />;
    } else {
      return <Navigate to="/dashboard/trip" />;
    }
  } else {
    return <Navigate to="/" />;
  }
};

export default RouteProtect;
