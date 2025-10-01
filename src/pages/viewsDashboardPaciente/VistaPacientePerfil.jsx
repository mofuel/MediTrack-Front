import { useState, useEffect } from "react";

function VistaPacientePerfil() {
  const [perfil, setPerfil] = useState({
    nombre: "María García",
    edad: 32,
    email: "maria.garcia@example.com",
    telefono: "+34 600 123 456",
    direccion: "Calle Mayor 123, Madrid",
  });

  const [editando, setEditando] = useState(false);

  // Al montar el componente, cargamos el perfil guardado en localStorage
  useEffect(() => {
    const perfilGuardado = localStorage.getItem("perfilPaciente");
    if (perfilGuardado) {
      setPerfil(JSON.parse(perfilGuardado));
    }
  }, []);

  const handleChange = (e) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  const guardarCambios = () => {
    localStorage.setItem("perfilPaciente", JSON.stringify(perfil));
    setEditando(false);
    alert("Perfil actualizado correctamente ✅");
  };

  return (
    <div className="vista-perfil">
      <h2>Mi Perfil</h2>
      <div className="perfil-card">
        {editando ? (
          <>
            <label>
              Nombre:
              <input name="nombre" value={perfil.nombre} onChange={handleChange} />
            </label>
            <label>
              Edad:
              <input name="edad" type="number" value={perfil.edad} onChange={handleChange} />
            </label>
            <label>
              Email:
              <input name="email" type="email" value={perfil.email} onChange={handleChange} />
            </label>
            <label>
              Teléfono:
              <input name="telefono" value={perfil.telefono} onChange={handleChange} />
            </label>
            <label>
              Dirección:
              <input name="direccion" value={perfil.direccion} onChange={handleChange} />
            </label>

            <button onClick={guardarCambios} className="action-btn">Guardar</button>
            <button onClick={() => setEditando(false)} className="action-btn">Cancelar</button>
          </>
        ) : (
          <>
            <p><strong>Nombre:</strong> {perfil.nombre}</p>
            <p><strong>Edad:</strong> {perfil.edad}</p>
            <p><strong>Email:</strong> {perfil.email}</p>
            <p><strong>Teléfono:</strong> {perfil.telefono}</p>
            <p><strong>Dirección:</strong> {perfil.direccion}</p>

            <button onClick={() => setEditando(true)} className="action-btn">Editar Perfil</button>
          </>
        )}
      </div>
    </div>
  );
}

export default VistaPacientePerfil;
