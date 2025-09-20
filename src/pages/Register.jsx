import { useState } from "react";
import '../css/Register.css';
import '../css/AuthLayout.css';
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

        if (!form.sexo) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo requerido',
                text: 'Por favor selecciona Masculino o Femenino',
            });
            return;
        }



        try {
            const resp = await fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const text = await resp.text();
            if (!resp.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: text
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro exitoso',
                    text: text
                });
            }
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faUser} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faIdCard} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faPhone} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faVenusMars} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
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
                            <span className="input-group-text">
                                <FontAwesomeIcon icon={faLock} />
                            </span>
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
                    <p>¿Ya tienes una cuenta? <ActionLink text="Inicia Sesión" href="/" /></p>
                </section>
            </form>

        </AuthLayout>
    );

}

export default RegistroForm;