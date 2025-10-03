import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Servicio.css';

import roboticaImg from '../assets/cirugia-robotica.png';
import beneficiosImg from '../assets/beneficios-cirugia-robotica.png';

const CirugiaRobotica = () => {
  return (
    <>

      <div className="servicio-container">
        <section className="servicio-header">
          <div className="servicio-text">
            <h1>Cirugía Robótica de precisión en Clínica Internacional</h1>
            <p>Mayor precisión, recuperación más rápida y un cuidado más personalizado gracias a la cirugía robótica no invasiva que usa tecnología Da Vinci Xi.</p>
            
          </div>
          <div className="servicio-image">
            <img src={roboticaImg} alt="Cirugía Robótica" />
          </div>
        </section>

        <section className="servicio-beneficios">
          <h2>Beneficios de atenderte con nosotros</h2>
          <div className="beneficios-grid">
            <div className="beneficio-item">
              <h3>🤖 Tecnología de última generación</h3>
              <p>La plataforma Da Vinci Xi permite procedimientos de alta precisión y control excepcional.</p>
            </div>
            <div className="beneficio-item">
              <h3>🔬 Menos invasión y menor dolor</h3>
              <p>Incisiones más pequeñas que reducen el dolor y aceleran la recuperación.</p>
            </div>
            <div className="beneficio-item">
              <h3>⏱️ Recuperación más rápida</h3>
              <p>Menos complicaciones postoperatorias y retorno más rápido a la vida cotidiana.</p>
            </div>
            <div className="beneficio-item">
              <h3>🩸 Menos riesgo de pérdida de sangre</h3>
              <p>Mayor precisión que reduce la necesidad de transfusiones sanguíneas.</p>
            </div>
          </div>
        </section>

        <section className="servicio-proceso">
          <div className="proceso-text">
            <h2>¿Qué es la cirugía robótica?</h2>
            <p>
              La cirugía robótica es una técnica moderna que utiliza la tecnología Da Vinci Xi con visión en 3D para realizar intervenciones con alta precisión y mínima invasión. Permite alcanzar zonas anatómicas de difícil acceso, reduciendo la conversión a cirugía abierta. Es ideal para tratar enfermedades complejas como cáncer de próstata, colon, tumores hepáticos, gástricos, ginecológicos, miomas uterinos y de tórax.
            </p>
            <h3>Especialidades elegibles:</h3>
            <ul>
              <li><strong>Urología:</strong> Diagnóstico y tratamiento del aparato urinario y reproductor masculino.</li>
              <li><strong>Cirugía General (Abdomen):</strong> Tratamiento de enfermedades digestivas y cirugías oncológicas.</li>
              <li><strong>Ginecología:</strong> Salud integral de la mujer en todas las etapas.</li>
              <li><strong>Cirugía de Tórax:</strong> Enfermedades de pulmones, arterias, venas y estructuras torácicas.</li>
            </ul>
            <h3>Beneficios adicionales:</h3>
            <ul>
              <li><strong>Plataforma Da Vinci Xi:</strong> Tecnología avanzada con precisión milimétrica.</li>
              <li><strong>Procedimientos mínimamente invasivos:</strong> Menor dolor y recuperación acelerada.</li>
              <li><strong>Equipo multidisciplinario:</strong> Cirujanos con 20–25 años de experiencia trabajando en conjunto.</li>
            </ul>
          </div>
          <div className="proceso-image">
            <img src={beneficiosImg} alt="Beneficios Cirugía Robótica" />
          </div>
        </section>
      </div>

    </>
  );
};

export default CirugiaRobotica;