import axios from "axios";
import { useState } from "react";
import styles from "../styles/inicioSesion.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function InicioSesion() {
  /*const [encargado, setEncargado] = useState({
    legajo: 0,
    nombre: "",
    apellido: "",
    dni: 0,
    contraseña: "",
  });*/
  const [legajo, setLegajo] = useState(0);
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLegajoChange = (e) => {
    setLegajo(e.target.value);
  };

  const handleContraseñaChange = (e) => {
    setContraseña(e.target.value);
  };

  const buscarEncargado = (e) => {
    e.preventDefault();
    axios
      .get(
        "http://localhost:8080/getEncargadoAndCheck/" +
          legajo +
          "/" +
          contraseña
      )
      .then((res) => {
        if (res.data === true) {
          toast.success("Bienvenido");
          setTimeout(() => {
            navigate("/proveedores/" + legajo);
          }, 1500);
        } else {
          toast.error("Legajo y/o contraseña incorrecto/a");
        }
      })
      .catch(() => {
        toast.error("Legajo y/o contraseña incorrecto/a");
      });
  };

  return (
    <main className={styles.main}>
      <Toaster position="top-right" reverseOrder={false} />
      <form className={styles.form} onSubmit={buscarEncargado}>
        <h2 className={styles.h2}>Inicio de sesión</h2>
        <div className={styles.div1}>
          <div className={styles.iconoUser}>
            <i className={"fa-solid fa-user"}></i>
          </div>
          <h3 className={styles.h3_legajo}>Legajo</h3>
          <input
            type="text"
            onChange={handleLegajoChange}
            name="legajo"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.div}>
          <div className={styles.iconoKey}>
            <i className={"fa-solid fa-key"}></i>
          </div>
          <h3 className={styles.h3_contraseña}>Contraseña</h3>
          <input
            type="password"
            onChange={handleContraseñaChange}
            name="contraseña"
            className={styles.input}
            required
          />
        </div>
        <button className={styles.button}>Ingresar</button>
      </form>
    </main>
  );
}

export default InicioSesion;
