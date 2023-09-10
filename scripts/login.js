/* ---------------------------------------------- */
/* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
/* ---------------------------------------------- */
form.addEventListener('submit', (e) => {
  e.preventDefault()
  //Creamos el cuerpo de la request (petición al servidor)
  payload = {
    email: email.value,
    password: password.value
  };
  realizarLogin(payload);
});

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el login [POST]*/
/* ---------------------------------------------- */
async function realizarLogin(payload) {
  console.log("Lanzar la consulta a la API...");
  headersSettings = {
    'Content-Type': 'application/json',
  };
  try {
    const data = await fetchData(`${URL}/users/login`, 'POST', headersSettings, payload);
    handleData(data);
  } catch (err) {
    handleError(err);
  }
}

function handleData(data) {
  if (data.jwt) {
    // Guardamos el dato jwt en el local storage (este token de autenticación)
    localStorage.setItem("jwt", JSON.stringify(data.jwt));
    // redireccionamos a nuestro dashboard de todo  
    location.replace("./index.html")
  }
}

function handleError(err) {
  console.warn("Promesa rechazada");
  removeErrorMessages();
  switch (err.status) {
    case 400:
      console.warn("Contraseña incorrecta");
      addErrorMessage(password, "Contraseña incorrecta");
      break;
    case 404:
      console.warn("El correo no esta registrado");
      addErrorMessage(email, "El correo no esta registrado");
      break;
    default:
      console.error("Error del servidor | URL no existe");
      alert("Error del servidor | URL no existe");
      break;
  }
}