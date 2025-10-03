import { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function VistaPacientePerfil() {
  const [perfil, setPerfil] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    dni: "",
    sexo: "",
  });

  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const codigo = localStorage.getItem("codigoUsuario"); 
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
    const userObj = usuarios[codigo];

    if (userObj) {
      setPerfil({
        nombre: userObj.nombre || "",
        apellido: userObj.apellido || "",
        email: userObj.email || "",
        telefono: userObj.telefono || "",
        dni: userObj.dni || "",
        sexo: userObj.sexo || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const guardarCambios = (e) => {
    e.preventDefault();

    const codigo = localStorage.getItem("codigoUsuario");
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    // Actualizar el usuario dentro del objeto global
    usuarios[codigo] = { ...usuarios[codigo], ...perfil };
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setEditando(false);

    Swal.fire({
      title: "¡Perfil actualizado!",
      text: "Tus datos han sido guardados correctamente ✅",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#3085d6",
    });
  };

  const opcionesSexo = [
    { value: "MASCULINO", label: "Masculino" },
    { value: "FEMENINO", label: "Femenino" },
  ];

  return (
    <div className="container mt-4 vista-perfil">
      <h2 className="mb-4">Mi Perfil</h2>
      <div className="card shadow-sm">
        <div className="card-body">
          {editando ? (
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre:</label>
                  <InputField
                    type="text"
                    id="nombre"
                    placeholder="Nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                    name="nombre"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellido:</label>
                  <InputField
                    type="text"
                    id="apellido"
                    placeholder="Apellido"
                    value={perfil.apellido}
                    onChange={handleChange}
                    name="apellido"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email:</label>
                  <InputField
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={perfil.email}
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono:</label>
                  <InputField
                    type="text"
                    id="telefono"
                    placeholder="Teléfono"
                    value={perfil.telefono}
                    onChange={handleChange}
                    name="telefono"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">DNI:</label>
                  <InputField
                    type="text"
                    id="dni"
                    placeholder="DNI"
                    value={perfil.dni}
                    onChange={handleChange}
                    name="dni"
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Sexo:</label>
                  <SelectField
                    id="sexo"
                    name="sexo"
                    value={perfil.sexo}
                    onChange={handleChange}
                    options={opcionesSexo}
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-3">
                <Button text="Guardar" onClick={guardarCambios} type="button" />
                <Button
                  text="Cancelar"
                  onClick={() => setEditando(false)}
                  className="btn-secondary"
                />
              </div>
            </form>
          ) : (
            <>
              <p><strong>Nombre:</strong> {perfil.nombre} {perfil.apellido}</p>
              <p><strong>Email:</strong> {perfil.email}</p>
              <p><strong>Teléfono:</strong> {perfil.telefono}</p>
              <p><strong>DNI:</strong> {perfil.dni}</p>
              <p><strong>Sexo:</strong> {perfil.sexo}</p>

              <Button
                text="Editar Perfil"
                onClick={() => setEditando(true)}
                className="mt-3"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VistaPacientePerfil;
