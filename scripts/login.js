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
  // vemos el objeto que recibimos del formulario
  console.log(payload);
  //configuramos la request del Fetch
  settings = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  realizarLogin(settings);
});

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el login [POST]*/
/* ---------------------------------------------- */
async function realizarLogin(settings) {
  console.log("Lanzar la consulta a la API...");
  try {
    const response = await fetch(`${url}/users/login`, settings);
    if (!response.ok) {
      throw response;
    }
    const data = await response.json();
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
  console.log(err);
  removeErrorMessages();
  switch (err.status) {
    case 400:
      console.warn("Contraseña incorrecta");
      addErrorMessage(password, "Contraseña incorrecta");
      password.value= '';
      break;
    case 404:
      console.warn("El usuario no existe");
      addErrorMessage(email, "El usuario no existe");
      email.value= '';
      email.style.margin = '';
      break;
    default:
      console.error("Error del servidor | URL no existe");
      addErrorMessage(email, "Error del servidor | URL no existe");
      email.value= '';
      email.style.margin = '';
  }
}

// Función para agregar un mensaje de error debajo del elemento de entrada
function addErrorMessage(inputElement, errorMessage) {
  const errorSpan = document.createElement("span");
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add("error-message");
  errorSpan.style.cssText = "color: red; font-size: 10px; margin: 0 0 10px; text-align: center;";
  inputElement.style.cssText += "margin: 0 0 5px;";
  inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
}

// Función para eliminar todos los mensajes de error
function removeErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(errorMessage => {
    errorMessage.parentNode.removeChild(errorMessage);
  });
}