import { Outlet, useNavigate } from "react-router-dom";
import useAuthUser from "../features/authentication/useAuthUser";
import Spinner from "../ui/Spinner";
import { useEffect } from "react";

function ProtectedRoute() {
   const navigate = useNavigate();
   //TODO: 1. Check if user authentificated
   const { data: user, isLoading } = useAuthUser();
   console.log(user?.role);
   //TODO: 2. If user no authentificated redirect to Login page
   useEffect(() => {
      if (!isLoading && user?.role !== "authenticated") {
         console.log(user);
         console.log("NOT");
         navigate("/login");
      }
   }, [user, isLoading, navigate]);
   //TODO: 3. Show spinner when checking
   if (isLoading) return <Spinner />;
   //TODO: 4. If user  authentificated redirect to Outlet
   return (
      <>
         {/* <div>Protected</div> */}
         <Outlet />
      </>
   );
}

export default ProtectedRoute;
