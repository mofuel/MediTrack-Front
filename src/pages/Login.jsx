import '../css/Login.css';
import '../css/AuthLayout.css';
import Swal from 'sweetalert2';
import InputField from "../components/InputField";
import Button from "../components/Button";
import ActionLink from "../components/ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layouts/AuthLayout";
import { useNavigate } from "react-router-dom";



import { useState } from "react";
import { Modal, Form } from "react-bootstrap";

function Login() {

  const [showModal, setShowModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [tokenIngresado, setTokenIngresado] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleRecuperar = async () => {
    try {
      const res = await fetch("http://localhost:8080/password/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRecuperar }),
      });

      if (!res.ok) throw new Error("No se pudo enviar el token. Verifica el correo.");

      const data = await res.json();

      // SweetAlert con .then para abrir el segundo modal
      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: data.message || "Revisa tu bandeja para continuar con el cambio de contraseña.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ingresar token"
      }).then(() => {
        // cerrar modal de email y abrir modal de token
        setShowModal(false);
        setShowTokenModal(true);
      });

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };


  const handleValidarToken = async () => {
  try {
    const res = await fetch("http://localhost:8080/password/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRecuperar,
        token: tokenIngresado
      }),
    });

    if (!res.ok) throw new Error("Token inválido o expirado");

    const tokenTemp = tokenIngresado; // Guardamos antes de limpiar

    Swal.fire(
      "Éxito",
      "Token verificado. Ahora podrás cambiar tu contraseña.",
      "success"
    ).then(() => {
      setShowTokenModal(false);
      setTokenIngresado("");
      setEmailRecuperar("");

      // Redirigimos con token correcto
      navigate("/new-password", { state: { email: emailRecuperar, token: tokenTemp } });
    });

  } catch (err) {
    Swal.fire("Error", err.message, "error");
  }
};





  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciales inválidas");

      const data = await res.json();

      // Guarda token, user y rol
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);
      localStorage.setItem("rol", data.rol);

      // Redirección según rol
      switch (data.rol) {
        case "ROLE_ADMIN":
          window.location.href = "/dashboard";
          break;
        case "ROLE_MEDICO":
          window.location.href = "/medico-dashboard";
          break;
        case "ROLE_PACIENTE":
          window.location.href = "/index";
          break;
        default:
          window.location.href = "/index";
          break;
      }

    } catch (err) {
      setError(err.message);
    }
  };




  return (
    <AuthLayout>
      <main className="container mt-5">
        <section className="row align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
          <form className="col-md-4 offset-md-6 p-4 login-box" onSubmit={handleLogin}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>

            {/* Olvidaste tu contraseña */}
            <section className="col-12 mb-3 text-center">
              <ActionLink
                text="¿Olvidaste tu contraseña?"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(true);
                }}
              />
            </section>

            {/* Botón */}
            <section className="col-12 text-center">
              <Button
                text="Ingresar"
                type="submit"
              />
            </section>
            {error && <p className="text-danger text-center mt-2">{error}</p>}


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

      {/* === Modal para recuperar contraseña === */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recuperar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Ingresa tu correo electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="tuemail@ejemplo.com"
              value={emailRecuperar}
              onChange={(e) => setEmailRecuperar(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={handleRecuperar}
            disabled={!emailRecuperar}
          >
            Enviar
          </button>
        </Modal.Footer>
      </Modal>

      {/* === Modal para ingresar token === */}
      <Modal show={showTokenModal} onHide={() => setShowTokenModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Verificar token</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Ingresa el token que recibiste en tu correo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Token"
              value={tokenIngresado}
              onChange={(e) => setTokenIngresado(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowTokenModal(false)}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleValidarToken} disabled={!tokenIngresado}>
            Validar
          </button>
        </Modal.Footer>
      </Modal>





    </AuthLayout>
  );
}

export default Login;
