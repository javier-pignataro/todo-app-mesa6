/* obtenemos variables globales */
const url = "https://todo-api.ctd.academy/v1";
let form = document.forms[0];
let firstName = document.querySelector("#inputNombre");
let lastName = document.querySelector("#inputApellido");
let email = document.querySelector("#inputEmail");
let password = document.querySelector("#inputPassword");
let passwordReply = document.querySelector("#inputPasswordRepetida");
let payload = {}, settings = {};

/* texto */
function validarTexto(texto) {
  // Expresión regular para validar el texto
  const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
  // Realizar la validación
  return regexTexto.test(texto);
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