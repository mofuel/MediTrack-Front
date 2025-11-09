import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

function VistaDashboard({ cantidadDoctores, cantidadPacientes }) {

  const [stats, setStats] = useState({
    pacientes: cantidadPacientes,
    doctores: cantidadDoctores,
    citasHoy: 2, // valor por defecto
    ingresos: 15400, // valor fijo
  });

  // Actualiza cuando cambian los props
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      pacientes: cantidadPacientes,
      doctores: cantidadDoctores,
    }));
  }, [cantidadDoctores, cantidadPacientes]);

  // Datos de gráficos ficticios
  const [citasData] = useState([
    { mes: "Enero", citas: 2 },
    { mes: "Febrero", citas: 2 },
    { mes: "Marzo", citas: 2 },
    { mes: "Abril", citas: 2 },
    { mes: "Mayo", citas: 2 },
    { mes: "Junio", citas: 2 },
    { mes: "Julio", citas: 2 },
    { mes: "Agosto", citas: 2 },
    { mes: "Septiembre", citas: 2 },
    { mes: "Octubre", citas: 2 },
    { mes: "Noviembre", citas: 2 },
    { mes: "Diciembre", citas: 2 },
  ]);

  const [estadoCitas] = useState([
    { name: "Completadas", value: 2 },
    { name: "Canceladas", value: 0 },
    { name: "Pendientes", value: 0 },
  ]);

  const colores = ["#4caf50", "#f44336", "#ff9800"];

  return (
    <div className="dashboard-content">
      {/* Estadísticas */}
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

      {/* Gráficos */}
      <div className="reportes-grid">
        <div className="reporte-card">
          <h3>Citas por Año</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={citasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="citas" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="reporte-card">
          <h3>Estado de las Citas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estadoCitas}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {estadoCitas.map((entry, index) => (
                  <Cell key={index} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VistaDashboard;
