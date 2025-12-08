import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../../config";

function VistaTurnosClinica() {
  const [turnos, setTurnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editarTurno, setEditarTurno] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    horaInicio: "",
    horaFin: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/turnos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al obtener los turnos");

        const data = await response.json();
        setTurnos(data);
      } catch (error) {
        console.error("Error al cargar turnos:", error);
        Swal.fire("Error", "No se pudieron cargar los turnos", "error");
      }
    };

    fetchTurnos();
  }, [token]);

  const abrirModal = (turno = null) => {
    if (turno) {
      setEditarTurno(turno.id);
      setFormData({
        nombre: turno.nombre,
        horaInicio: turno.horaInicio,
        horaFin: turno.horaFin,
      });
    } else {
      setEditarTurno(null);
      setFormData({ nombre: "", horaInicio: "", horaFin: "" });
    }
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nombre, horaInicio, horaFin } = formData;
    if (!nombre || !horaInicio || !horaFin)
      return Swal.fire("Atención", "Todos los campos son obligatorios", "warning");

    try {
      const payload = { nombre, horaInicio, horaFin };
      let response;

      if (editarTurno) {
        response = await fetch(`${API_BASE_URL}/turnos/${editarTurno}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/turnos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || "Error al guardar turno");
      }

      Swal.fire({
        title: editarTurno ? "Turno actualizado" : "Turno registrado",
        text: "Los datos se han guardado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      const updated = await fetch(`${API_BASE_URL}/turnos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await updated.json();
      setTurnos(data);
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar turno:", error);
      Swal.fire("Error", error.message || "No se pudo guardar el turno", "error");
    }
  };

  const handleEliminar = async (id) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar turno?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/turnos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const resultText = await response.text();
      if (!response.ok) throw new Error(resultText);

      setTurnos(turnos.filter((t) => t.id !== id));

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Turno eliminado correctamente",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error al eliminar turno:", error);
      Swal.fire("Error", error.message || "No se pudo eliminar el turno", "error");
    }
  };

  const turnosFiltrados = turnos
    .filter((t) => t.nombre?.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) =>
      orden === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gestión de Turnos de Clínica</h2>
        <Button text="Agregar Turno" onClick={() => abrirModal()} />
      </div>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar turno..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3 ms-auto">
          <select
            className="form-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="asc">Ordenar A-Z</option>
            <option value="desc">Ordenar Z-A</option>
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {turnosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No hay turnos registrados
                </td>
              </tr>
            ) : (
              turnosFiltrados.map((t) => (
                <tr key={t.id}>
                  <td>{t.nombre}</td>
                  <td>{t.horaInicio}</td>
                  <td>{t.horaFin}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => abrirModal(t)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(t.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">
                  {editarTurno ? "Editar Turno" : "Agregar Turno"}
                </h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Nombre del turno"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
                <label>Hora de inicio:</label>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={formData.horaInicio}
                  onChange={(e) =>
                    setFormData({ ...formData, horaInicio: e.target.value })
                  }
                />
                <label>Hora de fin:</label>
                <input
                  type="time"
                  className="form-control mb-2"
                  value={formData.horaFin}
                  onChange={(e) =>
                    setFormData({ ...formData, horaFin: e.target.value })
                  }
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editarTurno ? "Guardar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaTurnosClinica;
