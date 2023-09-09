// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
// Antes de que cargue la pagina validar si el usuario esta login
const btnCerrarSesion = document.querySelector('#closeApp');
const nombreUsu = document.querySelector('.user-info p');

let jwtToken = JSON.parse(localStorage.jwt);
let tarea = document.querySelector('#nuevaTarea');

// Función para verificar si el usuario está logeado
function verificarSiLogeado() {
  if (!jwtToken) location.replace("./login.html");
}
verificarSiLogeado();

/* ---------------------------------------------- */
/* FUNCIÓN 1 - Cerrar sesión */
/* ---------------------------------------------- */
btnCerrarSesion.addEventListener('click', (e) => {
  e.preventDefault();
  const textCerrar = confirm('¿Desea cerrar sección?');
  if (textCerrar) {
    localStorage.clear();
    location.replace("./login.html");
  }
});

/* ---------------------------------------------- */
/*  FUNCIÓN 2 - Obtener nombre de usuario [GET] */
/* ---------------------------------------------- */
async function obtenerNombreUsuario() {
  if (jwtToken) {
    settings = {
      method: "GET",
      headers: {
        'Authorization': `${jwtToken}`,
      }
    };
    try {
      const data = await fetchAPI(`${URL}/users/getMe`, settings);
      handleData(data, 'usuario');
    } catch (error) {
      console.error('Error datos del usuario:', error);
    }
  }
}
obtenerNombreUsuario();

/* ---------------------------------------------- */
/* FUNCIÓN 3 - Obtener listado de tareas [GET] */
/* ---------------------------------------------- */
async function consultarTareas() {
  if (jwtToken) {
    settings = {
      method: "GET",
      headers: {
        'Authorization': `${jwtToken}`,
      }
    };
    try {
      const data = await fetchAPI(`${URL}/tasks`, settings);
      handleData(data, 'listTasks');
    } catch (err) {
      handleError(err, 'listTasks');
    }
  }
};
consultarTareas();

/* ---------------------------------------------- */
/* FUNCIÓN 4 - Crear nueva tarea [POST] */
/* ---------------------------------------------- */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (tarea.value.trim() !== '') {
    console.log('Se creara la tarea');
    payload = {
      description: tarea.value.trim(),
    };
    settings = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Authorization': jwtToken,
        'Content-Type': 'application/json',
      }
    };
    try {
      const data = await fetchAPI(`${URL}/tasks`, settings);
      handleData(data, 'createTasks');
    } catch (err) {
      handleError(err, 'createTasks');
    }
  } else alert('La descripción esta vacia');

  consultarTareas();
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

function handleError(err, pedido) {
  console.warn("Promesa rechazada");
  removeErrorMessages();
  switch (true) {
    case pedido === 'listTasks':
      console.error(`No se pudo consultar las tareas: ${err}`);
      break;
    case pedido === 'createTasks':
        console.error(`No se pudo crear la tarea: ${err}`);
      break;
    default:
      console.error("Error del servidor | URL no existe");
      alert("Error del servidor | URL no existe");
      break;
  }
}

function handleData(data, pedido) {
  switch (true) {
    case pedido === 'usuario':
      const nombreCompleto = `${capitalizarPalabras(data.firstName)} ${capitalizarPalabras(data.lastName)}`;
      nombreUsu.textContent = nombreCompleto;
      break;
    case pedido === 'listTasks':
      console.log(data);
      break;
    case pedido === 'createTasks':
      console.log(data);
      break;
    default:
      break;
  }
}