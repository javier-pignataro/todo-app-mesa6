// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
// Antes de que cargue la pagina validar si el usuario esta login

window.addEventListener('load', function () {
  /* variables globales y llamado a funciones */
  
  /* ---------------------------------------------- */
  /* FUNCIÓN 1 - Cerrar sesión */
  /* ---------------------------------------------- */
  btnCerrarSesion.addEventListener('click', function () {
  });
  
  /* ---------------------------------------------- */
  /*  FUNCIÓN 2 - Obtener nombre de usuario [GET] */
  /* ---------------------------------------------- */
  function obtenerNombreUsuario() {
  };
  
  /* ---------------------------------------------- */
  /* FUNCIÓN 3 - Obtener listado de tareas [GET] */
  /* ---------------------------------------------- */
  function consultarTareas() {
  };
  
  /* ---------------------------------------------- */
  /* FUNCIÓN 4 - Crear nueva tarea [POST] */
  /* ---------------------------------------------- */
  formCrearTarea.addEventListener('submit', function (event) {
  });
  
  /* ---------------------------------------------- */
  /* FUNCIÓN 5 - Renderizar tareas en pantalla */
  /* ---------------------------------------------- */
  function renderizarTareas(listado) {
  };
  
  /* ---------------------------------------------- */
  /* FUNCIÓN 6 - Cambiar estado de tarea [PUT] */
  /* ---------------------------------------------- */
  function botonesCambioEstado() {
  }
  
  
  /* ---------------------------------------------- */
  /* FUNCIÓN 7 - Eliminar tarea [DELETE] */
  /* ---------------------------------------------- */
  function botonBorrarTarea() {
  };
});