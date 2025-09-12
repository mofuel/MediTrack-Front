import '../css/Register.css';
import InputField from "../components/InputField";
import Button from "../components/Button";
import ActionLink from "../components/ActionLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faPhone, faIdCard, faVenusMars } from "@fortawesome/free-solid-svg-icons";



function RegistroForm() {

    return (
        <form className="login-box registro-form">
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
                        <InputField type="text" id="fullName" placeholder="Nombre Completo" />
                    </section>

                    {/* Apellido */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faUser} />
                        </span>
                        <InputField type="text" id="apellido" placeholder="Apellido Completo" />
                    </section>

                    {/* DNI */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faIdCard} />
                        </span>
                        <InputField type="text" id="dni" placeholder="DNI" />
                    </section>

                    {/* Teléfono */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faPhone} />
                        </span>
                        <InputField type="text" id="telefono" placeholder="Teléfono" />
                    </section>


                    
                </article>

                {/* Columna derecha */}
                <article className="column">
                    

                    {/* Email */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </span>
                        <InputField type="email" id="email" placeholder="Correo Electrónico" />
                    </section>

                    {/* Sexo */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faVenusMars} />
                        </span>
                        <InputField type="text" id="sexo" placeholder="Sexo" />
                    </section>

                    

                    {/* Contraseña */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <InputField type="password" id="password" placeholder="Contraseña" />
                    </section>

                    {/* Confirmar Password */}
                    <section className="mb-3 input-group">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <InputField type="password" id="confirmPassword" placeholder="Confirmar Contraseña" />
                    </section>

                    
                </article>

            </section>

            <section className="col-12 text-center mt-3">
                <Button text="Registrarse" type="submit" />
                <p>¿Ya tienes una cuenta? <ActionLink text="Inicia Sesión" href="/" /></p>
            </section>
        </form>

    );

}

export default RegistroForm;