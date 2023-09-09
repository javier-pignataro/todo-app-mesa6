/* obtenemos variables globales */
const URL = "https://todo-api.ctd.academy/v1";
let form = document.forms[0];
let email = document.querySelector("#inputEmail");
let password = document.querySelector("#inputPassword");
let payload = {}, settings = {};

/* texto */
function validarTexto(texto) {
  return texto.length>=4 && texto.match(/[0-9]/) === null;
}

function normalizarTexto(texto) {
  // Pone los textos en minuscula
  const txtNormal = texto.trim().toLowerCase();
  return txtNormal;
}

/* email */
function validarEmail(email) {
  // Expresión regular para validar el formato de un correo electrónico
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // Realizar la validación
  return regexEmail.test(email);
}

function normalizarEmail(email) {
  // Pone los correos en minuscula
  const emailNormal = email.trim().toLowerCase();
  return emailNormal;
}

/* password */
function validarContrasenia(contrasenia) {
  let longitud = 8;
  let contMayus = /[A-Z]/.test(contrasenia);
  let contMinus = /[a-z]/.test(contrasenia);
  let contNum = /[0-9]/.test(contrasenia);
  let contEspec = /[!@#$%^&*()_+{}[\]:;<>,.?~=-]/.test(contrasenia);
  // Realizar la validación
  return (contrasenia.length >= longitud && contMayus && contMinus && contNum && contEspec);
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
  return contrasenia_1 === contrasenia_2;
}

/* Funciones agregadas */
// Función para realizar solicitudes fetch
async function fetchAPI(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw response;
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;  }
}

// Agregar un mensaje de error debajo del elemento de entrada
function addErrorMessage(input, errorMessage) {
  const errorSpan = document.createElement("span");
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add("error-message");
  errorSpan.style.cssText = "color: red; font-size: 10px; margin: 0 0 10px; text-align: center;";
  input.style.cssText += "margin: 0 0 5px;";
  input.parentNode.insertBefore(errorSpan, input.nextSibling);
}

// Eliminar todos los mensajes de error
function removeErrorMessages() {
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach(errorMessage => {
    errorMessage.parentNode.removeChild(errorMessage);
    resetStyleInput();
  });
}

// Eliminar el estilo margin de los campos sin mensaje de error
function resetStyleInput() {
  form.querySelectorAll("input").forEach((input) => {
    const errorSpan = input.parentNode.querySelector(".error-message");
    if (!errorSpan) {
      input.style.margin = "";
    }
  });
}

// Capitalizar textos
function capitalizarPalabras(texto) {
  return texto.replace(/\b\w/g, (match) => match.toUpperCase());
}