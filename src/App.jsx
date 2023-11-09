import { BrowserRouter, Route, Routes } from "react-router-dom";
import InicioSesion from "./pages/InicioSesion";
import Proveedores from "./pages/Proveedores";
import AgregarProveedor from "./pages/AgregarProveedor";
import ModificarProveedor from "./pages/ModificarProveedor";
import Compras from "./pages/Compras";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={InicioSesion}></Route>
        <Route
          path="/proveedores/:legajoEncargado"
          Component={Proveedores}
        ></Route>
        <Route
          path="/agregarProveedor/:legajoEncargado"
          Component={AgregarProveedor}
        ></Route>
        <Route
          path="/modificarProveedor/:legajoEncargado/:idProveedor"
          Component={ModificarProveedor}
        ></Route>
        <Route
          path="/compras/:legajoEncargado/:idProveedor"
          Component={Compras}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
