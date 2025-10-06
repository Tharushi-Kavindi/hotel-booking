import { Outlet } from "react-router";
import Navigation from "@/components/Navigation.jsx";
import { Toaster } from "sonner";

function RootLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Toaster />
    </>
  );
}
export default RootLayout;
