import { useState, useEffect } from "react";
import Button from "../../components/Button";
import API_BASE_URL from "../../config";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form } from "react-bootstrap";

function VistaCitas() {
  const [busqueda, setBusqueda] = useState("");
  const [orden, setOrden] = useState("asc");
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pacientes, setPacientes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [medicosFiltrados, setMedicosFiltrados] = useState([]);

  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [modalTipo, setModalTipo] = useState("agregar");
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);

  const [formPaciente, setFormPaciente] = useState("");
  const [formEspecialidad, setFormEspecialidad] = useState("");
  const [formDoctor, setFormDoctor] = useState("");
  const [formFecha, setFormFecha] = useState("");
  const [formHora, setFormHora] = useState("");
  const [formEstado, setFormEstado] = useState("PENDIENTE");

  useEffect(() => {
    if (!token) return;
    cargarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const cargarDatos = async () => {
    try {
      setLoading(true);

      const resCitas = await fetch(`${API_BASE_URL}/appointments/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resCitas.ok) setCitas(await resCitas.json());

      const resPacientes = await fetch(`${API_BASE_URL}/users/pacientes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resPacientes.ok) setPacientes(await resPacientes.json());

      const resEspecialidades = await fetch(`${API_BASE_URL}/specialties`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resEspecialidades.ok)
        setEspecialidades(await resEspecialidades.json());

      setLoading(false);
    } catch {
      Swal.fire("Error", "No se pudieron cargar los datos", "error");
      setLoading(false);
    }
  };

  const citasFiltradas = citas
    .filter((c) =>
      c.pacienteNombre?.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) =>
      orden === "asc"
        ? (a.pacienteNombre || "").localeCompare(b.pacienteNombre || "")
        : (b.pacienteNombre || "").localeCompare(a.pacienteNombre || "")
    );

  const getBadgeClass = (estado) => {
    const estadoUpper = estado?.toUpperCase() || "";
    switch (estadoUpper) {
      case "ACEPTADA":
        return "bg-success";
      case "PENDIENTE":
        return "bg-warning text-dark";
      case "RECHAZADA":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const handleAbrirModal = async (tipo, cita = null) => {
    setModalTipo(tipo);
    setCitaSeleccionada(cita);

    if (tipo === "editar" && cita) {
      setFormPaciente(cita.pacienteId || "");
      setFormEspecialidad(cita.especialidadId || "");
      setFormDoctor(cita.medicoId || "");
      setFormFecha(cita.fechaCita || "");
      setFormHora(cita.horaCita || "");
      setFormEstado(cita.estado || "PENDIENTE");

      if (cita.especialidadId) {
        const res = await fetch(
          `${API_BASE_URL}/perfil-medico/especialidad/${cita.especialidadId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.ok) setMedicosFiltrados(await res.json());
      }
    } else {
      setFormPaciente("");
      setFormEspecialidad("");
      setFormDoctor("");
      setFormFecha("");
      setFormHora("");
      setFormEstado("PENDIENTE");
      setMedicosFiltrados([]);
    }

    setShowModal(true);
  };

  const handleChangeEspecialidad = async (e) => {
    const value = e.target.value;
    setFormEspecialidad(value);
    setFormDoctor("");

    if (!value) return setMedicosFiltrados([]);

    try {
      const res = await fetch(
        `${API_BASE_URL}/perfil-medico/especialidad/${value}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error();
      setMedicosFiltrados(await res.json());
    } catch {
      Swal.fire("Error", "No se pudieron cargar los médicos", "error");
    }
  };

  const handleGuardarCita = async () => {
    if (!formPaciente || !formEspecialidad || !formDoctor || !formFecha || !formHora) {
      Swal.fire("Campos incompletos", "Completa todos los campos", "warning");
      return;
    }

    // Validar fecha y hora futuras
    const fechaHoraSeleccionada = new Date(`${formFecha}T${formHora}`);
    const ahora = new Date();
    if (fechaHoraSeleccionada <= ahora) {
      Swal.fire("Fecha inválida", "Debe seleccionar una fecha y hora futuras", "warning");
      return;
    }

    const dto = {
      pacienteId: formPaciente,
      medicoId: formDoctor,
      especialidadId: Number(formEspecialidad),
      fechaCita: formFecha,
      horaCita: formHora,
      estado: formEstado,
    };

    try {
      if (modalTipo === "agregar") {
        const res = await fetch(`${API_BASE_URL}/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dto),
        });

        if (!res.ok) throw new Error();
        const nuevaCita = await res.json();
        setCitas((prev) => [...prev, nuevaCita]);
        Swal.fire("¡Cita creada!", "La cita ha sido creada exitosamente", "success");
      } else {
        const res = await fetch(`${API_BASE_URL}/appointments/${citaSeleccionada.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dto),
        });

        if (!res.ok) throw new Error();
        const citaActualizada = await res.json();
        setCitas((prev) =>
          prev.map((c) => (c.id === citaSeleccionada.id ? citaActualizada : c))
        );
        Swal.fire("¡Cita actualizada!", "La cita ha sido actualizada exitosamente", "success");
      }

      setShowModal(false);
    } catch {
      Swal.fire("Error", "No se pudo guardar la cita", "error");
    }
  };

  const handleEliminarCita = async (citaId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${citaId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();
      setCitas((prev) => prev.filter((c) => c.id !== citaId));
      Swal.fire("¡Eliminada!", "La cita ha sido eliminada", "success");
    } catch {
      Swal.fire("Error", "No se pudo eliminar la cita", "error");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  const fechaActual = new Date().toISOString().split("T")[0];

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
            {citasFiltradas.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center">
                  No hay citas registradas
                </td>
              </tr>
            ) : (
              citasFiltradas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.pacienteNombre || cita.pacienteId}</td>
                  <td>{cita.especialidadNombre || cita.especialidadId}</td>
                  <td>{cita.medicoNombre || cita.medicoId}</td>
                  <td>{cita.fechaCita}</td>
                  <td>{cita.horaCita}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalTipo === "agregar" ? "Agregar Cita" : "Editar Cita"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Paciente */}
            <Form.Group className="mb-2">
              <Form.Label>Paciente</Form.Label>
              <Form.Select
                value={formPaciente}
                onChange={(e) => setFormPaciente(e.target.value)}
                disabled={modalTipo === "editar"}
              >
                <option value="">Seleccione paciente</option>
                {pacientes.map((p) => (
                  <option key={p.codigo} value={p.codigo}>
                    {p.nombreCompleto || `${p.nombre} ${p.apellido}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Especialidad */}
            <Form.Group className="mb-2">
              <Form.Label>Especialidad</Form.Label>
              <Form.Select
                value={formEspecialidad}
                onChange={handleChangeEspecialidad}
              >
                <option value="">Seleccione especialidad</option>
                {especialidades.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Doctor */}
            <Form.Group className="mb-2">
              <Form.Label>Doctor</Form.Label>
              <Form.Select
                value={formDoctor}
                onChange={(e) => setFormDoctor(e.target.value)}
                disabled={medicosFiltrados.length === 0}
              >
                <option value="">
                  {medicosFiltrados.length === 0
                    ? "Primero seleccione una especialidad"
                    : "Seleccione doctor"}
                </option>
                {medicosFiltrados.map((m) => (
                  <option key={m.codigoUsuario} value={m.codigoUsuario}>
                    {m.nombreCompleto}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Fecha */}
            <Form.Group className="mb-2">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                min={fechaActual}
                value={formFecha}
                onChange={(e) => setFormFecha(e.target.value)}
              />
            </Form.Group>

            {/* Hora */}
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
                <option value="PENDIENTE">Pendiente</option>
                <option value="ACEPTADA">Aceptada</option>
                <option value="RECHAZADA">Rechazada</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
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
