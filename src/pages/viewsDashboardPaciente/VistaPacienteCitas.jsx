import { useState, useEffect } from "react";
import API_BASE_URL from "../../config";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import EstadoBadge from "../../components/EstadoBadge";
import Swal from "sweetalert2";

function VistaPacienteCitas() {
  const codigoUsuario = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({ fechaCita: "", horaCita: "", especialidadId: "", medicoId: "" });
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);

  // Cargar citas del paciente
  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/appointments/paciente/${codigoUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar citas");
        const data = await res.json();
        setCitas(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar las citas", "error");
      }
    };
    fetchCitas();
  }, [codigoUsuario, token]);

  // Cargar especialidades
  useEffect(() => {
    const fetchEspecialidades = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/specialties`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar especialidades");
        const data = await res.json();
        setEspecialidadesDisponibles(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar las especialidades", "error");
      }
    };
    fetchEspecialidades();
  }, [token]);

  // Filtrar médicos por especialidad
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setNuevaCita(prev => ({ ...prev, [name]: value }));

    if (name === "especialidadId" && value) {
      try {
        const res = await fetch(`${API_BASE_URL}/perfil-medico/especialidad/${value}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Error al cargar médicos");
        const data = await res.json();

        console.log("Médicos filtrados por especialidad:", data); // <-- aquí ves la respuesta
        setMedicosFiltrados(data);
        setNuevaCita(prev => ({ ...prev, medicoId: "" }));
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "No se pudieron cargar los médicos", "error");
      }
    }
  };


  // Guardar nueva cita
  const handleGuardarCita = async () => {
  if (!nuevaCita.fechaCita || !nuevaCita.horaCita || !nuevaCita.especialidadId || !nuevaCita.medicoId) {
    Swal.fire("Campos incompletos", "Completa todos los campos", "warning");
    return;
  }

  const dto = {
    pacienteId: codigoUsuario,           // string, tu código de paciente
    medicoId: nuevaCita.medicoId,        // string, código de usuario del médico
    especialidadId: Number(nuevaCita.especialidadId), 
    fechaCita: nuevaCita.fechaCita,
    horaCita: nuevaCita.horaCita
  };

  console.log("DTO que se enviará al backend:", dto);
  console.log("Token que se usará:", token);

  try {
    const res = await fetch(`${API_BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(dto)
    });

    console.log("Respuesta del backend:", res);

    if (!res.ok) throw new Error("Error al guardar cita");
    const nueva = await res.json();
    setCitas(prev => [...prev, nueva]);
    setNuevaCita({ fechaCita: "", horaCita: "", especialidadId: "", medicoId: "" });
    setMedicosFiltrados([]);
    setShowModal(false);
    Swal.fire("¡Cita agregada!", "Tu nueva cita ha sido guardada.", "success");
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "No se pudo guardar la cita", "error");
  }
};



  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mis Citas</h2>
        <Button text="Agregar Cita" onClick={() => setShowModal(true)} />
      </div>

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
              <tr><td colSpan={5} className="text-center">No tienes citas</td></tr>
            ) : citas.map(c => (
              <tr key={c.id}>
                <td>{c.fechaCita}</td>
                <td>{c.horaCita}</td>
                <td>{c.especialidadNombre || c.especialidadId}</td>
                <td>{c.medicoNombre || c.medicoId}</td>
                <td><EstadoBadge estado={c.estado} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Agregar Nueva Cita</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <InputField
                  type="date"
                  name="fechaCita"
                  value={nuevaCita.fechaCita}
                  onChange={handleChange}
                />
                <InputField
                  type="time"
                  name="horaCita"
                  value={nuevaCita.horaCita}
                  onChange={handleChange}
                />

                <select
                  className="form-select my-2"
                  name="especialidadId"
                  value={nuevaCita.especialidadId}
                  onChange={handleChange}
                >
                  <option value="">Seleccione especialidad</option>
                  {especialidadesDisponibles.map((e, index) => (
                    <option key={e.id ?? index} value={e.id}>
                      {e.nombre}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select my-2"
                  name="medicoId"
                  value={nuevaCita.medicoId}
                  onChange={handleChange}
                >
                  <option value="">Seleccione doctor</option>
                  {medicosFiltrados.map((m) => (
                    <option key={m.codigoUsuario} value={m.codigoUsuario}>
                      {m.nombreCompleto}
                    </option>
                  ))}
                </select>

              </div>

              <div className="modal-footer">
                <Button text="Cancelar" onClick={() => setShowModal(false)} className="btn-secondary" />
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
