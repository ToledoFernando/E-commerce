import "./footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <div className="options">
        <div>
          <h6>Contactos</h6>
          <p>Whatsapp</p>
          <p>Facebook</p>
          <p>Email</p>
        </div>
        <div>
          <h6>Productos</h6>
          <p>Ejemplo 1</p>
          <p>Ejemplo 2</p>
          <p>Ejemplo 3</p>
        </div>
        <div>
          <h6>¿Problemas?</h6>
          <p>Soporte tecnico</p>
          <p>Preguntas Frecuentes</p>
        </div>
      </div>
      <div className="copy">
        <span></span>
        <p>©Salon-Genesis 2022 || Genesis Insumos</p>
      </div>
    </div>
  );
}

export default Footer;
