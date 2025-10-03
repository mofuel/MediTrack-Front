import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import "../css/CrearPerfilMedico.css";

function CrearPerfilMedico() {
  const [especialidades, setEspecialidades] = useState([]);
  const turnos = [
    { id: 1, nombre: "Mañana", hora_inicio: "08:00", hora_fin: "14:00" },
    { id: 2, nombre: "Tarde", hora_inicio: "14:00", hora_fin: "22:00" },
  ];

  const [selectedEspecialidades, setSelectedEspecialidades] = useState([]);
  const [turnosSeleccionados, setTurnosSeleccionados] = useState([]);

  // Cargar especialidades desde localStorage 
  useEffect(() => {
    const storedEspecialidades = JSON.parse(localStorage.getItem("especialidades")) || [];
    setEspecialidades(storedEspecialidades);

    const codigoUsuario = localStorage.getItem("codigoUsuario");
    if (!codigoUsuario) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const usuario = usuarios[codigoUsuario];

    if (usuario?.especialidades) setSelectedEspecialidades(usuario.especialidades);
    if (usuario?.turnos) setTurnosSeleccionados(usuario.turnos);
  }, []);

  const toggleEspecialidad = (e) => {
    const id = Number(e.target.value);
    setSelectedEspecialidades((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleTurno = (turnoId) => {
    setTurnosSeleccionados([turnoId]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedEspecialidades.length || !turnosSeleccionados.length) {
      Swal.fire(
        "Faltan datos",
        "Selecciona al menos una especialidad y un turno",
        "warning"
      );
      return;
    }

    const codigoUsuario = localStorage.getItem("codigoUsuario");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const usuario = usuarios[codigoUsuario] || {};

    usuarios[codigoUsuario] = {
      ...usuario,
      especialidades: selectedEspecialidades,
      turnos: turnosSeleccionados,
    };
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire("Perfil guardado", "Tu perfil de médico fue creado", "success")
      .then(() => window.location.href = "/index-medico");
  };

  return (
    <div className="crear-perfil-wrapper">
      <div className="main-card">
        <h2 className="card-title">Crear Perfil Médico</h2>
        <p className="card-subtext">Selecciona tus especialidades y turnos disponibles</p>

        <form onSubmit={handleSubmit} className="card-form">
          {/* Especialidades */}
          <div className="sub-card">
            <h3 className="sub-card-title">Especialidades</h3>
            {especialidades.length === 0 ? (
              <p>No hay especialidades disponibles</p>
            ) : (
              especialidades.map((e) => (
                <div className="form-check mb-2" key={e.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`esp-${e.id}`}
                    value={e.id}
                    checked={selectedEspecialidades.includes(e.id)}
                    onChange={toggleEspecialidad}
                  />
                  <label className="form-check-label" htmlFor={`esp-${e.id}`}>
                    {e.nombre}
                  </label>
                </div>
              ))
            )}
          </div>

          {/* Turnos */}
          <div className="sub-card">
            <h3 className="sub-card-title">Turnos (Lunes a Sábado)</h3>
            {turnos.map((t) => (
              <div className="form-check mb-2" key={t.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`turno-${t.id}`}
                  checked={turnosSeleccionados.includes(t.id)}
                  onChange={() => toggleTurno(t.id)}
                />
                <label className="form-check-label" htmlFor={`turno-${t.id}`}>
                  {t.nombre} ({t.hora_inicio} – {t.hora_fin})
                </label>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button text="Guardar Perfil" type="submit" className="robotic-button" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPerfilMedico;
