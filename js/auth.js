// auth.js

document.addEventListener("DOMContentLoaded", function () {
  // Manejar el registro
  const registerButton = document.getElementById("registerButton");
  if (registerButton) {
    registerButton.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el envío del formulario
      const name = document.getElementById("exampleInputName").value;
      const lastName = document.getElementById("exampleInputLastName").value;
      const dob = document.getElementById("exampleInputDOB").value;
      const address = document.getElementById("exampleInputAddress").value;
      const email = document.getElementById("exampleInputEmail1").value;
      const password = document.getElementById("exampleInputPassword1").value;

      // Obtener la lista de usuarios existente del localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Verificar si el correo ya está en uso
      const emailExists = users.some((user) => user.email === email);
      if (emailExists) {
        alert("El correo ya está en uso. Por favor, utiliza otro.");
        return; // Salir de la función si el correo ya está en uso
      }

      // Verificar la longitud de la contraseña
      if (password.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres.");
        return; // Salir de la función si la contraseña es demasiado corta
      }

      // Crear un nuevo usuario
      const newUser = { name, lastName, dob, address, email, password };

      // Agregar el nuevo usuario a la lista
      users.push(newUser);

      // Guardar la lista actualizada de usuarios en localStorage
      localStorage.setItem("users", JSON.stringify(users));

      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "Iniciar sesion.html"; // Redirigir a la página de inicio de sesión
    });
  }

  // Manejar el inicio de sesión
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el envío del formulario
      const email = document.getElementById("exampleInputEmail1").value;
      const password = document.getElementById("exampleInputPassword1").value;

      // Obtener la lista de usuarios del localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Buscar el usuario por correo electrónico
      const user = users.find((user) => user.email === email);
      if (user) {
        // Verificar si el usuario existe y si la contraseña es correcta
        if (user.password === password) {
          alert("Inicio de sesión exitoso.");

          // Guardar el usuario autenticado en localStorage
          localStorage.setItem("currentUser", JSON.stringify(user));

          // Redirigir a la página principal
          window.location.href = "index.html";
        } else {
          alert("Contraseña incorrecta.");
        }
      } else {
        alert("Correo no registrado.");
      }
    });
  }

  // Manejar el cierre de sesión
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      console.log(localStorage);
      localStorage.removeItem("currentUser");
      alert("Has cerrado sesión.");
      window.location.href = "index.html"; // Redirigir a la página principal
    });
  }

  const loginLink = document.getElementById("loginLink");
  if (loginLink) {
    loginLink.addEventListener("click", function () {
      window.location.href = "Iniciar sesion.html"; // Redirigir a la página principal
    });
  }
});

