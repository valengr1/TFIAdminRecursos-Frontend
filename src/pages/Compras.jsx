import { Link, useLocation } from "react-router-dom";
import styles from "../styles/compras.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
//import toast from "react-hot-toast";

function Compras() {
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

  const [detallesCompra, setDetallesCompra] = useState([]);

  const [compras, setCompras] = useState([]);

  const [idCompra, setIdCompra] = useState(0);

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

    const getCompras = () => {
      axios
        .get("http://localhost:8080/getComprasByidProveedor/" + idProveedor)
        .then((res) => {
          setCompras(res.data);
        });
    };
    getCompras();
    getProveedor();
    getEncargado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verDetalleCompra = (id) => {
    axios
      .get("http://localhost:8080/getDetalleCompraByIdCompra/" + id)
      .then((res) => {
        setDetallesCompra(res.data);
      });
    axios.get("http://localhost:8080/getIdCompra/" + id).then((res) => {
      setIdCompra(res.data);
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

          <h2 className={styles.header_titulo}>Compras</h2>
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
              <Link
                to={
                  "/vencimientoDeGarantia/" +
                  encargadoLegajo +
                  "/" +
                  idProveedor
                }
              >
                <button className={styles.buttonVencimientoGarantias}>
                  Vencimiento de garantias
                </button>
              </Link>
            </Fade>
          </div>
        </div>
        <div className={styles.divTabla}>
          <Fade duration={2000}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Id</th>
                  <th>Encargado</th>
                  <th>Fecha</th>
                  <th>Total</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {compras.map((compra) => (
                  <tr key={compra.id}>
                    <td>{compra.id}</td>
                    <td>
                      {compra.encargadoCompras.nombre +
                        " " +
                        compra.encargadoCompras.apellido}
                    </td>
                    <td>{compra.fechaCompra}</td>
                    <td>${compra.total}</td>
                    <td>
                      <button
                        onClick={() => {
                          verDetalleCompra(compra.id);
                        }}
                        className={styles.buttonVerDetalle}
                      >
                        Detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fade>
        </div>
        <div className={styles.form}>
          <div className={styles.busqueda}>
            <Fade duration={2000}>
              <h2>Detalle de la compra de id: {idCompra}</h2>
            </Fade>
          </div>
        </div>
        <div className={styles.divTabla}>
          <Fade duration={2000}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr>
                  <th>Id</th>
                  <th>Descripción </th>
                  <th>Vencimiento de garantía</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Subtotal</th>
                  <th>Fecha esperada</th>
                  <th>Fecha de entrega</th>
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {detallesCompra.map((detalle) => (
                  <tr key={detalle.id}>
                    <td>{detalle.equipamiento.id}</td>
                    <td>{detalle.equipamiento.descripcion}</td>
                    <td>{detalle.equipamiento.garantia}</td>
                    <td>{detalle.cantidad}</td>
                    <td>${detalle.equipamiento.costo}</td>
                    <td>${detalle.subtotal}</td>
                    <td>{detalle.fechaEsperada}</td>
                    <td>{detalle.fechaEntrega}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Fade>
        </div>
      </main>
    </div>
  );
}

export default Compras;
