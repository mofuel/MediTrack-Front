import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../components/Button";
import "../css/CrearPerfilMedico.css";
import API_BASE_URL from "../config";

function CrearPerfilMedico() {
  const [especialidades, setEspecialidades] = useState([]);
  const [turnos, setTurnos] = useState([]);

  const [selectedEspecialidades, setSelectedEspecialidades] = useState([]);
  const [turnosSeleccionados, setTurnosSeleccionados] = useState([]);

  const formatearHora = (hora) => {
    if (!hora) return "";
    if (typeof hora === "string") {
      return hora.slice(0, 5); // → "08:00"
    }
    const fecha = new Date(hora);
    const horas = fecha.getUTCHours().toString().padStart(2, "0");
    const minutos = fecha.getUTCMinutes().toString().padStart(2, "0");
    return `${horas}:${minutos}`;
  };


  // Cargar especialidades y turnos desde el backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Obtener especialidades
    fetch(`${API_BASE_URL}/specialties`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar especialidades");
        return res.json();
      })
      .then((data) => {
        setEspecialidades(data);
      })
      .catch((err) => console.error("❌ Error especialidades:", err));

    // Obtener turnos
    fetch(`${API_BASE_URL}/turnos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar turnos");
        return res.json();
      })
      .then((data) => {
        setTurnos(data);
      })
      .catch((err) => console.error("❌ Error turnos:", err));
  }, []);

  // Seleccionar o deseleccionar especialidades
  const toggleEspecialidad = (e) => {
    const id = Number(e.target.value);
    setSelectedEspecialidades((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Seleccionar turno (solo uno)
  const toggleTurno = (turnoId) => {
    setTurnosSeleccionados([turnoId]);
  };

  // Guardar perfil
  const handleSubmit = async (e) => {
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
    const token = localStorage.getItem("token");

    try {
      const perfilPayload = {
        codigoUsuario,
        especialidades: selectedEspecialidades.map((id) => ({ id })), 
        turnos: turnosSeleccionados.map((id) => ({ id })), 
      };


      const response = await fetch(`${API_BASE_URL}/perfil-medico/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(perfilPayload),
      });

      if (!response.ok) throw new Error("Error al guardar perfil médico");

      Swal.fire("Perfil guardado", "Tu perfil de médico fue creado", "success").then(
        () => (window.location.href = "/index-medico")
      );
    } catch (error) {
      console.error("❌ Error al guardar perfil médico:", error);
      Swal.fire("Error", "No se pudo guardar el perfil", "error");
    }
  };

  return (
    <div className="crear-perfil-wrapper">
      <div className="main-card">
        <h2 className="card-title">Crear Perfil Médico</h2>
        <p className="card-subtext">
          Selecciona tus especialidades y turnos disponibles
        </p>

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
            {turnos.length === 0 ? (
              <p>No hay turnos disponibles</p>
            ) : (
              turnos.map((t) => (
                <div className="form-check mb-2" key={t.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`turno-${t.id}`}
                    checked={turnosSeleccionados.includes(t.id)}
                    onChange={() => toggleTurno(t.id)}
                  />
                  <label className="form-check-label" htmlFor={`turno-${t.id}`}>
                    {t.nombre} ({formatearHora(t.horaInicio)} – {formatearHora(t.horaFin)})
                  </label>

                </div>
              ))
            )}
          </div>

          <div className="text-center mt-4">
            <Button
              text="Guardar Perfil"
              type="submit"
              className="robotic-button"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearPerfilMedico;
