import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../contexts/authContext";

export default function PrivateRoute({ children }) {
    const { user } = useContext(authContext);
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    return children;
}