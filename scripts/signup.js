window.addEventListener("load", function () {
  /* ---------------------- obtenemos variables globales ---------------------- */
  const form = document.forms[0];
  const name = document.querySelector("#inputNombre");
  const lastName = document.querySelector("#inputApellido");
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const repeatPassword = document.querySelector("#inputPasswordRepetida");
  const url = "https://todo-api.ctd.academy/v1"
  //console.log(form);

  /* -------------------------------------------------------------------------- */
  /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
  /* -------------------------------------------------------------------------- */
  form.addEventListener("submit", function (event) {
    
    event.preventDefault();
    
    const payload = {
      firstName: name.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      repeatPassword: repeatPassword.value
    }
    console.log(payload)

    const setting = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  
  

    realizarRegister(setting);

    form.reset;

  });

  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {

    console.log("Lanzar la consulta a la API...");

    fetch(`${url}/users`, settings)

      .then(response =>{
        return response.json();
      })

      .then(data=>{
        console.log("Promesa cumplida💍");
        console.log(data);

        if(data.jwt){
          localStorage.setItem("jwt", JSON.stringify(data.jwt))
        }
      })

      .catch(err=>{
        console.warn("Promesa rechazada")
        console.log(err);

        if(err.status == 400){

          console.warn("El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto");
          alert("El usuario ya se encuentra registrado / Alguno de los datos requeridos está incompleto");

        } else if (err.status == 500){

          console.warn("Error del servidor");
          alert("Error del servidor");

        }
      })

  }
});
