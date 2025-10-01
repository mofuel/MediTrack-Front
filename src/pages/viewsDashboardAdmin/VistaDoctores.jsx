function VistaDoctores() {
  const doctores = [
    { id: 1, nombre: "Dr. López", especialidad: "Cardiología", estado: "Activo" },
    { id: 2, nombre: "Dr. Ruiz", especialidad: "Pediatría", estado: "Activo" },
    { id: 3, nombre: "Dr. Soto", especialidad: "Neurología", estado: "Inactivo" },
  ];

  return (
    <div className="vista-doctores">
      <h2>Gestión de Doctores</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {doctores.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.nombre}</td>
              <td>{doctor.especialidad}</td>
              <td>{doctor.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VistaDoctores;
