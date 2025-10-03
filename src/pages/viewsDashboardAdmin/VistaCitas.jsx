import { useState, useEffect } from "react";
import Button from "../../components/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form } from "react-bootstrap";

function VistaCitas() {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");
  const [citas, setCitas] = useState([]);

  // Usuarios y especialidades desde localStorage
  const [usuarios, setUsuarios] = useState({});
  const [especialidades, setEspecialidades] = useState([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalTipo, setModalTipo] = useState("agregar");
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  // Formulario
  const [formPaciente, setFormPaciente] = useState("");
  const [formEspecialidad, setFormEspecialidad] = useState("");
  const [formDoctor, setFormDoctor] = useState("");
  const [formFecha, setFormFecha] = useState("");
  const [formHora, setFormHora] = useState("");
  const [formEstado, setFormEstado] = useState("Pendiente");

  // Cargar datos iniciales
  useEffect(() => {
    const dataUsuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    setUsuarios(dataUsuarios);

    const todasCitas = Object.values(dataUsuarios).flatMap(u =>
      u.citas?.map(c => ({
        ...c,
        pacienteCodigo: u.codigo,
        pacienteNombre: [u.nombre, u.apellido].filter(Boolean).join(" "),
      })) || []
    );
    setCitas(todasCitas);

    const especialidadesLS = JSON.parse(localStorage.getItem("especialidades")) || [];
    setEspecialidades(especialidadesLS);

    const handleStorageChange = (e) => {
      if (e.key === "usuarios") {
        const data = JSON.parse(e.newValue) || {};
        setUsuarios(data);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Filtrar y ordenar
  const citasFiltradas = citas
    .filter(c => c.pacienteNombre.toLowerCase().includes(busqueda.toLowerCase()))
    .sort((a, b) =>
      orden === "asc"
        ? a.pacienteNombre.localeCompare(b.pacienteNombre)
        : b.pacienteNombre.localeCompare(a.pacienteNombre)
    );

  const getBadgeClass = (estado) => {
    switch (estado.toLowerCase()) {
      case "aceptada":
        return "bg-info text-dark";
      case "pendiente":
        return "bg-warning text-dark";
      case "rechazada":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleAbrirModal = (tipo, cita = null) => {
    setModalTipo(tipo);
    setCitaSeleccionada(cita);

    if (tipo === "editar" && cita) {
      const paciente = Object.values(usuarios).find(u =>
        u.citas?.some(c => c.id === cita.id)
      );
      const citaReal = paciente?.citas.find(c => c.id === cita.id);
      if (citaReal) {
        setFormPaciente([paciente.nombre, paciente.apellido].filter(Boolean).join(" "));
        setFormEspecialidad(citaReal.especialidad || "");
        setFormDoctor(citaReal.doctor);
        setFormFecha(citaReal.fecha);
        setFormHora(citaReal.hora);
        setFormEstado(citaReal.estado);
      }
    } else {
      setFormPaciente("");
      setFormEspecialidad("");
      setFormDoctor("");
      setFormFecha("");
      setFormHora("");
      setFormEstado("Pendiente");
    }

    setShowModal(true);
  };

  // Manejo de cambio de campos
  const handleChangeEspecialidad = (e) => {
    const value = e.target.value;
    setFormEspecialidad(value);

    if (!value) {
      setMedicosFiltrados([]);
      setFormDoctor("");
      return;
    }

    const medicos = Object.values(usuarios).filter(
      u => u.rol === "ROLE_MEDICO" && u.especialidades?.includes(Number(value))
    );
    setMedicosFiltrados(medicos);
    setFormDoctor("");
  };

  // Guardar cita
  const handleGuardarCita = () => {
    const usuariosLS = JSON.parse(localStorage.getItem("usuarios")) || {};
    let nuevaCita = {
      id: modalTipo === "agregar" ? Date.now() : citaSeleccionada.id,
      doctor: formDoctor,
      especialidad: Number(formEspecialidad),
      fecha: formFecha,
      hora: formHora,
      estado: formEstado,
    };

    if (modalTipo === "agregar") {
      const paciente = Object.values(usuariosLS).find(
        u => [u.nombre, u.apellido].filter(Boolean).join(" ") === formPaciente
      );
      if (!paciente) {
        alert("Paciente no encontrado");
        return;
      }
      paciente.citas = paciente.citas || [];
      paciente.citas.push(nuevaCita);
    } else {
      const paciente = Object.values(usuariosLS).find(u =>
        u.citas?.some(c => c.id === citaSeleccionada.id)
      );
      if (!paciente) return;
      paciente.citas = paciente.citas.map(c =>
        c.id === citaSeleccionada.id ? { ...c, ...nuevaCita } : c
      );
    }

    localStorage.setItem("usuarios", JSON.stringify(usuariosLS));

    const todasCitas = Object.values(usuariosLS).flatMap(u =>
      u.citas?.map(c => ({
        ...c,
        pacienteCodigo: u.codigo,
        pacienteNombre: [u.nombre, u.apellido].filter(Boolean).join(" "),
      })) || []
    );
    setCitas(todasCitas);

    setShowModal(false);
  };

  // Eliminar cita
  const handleEliminarCita = (citaId) => {
    if (!window.confirm("¿Seguro de eliminar esta cita?")) return;

    const usuariosLS = JSON.parse(localStorage.getItem("usuarios")) || {};
    Object.values(usuariosLS).forEach(u => {
      u.citas = u.citas?.filter(c => c.id !== citaId) || [];
    });
    localStorage.setItem("usuarios", JSON.stringify(usuariosLS));
    setCitas(prev => prev.filter(c => c.id !== citaId));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gestión de Citas</h2>
        <Button text="Agregar Cita" onClick={() => handleAbrirModal("agregar")} />
      </div>

      {/* Búsqueda y orden */}
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
              <th>Paciente</th>
              <th>Especialidad</th>
              <th>Doctor</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.pacienteNombre}</td>
                <td>{especialidades.find(e => e.id === cita.especialidad)?.nombre}</td>
                <td>{cita.doctor}</td>
                <td>{cita.fecha}</td>
                <td>{cita.hora}</td>
                <td>
                  <span className={`badge ${getBadgeClass(cita.estado)}`}>
                    {cita.estado}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleAbrirModal("editar", cita)}
                  >
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminarCita(cita.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTipo === "agregar" ? "Agregar Cita" : "Editar Cita"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Paciente */}
            <Form.Group className="mb-2">
              <Form.Label>Paciente</Form.Label>
              {modalTipo === "agregar" ? (
                <Form.Select
                  value={formPaciente}
                  onChange={(e) => setFormPaciente(e.target.value)}
                >
                  <option value="">Seleccione paciente</option>
                  {Object.values(usuarios)
                    .filter(u => u.rol === "ROLE_PACIENTE")
                    .map(p => (
                      <option key={p.codigo} value={[p.nombre, p.apellido].join(" ")}>
                        {[p.nombre, p.apellido].join(" ")}
                      </option>
                    ))}
                </Form.Select>
              ) : (
                <Form.Control type="text" value={formPaciente} disabled />
              )}
            </Form.Group>

            {/* Especialidad */}
            <Form.Group className="mb-2">
              <Form.Label>Especialidad</Form.Label>
              <Form.Select
                value={formEspecialidad}
                onChange={handleChangeEspecialidad}
              >
                <option value="">Seleccione especialidad</option>
                {especialidades.map(e => (
                  <option key={e.id} value={e.id}>{e.nombre}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Doctor */}
            <Form.Group className="mb-2">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                value={formDoctor}
                onChange={(e) => setFormDoctor(e.target.value)}
              >
                <option value="">Seleccione doctor</option>
                {medicosFiltrados.map(m => (
                  <option key={m.codigo} value={`${m.nombre} ${m.apellido}`}>
                    {m.nombre} {m.apellido}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Fecha y Hora */}
            <Form.Group className="mb-2">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={formFecha}
                onChange={(e) => setFormFecha(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                value={formHora}
                onChange={(e) => setFormHora(e.target.value)}
              />
            </Form.Group>

            {/* Estado */}
            <Form.Group className="mb-2">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                value={formEstado}
                onChange={(e) => setFormEstado(e.target.value)}
              >
                <option>Aceptada</option>
                <option>Pendiente</option>
                <option>Rechazada</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleGuardarCita}>
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default VistaCitas;
