import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function VistaEspecialidad() {
  const [especialidades, setEspecialidades] = useState([]);

  // Cargar especialidades desde localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("especialidades");
      if (stored) {
        setEspecialidades(JSON.parse(stored));
      } else {
        localStorage.setItem("especialidades", JSON.stringify([]));
        setEspecialidades([]);
      }
    } catch (error) {
      console.error("Error leyendo especialidades de localStorage:", error);
      localStorage.setItem("especialidades", JSON.stringify([]));
      setEspecialidades([]);
    }
  }, []);

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    try {
      localStorage.setItem("especialidades", JSON.stringify(especialidades));
    } catch (error) {
      console.error("Error guardando especialidades en localStorage:", error);
    }
  }, [especialidades]);

  const handleAgregarEspecialidad = () => {
    Swal.fire({
      title: "Nueva Especialidad",
      input: "text",
      inputPlaceholder: "Nombre de la especialidad",
      showCancelButton: true,
      confirmButtonText: "Agregar",
    }).then((result) => {
      if (result.isConfirmed && result.value.trim()) {
        const nueva = {
          id: especialidades.length > 0 ? especialidades[especialidades.length - 1].id + 1 : 1,
          nombre: result.value.trim(),
        };
        setEspecialidades((prev) => [...prev, nueva]);
        Swal.fire("¡Agregado!", "La especialidad fue agregada.", "success");
      }
    });
  };

  const handleEditar = (id) => {
    const esp = especialidades.find((e) => e.id === id);
    if (!esp) return;

    Swal.fire({
      title: "Editar Especialidad",
      input: "text",
      inputValue: esp.nombre,
      showCancelButton: true,
      confirmButtonText: "Guardar",
    }).then((result) => {
      if (result.isConfirmed && result.value.trim()) {
        setEspecialidades((prev) =>
          prev.map((e) => (e.id === id ? { ...e, nombre: result.value.trim() } : e))
        );
        Swal.fire("¡Actualizado!", "La especialidad fue editada.", "success");
      }
    });
  };

  const handleEliminar = (id) => {
    Swal.fire({
      title: "¿Eliminar especialidad?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setEspecialidades((prev) => prev.filter((e) => e.id !== id));
        Swal.fire("¡Eliminado!", "La especialidad fue eliminada.", "success");
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-0">Gestión de Especialidades</h2>
          <p className="mb-0">Aquí puedes gestionar las especialidades médicas.</p>
        </div>
        <Button text="Agregar Especialidad" onClick={handleAgregarEspecialidad} />
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">No hay especialidades</td>
              </tr>
            ) : (
              especialidades.map((esp) => (
                <tr key={esp.id}>
                  <td>{esp.id}</td>
                  <td>{esp.nombre}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      title="Editar"
                      onClick={() => handleEditar(esp.id)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      title="Eliminar"
                      onClick={() => handleEliminar(esp.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VistaEspecialidad;
