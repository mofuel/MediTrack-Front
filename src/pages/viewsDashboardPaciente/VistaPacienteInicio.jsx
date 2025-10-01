import { useEffect, useState } from "react";

function VistaPacienteInicio() {
  const [perfil, setPerfil] = useState({
    nombre: "Paciente",
    edad: 0,
    email: "",
  });

  const [proximaCita, setProximaCita] = useState({
    fecha: "2025-10-05",
    hora: "09:30 AM",
    doctor: "Dr. López",
  });

  // Al montar, recuperamos el perfil desde localStorage
  useEffect(() => {
    const perfilGuardado = localStorage.getItem("perfilPaciente");
    if (perfilGuardado) {
      setPerfil(JSON.parse(perfilGuardado));
    }
  }, []);

  return (
    <div className="vista-inicio">
      <h2>Bienvenido/a, {perfil.nombre}</h2>
      <p><strong>Edad:</strong> {perfil.edad}</p>
      <p><strong>Email:</strong> {perfil.email}</p>

      <div className="proxima-cita">
        <h3>Próxima Cita</h3>
        <p>{proximaCita.fecha} - {proximaCita.hora}</p>
        <p>Doctor: {proximaCita.doctor}</p>
      </div>
    </div>
  );
}

export default VistaPacienteInicio;
