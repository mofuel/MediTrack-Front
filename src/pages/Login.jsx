import '../css/Login.css';
import '../css/AuthLayout.css';  
import InputField from "../components/InputField";
import Button from "../components/Button";
import ActionLink from "../components/ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layouts/AuthLayout";

function Login() {
  return (
    <AuthLayout>
      <main className="container mt-5">
        <section className="row align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
          <form className="col-md-4 offset-md-6 p-4 login-box">
            <section className="col-12 text-center mb-4">
              <h2>Iniciar Sesión</h2>
            </section>

            {/* Email */}
            <section className="col-12 col-md-8 mb-3 input-group mx-auto">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <InputField
                type="email"
                id="email"
                placeholder="Correo Electrónico"
              />
            </section>

            {/* Password */}
            <section className="col-12 col-md-8 mb-3 input-group mx-auto">
              <span className="input-group-text">
                <FontAwesomeIcon icon={faLock} />
              </span>
              <InputField
                type="password"
                id="password"
                placeholder="Contraseña"
              />
            </section>

            {/* Olvidaste tu contraseña */}
            <section className="col-12 mb-3 text-center">
              <ActionLink
                text="¿Olvidaste tu contraseña?"
                href="/recuperar"
              />
            </section>

            {/* Botón */}
            <section className="col-12 text-center">
              <Button
                text="Ingresar"
                type="submit"
              />
            </section>

            {/* Registrate */}
            <section className="col-12 text-center mt-3">
              ¿No tienes una cuenta?{" "}
              <ActionLink
                text="Regístrate"
                href="/registro"
              />
            </section>
          </form>
        </section>
      </main>
    </AuthLayout>
  );
}

export default Login;
