import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

function VistaDashboard() {
  const [stats, setStats] = useState({
    pacientes: 0,
    citasHoy: 0,
    doctores: 0,
    ingresos: 15400, 
  });

  const [citasData, setCitasData] = useState([]);
  const [estadoCitas, setEstadoCitas] = useState([]);
  const colores = ["#4caf50", "#f44336", "#ff9800"];

  useEffect(() => {
    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const pacientes = Object.values(usuarios).filter(u => u.rol === "ROLE_PACIENTE");
    const doctores = Object.values(usuarios).filter(u => u.rol === "ROLE_MEDICO");

    // Obtener citas desde localStorage
    const citas = JSON.parse(localStorage.getItem("citas")) || [];

    // Citas de hoy
    const hoy = new Date().toISOString().split("T")[0];
    const citasHoy = citas.filter(c => c.fecha === hoy).length;

    // Estadísticas de estado de citas
    const completadas = citas.filter(c => c.estado === "COMPLETADA").length;
    const canceladas = citas.filter(c => c.estado === "CANCELADA").length;
    const pendientes = citas.filter(c => c.estado === "PENDIENTE").length;

    // Citas por mes
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const citasPorMes = meses.map((mes, index) => {
      const monthNumber = index + 1; // Enero = 1
      const count = citas.filter(c => {
        const fecha = new Date(c.fecha);
        return fecha.getMonth() + 1 === monthNumber;
      }).length;
      return { mes, citas: count };
    });

    setStats({
      pacientes: pacientes.length,
      citasHoy,
      doctores: doctores.length,
      ingresos: 15400,
    });

    setCitasData(citasPorMes);
    setEstadoCitas([
      { name: "Completadas", value: completadas },
      { name: "Canceladas", value: canceladas },
      { name: "Pendientes", value: pendientes },
    ]);
  }, []);

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
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
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
