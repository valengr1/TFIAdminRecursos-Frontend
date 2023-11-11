import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "../styles/proveedores.module.css";
import Swal from "sweetalert2";

function Proveedores() {
  const navigate = useNavigate();
  const [proveedores, setProveedores] = useState([]);
  const [razonSocialBuscar, setRazonSocialBuscar] = useState("");
  const [encargado, setEncargado] = useState({
    legajo: 0,
    nombre: "",
    apellido: "",
    dni: 0,
    contraseña: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const location = useLocation();
  const encargadoLegajo = location.pathname.split("/")[2];

  useEffect(() => {
    const getProveedores = () => {
      axios.get("http://localhost:8080/getProveedores").then((res) => {
        setProveedores(res.data);
      });
    };
    const getEncargado = () => {
      axios
        .get("http://localhost:8080/getEncargado/" + encargadoLegajo)
        .then((res) => {
          setEncargado(res.data);
        });
    };
    getProveedores();
    getEncargado();
    setIsUpdate(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdate]);

  const volverAIniciarSesión = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const agregarProveedor = (e) => {
    e.preventDefault();
    navigate("/agregarProveedor/" + encargado.legajo);
  };

  const eliminarProveedor = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "No podras revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, eliminalo",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:8080/eliminarProveedor/" + id)
          .then((res) => {
            console.log(res);
            Swal.fire("Eliminado!", res.data, "success");
            setIsUpdate(true);
          })
          .catch((err) => {
            console.log("algo salio mal: " + err);
          });
      }
    });
  };

  const handleChangeBusqueda = (e) => {
    setRazonSocialBuscar(e.target.value);
  };

  var results = [];

  if (!razonSocialBuscar) {
    results = proveedores;
  } else if (razonSocialBuscar) {
    results = proveedores.filter((elemento) => {
      if (
        elemento.razonSocial
          .toString()
          .toLowerCase()
          .includes(razonSocialBuscar.toLowerCase())
      ) {
        return elemento;
      }
    });
  }

  return (
    <div className={styles.principal}>
      <header className={styles.header}>
        <button onClick={volverAIniciarSesión} className={styles.buttonSalir}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2 className={styles.header_titulo}>Proveedores</h2>
        <div className={styles.header_encargadoCaja}>
          <i className="fa-regular fa-user"></i>
          <h3>{encargado.nombre} </h3>
        </div>
      </header>
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.busqueda}>
            <div className={styles.form_buttonBuscar}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <label htmlFor="" className={styles.form_label}>
              Razón social:
            </label>
            <input
              type="text"
              className={styles.form_input}
              name="razonSocialBuscar"
              onChange={handleChangeBusqueda}
            />
          </div>
          <div className={styles.botones}>
            <button
              onClick={agregarProveedor}
              className={styles.form_buttonAgregar}
            >
              Agregar proveedor
            </button>
          </div>
        </form>
        <div className={styles.divTabla}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>Id</th>
                <th>CUIT</th>
                <th>Razón social</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Calificación</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {results.map((proveedor) => (
                <tr key={proveedor.cuit}>
                  <td>{proveedor.id}</td>
                  <td>{proveedor.cuit}</td>
                  <td>{proveedor.razonSocial}</td>
                  <td>{proveedor.direccion}</td>
                  <td>{proveedor.telefono}</td>
                  <td>{proveedor.calificacion}</td>
                  <td>
                    <Link
                      to={
                        "/modificarProveedor/" +
                        encargadoLegajo +
                        "/" +
                        proveedor.id
                      }
                    >
                      <button className={styles.buttonEditar}>
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        eliminarProveedor(proveedor.id);
                      }}
                      href=""
                      className={styles.buttonEliminar}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <Link
                      to={"/compras/" + encargadoLegajo + "/" + proveedor.id}
                    >
                      <button className={styles.buttonCompras}>
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </Link>
                    <button href="" className={styles.buttonAgregarTecnico}>
                      <i className="fa-solid fa-user-plus"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default Proveedores;
