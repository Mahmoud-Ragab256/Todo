import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  redirectPath: string;
  children: ReactNode;
}

export const ProtectedRoute = ({ redirectPath, children }: IProps) => {
  const storageKey = "userData"
  const userDataString = localStorage.getItem(storageKey)
  const userData = userDataString ? JSON.parse(userDataString) : null;

  if (!userData?.jwt) return <Navigate to={redirectPath} replace state={userData} />;
  return children;
};



export default ProtectedRoute;