import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AuthLayout from "../layouts/AuthLayout";
import Swal from "sweetalert2";
import InputField from "../components/InputField";
import Button from "../components/Button";
import '../css/AuthLayout.css';
import '../css/NewPassword.css';
import { useLocation, useNavigate } from "react-router-dom";

function NewPassword() {
    const location = useLocation();
    const navigate = useNavigate();

    // Recibimos token y email desde el flujo anterior (Login.jsx)
    const { email, token } = location.state || {};

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!newPassword || !confirmPassword) {
            Swal.fire("Error", "Debes completar ambos campos", "error");
            return;
        }

        if (newPassword !== confirmPassword) {
            Swal.fire("Error", "Las contraseñas no coinciden", "error");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/password/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token, newPassword })
            });

            if (!res.ok) throw new Error("No se pudo actualizar la contraseña");

            Swal.fire("Éxito", "Contraseña actualizada correctamente", "success")
                .then(() => navigate("/")); // Redirige al login
        } catch (err) {
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <AuthLayout>
            <main className="container mt-5 new-password-main">
                <form className="new-password-form" onSubmit={handleResetPassword}>
                    <h2 className="new-password-title">Restablecer Contraseña</h2>
                    {/* Nueva Contraseña */}
                    <section className="col-12 col-md-8 mb-3 input-group mx-auto">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <InputField
                            type="password"
                            id="newPassword"
                            placeholder="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </section>
                    {/* Confirmar Contraseña */}
                    <section className="col-12 col-md-8 mb-3 input-group mx-auto">
                        <span className="input-group-text">
                            <FontAwesomeIcon icon={faLock} />
                        </span>
                        <InputField
                            type="password"
                            id="confirmPassword"
                            placeholder="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </section>
                    <section className="col-12 text-center">
                        <Button
                            text="Restablecer Contraseña"
                            type="submit"
                            onClick={handleResetPassword}
                        />
                    </section>
                </form>
            </main>


        </AuthLayout>
    );
}

export default NewPassword;
