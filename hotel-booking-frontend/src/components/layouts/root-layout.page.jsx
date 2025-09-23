import { Outlet } from "react-router";
import Navigation from "@/components/Navigation.jsx";

function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
export default RootLayout;
