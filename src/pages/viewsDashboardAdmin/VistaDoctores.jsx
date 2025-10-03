import { useState, useEffect } from "react";
import Button from "../../components/Button";
import SelectField from "../../components/SelectField";
import "bootstrap/dist/css/bootstrap.min.css";

function VistaDoctores() {
  const [doctores, setDoctores] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");

  // Estados para modal
  const [showModal, setShowModal] = useState(false);
  const [editarDoctor, setEditarDoctor] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    sexo: "",
    email: "",
    telefono: "",
    especialidades: [],
    estado: "Activo",
  });

  // Opciones mockeadas de sexo
  const opcionesSexo = [
    { value: "MASCULINO", label: "Masculino" },
    { value: "FEMENINO", label: "Femenino" },
  ];

  // Cargar doctores y especialidades desde localStorage
  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const medicos = Object.values(usuarios).filter(u => u.rol === "ROLE_MEDICO");
    setDoctores(medicos);

    const especialidadesLS = JSON.parse(localStorage.getItem("especialidades")) || [];
    setEspecialidades(especialidadesLS);
  }, []);

  const guardarDoctores = (updatedDoctores) => {
    setDoctores(updatedDoctores);
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    updatedDoctores.forEach(doc => {
      usuarios[doc.codigo] = doc;
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  };

  const abrirModal = (doctor = null) => {
    if (doctor) {
      setEditarDoctor(doctor.codigo);
      setFormData({ ...doctor });
    } else {
      setEditarDoctor(null);
      setFormData({
        nombre: "",
        dni: "",
        sexo: "",
        email: "",
        telefono: "",
        especialidades: [],
        estado: "Activo",
      });
    }
    setShowModal(true);
  };

  const cerrarModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, dni, sexo, email, telefono } = formData;
    if (!nombre || !dni || !sexo || !email || !telefono) return alert("Todos los campos son obligatorios");

    if (editarDoctor) {
      const updated = doctores.map(d =>
        d.codigo === editarDoctor ? { ...d, ...formData } : d
      );
      guardarDoctores(updated);
    } else {
      const nuevo = { ...formData, codigo: Date.now().toString(), rol: "ROLE_MEDICO" };
      guardarDoctores([...doctores, nuevo]);
    }
    cerrarModal();
  };

  const handleEliminar = (codigo) => {
    if (window.confirm("¿Eliminar doctor? Esta acción no se puede deshacer")) {
      guardarDoctores(doctores.filter(d => d.codigo !== codigo));
    }
  };

  const doctoresFiltrados = doctores
    .filter(d => d.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) => orden === "asc" ? a.nombre.localeCompare(b.nombre) : b.nombre.localeCompare(a.nombre));

  const nombreEspecialidades = (ids = []) => {
    if (!Array.isArray(ids)) return "";
    return ids
      .map(id => especialidades.find(e => e.id === id)?.nombre)
      .filter(Boolean)
      .join(", ");
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gestión de Doctores</h2>
        <Button text="Agregar Doctor" onClick={() => abrirModal()} />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar doctor..."
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
              <th>Especialidades</th>
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
                  <td>{nombreEspecialidades(d.especialidades)}</td>
                  <td>{d.dni}</td>
                  <td>{d.sexo}</td>
                  <td>{d.email}</td>
                  <td>{d.telefono}</td>
                  <td>
                    <span className={`badge ${d.estado === "Activo" ? "bg-success" : "bg-secondary"}`}>
                      {d.estado}
                    </span>
                  </td>
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
                <input
                  className="form-control mb-2"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="DNI"
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                />
                <div className="mb-2">
                  <label className="form-label">Sexo:</label>
                  <SelectField
                    id="sexo"
                    name="sexo"
                    value={formData.sexo}
                    onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                    options={opcionesSexo}
                  />
                </div>
                <input
                  className="form-control mb-2"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  className="form-control mb-2"
                  placeholder="Teléfono"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                />

                {/* Especialidades con checkboxes */}
                <div className="sub-card mb-2">
                  <h6 className="sub-card-title">Especialidades</h6>
                  {especialidades.length === 0 ? (
                    <p>No hay especialidades disponibles</p>
                  ) : (
                    especialidades.map((e) => (
                      <div className="form-check" key={e.id}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`esp-${e.id}`}
                          value={e.id}
                          checked={formData.especialidades.includes(e.id)}
                          onChange={() => {
                            const id = e.id;
                            setFormData((prev) => ({
                              ...prev,
                              especialidades: prev.especialidades.includes(id)
                                ? prev.especialidades.filter((x) => x !== id)
                                : [...prev.especialidades, id],
                            }));
                          }}
                        />
                        <label className="form-check-label" htmlFor={`esp-${e.id}`}>
                          {e.nombre}
                        </label>
                      </div>
                    ))
                  )}
                </div>

                <select
                  className="form-select"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                >
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
