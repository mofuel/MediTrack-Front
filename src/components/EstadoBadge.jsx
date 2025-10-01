import { Badge } from "react-bootstrap";

function EstadoBadge({ estado }) {
  const config = {
    activo: { color: "success", icon: "bi-check-circle-fill" },
    inactivo: { color: "danger", icon: "bi-x-circle-fill" },
    pendiente: { color: "warning", icon: "bi-hourglass-split" },
    aceptada: { color: "success", icon: "bi-check-circle-fill" },
    rechazada: { color: "danger", icon: "bi-x-circle-fill" },
    completada: { color: "success", icon: "bi-check-circle-fill" },
    cancelada: { color: "secondary", icon: "bi-x-circle-fill" },
    leida: { color: "secondary", icon: "bi-eye" },
    noLeida: { color: "primary", icon: "bi-eye-slash" },
  };

  const { color, icon } = config[estado] || {
    color: "secondary",
    icon: "bi-question-circle",
  };

  return (
    <Badge pill bg={color} className="estado-badge">
      <i className={`bi ${icon}`}></i>
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </Badge>
  );
}

export default EstadoBadge;
