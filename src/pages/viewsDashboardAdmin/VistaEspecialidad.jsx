import { useState, useEffect } from "react";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import API_BASE_URL from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";

function VistaEspecialidad() {
  const [especialidades, setEspecialidades] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cargarEspecialidades = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/specialties`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          const errData = await response.json().catch(() => null);
          throw new Error(errData?.error || "Ocurrió un error al crear la especialidad");
        }

        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error al cargar especialidades:", error);
        Swal.fire("Error", "No se pudieron cargar las especialidades", "error");
      }
    };

    cargarEspecialidades();
  }, [token]);


  const cargarEspecialidades = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/specialties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al obtener especialidades");
      const data = await response.json();
      setEspecialidades(data);
    } catch (error) {
      console.error("Error al cargar especialidades:", error);
      Swal.fire("Error", "No se pudieron cargar las especialidades", "error");
    }
  };

  const handleAgregarEspecialidad = async () => {
    const { value: nombre } = await Swal.fire({
      title: "Nueva Especialidad",
      input: "text",
      inputPlaceholder: "Nombre de la especialidad",
      showCancelButton: true,
      confirmButtonText: "Agregar",
    });

    if (!nombre || !nombre.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/specialties/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nombre.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || "Ocurrió un error al crear la especialidad");
      }

      Swal.fire("Agregado", "La especialidad fue registrada correctamente", "success");
      cargarEspecialidades();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEditar = async (esp) => {
    const { value: nuevoNombre } = await Swal.fire({
      title: "Editar Especialidad",
      input: "text",
      inputValue: esp.nombre,
      showCancelButton: true,
      confirmButtonText: "Guardar",
    });

    if (!nuevoNombre || !nuevoNombre.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/specialties/${esp.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre: nuevoNombre.trim() }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error || "Ocurrió un error al actualizar la especialidad");
      }

      Swal.fire("Actualizado", "La especialidad fue modificada", "success");
      cargarEspecialidades();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };


  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar especialidad?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/specialties/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al eliminar especialidad");

      Swal.fire("Eliminado", "La especialidad fue eliminada", "success");
      cargarEspecialidades();
    } catch (error) {
      console.error("Error al eliminar especialidad:", error);
      Swal.fire("Error", "No se pudo eliminar la especialidad", "error");
    }
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
              <th>Número</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {especialidades.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  No hay especialidades
                </td>
              </tr>
            ) : (
              especialidades.map((esp, index) => (
                <tr key={esp.id}>
                  {/* Secuencia consecutiva */}
                  <td>{index + 1}</td>
                  <td>{esp.nombre}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      title="Editar"
                      onClick={() => handleEditar(esp)}
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
