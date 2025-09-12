import { useEffect } from "react";

function AuthLayout({ children }) {
  useEffect(() => {
    // Aplica fondo solo para páginas de autenticación
    document.body.className = "auth-body";

    // Limpia la clase cuando la página se desmonta
    return () => {
      document.body.className = "";
    };
  }, []);

  return <>{children}</>;
}

export default AuthLayout;
