/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styles from "../styles/agregarProveedor.module.css";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

function AgregarProveedor() {
  const [encargado, setEncargado] = useState({
    legajo: 0,
    nombre: "",
    apellido: "",
    dni: 0,
    contraseña: "",
  });

  const [proveedor, setProveedor] = useState({
    id: 0,
    cuit: 0,
    razonSocial: "",
    direccion: "",
    telefono: 0,
  });

  const location = useLocation();
  const encargadoLegajo = location.pathname.split("/")[2];
  const navigate = useNavigate();
  useEffect(() => {
    const getEncargado = () => {
      axios
        .get("http://localhost:8080/getEncargado/" + encargadoLegajo)
        .then((res) => {
          setEncargado(res.data);
        });
    };
    getEncargado();
  }, []);

  const handleChange = (e) => {
    setProveedor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const agregarProveedor = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/agregarProveedor", proveedor, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.success(res.data);
        setTimeout(() => {
          navigate("/proveedores/" + encargado.legajo);
        }, 2000);
      })
      .catch((err) => {
        console.log("algo salio mal: " + err);
        toast.error("Los datos ingresados son incorrectos");
      });
  };

  return (
    <div className={styles.principal}>
      <header className={styles.header}>
        <Link to={"/proveedores/" + encargadoLegajo}>
          <button className={styles.buttonSalir}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </Link>
        <h2 className={styles.header_h2}>Agregar proveedor</h2>
        <div className={styles.header_encargadoCaja}>
          <i className="fa-regular fa-user"></i>
          <h3 className={styles.encargadoNombre}>{encargado.nombre} </h3>
        </div>
      </header>
      <main className={styles.main}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <form className={styles.form} onSubmit={agregarProveedor}>
          <Fade duration={2000}>
            <h2 className={styles.h2}>Nuevo proveedor</h2>
            <div className={styles.div1}>
              <h3 className={styles.h3_CUIT}>CUIT</h3>
              <input
                type="text"
                name="cuit"
                className={styles.inputCUIT}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3_razonSocial}>Razón social</h3>
              <input
                type="text"
                name="razonSocial"
                onChange={handleChange}
                className={styles.inputRazonSocial}
                required
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3_direccion}>Dirección</h3>
              <input
                type="text"
                name="direccion"
                onChange={handleChange}
                className={styles.inputDireccion}
                required
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3_telefono}>Teléfono</h3>
              <input
                type="text"
                name="telefono"
                onChange={handleChange}
                className={styles.inputTelefono}
                required
              />
            </div>
            <button className={styles.button}>Agregar</button>
          </Fade>
        </form>
      </main>
    </div>
  );
}

export default AgregarProveedor;
