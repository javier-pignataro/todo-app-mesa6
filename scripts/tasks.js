// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.
// Antes de que cargue la pagina validar si el usuario esta login
const btnCerrarSesion = document.querySelector('#closeApp');
const nombreUsu = document.querySelector('.user-info p');
const pendingTasks = document.querySelector('.tareas-pendientes');
const completedTasks = document.querySelector('.tareas-terminadas');

let contCompletedTasks = document.querySelector('#cantidad-finalizadas');
let jwtToken = JSON.parse(localStorage.jwt);
let tarea = document.querySelector('#nuevaTarea');
let contador = 0;

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
  const userData = await fetchData(`${URL}/users/getMe`, 'GET');
  handleData(userData, 'usuario');
}
obtenerNombreUsuario();

/* ---------------------------------------------- */
/* FUNCIÓN 3 - Obtener listado de tareas [GET] */
/* ---------------------------------------------- */
async function consultarTareas() {
  try {
    const tareas = await fetchData(`${URL}/tasks`, 'GET');
    handleData(tareas, 'listTasks');
    console.log(tareas);
  } catch (err) {
    handleError(err, 'listTasks');
  }
};
consultarTareas();

/* ---------------------------------------------- */
/* FUNCIÓN 4 - Crear nueva tarea [POST] */
/* ---------------------------------------------- */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (tarea.value !== '') {
    payload = {
      description: tarea.value.trim(),
    };
    console.log(payload);
    try {
      const data = await fetchData(`${URL}/tasks`, 'POST', payload);
      tarea.value = '';
      consultarTareas();
    } catch (err) {
      handleError(err, 'createTasks');
    }
  } else alert('La descripción está vacía');
});

/* ---------------------------------------------- */
/* FUNCIÓN 5 - Renderizar tareas en pantalla */
/* ---------------------------------------------- */
function renderizarTareas(tareas) {
  contador = 0;
  pendingTasks.innerHTML = '';
  completedTasks.innerHTML = '';
  tareas.forEach(tarea => {
    let fecha = new Date(tarea.createdAt);
    if(tarea.completed) {
      contador++;
      completedTasks.innerHTML += `
        <li class="tarea">
          <div class="hecha">
            <i class="fa-regular fa-circle-check"></i>
          </div>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <div class="cambios-estados">
              <button class="change incompleta" id="${tarea.id}"><i class="fa-solid fa-rotate-left"></i></button>
              <button class="borrar" id="${tarea.id}"><i class="fa-regular fa-trash-can"></i></button>
            </div>
          </div>
        </li>
      `;
    } else {
      pendingTasks.innerHTML += `
        <li class="tarea">
          <button class="change" id="${tarea.id}"><i class="fa-regular fa-circle-check"></i></button>
          <div class="descripcion">
            <p class="nombre">${tarea.description}</p>
            <p class="timestamp">${fecha.toLocaleDateString()}</p>
          </div>
        </li>
      `;
    }
  });
  contCompletedTasks.textContent = contador;
};

/* ---------------------------------------------- */
/* FUNCIÓN 6 - Cambiar estado de tarea [PUT] */
/* ---------------------------------------------- */
function botonesCambioEstado() {
  const changeState = document.querySelectorAll('.change');
  payload = {};
  changeState.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const tareaId = e.target.id;
      const payload = {
        completed: !e.target.classList.contains('incompleta'), // Togglear entre true y false
      };

      try {
        const data = await fetchData(`${URL}/tasks/${tareaId}`, 'PUT', payload);
        consultarTareas();
      } catch (err) {
        handleError(err, 'changeState');
      }
    });
  });
}

/* ---------------------------------------------- */
/* FUNCIÓN 7 - Eliminar tarea [DELETE] */
/* ---------------------------------------------- */
function botonBorrarTarea() {
  const clearTasks = document.querySelectorAll('.borrar');
  clearTasks.forEach(btn =>{
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const tareaId = e.target.id;

      try {
        const data = await fetchData(`${URL}/tasks/${tareaId}`, 'DELETE');
        consultarTareas();
      } catch (err) {
        handleError(err, 'clearTasks');
      }
    });
  });
};

function handleData(data, pedido) {
  switch (true) {
    case pedido === 'usuario':
      const nombreCompleto = `${capitalizarPalabras(data.firstName)} ${capitalizarPalabras(data.lastName)}`;
      nombreUsu.textContent = nombreCompleto;
      break;
    case pedido === 'listTasks':
      renderizarTareas(data);
      botonesCambioEstado();
      botonBorrarTarea();
      break;
    default:
      break;
  }
}

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
    case pedido === 'changeState':
      console.error(`No se pudo cambiar el estado la tarea: ${err}`);
      break;
    case pedido === 'clearTasks':
      console.error(`No se pudo eliminar la tarea: ${err}`);
      break;
    default:
      console.error("Error del servidor | URL no existe");
      alert("Error del servidor | URL no existe");
      break;
  }
}