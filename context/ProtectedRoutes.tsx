import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../context/AuthContext";


const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [router, user])

  return ( 
    <>
      {user ? children : null}
    </>
   );
}
 
export default ProtectedRoute;