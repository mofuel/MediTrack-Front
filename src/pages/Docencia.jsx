import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Docencia.css';
import docenciaHeader from '../assets/docencia_header.png';
import formacionProfesional from '../assets/formacion_profesional.png';

const Docencia = () => {
  return (
    <>

      <div className="docencia-container">
        {/* Sección introductoria */}
        <section className="intro-docencia">
          <div className="intro-text">
            <h1>Docencia</h1>
            <p>
              Conoce el compromiso de Clínica Internacional con la formación médica de excelencia, la actualización continua del personal de salud y el fomento de la investigación científica, en alianza con universidades líderes del país.
            </p>
          </div>
          <img src={docenciaHeader} alt="Docencia médica" className="intro-image" />
        </section>

        {/* ¿Qué es? */}
        <section className="que-es">
          <h2>Docencia Clínica Internacional</h2>
          <h3>¿Qué es?</h3>
          <p>
            La Unidad de Docencia de Clínica Internacional tiene como misión promover y gestionar el desarrollo continuo de los procesos educativos y de actualización del personal de salud, en coherencia con los objetivos estratégicos de la institución. Nos comprometemos con la formación integral y de excelencia de médicos residentes e internos, y fomentamos activamente la investigación y la publicación científica como pilares del crecimiento académico y profesional.
          </p>
        </section>

        {/* Formación profesional */}
        <section className="formacion">
          <div className="formacion-text">
            <h2>Formación profesional</h2>
            <p>
              Contamos con el Programa de Formación para estudiantes de pregrado (Internado) y el Programa de Formación para estudiantes de posgrado (Residentado Médico), desarrollados en alianza con las principales universidades del Perú. Además, ofrecemos el Programa de Pasantías, dirigido a profesionales en formación interesados en perfeccionar sus habilidades y conocimientos con nosotros.
            </p>
            <p><strong>Convenios con universidades:</strong></p>
            <ul>
              <li>Universidad Nacional Mayor de San Marcos (UNMSM)</li>
              <li>Universidad Peruana Cayetano Heredia (UPCH)</li>
              <li>Universidad Peruana de Ciencias Aplicadas (UPC)</li>
              <li>Universidad de San Martín de Porres (USMP)</li>
            </ul>
            <p>
              Actualmente, somos sede docente para el desarrollo del Programa de Internado y del Programa de Residentado.
            </p>
            <h3>Programas de Internos:</h3>
            <ul>
              <li>Internos de Medicina</li>
              <li>Internos de Enfermería</li>
              <li>Internos de Tecnología Médica en Radiología</li>
              <li>Internos de Tecnología Médica en Terapia Física y Rehabilitación</li>
            </ul>
            <h3>Programas de Residentes:</h3>
            <ul>
              <li>Neumología</li>
              <li>Otorrinolaringología</li>
              <li>Pediatría</li>
              <li>Cardiología</li>
              <li>Medicina Interna</li>
              <li>Cirugía General</li>
              <li>Radiología</li>
              <li>Medicina de Emergencias y Desastres</li>
              <li>Gastroenterología</li>
              <li>Anestesiología</li>
            </ul>
          </div>
          <img src={formacionProfesional} alt="Formación profesional" className="formacion-image" />
        </section>
      </div>

    </>
  );
};

export default Docencia;