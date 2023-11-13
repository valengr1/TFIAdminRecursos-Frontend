import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "../styles/proveedores.module.css";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

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
      axios
        .get("http://localhost:8080/getDetallesConProveedoresCalificados")
        .then((res) => {
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

  /*function removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }*/

  //var uniqueArray = removeDuplicates(proveedores, "id");

  proveedores.sort((a, b) => b.calificacion - a.calificacion);

  const agregarProveedor = (e) => {
    e.preventDefault();

    navigate("/agregarProveedor/" + encargado.legajo);
  };

  const eliminarProveedor = (id) => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Se eliminarán las compras y detalles de compra del proveedor",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Si, deseo eliminarlo",
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
        <Fade duration={2000}>
          <button onClick={volverAIniciarSesión} className={styles.buttonSalir}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <h2 className={styles.header_titulo}>Proveedores</h2>
          <div className={styles.header_encargadoCaja}>
            <i className="fa-regular fa-user"></i>
            <h3 className={styles.encargadoNombre}>{encargado.nombre} </h3>
          </div>
        </Fade>
      </header>
      <main className={styles.main}>
        <form className={styles.form}>
          <div className={styles.busqueda}>
            <Fade duration={2000}>
              <div className={styles.form_buttonBuscar}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>

              <input
                autoComplete="off"
                type="text"
                className={styles.form_input}
                name="razonSocialBuscar"
                onChange={handleChangeBusqueda}
                placeholder="Razón social"
              />
            </Fade>
          </div>
          <div className={styles.botones}>
            <Fade duration={2000}>
              <button
                onClick={agregarProveedor}
                className={styles.form_buttonAgregar}
              >
                Agregar proveedor
              </button>
            </Fade>
          </div>
        </form>

        <div className={styles.divTabla}>
          <Fade duration={2000}>
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
                    <td>{proveedor.calificacion} / 100</td>
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
                      <Link
                        to={"/tecnicos/" + encargadoLegajo + "/" + proveedor.id}
                      >
                        <button href="" className={styles.buttonAgregarTecnico}>
                          <i className="fa-solid fa-user-plus"></i>
                        </button>
                      </Link>
                    </td>
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

export default Proveedores;
