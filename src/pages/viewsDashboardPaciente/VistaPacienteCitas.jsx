import { useState, useEffect } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import EstadoBadge from "../../components/EstadoBadge";
import Swal from "sweetalert2";

function VistaPacienteCitas() {
  const codigoUsuario = localStorage.getItem("codigoUsuario");
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevaCita, setNuevaCita] = useState({ fecha: "", hora: "", especialidad: "", doctor: "" });
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);
  const [especialidadesDisponibles, setEspecialidadesDisponibles] = useState([]);

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const user = usuarios[codigoUsuario];
    setCitas(user?.citas?.map(c => ({ ...c })) || []);

    const data = JSON.parse(localStorage.getItem("especialidades")) || [];
    setEspecialidadesDisponibles(data);

    const handleStorage = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const user = usuarios[codigoUsuario];
      setCitas(user?.citas?.map(c => ({ ...c })) || []);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [codigoUsuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaCita(prev => ({ ...prev, [name]: value }));

    if (name === "especialidad") {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const medicos = Object.values(usuarios).filter(
        u => u.rol === "ROLE_MEDICO" && u.especialidades?.includes(Number(value))
      );
      setMedicosFiltrados(medicos);
      setNuevaCita(prev => ({ ...prev, doctor: "" }));
    }
  };

  const handleGuardarCita = () => {
    if (!nuevaCita.fecha || !nuevaCita.hora || !nuevaCita.especialidad || !nuevaCita.doctor) {
      Swal.fire({ title: "Campos incompletos", text: "Completa todos los campos", icon: "warning" });
      return;
    }

    const nueva = {
      id: citas.length > 0 ? citas[citas.length - 1].id + 1 : 1,
      fecha: nuevaCita.fecha,
      hora: nuevaCita.hora,
      especialidad: Number(nuevaCita.especialidad),
      doctor: nuevaCita.doctor,
      estado: "pendiente",
    };

    const nuevasCitas = [...citas, nueva];
    setCitas(nuevasCitas);

    // Guardar solo cuando hay cambios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    if (usuarios[codigoUsuario]) {
      usuarios[codigoUsuario].citas = nuevasCitas;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      window.dispatchEvent(new Event("usuariosActualizados"));
    }

    setNuevaCita({ fecha: "", hora: "", especialidad: "", doctor: "" });
    setMedicosFiltrados([]);
    setShowModal(false);

    Swal.fire({ title: "¡Cita agregada!", text: "Tu nueva cita ha sido guardada.", icon: "success" });
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
                <td>{c.fecha}</td>
                <td>{c.hora}</td>
                <td>{especialidadesDisponibles.find(e => e.id === c.especialidad)?.nombre}</td>
                <td>{c.doctor}</td>
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
                <InputField type="date" name="fecha" value={nuevaCita.fecha} onChange={handleChange} />
                <InputField type="time" name="hora" value={nuevaCita.hora} onChange={handleChange} />
                <select className="form-select my-2" name="especialidad" value={nuevaCita.especialidad} onChange={handleChange}>
                  <option value="">Seleccione especialidad</option>
                  {especialidadesDisponibles.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>
                <select className="form-select my-2" name="doctor" value={nuevaCita.doctor} onChange={handleChange}>
                  <option value="">Seleccione doctor</option>
                  {medicosFiltrados.map(m => <option key={m.codigo} value={`${m.nombre} ${m.apellido}`}>{m.nombre} {m.apellido}</option>)}
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
