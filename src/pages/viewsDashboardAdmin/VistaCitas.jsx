import { useState, useEffect } from "react";
import Button from "../../components/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form } from "react-bootstrap";

function VistaCitas() {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");
  const [citas, setCitas] = useState([]);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalTipo, setModalTipo] = useState("agregar"); // "agregar" o "editar"
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);


  const [formPaciente, setFormPaciente] = useState("");
  const [formDoctor, setFormDoctor] = useState("");
  const [formFecha, setFormFecha] = useState("");
  const [formHora, setFormHora] = useState("");
  const [formEstado, setFormEstado] = useState("Pendiente");

  // Cargar citas desde localStorage
  useEffect(() => {
    const cargarCitas = () => {
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const todasCitas = Object.values(usuarios).flatMap(u =>
        u.citas?.map(c => ({
          ...c,
          pacienteCodigo: u.codigo,
          pacienteNombre: [u.nombre, u.apellido].filter(Boolean).join(" "),
        })) || []
      );
      setCitas(todasCitas);
    };

    cargarCitas();

    const handleStorageChange = (e) => {
      if (e.key === "usuarios") cargarCitas();
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
    switch (estado) {
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
      // Traer el paciente real desde localStorage
      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
      const paciente = Object.values(usuarios).find(u =>
        u.citas?.some(c => c.id === cita.id)
      );
      const citaReal = paciente?.citas.find(c => c.id === cita.id);

      if (citaReal) {
        setFormPaciente([paciente.nombre, paciente.apellido].filter(Boolean).join(" "));
        setFormDoctor(citaReal.doctor);
        setFormFecha(citaReal.fecha);
        setFormHora(citaReal.hora);
        setFormEstado(citaReal.estado);
      }
    } else {
      setFormPaciente("");
      setFormDoctor("");
      setFormFecha("");
      setFormHora("");
      setFormEstado("Pendiente");
    }

    setShowModal(true);
  };


  // Guardar cita
  const handleGuardarCita = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    let nuevaCita = {
      id: modalTipo === "agregar" ? Date.now() : citaSeleccionada.id,
      doctor: formDoctor,
      fecha: formFecha,
      hora: formHora,
      estado: formEstado,
    };

    if (modalTipo === "agregar") {
      // Buscar paciente por nombre 
      const paciente = Object.values(usuarios).find(
        u => [u.nombre, u.apellido].filter(Boolean).join(" ") === formPaciente
      );
      if (!paciente) {
        alert("Paciente no encontrado");
        return;
      }
      paciente.citas = paciente.citas || [];
      paciente.citas.push(nuevaCita);
    } else {
      // Editar cita existente
      const paciente = Object.values(usuarios).find(u =>
        u.citas?.some(c => c.id === citaSeleccionada.id)
      );
      if (!paciente) return;
      paciente.citas = paciente.citas.map(c =>
        c.id === citaSeleccionada.id
          ? { ...c, doctor: formDoctor, fecha: formFecha, hora: formHora, estado: formEstado }
          : c
      );
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setShowModal(false);
    setCitaSeleccionada(null);
    setFormPaciente("");
    setFormDoctor("");
    setFormFecha("");
    setFormHora("");
    setFormEstado("Pendiente");

    // Actualizar citas
    const todasCitas = Object.values(usuarios).flatMap(u =>
      u.citas?.map(c => ({
        ...c,
        pacienteCodigo: u.codigo,
        pacienteNombre: [u.nombre, u.apellido].filter(Boolean).join(" "),
      })) || []
    );
    setCitas(todasCitas);
  };

  // Eliminar cita
  const handleEliminarCita = (citaId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta cita?")) return;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    Object.values(usuarios).forEach(u => {
      u.citas = u.citas?.filter(c => c.id !== citaId) || [];
    });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setCitas(prev => prev.filter(c => c.id !== citaId));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gestión de Citas</h2>
        <Button text="Agregar Cita" onClick={() => handleAbrirModal("agregar")} />
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
              <th>Paciente</th>
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
            <Form.Group className="mb-2">
              <Form.Label>Paciente</Form.Label>
              <Form.Control
                type="text"
                value={formPaciente}
                onChange={(e) => setFormPaciente(e.target.value)}
                placeholder="Nombre del paciente"
                disabled={modalTipo === "editar"} // no permitir cambiar paciente al editar
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Doctor</Form.Label>
              <Form.Control
                type="text"
                value={formDoctor}
                onChange={(e) => setFormDoctor(e.target.value)}
              />
            </Form.Group>
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
