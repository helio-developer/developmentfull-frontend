function UsuarioCard({ usuario, eliminarUsuario, empezarEditar }) {

    return (
  
      <div className="card">
  
        <h2>{usuario.nombre}</h2>
  
        <p>${usuario.dinero}</p>
  
        <button
          className="editar"
          onClick={() => empezarEditar(usuario)}
        >
          Editar
        </button>
  
        <button
          className="eliminar"
          onClick={() => eliminarUsuario(usuario.id)}
        >
          Eliminar
        </button>
  
      </div>
  
    );
  
  }
  
  export default UsuarioCard;