function getCurrentUserFromLocalStorage() {
  var currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}

function saveCurrentUserToLocalStorage(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

document
  .getElementById("updateForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var familiname = document.getElementById("familiname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (
      !username ||
      !familiname ||
      !email ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      Toastify({
        text: "Пожалуйста, заполните все поля и проверьте пароли",
        duration: 3000,
        close: true,
        backgroundColor: "red",
      }).showToast();
      return;
    }

    var currentUser = getCurrentUserFromLocalStorage();

    currentUser.username = username;
    currentUser.familiname = familiname;
    currentUser.email = email;
    currentUser.password = password;

    saveCurrentUserToLocalStorage(currentUser);

    Toastify({
      text: "Данные обновлены успешно!",
      duration: 3000,
      close: true,
      backgroundColor: "green",
    }).showToast();
  });

window.onload = function () {
  var currentUser = getCurrentUserFromLocalStorage();
  if (currentUser) {
    document.getElementById("username").value = currentUser.username;
    document.getElementById("familiname").value = currentUser.familiname;
    document.getElementById("email").value = currentUser.email;
    document.getElementById(
      "usernameDisplay"
    ).textContent = `Hallo!, ${currentUser.username}`;
  }
};

