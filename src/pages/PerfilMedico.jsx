import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import NavMedico from "../components/NavMedico";
import EstadoBadge from "../components/EstadoBadge";
import CustomButton from "../components/Button";
import SelectField from "../components/SelectField";
import "../css/PerfilMedico.css";
import API_BASE_URL from "../config";

function PerfilMedico() {
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const codigoMedico = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/${codigoMedico}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Error al cargar perfil");

        const data = await response.json();
        setPerfil({
          codigo: data.codigo,
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          sexo: data.sexo,
          email: data.email,
          telefono: data.telefono,
          estado: data.activo ? "Activo" : "Inactivo",
        });
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        Swal.fire("Error", "No se pudo cargar el perfil", "error");
      }
    };

    if (codigoMedico && token) {
      fetchPerfil();
    }
  }, [codigoMedico, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prev) => ({ ...prev, [name]: value }));
  };

  const guardarCambios = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${perfil.codigo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: perfil.nombre,
          apellido: perfil.apellido,
          dni: perfil.dni,
          sexo: perfil.sexo,
          email: perfil.email,
          telefono: perfil.telefono,
          activo: perfil.estado === "Activo",
        }),
      });

      if (!response.ok) throw new Error("Error al actualizar perfil");

      const actualizado = await response.json();
      setPerfil({
        ...actualizado,
        estado: actualizado.activo ? "Activo" : "Inactivo",
      });
      setEditando(false);

      Swal.fire("Perfil actualizado", "Los cambios se guardaron correctamente", "success");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  };

  if (!perfil) return <p className="text-center mt-5">Cargando perfil...</p>;

  return (
    <>
      <NavMedico nombre={perfil.apellido} />

      <main className="perfil-medico-container">
        <Card className="perfil-card shadow-sm">
          <Card.Body>
            {!editando ? (
              <>
                <h2 className="perfil-nombre mb-3">
                  {perfil.nombre} {perfil.apellido}
                </h2>

                <p className="perfil-dato">
                  <strong>Código:</strong> {perfil.codigo}
                </p>
                <p className="perfil-dato">
                  <strong>DNI:</strong> {perfil.dni}
                </p>
                <p className="perfil-dato">
                  <strong>Sexo:</strong> {perfil.sexo}
                </p>
                <p className="perfil-dato">
                  <strong>Email:</strong> {perfil.email}
                </p>
                <p className="perfil-dato">
                  <strong>Teléfono:</strong> {perfil.telefono || "—"}
                </p>

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
                              { value: "MASCULINO", label: "MASCULINO" },
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
                  <CustomButton
                    text="Guardar"
                    onClick={guardarCambios}
                    className="btn-success"
                  />
                  <CustomButton
                    text="Cancelar"
                    onClick={() => setEditando(false)}
                    className="btn-secondary"
                  />
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
