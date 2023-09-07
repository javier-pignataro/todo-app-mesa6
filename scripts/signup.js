let errores = [];
/* ---------------------------------------------- */
/* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
/* ---------------------------------------------- */
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const isValid = validForm();
  errores = [];
  if (isValid) {
    const payload = prepararPayload();
    await realizarRegister(payload);
  }
});

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el signup [POST] */
/* ---------------------------------------------- */
async function realizarRegister(payload) {
  const settings = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // try {
  //   const response = await fetch(`${url}`, settings);
  //   const data = await response.json();
  //   console.log(data);
  // } catch (error) {
  //   console.error(error);
  // }
}

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
  // Preparar y retornar el objeto payload
  const payload = {
    firstName: normalizarTexto(firstName.value),
    lastName: normalizarTexto(lastName.value),
    email: normalizarEmail(email.value),
    password: password.value,
  };
  return payload;
}

// Función para agregar un mensaje de error
function addErrorMessage(campo, mensaje) {
  // Agregar el mensaje de error al arreglo de errores
  errores.push({ campo, mensaje });
  // Llamar a la función para mostrar los errores
  mostrarErrores();
}

function mostrarErrores() {
  // Eliminar mensajes de error anteriores
  form.querySelectorAll(".error-message").forEach((mensajeAnterior) => {
    resetStyle();
    mensajeAnterior.remove();
  });
  
  // Recorrer el arreglo de errores y generar mensajes de error
  errores.forEach((error) => {
    const { campo, mensaje } = error;
    const errorSpan = document.createElement("span");
    errorSpan.textContent = mensaje;
    errorSpan.classList.add("error-message");
    errorSpan.style.cssText = "color: red; font-size: 10px; margin: 0 0 10px; text-align: center;";
    campo.style.cssText += "margin: 0 0 5px;";
    campo.parentNode.insertBefore(errorSpan, campo.nextSibling);
  });
}

function resetStyle() {
  // Eliminar el estilo margin de los campos sin mensaje de error
  form.querySelectorAll("input").forEach((input) => {
    const errorSpan = input.parentNode.querySelector(".error-message");
    if (!errorSpan) {
      input.style.margin = ""; // Eliminar el estilo "margin"
    }
  });
}