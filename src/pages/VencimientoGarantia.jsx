import { Link, useLocation } from "react-router-dom";
import styles from "../styles/vencimientoGarantia.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

function VencimientoGarantia() {
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

  const [detalles, setDetalles] = useState([]);

  const location = useLocation();
  const encargadoLegajo = location.pathname.split("/")[2];
  const idProveedor = location.pathname.split("/")[3];
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

    const getEquipamientoPorVencerSuGarantiaEn30DiasOMenosByProveedor = () => {
      axios
        .get(
          "http://localhost:8080/getEquipamientoPorVencerSuGarantiaByProveedor/" +
            idProveedor
        )
        .then((res) => {
          setDetalles(res.data);
        });
    };
    getEquipamientoPorVencerSuGarantiaEn30DiasOMenosByProveedor();
    getProveedor();
    getEncargado();
  }, []);
  return (
    <div className={styles.principal}>
      <header className={styles.header}>
        <Fade duration={2000}>
          <Link to={"/compras/" + encargadoLegajo + "/" + idProveedor}>
            <button className={styles.buttonSalir}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Link>

          <h2 className={styles.header_titulo}>
            Productos por perder su garantía
          </h2>
          <div className={styles.header_encargadoCaja}>
            <i className="fa-regular fa-user"></i>
            <h3>{encargado.nombre}</h3>
          </div>
        </Fade>
      </header>
      <main className={styles.main}>
        <div className={styles.form}>
          <div className={styles.busqueda}>
            <Fade duration={2000}>
              <h2 className={styles.h2Proveedor}>Proveedor</h2>
              <h3 className={styles.h3CUIT}>CUIT: {proveedor.cuit}</h3>
              <h3 className={styles.h3RazonSocial}>
                Razón social: {proveedor.razonSocial}
              </h3>
            </Fade>
          </div>
        </div>
        <div className={styles.divTabla}>
          <Fade duration={2000}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Id</th>
                  <th>Descripcion</th>
                  <th>Costo</th>
                  <th>Último día de garantía</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {detalles.map((detalle) => (
                  <tr key={detalle.id}>
                    <td>{detalle.id}</td>
                    <td>{detalle.equipamiento.descripcion}</td>
                    <td>${detalle.equipamiento.costo}</td>
                    <td>{detalle.equipamiento.garantia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fade>
        </div>
        ;
      </main>
    </div>
  );
}

export default VencimientoGarantia;
