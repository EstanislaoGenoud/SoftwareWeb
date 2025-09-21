import {Navigate, Outlet} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../lib/firebase";
import NavBar from "./NavBar";


export default function ProtectedLayout(){
  const [user,loading]=useAuthState(auth);
  if(loading){
    return <div>Loading...</div>;
  }
  if(!user){
    return <Navigate to="/login" replace={true}/>;
  }
  return(
    <>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </>
  )
}