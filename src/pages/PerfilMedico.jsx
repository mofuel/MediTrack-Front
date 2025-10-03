import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Modal } from "react-bootstrap";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import CustomButton from "../components/Button";
import SelectField from "../components/SelectField";
import "../css/PerfilMedico.css";

function PerfilMedico() {
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState(null);

  const codigoMedico = localStorage.getItem("codigoUsuario");

  useEffect(() => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const medico = usuarios[codigoMedico];

    if (medico) {
      setPerfil({
        codigo: medico.codigo || "",
        nombre: medico.nombre || "",
        apellido: medico.apellido || "",
        dni: medico.dni || "",
        sexo: medico.sexo || "",
        email: medico.email || "",
        telefono: medico.telefono || "",
        estado: medico.estado || "Activo",
      });
    }
  }, [codigoMedico]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    usuarios[codigoMedico] = { ...usuarios[codigoMedico], ...perfil };
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    setEditando(false);
  };

  if (!perfil) return <p>Cargando perfil...</p>;

  return (
    <>
      <NavMedico nombre={perfil.apellido} />

      <main className="perfil-medico-container">
        <Card className="perfil-card shadow-sm">
          <Card.Body>
            {!editando ? (
              <>
                <h2 className="perfil-nombre mb-3">{perfil.nombre} {perfil.apellido}</h2>

                <p className="perfil-dato"><strong>Código:</strong> {perfil.codigo}</p>
                <p className="perfil-dato"><strong>DNI:</strong> {perfil.dni}</p>
                <p className="perfil-dato"><strong>Sexo:</strong> {perfil.sexo}</p>
                <p className="perfil-dato"><strong>Email:</strong> {perfil.email}</p>
                <p className="perfil-dato"><strong>Teléfono:</strong> {perfil.telefono || "—"}</p>

                <EstadoBadge estado={perfil.estado === "Activo" ? "activo" : "inactivo"} />

                <button className="btn-editar mt-3" onClick={() => setEditando(true)}>
                  Editar perfil
                </button>
              </>
            ) : (
              <Modal show={editando} onHide={() => setEditando(false)} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Editar Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Row>
                      <Col md={6}>
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
                          <SelectField
                            name="sexo"
                            value={perfil.sexo}
                            onChange={handleChange}
                            options={[
                              { value: "FEMENINO", label: "FEMENINO" },
                              { value: "MASCULINO", label: "MASCULINO" }
                            ]}
                            placeholder="Seleccione sexo"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
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
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <CustomButton text="Guardar" onClick={guardarCambios} className="btn-success" />
                  <CustomButton text="Cancelar" onClick={() => setEditando(false)} className="btn-secondary" />
                </Modal.Footer>
              </Modal>
            )}
          </Card.Body>
        </Card>
      </main>
    </>
  );
}

export default PerfilMedico;
