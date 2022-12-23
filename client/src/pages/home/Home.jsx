import { useRef, useEffect } from "react";
import Typed from "typed.js";
import logoTitulo from "../../img/logoPNG.png";
import logoQueHacer from "../../img/logo2PNG.png";
import contacto from "../../img/contacto.png";
import logoEmail from "../../img/logoEmail.png";
import { newObserver } from "./observer";
import { useSelector } from "react-redux";
import "./Home.scss";

function Home() {
  const titulo = useRef();
  const qh = useRef();
  const nc = useRef();
  const ro = useRef();
  const isLogin = useSelector((state) => state.isLogin);

  useEffect(() => {
    newObserver(qh.current);
    newObserver(nc.current);
    newObserver(ro.current);
    new Typed(titulo.current, {
      strings: ["Salon Genesis Tienda <span clasName='resaltar'>Online</span>"],
      typeSpeed: 50,
      showCursor: "",
    });
  }, []);

  return (
    <div className="Home">
      <div className="titulo">
        <h1 ref={titulo}></h1>
      </div>
      <div className="sobre">
        <span className="efectoTop"></span>
        <span className="efectoBotton"></span>
        <img className="imgSobre" src={logoTitulo} alt="Genesis Salon" />
        <div>
          <p id="sobreTitulo">Sobre Nosotros</p>
          <p id="sobreInfo">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Enim esse
            dignissimos itaque fuga expedita vel aliquid distinctio quaerat
            exercitationem non. Cum voluptatum autem nisi ratione officiis,
            magni porro repellendus dolorum ad a illo dicta architecto pariatur
            earum. Quam velit tenetur, ullam laborum quasi vitae dolores iure
            ipsum iste amet eaque, quae quo obcaecati excepturi quibusdam
            repellendus porro fuga molestias quas voluptatum? Aliquid at
            exercitationem id eligendi blanditiis sapiente, possimus dicta
            dolorem commodi doloremque inventore numquam dignissimos maiores,
            veritatis, error corrupti adipisci suscipit veniam temporibus
            molestias magni. Ut, iste assumenda similique perferendis officia
            distinctio quas itaque ea voluptates nobis! Eveniet, laboriosam!
          </p>
          <div className="ContactosSobre">
            <div>
              <button className="Facebook">Facebook</button>
            </div>
            <div>
              <button className="Whatsapp">Whatsapp</button>
            </div>
          </div>
        </div>
      </div>
      <div ref={qh} className="queHacemos invisible">
        <div className="qh">
          <h1>¿Que hacemos?</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis
            asperiores reprehenderit provident quae necessitatibus quia totam
            quaerat dolorem! Illum, voluptates!
          </p>
          <div className="ejemploQH">
            <b>
              {" "}
              - Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero,
              quasi!
            </b>
            <b>
              {" "}
              - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Impedit, minus!
            </b>
            <b>
              {" "}
              - Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium, nostrum?
            </b>
            <b>
              {" "}
              - Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Nesciunt, provident!
            </b>
            <b> - lorem10</b>
          </div>
        </div>
        <img src={logoQueHacer} alt="Que hacemos IMG" />
      </div>
      <div ref={nc} className="nuestroCorreo invisible">
        <img src={contacto} alt="Nuestro Contacto" />
        <div>
          <span className="ncTOP"></span>
          <span className="ncBotton"></span>
          <h1>Nuestro medios de contacto</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            facilis, praesentium aspernatur vel molestias dolores velit officia
            maiores? Earum, tempore. Hic, ea optio esse ullam ad amet
            laboriosam, eos dolore incidunt reiciendis, ipsam labore cumque
            obcaecati. Quaerat, harum et laborum debitis, eos possimus eius
            culpa atque quos facere consequatur. Veniam, eveniet eligendi omnis
            accusamus voluptate nostrum itaque, minima et nemo ea nisi dolor
            beatae earum amet aliquid, quod obcaecati soluta adipisci blanditiis
            voluptatum quos quia quas incidunt. Doloremque architecto nihil
            tempora est enim quaerat! Quos nisi repellendus quasi distinctio,
            ducimus natus facere aliquid tempora labore, ex at alias debitis
            excepturi.
          </p>
          <button className="email">Gmail</button>
        </div>
      </div>
      <div ref={ro} className="recibirOferta invisible">
        <div>
          <h1>Recibe oferta tan pronto se habiliten</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic
            voluptates, culpa voluptatum voluptate omnis corrupti ducimus
            molestias repellat cumque, dolorum eaque incidunt non quia autem
            dicta laboriosam neque sapiente accusantium. Earum et architecto
            inventore officia doloribus enim, consequatur quos maiores quisquam
            temporibus libero nostrum! Minima delectus asperiores autem dolore
            quod.
          </p>
          <button className="RO">
            {isLogin ? "Recibir Ofertas" : "Iniciar Session"}
          </button>
        </div>
        <img src={logoEmail} alt="" />
      </div>
    </div>
  );
}

export default Home;
