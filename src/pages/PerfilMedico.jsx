import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import NavMedico from "./NavMedico";
import "../css/PerfilMedico.css";

function PerfilMedico() {
  const [editando, setEditando] = useState(false);

  const [perfil, setPerfil] = useState({
    codigo: "MED001",
    nombre: "Juan",
    apellido: "Pérez",
    dni: "12345678",
    sexo: "Masculino",
    email: "juan.perez@hospital.com",
    telefono: "+51 987 654 321",
    activo: true,
    turno: "Mañana",
    especialidades: "Cardiología, ECG",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    console.log("Guardando cambios:", perfil);
    setEditando(false);
  };

  return (
    <>
      <NavMedico nombre={perfil.apellido} />

      {/* Contenedor con tu gradiente */}
      <main className="perfil-medico-container">
        <Card className="perfil-card shadow-sm">
          <Card.Body>
            {!editando ? (
              <>
                {/* Nombre grande con tu clase */}
                <h2 className="perfil-nombre mb-3">
                  {perfil.nombre} {perfil.apellido}
                </h2>

                <p className="perfil-dato"><strong>Código:</strong> {perfil.codigo}</p>
                <p className="perfil-dato"><strong>DNI:</strong> {perfil.dni}</p>
                <p className="perfil-dato"><strong>Sexo:</strong> {perfil.sexo}</p>
                <p className="perfil-dato"><strong>Email:</strong> {perfil.email}</p>
                <p className="perfil-dato"><strong>Teléfono:</strong> {perfil.telefono || "—"}</p>

                {/* Chips para turno y especialidades */}
                <div className="perfil-chips">
                  <span className="perfil-chip">{perfil.turno}</span>
                  {perfil.especialidades
                    .split(",")
                    .map((esp) => (
                      <span key={esp.trim()} className="perfil-chip">
                        {esp.trim()}
                      </span>
                    ))}
                </div>

                <p className="perfil-dato mt-3">
                  <strong>Estado:</strong> {perfil.activo ? "Activo" : "Inactivo"}
                </p>

                <button className="btn-editar mt-3" onClick={() => setEditando(true)}>
                  Editar perfil
                </button>
              </>
            ) : (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control
                    name="apellido"
                    value={perfil.apellido}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    name="dni"
                    value={perfil.dni}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select
                    name="sexo"
                    value={perfil.sexo}
                    onChange={handleChange}
                  >
                    <option>Masculino</option>
                    <option>Femenino</option>
                    <option>Otro</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Turno</Form.Label>
                  <Form.Select
                    name="turno"
                    value={perfil.turno}
                    onChange={handleChange}
                  >
                    <option>Mañana</option>
                    <option>Tarde</option>
                    <option>Noche</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Especialidades</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="especialidades"
                    value={perfil.especialidades}
                    onChange={handleChange}
                    placeholder="Ej: Cardiología, Pediatría..."
                  />
                </Form.Group>

                <div className="text-center">
                  <Button variant="success" className="me-2" onClick={guardarCambios}>
                    Guardar
                  </Button>
                  <Button variant="secondary" onClick={() => setEditando(false)}>
                    Cancelar
                  </Button>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </main>
    </>
  );
}

export default PerfilMedico;
