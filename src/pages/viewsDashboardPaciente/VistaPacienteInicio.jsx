import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EstadoBadge from "../../components/EstadoBadge";

function VistaPacienteInicio() {
  const [perfil, setPerfil] = useState({
    nombre: "Paciente",
    email: "",
    edad: "No especificado",
    dni: "",
    telefono: "",
    sexo: "",
  });

  const [citas, setCitas] = useState([]);
  const codigoUsuario = localStorage.getItem("codigoUsuario");

  useEffect(() => {
    const cargarDatos = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const user = usuarios[codigoUsuario];
      if (!user) return;

      setPerfil({
        nombre: [user.nombre, user.apellido].filter(Boolean).join(" ") || "Paciente",
        email: user.email || "",
        edad: user.edad || "No especificado",
        dni: user.dni || "",
        telefono: user.telefono || "",
        sexo: user.sexo || "",
      });

      setCitas(user.citas?.map(c => ({ ...c })) || []);
    };

    cargarDatos();

    const handleStorage = (e) => {
      if (e.key === "usuarios") cargarDatos();
    };
    const handleCustomEvent = () => cargarDatos();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("usuariosActualizados", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("usuariosActualizados", handleCustomEvent);
    };
  }, [codigoUsuario]);

  const hoy = new Date();
  const hoyString = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

  // Mostrar citas (pendiente o aceptada)
  const citasActivas = citas.filter(c => c.estado === "pendiente" || c.estado === "aceptada");

  // Próxima cita (pendiente o aceptada)
  const proximaCita = citasActivas
    .sort((a, b) => (a.fecha + "T" + a.hora).localeCompare(b.fecha + "T" + b.hora))[0];

  // Citas de hoy (pendiente o aceptada)
  const citasHoy = citasActivas.filter(c => c.fecha === hoyString);

  return (
    <main className="container my-4">
      <h2 className="mb-4">Bienvenido/a, {perfil.nombre}</h2>
      <div className="row">
        <div className="col-lg-5 mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="card-header-azul">Próxima Cita</Card.Header>
            <Card.Body>
              {proximaCita ? (
                <>
                  <p><strong>Fecha:</strong> {proximaCita.fecha}</p>
                  <p><strong>Hora:</strong> {proximaCita.hora}</p>
                  <p><strong>Doctor:</strong> {proximaCita.doctor}</p>
                  <EstadoBadge estado={proximaCita.estado} />
                </>
              ) : <p>No tienes próximas citas</p>}
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-7 mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="card-header-azul">Citas de Hoy</Card.Header>
            <Card.Body>
              {citasHoy.length === 0 ? <p className="text-center">No tienes citas para hoy</p> :
                citasHoy.map(c => (
                  <div key={c.id} className="d-flex align-items-center mb-3 p-2 border rounded">
                    <div className="flex-grow-1">
                      <div className="fw-bold">{c.doctor}</div>
                      <small className="text-muted">{c.fecha} — {c.hora}</small>
                    </div>
                    <EstadoBadge estado={c.estado} />
                  </div>
                ))
              }
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default VistaPacienteInicio;
