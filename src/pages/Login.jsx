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
import API_BASE_URL from "../config";

function Login() {
  const [showModal, setShowModal] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [tokenIngresado, setTokenIngresado] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRecuperar = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/password/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailRecuperar }),
      });

      if (!res.ok) throw new Error("No se pudo enviar el token. Verifica el correo.");

      const data = await res.json();

      Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text: data.message || "Revisa tu bandeja para continuar con el cambio de contraseña.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ingresar token"
      }).then(() => {
        setShowModal(false);
        setShowTokenModal(true);
      });

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleValidarToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/password/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRecuperar,
          token: tokenIngresado
        }),
      });

      if (!res.ok) throw new Error("Token inválido o expirado");

      const tokenTemp = tokenIngresado;

      Swal.fire(
        "Éxito",
        "Token verificado. Ahora podrás cambiar tu contraseña.",
        "success"
      ).then(() => {
        setShowTokenModal(false);
        setTokenIngresado("");
        setEmailRecuperar("");
        navigate("/new-password", { state: { email: emailRecuperar, token: tokenTemp } });
      });

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await res.json();

      // Debug completo de la respuesta
      console.log("Respuesta completa del backend:", data);
      console.log("tienePerfilMedico recibido:", data.tienePerfilMedico, "| tipo:", typeof data.tienePerfilMedico);

      // Guardar datos en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("codigoUsuario", data.codigo);
      localStorage.setItem("nombreUsuario", data.nombre);
      localStorage.setItem("apellidoUsuario", data.apellido);

      console.log("Usuario autenticado:", data.nombre);
      console.log("Rol:", data.rol);
      console.log("Código usuario:", data.codigo);

      // Mostrar mensaje de bienvenida
      await Swal.fire({
        icon: "success",
        title: `¡Bienvenido, ${data.nombre}!`,
        text: getRolMessage(data.rol, data.tienePerfilMedico),
        timer: 2000,
        showConfirmButton: false
      });

      // Redirección según el rol usando el flag del backend
      redirectUser(data.rol, data.tienePerfilMedico);

    } catch (err) {
      console.error("Error en login:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error al iniciar sesión",
        text: err.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRolMessage = (rol, tienePerfilMedico) => {
    switch (rol) {
      case "ROLE_ADMIN":
        return "Accediendo al panel de administración...";
      case "ROLE_MEDICO":
        return tienePerfilMedico 
          ? "Accediendo a tu panel médico..." 
          : "Completa tu perfil médico para comenzar...";
      case "ROLE_PACIENTE":
        return "Accediendo a tu perfil de paciente...";
      default:
        return "Accediendo al sistema...";
    }
  };

  const redirectUser = (rol, tienePerfilMedico) => {
    const tienePerfil = tienePerfilMedico === true || tienePerfilMedico === "true";
    
    console.log("Redirigiendo con rol:", rol, "| tienePerfil:", tienePerfil);
    
    switch (rol) {
      case "ROLE_ADMIN":
        navigate("/dashboard-admin");
        break;

      case "ROLE_PACIENTE":
        navigate("/dashboard-paciente/inicio");
        break;

      case "ROLE_MEDICO":
        if (tienePerfil) {
          console.log("Redirigiendo a index-medico");
          navigate("/index-medico");
        } else {
          console.log("Redirigiendo a crear-perfil-medico");
          navigate("/crear-perfil-medico");
        }
        break;

      default:
        console.warn("Rol no reconocido:", rol);
        navigate("/dashboard-paciente/inicio");
        break;
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
                required
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
                required
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
                text={isLoading ? "Ingresando..." : "Ingresar"}
                type="submit"
                disabled={isLoading}
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
          <button className="btn btn-secondary" onClick={() => setShowTokenModal(false)}>
            Cancelar
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleValidarToken} 
            disabled={!tokenIngresado}
          >
            Validar
          </button>
        </Modal.Footer>
      </Modal>
    </AuthLayout>
  );
}

export default Login;