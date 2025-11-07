import { useState, useEffect } from "react";
import Button from "../../components/Button";
import "bootstrap/dist/css/bootstrap.min.css";

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
    rol: "ROLE_PACIENTE",
    estado: "Activo",
  });

  const token = localStorage.getItem("token");

  // ✅ Cargar pacientes desde la API
  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener los usuarios");

        const data = await response.json();
        const pacientesRol = data.filter(u => u.rol === "ROLE_PACIENTE");
        setPacientes(pacientesRol);
      } catch (error) {
        console.error("❌ Error al cargar pacientes:", error);
      }
    };

    fetchPacientes();
  }, [token]);

  // ✅ Abrir modal (editar o nuevo)
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
        rol: "ROLE_PACIENTE",
        estado: "Activo",
      });
    }
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  // ✅ Guardar cambios (nuevo o edición)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, dni, sexo, email, telefono } = formData;
    if (!nombre || !dni || !sexo || !email || !telefono)
      return alert("Todos los campos son obligatorios");

    try {
      const payload = {
        ...formData,
        activo: formData.estado === "Activo",
      };

      let response;
      if (editarPaciente) {
        // 🔄 Actualizar
        response = await fetch(`http://localhost:8080/api/users/${editarPaciente}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        // ➕ Registrar nuevo
        response = await fetch("http://localhost:8080/api/users/register", {
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
            password: "123456", // puedes cambiar esto si deseas otro campo
            confirmPassword: "123456",
          }),
        });
      }

      if (!response.ok) throw new Error("Error al guardar el usuario");

      // 🔄 Refrescar lista
      const updatedList = await fetch("http://localhost:8080/api/users", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const newData = await updatedList.json();
      setPacientes(newData.filter(u => u.rol === "ROLE_PACIENTE"));

      cerrarModal();
    } catch (error) {
      console.error("❌ Error al guardar paciente:", error);
      alert("Error al guardar el paciente");
    }
  };

  // 🗑️ Eliminar
  const handleEliminar = async (codigo) => {
    if (!window.confirm("¿Eliminar paciente?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/users/${codigo}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Error al eliminar paciente");

      setPacientes(pacientes.filter(p => p.codigo !== codigo));
    } catch (error) {
      console.error("❌ Error al eliminar paciente:", error);
    }
  };

  // 🔍 Filtro + orden
  const pacientesFiltrados = pacientes
    .filter(p => p.nombre?.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) =>
      orden === "asc"
        ? a.nombre.localeCompare(b.nombre)
        : b.nombre.localeCompare(a.nombre)
    );

  const obtenerNombreRol = (rol) => {
    switch (rol) {
      case "ROLE_PACIENTE":
        return "Paciente";
      case "ROLE_MEDICO":
        return "Médico";
      case "ROLE_ADMIN":
        return "Administrador";
      default:
        return rol;
    }
  };

  // ✅ Render
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gestión de Pacientes</h2>
        <Button text="Agregar Paciente" onClick={() => abrirModal()} />
      </div>

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

      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Sexo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientesFiltrados.length === 0 ? (
              <tr><td colSpan={8} className="text-center">No hay pacientes</td></tr>
            ) : (
              pacientesFiltrados.map(p => (
                <tr key={p.codigo}>
                  <td>{p.nombre}</td>
                  <td>{p.dni}</td>
                  <td>{p.sexo}</td>
                  <td>{p.email}</td>
                  <td>{p.telefono}</td>
                  <td>{obtenerNombreRol(p.rol)}</td>
                  <td>
                    <span className={`badge ${p.activo ? "bg-success" : "bg-secondary"}`}>
                      {p.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => abrirModal(p)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.codigo)}>Eliminar</button>
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
                <h5 className="modal-title">{editarPaciente ? "Editar Paciente" : "Agregar Paciente"}</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Nombre"
                  value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} />
                <input className="form-control mb-2" placeholder="Apellido"
                  value={formData.apellido} onChange={(e) => setFormData({ ...formData, apellido: e.target.value })} />
                <input className="form-control mb-2" placeholder="DNI"
                  value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} />
                <select className="form-select mb-2" value={formData.sexo}
                  onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}>
                  <option value="">Seleccione Sexo</option>
                  <option value="MASCULINO">Masculino</option>
                  <option value="FEMENINO">Femenino</option>
                </select>
                <input className="form-control mb-2" placeholder="Email"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input className="form-control mb-2" placeholder="Teléfono"
                  value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                <select className="form-select mb-2" value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}>
                  <option value="ROLE_PACIENTE">Paciente</option>
                  <option value="ROLE_MEDICO">Médico</option>
                  <option value="ROLE_ADMIN">Administrador</option>
                </select>
                <select className="form-select" value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editarPaciente ? "Guardar" : "Agregar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaPacientes;
