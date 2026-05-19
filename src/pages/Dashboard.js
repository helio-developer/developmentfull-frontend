import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioCard from "../components/UsuarioCard";
import FormularioUsuario from "../components/FormularioUsuario";

function Dashboard() {

  const navigate = useNavigate();

  function logout() {

    localStorage.removeItem("token");
  
    navigate("/");
  
  }

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

    const token = localStorage.getItem("token");
  
    if(!token){
  
      navigate("/");
  
      return;
  
    }
  
    obtenerUsuarios();
  
  }, [navigate]);




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

    obtenerUsuarios();

  }




  function empezarEditar(usuario) {

    setNombre(usuario.nombre);
    setDinero(usuario.dinero);

    setEditandoId(usuario.id);

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




  async function eliminarUsuario(id) {

    const token = localStorage.getItem("token");

    await fetch(
      "https://developmentfull-backend-api.onrender.com/usuarios/" + id,
      {

        method: "DELETE",

        headers: {
          Authorization: token
        }

      }
    );

    obtenerUsuarios();

  }



  return (

    <div className="container">

      <h1>Dashboard</h1>

      <button 
      className="logout"
      onClick={logout}>
        Cerrar sesión
      </button>

      <FormularioUsuario

        nombre={nombre}
        setNombre={setNombre}

        dinero={dinero}
        setDinero={setDinero}

        crearUsuario={crearUsuario}

        guardarCambios={guardarCambios}

        editandoId={editandoId}

      />



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

export default Dashboard;