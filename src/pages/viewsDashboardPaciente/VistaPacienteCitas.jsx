import { useState, useEffect } from "react";
import API_BASE_URL from "../../config";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import Swal from "sweetalert2";

function VistaPacienteCitas() {
  const codigoUsuario = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({
    fechaCita: "",
    horaCita: "",
    especialidadId: "",
    medicoId: "",
  });

  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/appointments/paciente/${codigoUsuario}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Error al cargar citas");

        const data = await res.json();
        setCitas(data);
      } catch {
        Swal.fire("Error", "No se pudieron cargar las citas", "error");
      }
    };

    fetchCitas();
  }, [codigoUsuario, token]);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/specialties`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setEspecialidadesDisponibles(data);
      } catch {
        Swal.fire("Error", "No se pudieron cargar las especialidades", "error");
      }
    };

    fetchEspecialidades();
  }, [token]);


  const handleChange = async (e) => {
  const { name, value } = e.target;

  if (name === "fechaCita") {
    const hoy = new Date().toISOString().split("T")[0];
    if (value < hoy) {
      Swal.fire("Fecha inválida", "No puedes seleccionar una fecha pasada", "warning");
      return;
    }
  }

  setNuevaCita((prev) => ({ ...prev, [name]: value }));

  if (name === "especialidadId") {
    try {
      const res = await fetch(
        `${API_BASE_URL}/perfil-medico/especialidad/${value}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      setMedicosFiltrados(data);

      setNuevaCita((prev) => ({ ...prev, medicoId: "" }));
    } catch {
      Swal.fire("Error", "No se pudieron cargar los médicos", "error");
    }
  }
};


  const handleGuardarCita = async () => {
    const { fechaCita, horaCita, especialidadId, medicoId } = nuevaCita;

    if (!fechaCita || !horaCita || !especialidadId || !medicoId) {
      Swal.fire("Campos incompletos", "Completa todos los campos", "warning");
      return;
    }

    if (horaCita < "07:00" || horaCita > "22:00") {
      Swal.fire("Hora inválida", "La hora debe estar entre 07:00 y 22:00", "warning");
      return;
    }

    const citaDateTime = new Date(`${fechaCita}T${horaCita}`);
    const ahora = new Date();

    if (citaDateTime < ahora) {
      Swal.fire("Fecha/hora inválida", "No puedes agendar citas en el pasado", "warning");
      return;
    }

    const minimaAnticipacion = new Date(ahora.getTime() + 30 * 60000);
    if (citaDateTime < minimaAnticipacion) {
      Swal.fire("Anticipación insuficiente", "Debes agendar con al menos 30 minutos de anticipación", "warning");
      return;
    }

    const dto = {
      medicoId,
      especialidadId: Number(especialidadId),
      fechaCita,
      horaCita,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        Swal.fire("Error", errData?.error || "No se pudo guardar la cita", "error");
        return;
      }

      const nuevaCitaCompleta = await res.json();

      setCitas((prev) => [...prev, nuevaCitaCompleta]);

      setNuevaCita({ fechaCita: "", horaCita: "", especialidadId: "", medicoId: "" });
      setMedicosFiltrados([]);
      setShowModal(false);

      Swal.fire("¡Cita agregada!", "Tu nueva cita ha sido guardada.", "success");
    } catch {
      Swal.fire("Error", "No se pudo guardar la cita", "error");
    }
  };


  const getBadgeClass = (estado) => {
    const e = estado?.toUpperCase();
    if (e === "ACEPTADA") return "bg-success";
    if (e === "PENDIENTE") return "bg-warning text-dark";
    if (e === "RECHAZADA") return "bg-danger";
    return "bg-secondary";
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Citas</h2>
        <Button text="Agregar Cita" onClick={() => setShowModal(true)} />
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Especialidad</th>
              <th>Doctor</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {citas.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">No tienes citas</td>
              </tr>
            ) : (
              citas.map((c) => (
                <tr key={c.id}>
                  <td>{c.fechaCita}</td>
                  <td>{c.horaCita}</td>
                  <td>{c.especialidadNombre}</td>
                  <td>{c.medicoNombre}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(c.estado)}`}>
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Agregar Nueva Cita</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="mb-2">
                  <label className="form-label">Fecha de la cita</label>
                  <InputField
                    type="date"
                    name="fechaCita"
                    value={nuevaCita.fechaCita}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Hora de la cita</label>
                  <InputField
                    type="time"
                    name="horaCita"
                    value={nuevaCita.horaCita}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label">Especialidad</label>
                  <select
                    className="form-select"
                    name="especialidadId"
                    value={nuevaCita.especialidadId}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione especialidad</option>
                    {especialidadesDisponibles.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label className="form-label">Doctor</label>
                  <select
                    className="form-select"
                    name="medicoId"
                    value={nuevaCita.medicoId}
                    onChange={handleChange}
                  >
                    <option value="">
                      {medicosFiltrados.length === 0
                        ? "Primero seleccione especialidad"
                        : "Seleccione doctor"}
                    </option>

                    {medicosFiltrados.map((m) => (
                      <option key={m.codigoUsuario} value={m.codigoUsuario}>
                        {m.nombreCompleto}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <Button text="Cancelar" className="btn-secondary" onClick={() => setShowModal(false)} />
                <Button text="Guardar" onClick={handleGuardarCita} />
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default VistaPacienteCitas;