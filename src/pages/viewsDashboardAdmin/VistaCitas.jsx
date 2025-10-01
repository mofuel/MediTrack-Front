function VistaCitas() {
  const citas = [
    { id: 1, paciente: "Juan Pérez", doctor: "Dr. López", fecha: "2025-09-30", hora: "10:00 AM", estado: "Pendiente" },
    { id: 2, paciente: "Ana Torres", doctor: "Dr. Ruiz", fecha: "2025-09-30", hora: "11:00 AM", estado: "Completada" },
    { id: 3, paciente: "Luis Gómez", doctor: "Dr. Soto", fecha: "2025-10-01", hora: "09:30 AM", estado: "Cancelada" },
  ];

  return (
    <div className="vista-citas">
      <h2>Gestión de Citas</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Doctor</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td>{cita.paciente}</td>
              <td>{cita.doctor}</td>
              <td>{cita.fecha}</td>
              <td>{cita.hora}</td>
              <td>{cita.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VistaCitas;
