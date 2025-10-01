
function VistaPacienteCitas() {
  const citas = [
    { id: 1, fecha: "2025-10-05", hora: "09:30 AM", doctor: "Dr. López", estado: "Próxima" },
    { id: 2, fecha: "2025-09-15", hora: "10:00 AM", doctor: "Dr. Ruiz", estado: "Completada" },
  ];

  return (
    <div className="vista-citas-paciente">
      <h2>Mis Citas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Doctor</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.doctor}</td>
              <td>{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VistaPacienteCitas;
