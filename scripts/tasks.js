// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
// Antes de que cargue la pagina validar si el usuario esta login
const btnCerrarSesion = document.querySelector('#closeApp');
const nombreUsu = document.querySelector('.user-info p');
let jwtToken = localStorage.jwt;

// Función para verificar si el usuario está logeado
function verificarSiLogeado() {
  console.log(jwtToken);
  if (!jwtToken) location.replace("./login.html")
}
verificarSiLogeado();


/* ---------------------------------------------- */
/* FUNCIÓN 1 - Cerrar sesión */
/* ---------------------------------------------- */
btnCerrarSesion.addEventListener('click', function () {
  jwtToken = '';
  location.replace("./login.html")
});

/* ---------------------------------------------- */
/*  FUNCIÓN 2 - Obtener nombre de usuario [GET] */
/* ---------------------------------------------- */
async function obtenerNombreUsuario() {
  if (jwtToken) {
    settings = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${jwtToken.replace(/"/g, '')}`,
      }
    };
    try {
      const response = await fetch(`${URL}/users/getMe`, settings);
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      handleData(data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  }
}
obtenerNombreUsuario();

function handleData(data) {
  if (data) {
    const nombreCompleto = `${capitalizarPalabras(data.firstName)} ${capitalizarPalabras(data.lastName)}`;
    nombreUsu.textContent = nombreCompleto;
  }
}

/* ---------------------------------------------- */
/* FUNCIÓN 3 - Obtener listado de tareas [GET] */
/* ---------------------------------------------- */
function consultarTareas() {
};

/* ---------------------------------------------- */
/* FUNCIÓN 4 - Crear nueva tarea [POST] */
/* ---------------------------------------------- */
// formCrearTarea.addEventListener('submit', function (event) {
// });

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