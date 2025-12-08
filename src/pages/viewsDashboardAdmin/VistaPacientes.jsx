import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Button from "../../components/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../../config";

function VistaPacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editarPaciente, setEditarPaciente] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    sexo: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: ""
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los usuarios");

        const data = await response.json();
        const pacientesRol = data.filter((u) => u.rol === "ROLE_PACIENTE");
        setPacientes(pacientesRol);
      } catch (error) {
        console.error("Error al cargar pacientes:", error);
        Swal.fire("Error", "No se pudieron cargar los pacientes", "error");
      }
    };

    fetchPacientes();
  }, [token]);

  const abrirModal = (paciente = null) => {
    if (paciente) {
      setEditarPaciente(paciente.codigo);
      setFormData({
        ...paciente,
        estado: paciente.activo ? "Activo" : "Inactivo",
      });
    } else {
      setEditarPaciente(null);
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
        rol: "ROLE_PACIENTE",
        estado: "Activo",
      });
    }
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editarPaciente) {
      if (formData.password !== formData.confirmPassword) {
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
        return;
      }
    }

    const { nombre, dni, sexo, email, telefono } = formData;
    if (!nombre || !dni || !sexo || !email || !telefono)
      return Swal.fire("Atención", "Todos los campos son obligatorios", "warning");

    try {
      const payload = {
        ...formData,
        activo: formData.estado === "Activo",
      };

      let response;
      if (editarPaciente) {
        response = await fetch(`${API_BASE_URL}/users/${editarPaciente}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch(`${API_BASE_URL}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            apellido: formData.apellido,
            dni: formData.dni,
            sexo: formData.sexo,
            email: formData.email,
            telefono: formData.telefono,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          }),
        });
      }

      if (!response.ok) throw new Error("Error al guardar el usuario");

      Swal.fire({
        title: editarPaciente ? "Paciente actualizado" : "Paciente registrado",
        text: "Los datos se han guardado correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      const updatedList = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newData = await updatedList.json();
      setPacientes(newData.filter((u) => u.rol === "ROLE_PACIENTE"));

      cerrarModal();
    } catch (error) {
      console.error("Error al guardar paciente:", error);
      Swal.fire("Error", "Hubo un problema al guardar el paciente", "error");
    }
  };

  const handleEliminar = async (codigo) => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar paciente?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const response = await fetch(`${API_BASE_URL}/users/${codigo}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al eliminar paciente");
      }

      setPacientes(pacientes.filter(p => p.codigo !== codigo));

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Paciente eliminado correctamente",
        timer: 1800,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error al eliminar paciente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo eliminar el paciente",
      });
    }
  };


  const pacientesFiltrados = pacientes
    .filter((p) => p.nombre?.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) =>
      orden === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );


    
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gestión de Pacientes</h2>
        <Button text="Agregar Paciente" onClick={() => abrirModal()} />
      </div>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar paciente..."
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
              <th>DNI</th>
              <th>Sexo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No hay pacientes
                </td>
              </tr>
            ) : (
              pacientesFiltrados.map((p) => (
                <tr key={p.codigo}>
                  <td>{p.nombre}</td>
                  <td>{p.dni}</td>
                  <td>{p.sexo}</td>
                  <td>{p.email}</td>
                  <td>{p.telefono}</td>
                  <td>
                    <span
                      className={`badge ${p.activo ? "bg-success" : "bg-secondary"}`}
                    >
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => abrirModal(p)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleEliminar(p.codigo)}
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
                  {editarPaciente ? "Editar Paciente" : "Agregar Paciente"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cerrarModal}
                ></button>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={(e) =>
                    setFormData({ ...formData, apellido: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={(e) =>
                    setFormData({ ...formData, dni: e.target.value })
                  }
                />
                <select
                  className="form-select mb-2"
                  value={formData.sexo}
                  onChange={(e) =>
                    setFormData({ ...formData, sexo: e.target.value })
                  }
                >
                  <option value="">Seleccione Sexo</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                </select>
                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <input
                  className="form-control mb-2"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({ ...formData, telefono: e.target.value })
                  }
                />
                <select
                  className="form-select mb-2"
                  value={formData.rol}
                  onChange={(e) =>
                    setFormData({ ...formData, rol: e.target.value })
                  }
                >
                  <option value="ROLE_PACIENTE">Paciente</option>
                  <option value="ROLE_MEDICO">Médico</option>
                  <option value="ROLE_ADMIN">Administrador</option>
                </select>
                <select
                  className="form-select mb-3"
                  value={formData.estado}
                  onChange={(e) =>
                    setFormData({ ...formData, estado: e.target.value })
                  }
                >
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>

                {/* Contraseñas solo en creación */}
                {!editarPaciente && (
                  <>
                    <input
                      type="password"
                      className="form-control mb-2"
                      placeholder="Contraseña"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar contraseña"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarModal}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  {editarPaciente ? "Guardar" : "Agregar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaPacientes;
