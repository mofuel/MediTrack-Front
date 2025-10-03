import { Outlet } from "react-router-dom";

export default function LayoutSistema() {
  return (
    <>
      <Outlet /> {/* solo renderiza las páginas del sistema */}
    </>
  );
}
