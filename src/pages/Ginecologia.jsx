import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/especializacion.css';

const Ginecologia = () => {
  return (
    <>

      <div className="especialidad-container ginecologia">
        {/* Encabezado */}
        <section className="especialidad-header">
          <h1>Ginecología y Obstetricia</h1>
          <p>
            Cuidamos la salud integral de la mujer en todas las etapas de su vida con atención especializada y tecnología de vanguardia.
          </p>
          <div className="atencion-tipos">
            <span className="atencion presencial">Presencial</span>
            <span className="atencion virtual">Virtual</span>
          </div>
        </section>

        {/* Información general */}
        <section className="especialidad-info">
          <h2>Información General</h2>
          <p>
            El departamento de Ginecología y Obstetricia de la Clínica Internacional está enfocado en la prevención, diagnóstico y tratamiento de enfermedades ginecológicas, así como en el acompañamiento durante el embarazo, parto y postparto. Nuestro equipo de especialistas en obstetricia y ginecología garantiza una atención personalizada y de calidad, respaldada por tecnología de última generación.
          </p>
        </section>

        {/* Beneficios */}
        <section className="especialidad-beneficios">
          <h2>Beneficios para el Paciente</h2>
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <h3>Compromiso y atención integral en todas las etapas de la vida</h3>
              <p>
                Nuestros especialistas en ginecología y obstetricia están altamente comprometidos con el bienestar de sus pacientes, brindando atención personalizada desde la adolescencia hasta la menopausia, asegurando un cuidado integral en cada etapa.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Tecnología de vanguardia para diagnósticos y tratamientos precisos</h3>
              <p>
                Contamos con equipos de última generación, incluyendo el robot Da Vinci y modernos sistemas de laparoscopía, que permiten procedimientos mínimamente invasivos, reduciendo tiempos de recuperación y mejorando la precisión en cirugías ginecológicas.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Atención especializada en embarazo y parto de alto riesgo</h3>
              <p>
                Acompañamos a la mujer durante todo el proceso de gestación, con un equipo de gineco-obstetras altamente capacitado en manejo de embarazos de alto riesgo, ofreciendo monitoreo continuo para garantizar la salud de la madre y el bebé.
              </p>
            </div>
            <div className="beneficio-card">
              <h3>Médicos en constante capacitación internacional</h3>
              <p>
                Nuestro equipo médico se actualiza constantemente en las últimas técnicas y avances en ginecología y obstetricia, participando en programas de formación internacional, lo que nos permite ofrecer tratamientos innovadores y de alta calidad.
              </p>
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default Ginecologia;