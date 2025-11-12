import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import EstadoBadge from "../../components/EstadoBadge";
import API_BASE_URL from "../../config";
import Swal from "sweetalert2";

function VistaPacienteInicio() {
  const [perfil, setPerfil] = useState({
    nombre: "Paciente",
    email: "",
    edad: "No especificado",
    dni: "",
    telefono: "",
    sexo: "",
  });

  const [citas, setCitas] = useState([]);
  const codigoUsuario = localStorage.getItem("codigoUsuario");
  const token = localStorage.getItem("token");

  console.log("🔹 Código usuario:", codigoUsuario);
  console.log("🔹 Token:", token);
  console.log("🔹 API_BASE_URL:", API_BASE_URL);

  useEffect(() => {
    // ✅ Evitar ejecutar si faltan datos esenciales
    if (!codigoUsuario || !token) {
      console.warn("⚠️ No se ejecuta fetchPerfilYCitas porque faltan datos del usuario o token");
      return;
    }

    const fetchPerfilYCitas = async () => {
      try {
        console.log("🚀 Iniciando fetch de perfil y citas...");

        // 🔹 PERFIL
        const perfilUrl = `${API_BASE_URL}/users/${codigoUsuario}`;
        console.log("🌐 URL perfil:", perfilUrl);

        const resPerfil = await fetch(perfilUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📩 Respuesta perfil:", resPerfil.status);

        if (resPerfil.ok) {
          const dataPerfil = await resPerfil.json();
          console.log("✅ Perfil obtenido:", dataPerfil);

          setPerfil({
            nombre: dataPerfil.nombreCompleto || dataPerfil.nombre || "Paciente",
            email: dataPerfil.email || "",
            edad: dataPerfil.edad || "No especificado",
            dni: dataPerfil.dni || "",
            telefono: dataPerfil.telefono || "",
            sexo: dataPerfil.sexo || "",
          });
        } else {
          console.warn("⚠️ No se pudo obtener el perfil. Status:", resPerfil.status);
        }

        // 🔹 CITAS
        const citasUrl = `${API_BASE_URL}/appointments/paciente/${codigoUsuario}`;
        console.log("🌐 URL citas:", citasUrl);

        const resCitas = await fetch(citasUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("📩 Respuesta citas:", resCitas.status);

        if (!resCitas.ok) throw new Error(`Error al cargar citas (${resCitas.status})`);
        const dataCitas = await resCitas.json();

        console.log("✅ Citas obtenidas (raw):", dataCitas);

        const citasAdaptadas = dataCitas.map((c) => ({
          id: c.id,
          fecha: c.fechaCita,
          hora: c.horaCita,
          doctor: c.medicoNombre || c.medicoId,
          estado: c.estado,
          especialidad: c.especialidadNombre || c.especialidadId,
        }));

        console.log("📋 Citas adaptadas:", citasAdaptadas);
        setCitas(citasAdaptadas);
      } catch (err) {
        console.error("❌ Error al cargar datos del paciente:", err);
        Swal.fire("Error", "No se pudieron cargar los datos del paciente", "error");
      }
    };

    fetchPerfilYCitas();
  }, [codigoUsuario, token]); 

  // 🔹 Calcular citas activas
  const hoy = new Date();
  const hoyString = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(
    hoy.getDate()
  ).padStart(2, "0")}`;

  const citasActivas = citas.filter(
    (c) => c.estado === "PENDIENTE" || c.estado === "ACEPTADA"
  );

  const proximaCita = citasActivas.sort((a, b) =>
    (a.fecha + "T" + a.hora).localeCompare(b.fecha + "T" + b.hora)
  )[0];

  const citasHoy = citasActivas.filter((c) => c.fecha === hoyString);

  console.log("📆 Citas activas:", citasActivas);
  console.log("📅 Próxima cita:", proximaCita);
  console.log("📅 Citas de hoy:", citasHoy);

  return (
    <main className="container my-4">
      <h2 className="mb-4">Bienvenido/a, {perfil.nombre}</h2>
      <div className="row">
        <div className="col-lg-5 mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="card-header-azul">Próxima Cita</Card.Header>
            <Card.Body>
              {proximaCita ? (
                <>
                  <p><strong>Fecha:</strong> {proximaCita.fecha}</p>
                  <p><strong>Hora:</strong> {proximaCita.hora}</p>
                  <p><strong>Doctor:</strong> {proximaCita.doctor}</p>
                  <EstadoBadge estado={proximaCita.estado} />
                </>
              ) : (
                <p>No tienes próximas citas</p>
              )}
            </Card.Body>
          </Card>
        </div>

        <div className="col-lg-7 mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="card-header-azul">Citas de Hoy</Card.Header>
            <Card.Body>
              {citasHoy.length === 0 ? (
                <p className="text-center">No tienes citas para hoy</p>
              ) : (
                citasHoy.map((c) => (
                  <div
                    key={c.id}
                    className="d-flex align-items-center mb-3 p-2 border rounded"
                  >
                    <div className="flex-grow-1">
                      <div className="fw-bold">{c.doctor}</div>
                      <small className="text-muted">
                        {c.fecha} — {c.hora}
                      </small>
                    </div>
                    <EstadoBadge estado={c.estado} />
                  </div>
                ))
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default VistaPacienteInicio;