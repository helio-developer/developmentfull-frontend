import { useEffect, useState } from "react";
import "./App.css";
import UsuarioCard from "./components/UsuarioCard";
import FormularioUsuario from "./components/FormularioUsuario";



function App() {

  const [usuarios, setUsuarios] = useState([]);

  const [nombre, setNombre] = useState("");

  const [dinero, setDinero] = useState("");

  const [editandoId, setEditandoId] = useState(null);




  async function obtenerUsuarios() {

    const respuesta = await fetch(
      "https://developmentfull-backend-api.onrender.com/usuarios"
    );

    const data = await respuesta.json();

    setUsuarios(data);

  }




  useEffect(() => {

    obtenerUsuarios();

  }, []);




  async function crearUsuario() {

    const token = localStorage.getItem("token");

    await fetch(
      "https://developmentfull-backend-api.onrender.com/usuarios",
      {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },

        body: JSON.stringify({
          nombre: nombre,
          dinero: dinero
        })

      }
    );

    setNombre("");
    setDinero("");

    obtenerUsuarios();

  }




  async function eliminarUsuario(id) {

    const token = localStorage.getItem("token");

    await fetch(
      "https://developmentfull-backend-api.onrender.com/usuarios/" + id,
      {
        method: "DELETE",

        headers:{
          Authorization: token
        }
      }
    );

    obtenerUsuarios();

  }




  function empezarEditar(usuario) {

    setEditandoId(usuario.id);

    setNombre(usuario.nombre);

    setDinero(usuario.dinero);

  }




  async function guardarCambios() {

    const token = localStorage.getItem("token");

    await fetch(
      "https://developmentfull-backend-api.onrender.com/usuarios/" + editandoId,
      {

        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },

        body: JSON.stringify({
          nombre: nombre,
          dinero: dinero
        })

      }
    );

    setEditandoId(null);

    setNombre("");

    setDinero("");

    obtenerUsuarios();

  }




  return (

    <div className="container">

<h1 className="titulo">CRUD Usuarios</h1>

<FormularioUsuario

  nombre={nombre}
  setNombre={setNombre}

  dinero={dinero}
  setDinero={setDinero}

  crearUsuario={crearUsuario}

  guardarCambios={guardarCambios}

  editandoId={editandoId}

/>

      <hr />



      {usuarios.map((usuario) => (

        <UsuarioCard
          key={usuario.id}
          usuario={usuario}
          eliminarUsuario={eliminarUsuario}
          empezarEditar={empezarEditar}
        />

      ))}

    </div>

  );

}

export default App;