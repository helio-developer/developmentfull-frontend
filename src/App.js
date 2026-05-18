import { useEffect, useState } from "react";
import "./App.css";
import UsuarioCard from "./components/UsuarioCard";
import FormularioUsuario from "./components/FormularioUsuario";



function App() {

  const [usuarios, setUsuarios] = useState([]);

  const [nombre, setNombre] = useState("");

  const [dinero, setDinero] = useState("");

  const [editandoId, setEditandoId] = useState(null);

  const [usuarioLogin, setUsuarioLogin] = useState("");

  const [passwordLogin, setPasswordLogin] = useState("");




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


  async function login() {

    const respuesta = await fetch(
      "https://developmentfull-backend-api.onrender.com/login",
      {
  
        method: "POST",
  
        headers: {
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify({
          nombre: usuarioLogin,
          password: passwordLogin
        })
  
      }
    );
  
    const data = await respuesta.json();
  
    console.log(data);
  
    localStorage.setItem("token", data.token);
  
  }




  return (

    <div className="container">

<h1>Login</h1>

<input
  type="text"
  placeholder="Usuario"
  value={usuarioLogin}
  onChange={(e) => setUsuarioLogin(e.target.value)}
/>

<input
  type="password"
  placeholder="Contraseña"
  value={passwordLogin}
  onChange={(e) => setPasswordLogin(e.target.value)}
/>

<button onClick={login}>
  Iniciar sesión
</button>

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