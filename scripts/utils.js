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
}

function normalizarTexto(texto) {
}

/* email */
function validarEmail(email) {
}

function normalizarEmail(email) {
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