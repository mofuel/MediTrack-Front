import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import API_BASE_URL from "../config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/IndexMedico.css";
import "../css/Colors.css";

function IndexMedico() {
  const navigate = useNavigate();
  const codigoUsuario = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  const [citasHoy, setCitasHoy] = useState([]);
  const [citasProximas, setCitasProximas] = useState([]);
  const [nombreMedico, setNombreMedico] = useState("Médico");

  useEffect(() => {
    if (!codigoUsuario || !token) {
      console.warn("Faltan datos del médico o token");
      return;
    }

    const cargarCitas = async () => {
      try {
        console.log("Cargando citas del médico:", codigoUsuario);

        // Obtener perfil del médico
        const resPerfilMedico = await fetch(`${API_BASE_URL}/users/${codigoUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (resPerfilMedico.ok) {
          const perfilMedico = await resPerfilMedico.json();
          const nombreCompleto = perfilMedico.nombreCompleto || 
                                [perfilMedico.nombre, perfilMedico.apellido].filter(Boolean).join(" ") || 
                                "Médico";
          setNombreMedico(nombreCompleto);
        }

        const resCitas = await fetch(`${API_BASE_URL}/appointments/medico/${codigoUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resCitas.ok) {
          throw new Error(`Error al cargar citas: ${resCitas.status}`);
        }

        const citas = await resCitas.json();
        console.log("Citas del médico:", citas);

        const hoy = new Date();
        const hoyString = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

        const citasDeHoy = citas.filter((c) => c.fechaCita === hoyString);
        setCitasHoy(citasDeHoy);

        const proximas = citas
          .filter((c) => c.fechaCita > hoyString)
          .sort((a, b) => 
            (a.fechaCita + "T" + a.horaCita).localeCompare(b.fechaCita + "T" + b.horaCita)
          )
          .slice(0, 5); 

        setCitasProximas(proximas);
      } catch (err) {
        console.error("Error al cargar citas:", err);
        Swal.fire("Error", "No se pudieron cargar las citas", "error");
      }
    };

    cargarCitas();
  }, [codigoUsuario, token]);

  const accesos = [
    { text: "Solicitudes de Cita", path: "/solicitudes-citas", icon: "bi-calendar-check" },
    { text: "Historial de citas", path: "/historial-citas", icon: "bi-journal-medical" },
    { text: "Notificaciones", path: "/notificaciones", icon: "bi-bell" },
    { text: "Perfil", path: "/perfil-medico", icon: "bi-person-circle" },
  ];

  const getIconClass = (estado) => {
    const estadoNormalizado = estado?.toUpperCase() || "";
    switch (estadoNormalizado) {
      case "PENDIENTE":
        return "bi-clock text-warning";
      case "ACEPTADA":
        return "bi-check-circle-fill text-success";
      case "RECHAZADA":
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
                        <div className="fw-bold">{c.pacienteNombre || c.pacienteId}</div>
                        <small className="text-muted">
                          {c.fechaCita} — {c.horaCita}
                        </small>
                        <div>
                          <small className="text-secondary">
                            {c.especialidadNombre || c.especialidadId}
                          </small>
                        </div>
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
                        <div className="fw-bold">{c.pacienteNombre || c.pacienteId}</div>
                        <small className="text-muted">
                          {c.fechaCita} — {c.horaCita}
                        </small>
                        <div>
                          <small className="text-secondary">
                            {c.especialidadNombre || c.especialidadId}
                          </small>
                        </div>
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