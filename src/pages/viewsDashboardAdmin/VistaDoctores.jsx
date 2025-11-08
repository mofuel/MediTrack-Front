import { useState, useEffect } from "react";
import Button from "../../components/Button";
import SelectField from "../../components/SelectField";
import API_BASE_URL from "../../config";
import "bootstrap/dist/css/bootstrap.min.css";

function VistaDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [editarDoctor, setEditarDoctor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    sexo: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    especialidades: [],
    estado: "Activo",
  });

  const opcionesSexo = [
    { value: "MASCULINO", label: "Masculino" },
    { value: "FEMENINO", label: "Femenino" },
  ];

  const token = localStorage.getItem("token");

  // 🔹 Cargar doctores y especialidades
  useEffect(() => {
    cargarDoctores();
    cargarEspecialidades();
  }, []);

  const cargarDoctores = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al cargar doctores");
      const data = await response.json();
      setDoctores(data.filter(u => u.rol === "ROLE_MEDICO"));
    } catch (error) {
      console.error(error);
    }
  };

  const cargarEspecialidades = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/specialties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Error al cargar especialidades");
      const data = await response.json();
      setEspecialidades(data);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Abrir modal
  const abrirModal = (doctor = null) => {
    if (doctor) {
      setEditarDoctor(doctor.codigo);
      setFormData({
        ...doctor,
        password: "",
        confirmPassword: "",
        apellido: doctor.apellido || "",
        especialidades: doctor.especialidades ? doctor.especialidades.map(e => e.id) : [],
      });
    } else {
      setEditarDoctor(null);
      setFormData({
        nombre: "",
        apellido: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
        especialidades: [],
        estado: "Activo",
      });
    }
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  // 🔹 Guardar o editar doctor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, apellido, dni, sexo, email, telefono, password, confirmPassword } = formData;

    if (!nombre || !apellido || !dni || !sexo || !email || !telefono) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const payload = {
        ...formData,
        rol: "ROLE_MEDICO",
        especialidades: formData.especialidades,
      };

      let response;
      if (editarDoctor) {
        response = await fetch(`${API_BASE_URL}/users/${editarDoctor}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload),
        });
      } else {
        if (!password || password !== confirmPassword) {
          alert("Las contraseñas no coinciden o están vacías");
          return;
        }
        response = await fetch(`${API_BASE_URL}/users/doctors`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || "Error al guardar el doctor");
        return;
      }

      await cargarDoctores();
      cerrarModal();
    } catch (error) {
      console.error(error);
      alert("Error al guardar doctor");
    }
  };

  // 🔹 Eliminar doctor
  const handleEliminar = async (codigo) => {
    if (!window.confirm("¿Eliminar doctor?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/users/${codigo}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error("Error al eliminar doctor");
      await cargarDoctores();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar doctor");
    }
  };

  const doctoresFiltrados = doctores
    .filter(d => d.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => (orden === "asc" ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre)));

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Gestión de Doctores</h2>
        <Button text="Agregar Doctor" onClick={() => abrirModal()} />
      </div>

      {/* Filtros */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar doctor..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3 ms-auto">
          <select className="form-select" value={orden} onChange={e => setOrden(e.target.value)}>
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
              <th>Apellido</th>
              <th>DNI</th>
              <th>Sexo</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {doctoresFiltrados.length === 0 ? (
              <tr><td colSpan={8} className="text-center">No hay doctores</td></tr>
            ) : (
              doctoresFiltrados.map(d => (
                <tr key={d.codigo}>
                  <td>{d.nombre}</td>
                  <td>{d.apellido}</td>
                  <td>{d.dni}</td>
                  <td>{d.sexo}</td>
                  <td>{d.email}</td>
                  <td>{d.telefono}</td>
                  <td><span className={`badge ${d.estado === "Activo" ? "bg-success" : "bg-secondary"}`}>{d.estado}</span></td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => abrirModal(d)}>Editar</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(d.codigo)}>Eliminar</button>
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
                <h5 className="modal-title">{editarDoctor ? "Editar Doctor" : "Agregar Doctor"}</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
                <input className="form-control mb-2" placeholder="Apellido" value={formData.apellido} onChange={e => setFormData({ ...formData, apellido: e.target.value })} />
                <input className="form-control mb-2" placeholder="DNI" value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} />
                <SelectField id="sexo" name="sexo" value={formData.sexo} onChange={e => setFormData({ ...formData, sexo: e.target.value })} options={opcionesSexo} />
                <input className="form-control mb-2" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input className="form-control mb-2" placeholder="Teléfono" value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />

                {!editarDoctor && (
                  <>
                    <input type="password" className="form-control mb-2" placeholder="Contraseña" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
                    <input type="password" className="form-control mb-2" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
                  </>
                )}

                {/* Especialidades */}
                <div className="mb-2">
                  <label className="form-label">Especialidades</label>
                  <div className="d-flex flex-column">
                    {especialidades.map(esp => (
                      <div key={esp.id} className="form-check">
                        <input type="checkbox" className="form-check-input" id={`esp-${esp.id}`} value={esp.id}
                          checked={formData.especialidades.includes(esp.id)}
                          onChange={e => {
                            const id = Number(e.target.value);
                            let nuevasEspecialidades = e.target.checked
                              ? [...formData.especialidades, id]
                              : formData.especialidades.filter(eid => eid !== id);
                            setFormData({ ...formData, especialidades: nuevasEspecialidades });
                          }}
                        />
                        <label className="form-check-label" htmlFor={`esp-${esp.id}`}>{esp.nombre}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <select className="form-select" value={formData.estado} onChange={e => setFormData({ ...formData, estado: e.target.value })}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary">{editarDoctor ? "Guardar" : "Agregar"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VistaDoctores;
