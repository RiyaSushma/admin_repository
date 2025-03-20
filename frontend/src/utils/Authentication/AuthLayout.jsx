import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true, requiredRole="admin" }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const userAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userRole = useSelector(state => state.auth.user?.role);

    useEffect(() => {
        console.log("User Authenticated:", userAuthenticated);
        console.log("User Role:", userRole);
    }, [userAuthenticated, userRole]);

    useEffect(() => {
        if (userAuthenticated === undefined) return; 
        if(authentication && !userAuthenticated) {
            navigate("/")
        } else if(!authentication && userAuthenticated) {
            navigate("/dashboard");
        } else if(requiredRole && userRole != requiredRole) {
            navigate("/unauthorized");
        } else {
            setLoader(false);
        }
    }, [userAuthenticated, navigate, authentication, userRole, requiredRole]);
    

    return loader ? <h1>Loading...</h1>: <>{ children }</>;
}
