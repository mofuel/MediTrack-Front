function VistaDashboard() {
  const stats = {
    pacientes: 1250,
    citasHoy: 63,
    doctores: 7,
    ingresos: 15400,
  };

  const ultimasCitas = [
    { id: 1, paciente: "Juan Pérez", hora: "10:00 AM", doctor: "Dr. López" },
    { id: 2, paciente: "María García", hora: "11:30 AM", doctor: "Dr. Ruiz" },
    { id: 3, paciente: "Carlos Mendoza", hora: "14:00 PM", doctor: "Dr. Soto" },
  ];

  return (
    <div className="dashboard-content">
      <div className="stats-grid">
        <div className="stat-card">
          <h2>Total de Pacientes</h2>
          <p className="stat-number">{stats.pacientes}</p>
        </div>
        <div className="stat-card">
          <h2>Citas Hoy</h2>
          <p className="stat-number">{stats.citasHoy}</p>
        </div>
        <div className="stat-card">
          <h2>Doctores Activos</h2>
          <p className="stat-number">{stats.doctores}</p>
        </div>
        <div className="stat-card">
          <h2>Ingresos del Mes</h2>
          <p className="stat-number">${stats.ingresos}</p>
        </div>
      </div>

      <div className="recent-section">
        <h2>Últimas Citas</h2>
        <ul className="recent-list">
          {ultimasCitas.map((cita) => (
            <li key={cita.id}>
              Paciente: {cita.paciente} - {cita.hora} - {cita.doctor}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VistaDashboard;
