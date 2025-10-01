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

function VistaReportes() {
  // Datos simulados para los reportes
  const citasData = [
    { mes: "Enero", citas: 120 },
    { mes: "Febrero", citas: 98 },
    { mes: "Marzo", citas: 150 },
    { mes: "Abril", citas: 200 },
    { mes: "Mayo", citas: 90 },
    { mes: "Junio", citas: 110 },
    { mes: "Julio", citas: 78 },
    { mes: "Agosto", citas: 200 },
    { mes: "Septiembre", citas: 200 }
  ];

  const estadoCitas = [
    { name: "Completadas", value: 300 },
    { name: "Canceladas", value: 50 },
    { name: "Pendientes", value: 100 },
  ];

  const colores = ["#4caf50", "#f44336", "#ff9800"];

  return (
    <div className="vista-reportes">
      <h2>Reportes del Sistema</h2>

      <div className="reportes-grid">
        {/* Reporte de citas por mes */}
        <div className="reporte-card">
          <h3>Citas por Mes</h3>
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
      </div>
    </div>
  );
}

export default VistaReportes;
