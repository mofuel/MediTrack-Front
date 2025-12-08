import { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import API_BASE_URL from "../../config";

function VistaDashboard({ cantidadDoctores, cantidadPacientes }) {
  const [stats, setStats] = useState({
    pacientes: cantidadPacientes,
    doctores: cantidadDoctores,
    citasHoy: 0,
    citasPendientes: 0,
    citasAceptadas: 0,
    citasRechazadas: 0,
    ingresos: 15400,
  });

  const [citasPorMes, setCitasPorMes] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setStats(prev => ({
      ...prev,
      pacientes: cantidadPacientes,
      doctores: cantidadDoctores,
    }));
  }, [cantidadDoctores, cantidadPacientes]);

  useEffect(() => {
    if (!token) return;

    const cargarEstadisticasCitas = async () => {
      try {
        setLoading(true);
        console.log("Obteniendo todas las citas...");

        // Obtener todas las citas (endpoint para administrador)
        const res = await fetch(`${API_BASE_URL}/appointments/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.warn(" No se pudieron obtener todas las citas, intentando con pendientes...");
          // Si falla, al menos obtener las pendientes
          const resPendientes = await fetch(`${API_BASE_URL}/appointments/pendientes`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          if (resPendientes.ok) {
            const citasPendientes = await resPendientes.json();
            setStats(prev => ({
              ...prev,
              citasPendientes: citasPendientes.length,
            }));
          }
          setLoading(false);
          return;
        }

        const citas = await res.json();
        console.log("Citas obtenidas:", citas);

        const hoy = new Date();
        const hoyString = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

        const citasDeHoy = citas.filter(c => c.fechaCita === hoyString);

        const pendientes = citas.filter(c => c.estado === "PENDIENTE").length;
        const aceptadas = citas.filter(c => c.estado === "ACEPTADA").length;
        const rechazadas = citas.filter(c => c.estado === "RECHAZADA").length;

        const citasPorMesMap = {};
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
                      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        meses.forEach(mes => {
          citasPorMesMap[mes] = 0;
        });

        citas.forEach(cita => {
          if (cita.fechaCita) {
            const fecha = new Date(cita.fechaCita + "T00:00:00");
            const mesIndex = fecha.getMonth();
            const nombreMes = meses[mesIndex];
            citasPorMesMap[nombreMes]++;
          }
        });

        const citasPorMesArray = meses.map(mes => ({
          mes,
          citas: citasPorMesMap[mes]
        }));

        setStats(prev => ({
          ...prev,
          citasHoy: citasDeHoy.length,
          citasPendientes: pendientes,
          citasAceptadas: aceptadas,
          citasRechazadas: rechazadas,
        }));

        setCitasPorMes(citasPorMesArray);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
        setLoading(false);
      }
    };

    cargarEstadisticasCitas();
  }, [token]);

  const estadoCitas = [
    { name: "Aceptadas", value: stats.citasAceptadas },
    { name: "Rechazadas", value: stats.citasRechazadas },
    { name: "Pendientes", value: stats.citasPendientes },
  ].filter(item => item.value > 0); 

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
          <p className="stat-number">
            {loading ? "..." : stats.citasHoy}
          </p>
        </div>
        <div className="stat-card">
          <h2>Doctores Activos</h2>
          <p className="stat-number">{stats.doctores}</p>
        </div>
        <div className="stat-card">
          <h2>Citas Pendientes</h2>
          <p className="stat-number">
            {loading ? "..." : stats.citasPendientes}
          </p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="reportes-grid">
        <div className="reporte-card">
          <h3>Citas por Mes (Año Actual)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={citasPorMes.length > 0 ? citasPorMes : []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="citas" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
          {loading && <p className="text-center">Cargando datos...</p>}
          {!loading && citasPorMes.every(m => m.citas === 0) && (
            <p className="text-center text-muted">No hay citas registradas</p>
          )}
        </div>

        <div className="reporte-card">
          <h3>Estado de las Citas</h3>
          <ResponsiveContainer width="100%" height={300}>
            {estadoCitas.length > 0 ? (
              <PieChart>
                <Pie
                  data={estadoCitas}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                >
                  {estadoCitas.map((entry, index) => (
                    <Cell key={index} fill={colores[index % colores.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <div className="d-flex align-items-center justify-content-center h-100">
                <p className="text-muted">
                  {loading ? "Cargando datos..." : "No hay citas registradas"}
                </p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default VistaDashboard;