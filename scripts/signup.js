let firstName = document.querySelector("#inputNombre");
let lastName = document.querySelector("#inputApellido");
let passwordReply = document.querySelector("#inputPasswordRepetida")


/* ---------------------------------------------- */
/* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
/* ---------------------------------------------- */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const errors = validForm();
  // Validar que el objeto de errores este vacio
  if (Object.keys(errors).length === 0) {
    payload = {
      firstName: normalizarTexto(firstName.value),
      lastName: normalizarTexto(lastName.value),
      email: normalizarEmail(email.value),
      password: password.value,
    };
    realizarRegister(payload);
  } else {
    // Mandar el arreglo a la funcion que los maneja
    handleError(errors, 'infoRegister');
  }
});

// Función para validar el formulario
function validForm() {
  const errorsForm = {};
  // Maneja errores y mensajes de error
  if (!compararContrasenias(password.value, passwordReply.value)) errorsForm.passwordMismatch = "Las contraseñas no coinciden.";
  if (!validarTexto(firstName.value)) errorsForm.invalidFirstName = "El nombre no es válido.";
  if (!validarTexto(lastName.value)) errorsForm.invalidLastName = "El apellido no es válido.";
  if (!validarEmail(email.value)) errorsForm.invalidEmail = "El correo electrónico no es válido.";
  if (!validarContrasenia(password.value) && compararContrasenias(password.value, passwordReply.value)) errorsForm.insecurePassword = "La contraseña no es segura.";
  // Devolve el arreglo de errores
  return errorsForm;
}

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el signup [POST] */
/* ---------------------------------------------- */
async function realizarRegister(payload) {
  console.log("Lanzar la consulta a la API...");
  headersSettings = {
    'Content-Type': 'application/json',
  };
  try {
    const data = await fetchData(`${URL}/users`, 'POST', headersSettings, payload);
    handleData(data);
  } catch (err) {
    handleError(err, 'register');
  }
}

function handleData(data) {
  if (data.jwt) location.replace("./login.html");
}

function handleError(err, pedido) {
  console.warn("Promesa rechazada");
  removeErrorMessages();
  if(pedido === 'register') {
    switch (err.status) {
      case 400:
        console.warn("El usuario ya se encuentra registrado");
        addErrorMessage(password, "El usuario ya se encuentra registrado");
        break;
      default:
        console.error("Error del servidor");
        alert("Error del servidor");
        break;
    }
  }
  if(pedido === 'infoRegister') {
    if (err.hasOwnProperty('passwordMismatch')) {
      console.warn(err.passwordMismatch);
      addErrorMessage(password, err.passwordMismatch);
      addErrorMessage(passwordReply, err.passwordMismatch);
    }
    if (err.hasOwnProperty('invalidFirstName')) {
      console.warn(err.invalidFirstName);
      addErrorMessage(firstName, err.invalidFirstName);
    }
    if (err.hasOwnProperty('invalidLastName')) {
      console.warn(err.invalidLastName);
      addErrorMessage(lastName, err.invalidLastName);
    }
    if (err.hasOwnProperty('invalidEmail')) {
      console.warn(err.invalidEmail);
      addErrorMessage(email, err.invalidEmail);
    }
    if (err.hasOwnProperty('insecurePassword')) {
      console.warn(err.insecurePassword);
      addErrorMessage(password, err.insecurePassword);
      addErrorMessage(passwordReply, err.insecurePassword);
    }
  }
}