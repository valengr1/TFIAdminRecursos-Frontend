import { useEffect, useState } from "react";
import styles from "../styles/agregarTecnico.module.css";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

function Tecnicos() {
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

  const [tecnico, setTecnico] = useState({
    dni: 0,
    nombre: "",
    apellido: "",
    servicio: "",
  });

  const location = useLocation();
  const encargadoLegajo = location.pathname.split("/")[2];
  const idProveedor = location.pathname.split("/")[3];
  const navigate = useNavigate();

  useEffect(() => {
    const getEncargado = () => {
      axios
        .get("http://localhost:8080/getEncargado/" + encargadoLegajo)
        .then((res) => {
          setEncargado(res.data);
        });
    };
    const getProveedor = () => {
      axios
        .get("http://localhost:8080/getProveedor/" + idProveedor)
        .then((res) => {
          setProveedor(res.data);
        });
    };
    getProveedor();
    getEncargado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setTecnico((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const agregarTecnico = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/agregarTecnico/" + idProveedor, tecnico)
      .then((res) => {
        toast.success(res.data);
        setTimeout(() => {
          navigate("/proveedores/" + encargadoLegajo);
        }, 2000);
      })
      .catch(() => {
        toast.error("Los datos ingresados son incorrectos");
      });
  };

  return (
    <div className={styles.principal}>
      <header className={styles.header}>
        <Fade duration={2000}>
          <Link to={"/proveedores/" + encargadoLegajo}>
            <button className={styles.buttonSalir}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Link>
          <h2 className={styles.header_titulo}>Agregar Técnico</h2>
          <div className={styles.header_encargadoCaja}>
            <i className="fa-regular fa-user"></i>
            <h3 className={styles.encargadoNombre}>{encargado.nombre}</h3>
          </div>
        </Fade>
      </header>
      <main className={styles.main}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <form className={styles.form} onSubmit={agregarTecnico}>
          <Fade duration={2000}>
            <h2 className={styles.h2}>Nuevo técnico</h2>
            <div className={styles.div1}>
              <h3 className={styles.h3_CUIT}>
                Proveedor: {proveedor.razonSocial}
              </h3>
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3DNI}>DNI</h3>
              <input
                type="text"
                name="dni"
                onChange={handleChange}
                className={styles.inputDNI}
                required
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3Nombre}>Nombre</h3>
              <input
                type="text"
                name="nombre"
                onChange={handleChange}
                className={styles.inputNombre}
                required
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3Apellido}>Apellido</h3>
              <input
                type="text"
                name="apellido"
                onChange={handleChange}
                className={styles.inputApellido}
                required
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3Servicio}>Servicio</h3>
              <input
                type="text"
                name="servicio"
                onChange={handleChange}
                className={styles.inputServicio}
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

export default Tecnicos;
