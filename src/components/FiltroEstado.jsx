import { Button } from "react-bootstrap";

function FiltroEstado({ opciones, activo, onChange }) {
  return (
    <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">
      {opciones.map((estado) => (
        <Button
          key={estado}
          size="sm"
          variant={activo === estado ? "primary" : "outline-primary"}
          onClick={() => onChange(estado)}
        >
          {estado === "todas" || estado === "todos"
            ? "Todas"
            : estado.charAt(0).toUpperCase() + estado.slice(1)}
        </Button>
      ))}
    </div>
  );
}

export default FiltroEstado;
