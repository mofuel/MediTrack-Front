import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import '../css/Promociones.css';
import { Link } from 'react-router-dom';

// Importar imágenes directamente
import promoMaternidad1 from '../assets/promo-maternidad-1.png';
import promoMaternidad2 from '../assets/promo-maternidad-2.png';
import promoMaternidad3 from '../assets/promo-maternidad-3.png';
import promoLima from '../assets/promo-lima.png';
import promoSanBorja from '../assets/promo-sanborja.png';
import promoSurco from '../assets/promo-surco.png';
import promoPediatria1 from '../assets/promo-pediatria-1.png';
import promoPediatria2 from '../assets/promo-pediatria-2.png';
import promoRobotica from '../assets/promo-robotica.png';

const promociones = [
  {
    categoria: 'Paquetes de maternidad',
    items: [
      {
        titulo: 'Primer Trimestre',
        descripcion: 'Conoce nuestro paquete del primer trimestre',
        precio: 'S/ 390',
        imagen: promoMaternidad1,
        link: '/promociones/maternidad-1',
      },
      {
        titulo: 'Segundo Trimestre',
        descripcion: 'Conoce nuestro paquete del segundo trimestre',
        precio: 'S/ 485',
        imagen: promoMaternidad2,
        link: '/promociones/maternidad-2',
      },
      {
        titulo: 'Tercer Trimestre',
        descripcion: 'Conoce nuestro paquete del tercer trimestre',
        precio: 'S/ 680',
        imagen: promoMaternidad3,
        link: '/promociones/maternidad-3',
      },
    ],
  },
  {
    categoria: 'Pacientes particulares',
    items: [
      {
        titulo: 'Sede Lima',
        descripcion: 'Consulta médica en más de 40 especialidades.',
        precio: 'S/ 80',
        imagen: promoLima,
        link: '/promociones/lima',
      },
      {
        titulo: 'Sede San Borja',
        descripcion: 'Consulta médica en más de 60 especialidades.',
        precio: 'S/ 149',
        imagen: promoSanBorja,
        link: '/promociones/san-borja',
      },
      {
        titulo: 'Sede Surco',
        descripcion: 'Consulta médica en más de 60 especialidades.',
        precio: 'S/ 99',
        imagen: promoSurco,
        link: '/promociones/surco',
      },
    ],
  },
  {
    categoria: 'Campaña de pediatría',
    items: [
      {
        titulo: 'Sobrepeso infantil',
        descripcion: 'Paquete integral para el cuidado infantil.',
        precio: 'S/ 109',
        imagen: promoPediatria1,
        link: '/promociones/sobrepeso',
      },
      {
        titulo: 'Talla corta infantil',
        descripcion: 'Consulta endocrinológica pediátrica.',
        precio: 'S/ 109',
        imagen: promoPediatria2,
        link: '/promociones/talla-corta',
      },
    ],
  },
  {
    categoria: 'Cirugía robótica',
    items: [
      {
        titulo: 'Ginecología en cirugía robótica',
        descripcion: 'Consulta ginecológica especializada.',
        precio: 'S/ 149',
        imagen: promoRobotica,
        link: '/promociones/ginecologia-robotica',
      },
    ],
  },
];

const Promociones = () => {
  return (
    <>
      <Navbar />
      <div className="promociones-container">
        <h2 className="promociones-title">Promociones y Ofertas</h2>

        {promociones.map((grupo, index) => (
          <div key={index} className="promocion-categoria">
            <h3 className="categoria-titulo">{grupo.categoria}</h3>
            <div className="promociones-grid">
              {grupo.items.map((promo, i) => (
                <div key={i} className="promocion-card">
                  <img src={promo.imagen} alt={promo.titulo} className="promo-imagen" />
                  <h4 className="promo-titulo">{promo.titulo}</h4>
                  <p className="promo-descripcion">{promo.descripcion}</p>
                  <p className="promo-precio"><strong>Inversión:</strong> {promo.precio}</p>
                  <Link to={promo.link} className="promo-boton">Ver detalles</Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Promociones;