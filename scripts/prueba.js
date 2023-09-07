// Evento para escuchar el submit del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isValid = validForm();

  if (isValid) {
    const payload = prepararPayload();
    await realizarRegister(payload);
  }
});

// Función para validar el formulario
function validForm() {
  const validFirstName = validarTexto(firstName.value);
  const validLastName = validarTexto(lastName.value);
  const isValidEmail = validarEmail(email.value);
  const validPass = validarContrasenia(password.value);
  const passEqual = compararContrasenias(password.value, passwordReply.value);

  // Manejar errores y mensajes de error si es necesario
  if (!passEqual) {
    addErrorMessage(password, "Las contraseñas no coinciden.");
    addErrorMessage(passwordReply, "Las contraseñas no coinciden.");
  }
  if (!validFirstName) {
    addErrorMessage(firstName, "El nombre no es válido.");
  }
  if (!validLastName) {
    addErrorMessage(lastName, "El apellido no es válido.");
  }
  if (!isValidEmail) {
    addErrorMessage(email, "El correo electrónico no es válido.");
  }
  if (!validPass && passEqual) {
    addErrorMessage(password, "La contraseña no es segura.");
    addErrorMessage(passwordReply, "La contraseña no es segura.");
  }
  // Devolver true si el formulario es válido, false si hay errores
  return passEqual && validFirstName && validLastName && isValidEmail && validPass;
}

// Función para preparar el payload
function prepararPayload() {
  const pass = password.value;

  // Preparar y retornar el objeto payload
  const payload = {
    firstName: normalizarTexto(firstName.value),
    lastName: normalizarTexto(lastName.value),
    email: normalizarEmail(email.value),
    password: pass,
  };

  return payload;
}

// Función para enviar la solicitud POST
async function realizarRegister(payload) {
  const settings = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const response = await fetch('url_del_servidor', settings);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Función para agregar un mensaje de error (puede estar definida en utils.js)
function addErrorMessage(campo, mensaje) {
  const mensajesAnteriores = campo.parentNode.querySelectorAll(".error-message");
  mensajesAnteriores.forEach((mensajeAnterior) => mensajeAnterior.remove());
  campo.style.margin = "0 0 5px";
  const errorSpan = document.createElement("span");
  errorSpan.textContent = mensaje;
  errorSpan.classList.add("error-message");
  errorSpan.style.cssText = "color: red; font-size: 10px; margin: 0 0 10px; text-align: center;";
  campo.parentNode.insertBefore(errorSpan, campo.nextSibling);
}
