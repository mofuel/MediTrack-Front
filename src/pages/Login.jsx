import '../css/Login.css';



function Login() {
    return (
        <>
            <main className="container mt-5">
                <section className="row align-items-center justify-content-center" style={{ minHeight: '80vh' }}>

                    {/*  
                    import silueta from '../assets/silueta.PNG';
                    <section className="col-md-4 p-4 login-box text-center">
                        <h2>MediTrack</h2>
                        <p>Gestiona tus citas médicas de manera rápida y segura.</p>
                        <img
                            src={silueta}
                            alt="Citas Médicas"
                            className="img-fluid mt-3 w-50"
                        />
                    </section>
                    
                    
                    */}



                    {/* Columna derecha (Formulario) */}
                    <form className="col-md-4 offset-md-6 p-4 login-box">
                        <section className="col-12 text-center mb-4">
                            <h2>Iniciar Sesión</h2>
                        </section>

                        {/* Email */}
                        <section className="col-12 mb-3">
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Correo Electrónico"
                            />
                        </section>

                        {/* Password */}
                        <section className="col-12 mb-3">
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                placeholder="Contraseña"
                            />
                        </section>

                        {/* Recuérdame */}
                        <section className="col-12 mb-3 form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" />
                                Recuérdame
                            </label>
                        </section>

                        {/* Olvidaste tu contraseña */}
                        <section className="col-12 mb-3 text-center">
                            <a href="#!" className="text-decoration-none">¿Olvidaste tu contraseña?</a>
                        </section>

                        {/* Botón */}
                        <section className="col-12 text-center">
                            <button type="submit" className="btn btn-primary w-auto px-4">
                                Ingresar
                            </button>
                        </section>

                        {/* Registrate */}
                        <section className="col-12 text-center mt-3">
                            ¿No tienes una cuenta?{" "}
                            <a href="/registro" className="text-decoration-none">Regístrate</a>
                        </section>
                    </form>
                </section>
            </main>
        </>
    );
}

export default Login;
