import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function LayoutInstitucional() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* aquí se renderizan las páginas institucionales */}
      <Footer />
    </>
  );
}
