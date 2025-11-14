import { useState } from "react";
import '../css/Register.css';
import '../css/AuthLayout.css';
import API_BASE_URL from "../config";
import Swal from 'sweetalert2';
import InputField from "../components/InputField";
import Button from "../components/Button";
import ActionLink from "../components/ActionLink";
import SelectField from "../components/SelectField";
import AuthLayout from "../layouts/AuthLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faPhone, faIdCard, faVenusMars } from "@fortawesome/free-solid-svg-icons";

function RegistroForm() {
    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        dni: "",
        telefono: "",
        email: "",
        sexo: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔸 Validar campos obligatorios
        const camposVacios = Object.entries(form)
            .filter(([, valor]) => !valor)
            .map(([nombre]) => nombre);

        if (camposVacios.length > 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: `Por favor completa los siguientes campos: ${camposVacios.join(', ')}`,
            });
            return;
        }

        // 🔸 Validar contraseñas
        if (form.password !== form.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Contraseñas no coinciden',
                text: 'Por favor verifica tu contraseña y su confirmación',
            });
            return;
        }

        try {
            const resp = await fetch(`${API_BASE_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });


            if (!resp.ok) {
                const text = await resp.text();
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: text
                });
                return;
            }

            const data = await resp.json();

            // ✅ Guardar token, rol y código del usuario actual
            localStorage.setItem("token", data.token);
            localStorage.setItem("rol", data.rol);
            localStorage.setItem("codigoUsuario", data.codigo);

            // ✅ Leer o crear estructura de usuarios
            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
            const citasExistentes = usuarios[data.codigo]?.citas || [];

            const user = {
                codigo: data.codigo ?? "",
                nombre: data.nombre ?? "",
                apellido: data.apellido ?? "",
                dni: data.dni ?? "",
                sexo: data.sexo ?? "",
                email: data.email ?? "",
                telefono: data.telefono ?? "",
                rol: data.rol,
                estado: data.estado ?? "Activo",
                citas: citasExistentes,
                especialidades: usuarios[data.codigo]?.especialidades || [],
                turnos: usuarios[data.codigo]?.turnos || [],
            };

            usuarios[data.codigo] = { ...usuarios[data.codigo], ...user };
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            // ✅ Mostrar confirmación y redirigir según el rol
            Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: 'Tu cuenta ha sido creada correctamente',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                switch (data.rol) {
                    case "ROLE_ADMIN":
                        window.location.href = "/dashboard-admin";
                        break;
                    case "ROLE_MEDICO": {
                        const tienePerfil = (user.especialidades?.length || 0) > 0 && (user.turnos?.length || 0) > 0;
                        if (!tienePerfil) {
                            window.location.href = "/crear-perfil-medico";
                        } else {
                            window.location.href = "/index-medico";
                        }
                        break;
                    }
                    case "ROLE_PACIENTE":
                    default:
                        window.location.href = "/dashboard-paciente/inicio";
                        break;
                }
            });

            // ✅ Limpiar formulario
            setForm({
                nombre: "",
                apellido: "",
                dni: "",
                telefono: "",
                email: "",
                sexo: "",
                password: "",
                confirmPassword: ""
            });

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo conectar con el servidor',
            });
        }
    };

    return (
        <AuthLayout>
            <form className="login-box registro-form" onSubmit={handleSubmit}>
                <section className="col-12 text-center mb-4">
                    <h2>Regístrate</h2>
                </section>

                <section className="form-columns">
                    {/* Columna izquierda */}
                    <article className="column">
                        {/* Nombre */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                            <InputField
                                type="text"
                                id="nombre"
                                placeholder="Nombre Completo"
                                value={form.nombre}
                                onChange={handleChange}
                            />
                        </section>

                        {/* Apellido */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                            <InputField
                                type="text"
                                id="apellido"
                                placeholder="Apellido Completo"
                                value={form.apellido}
                                onChange={handleChange}
                            />
                        </section>

                        {/* DNI */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faIdCard} /></span>
                            <InputField
                                type="text"
                                id="dni"
                                placeholder="DNI"
                                value={form.dni}
                                onChange={handleChange}
                            />
                        </section>

                        {/* Teléfono */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
                            <InputField
                                type="text"
                                id="telefono"
                                placeholder="Teléfono"
                                value={form.telefono}
                                onChange={handleChange}
                            />
                        </section>
                    </article>

                    {/* Columna derecha */}
                    <article className="column">
                        {/* Email */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                            <InputField
                                type="email"
                                id="email"
                                placeholder="Correo Electrónico"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </section>

                        {/* Sexo */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faVenusMars} /></span>
                            <SelectField
                                id="sexo"
                                value={form.sexo}
                                onChange={handleChange}
                                options={[
                                    { value: "MASCULINO", label: "Masculino" },
                                    { value: "FEMENINO", label: "Femenino" },
                                ]}
                            />
                        </section>

                        {/* Contraseña */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <InputField
                                type="password"
                                id="password"
                                placeholder="Contraseña"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </section>

                        {/* Confirmar Password */}
                        <section className="mb-3 input-group">
                            <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                            <InputField
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirmar Contraseña"
                                value={form.confirmPassword}
                                onChange={handleChange}
                            />
                        </section>
                    </article>
                </section>

                <section className="col-12 text-center mt-3">
                    <Button text="Registrarse" type="submit" />
                    <p>¿Ya tienes una cuenta? <ActionLink text="Inicia Sesión" href="/login" /></p>
                </section>
            </form>
        </AuthLayout>
    );
}

export default RegistroForm;
