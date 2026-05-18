function FormularioUsuario({

    nombre,
    setNombre,
  
    dinero,
    setDinero,
  
    crearUsuario,
  
    guardarCambios,
  
    editandoId
  
  }) {
  
    return (
  
      <div className="formulario">
  
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
  
        <input
          type="number"
          placeholder="Dinero"
          value={dinero}
          onChange={(e) => setDinero(e.target.value)}
        />
  
  
  
        {editandoId ? (
  
          <button
            className="editar"
            onClick={guardarCambios}
          >
            Guardar cambios
          </button>
  
        ) : (
  
          <button
            className="crear"
            onClick={crearUsuario}
          >
            Crear usuario
          </button>
  
        )}
  
      </div>
  
    );
  
  }
  
  export default FormularioUsuario;