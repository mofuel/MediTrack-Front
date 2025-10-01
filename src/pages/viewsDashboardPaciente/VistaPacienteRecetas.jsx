function VistaPacienteRecetas() {
  const recetas = [
    { id: 1, fecha: "2025-09-15", descripcion: "Receta para hipertensión", archivo: "receta1.pdf" },
    { id: 2, fecha: "2025-08-20", descripcion: "Resultados análisis de sangre", archivo: "analisis.pdf" },
  ];

  return (
    <div className="vista-recetas">
      <h2>Mis Recetas y Resultados</h2>
      <ul>
        {recetas.map((r) => (
          <li key={r.id}>
            {r.fecha} - {r.descripcion}
            <a href={`/${r.archivo}`} download className="btn-descargar"> Descargar </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VistaPacienteRecetas;
