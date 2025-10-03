import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/IndexMedico.css";
import "../css/colors.css";

function IndexMedico() {
  const navigate = useNavigate();
  const codigoUsuario = localStorage.getItem("codigoUsuario");

  const [citasHoy, setCitasHoy] = useState([]);
  const [citasProximas, setCitasProximas] = useState([]);
  const [nombreMedico, setNombreMedico] = useState("Médico");

  useEffect(() => {
    const cargarCitas = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const medico = usuarios[codigoUsuario];
      if (!medico) return;

      const nombreCompleto = [medico.nombre, medico.apellido].filter(Boolean).join(" ");
      setNombreMedico(nombreCompleto);

      const hoy = new Date();
      const hoyString = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(hoy.getDate()).padStart(2, "0")}`;

      const todasCitas = Object.values(usuarios).flatMap((u) =>
        u.citas
          ?.filter(
            (c) =>
              c.doctor?.toLowerCase().trim() === nombreCompleto.toLowerCase().trim()
          )
          .map((c) => ({
            ...c,
            pacienteNombre: [u.nombre, u.apellido].filter(Boolean).join(" "),
            codigoPaciente: u.codigo,
          })) || []
      );

      setCitasHoy(todasCitas.filter((c) => c.fecha === hoyString));
      setCitasProximas(
        todasCitas
          .filter((c) => c.fecha > hoyString)
          .sort((a, b) => (a.fecha + "T" + a.hora).localeCompare(b.fecha + "T" + b.hora))
      );
    };

    cargarCitas();

    const handleStorage = (e) => {
      if (e.key === "usuarios") cargarCitas();
    };
    const handleCustomEvent = () => cargarCitas();

    window.addEventListener("storage", handleStorage);
    window.addEventListener("usuariosActualizados", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("usuariosActualizados", handleCustomEvent);
    };
  }, [codigoUsuario]);

  const accesos = [
    { text: "Solicitudes de Cita", path: "/solicitudes-citas", icon: "bi-calendar-check" },
    { text: "Historial de citas", path: "/historial-citas", icon: "bi-journal-medical" },
    { text: "Notificaciones", path: "/notificaciones", icon: "bi-bell" },
    { text: "Perfil", path: "/perfil-medico", icon: "bi-person-circle" },
  ];

  const getIconClass = (estado) => {
    switch (estado) {
      case "pendiente":
        return "bi-clock text-warning";
      case "aceptada":
        return "bi-check-circle-fill text-success";
      case "rechazada":
        return "bi-x-circle-fill text-danger";
      default:
        return "bi-question-circle text-secondary";
    }
  };

  return (
    <>
      <NavMedico nombre={nombreMedico} />
      <main className="container my-4">
        <div className="row">
          <div className="col-lg-7 mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="card-header-azul">Citas de Hoy</Card.Header>
              <Card.Body>
                {citasHoy.length === 0 ? (
                  <p className="text-center">No tienes citas para hoy</p>
                ) : (
                  citasHoy.map((c) => (
                    <div
                      key={c.id}
                      className="d-flex align-items-center mb-3 p-2 border rounded"
                    >
                      <i className={`bi ${getIconClass(c.estado)} fs-4 me-3`}></i>
                      <div className="flex-grow-1">
                        <div className="fw-bold">{c.pacienteNombre}</div>
                        <small className="text-muted">
                          {c.fecha} — {c.hora}
                        </small>
                      </div>
                      <EstadoBadge estado={c.estado} />
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>
          </div>

          <div className="col-lg-5">
            <Card className="shadow-sm mb-4">
              <Card.Header className="card-header-azul">Próximas citas</Card.Header>
              <Card.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
                {citasProximas.length === 0 ? (
                  <p className="text-center">No tienes próximas citas</p>
                ) : (
                  citasProximas.map((c) => (
                    <div
                      key={c.id}
                      className="d-flex align-items-center mb-3 p-2 border rounded"
                    >
                      <i className={`bi ${getIconClass(c.estado)} fs-4 me-3`}></i>
                      <div className="flex-grow-1">
                        <div className="fw-bold">{c.pacienteNombre}</div>
                        <small className="text-muted">
                          {c.fecha} — {c.hora}
                        </small>
                      </div>
                      <EstadoBadge estado={c.estado} />
                    </div>
                  ))
                )}
              </Card.Body>
            </Card>

            <Card className="shadow-sm mb-4">
              <Card.Header className="card-header-azul">Accesos Rápidos</Card.Header>
              <Card.Body>
                <div className="row g-3 text-center">
                  {accesos.map((item) => (
                    <div key={item.text} className="col-6">
                      <div
                        className="p-3 border rounded h-100 card-hover"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(item.path)}
                      >
                        <i className={`bi ${item.icon} fs-2 text-primary`}></i>
                        <div className="mt-2 small">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

export default IndexMedico;
