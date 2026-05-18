import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const [usuarioLogin, setUsuarioLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const navigate = useNavigate();

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

    localStorage.setItem("token", data.token);

    navigate("/dashboard");

  }

  return (

    <div>

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

      <button 
      className="logout"
      onClick={login}>
        Iniciar sesión
      </button>

    </div>

  );

}

export default Login;