import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/User";

interface IRouteProtect {
    element: React.JSX.Element;
}

export const RouteProtect = ({ element }: IRouteProtect) => {
    const { user, isLoading } = useUserContext();

    if (isLoading) {
        return <h1>Loading</h1>
    }


    if (user) {
        return element

    } else {
        <Navigate to="/" />
    }
}

export default RouteProtect;