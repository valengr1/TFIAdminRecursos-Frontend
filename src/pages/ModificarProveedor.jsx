import { useEffect, useState } from "react";
import styles from "../styles/modificarProveedor.module.css";
import axios from "axios";
import { useLocation, Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Fade } from "react-awesome-reveal";

function ModificarProveedor() {
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
    setProveedor((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const modificarProveedor = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:8080/modificarProveedor/" + idProveedor, proveedor)
      .then((res) => {
        console.log(res.data);
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
          <h2 className={styles.header_titulo}>Modificar proveedor</h2>
          <div className={styles.header_encargadoCaja}>
            <i className="fa-regular fa-user"></i>
            <h3 className={styles.header_encargadoNombre}>
              {encargado.nombre}
            </h3>
          </div>
        </Fade>
      </header>
      <main className={styles.main}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <form className={styles.form} onSubmit={modificarProveedor}>
          <Fade duration={2000}>
            <h2 className={styles.h2}>Datos del proveedor</h2>
            <h3 className={styles.h3_CUIT}>CUIT: {proveedor.cuit}</h3>

            <div className={styles.div}>
              <h3 className={styles.h3_razonSocial}>Razón social</h3>
              <input
                autoComplete="off"
                type="text"
                name="razonSocial"
                onChange={handleChange}
                className={styles.inputRazonSocial}
                required
                placeholder={proveedor.razonSocial}
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3_direccion}>Dirección</h3>
              <input
                autoComplete="off"
                type="text"
                name="direccion"
                onChange={handleChange}
                className={styles.inputDireccion}
                required
                placeholder={proveedor.direccion}
              />
            </div>
            <div className={styles.div}>
              <h3 className={styles.h3_telefono}>Teléfono</h3>
              <input
                autoComplete="off"
                type="text"
                name="telefono"
                onChange={handleChange}
                className={styles.inputTelefono}
                required
                placeholder={proveedor.telefono}
              />
            </div>
            <button className={styles.button}>Modificar</button>
          </Fade>
        </form>
      </main>
    </div>
  );
}

export default ModificarProveedor;
