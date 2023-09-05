/* ---------------------------------------------- */
/* FUNCIÓN 1: Escuchamos el submit y preparamos el envío */
/* ---------------------------------------------- */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };
    console.log(payload);
    settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(settings);
    realizarRegister(settings); 
    // Limpiamos el formulario
    form.reset()
});

/* ---------------------------------------------- */
/* FUNCIÓN 2: Realizar el signup [POST] */
/* ---------------------------------------------- */
function realizarRegister(settings) {
};