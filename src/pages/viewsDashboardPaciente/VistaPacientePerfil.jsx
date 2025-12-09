import { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import Button from "../../components/Button";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import API_BASE_URL from "../../config";

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
    const token = localStorage.getItem("token");

    if (!codigo || !token) {
      console.error("No se encontró token o código de usuario");
      return;
    }

    fetch(`${API_BASE_URL}/users/${codigo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el perfil");
        return res.json();
      })
      .then((data) => {
        setPerfil({
          nombre: data.nombre || "",
          apellido: data.apellido || "",
          email: data.email || "",
          telefono: data.telefono || "",
          dni: data.dni || "",
          sexo: data.sexo || "",
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "No se pudo cargar el perfil", "error");
      });
  }, []); 

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const guardarCambios = async (e) => {
  e.preventDefault();
  const codigo = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${API_BASE_URL}/users/${codigo}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(perfil),
    });

    // Si la respuesta no es ok, intentamos leer el JSON del error
    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      throw new Error(errData?.error || "Ocurrió un error al actualizar el perfil");
    }

    // Si todo está bien, leemos la respuesta
    const data = await response.json();

    Swal.fire({
      title: "¡Perfil actualizado!",
      text: "Tus datos han sido guardados correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });

    setPerfil(data);
    setEditando(false);
  } catch (err) {
    // Mostramos el mensaje de error recibido del backend
    Swal.fire("Error", err.message, "error");
  }
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
            <form onSubmit={guardarCambios}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre:</label>
                  <InputField
                    type="text"
                    name="nombre"
                    value={perfil.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Apellido:</label>
                  <InputField
                    type="text"
                    name="apellido"
                    value={perfil.apellido}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email:</label>
                  <InputField
                    type="email"
                    name="email"
                    value={perfil.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Teléfono:</label>
                  <InputField
                    type="text"
                    name="telefono"
                    value={perfil.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">DNI:</label>
                  <InputField
                    type="text"
                    name="dni"
                    value={perfil.dni}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Sexo:</label>
                  <SelectField
                    name="sexo"
                    value={perfil.sexo}
                    onChange={handleChange}
                    options={opcionesSexo}
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-3">
                <Button text="Guardar" type="submit" />
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
