
//берем пользователя
function getCurrentUserFromLocalStorage() {
  var currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}
//если нет пользователя а также добовлякм знак если есть
window.onload = function () {
  var currentUser = getCurrentUserFromLocalStorage();
  if (currentUser) {
    document.getElementById(
      "usernameDisplay"
    ).textContent = `⭐ ${currentUser.username}`;
  } else {
    document.getElementById("usernameDisplay").textContent = `🔘Ghost`;
  }
  document.getElementById("username").value = currentUser.username;
  document.getElementById("familiname").value = currentUser.familiname;
  document.getElementById("email").value = currentUser.email;
  
};
// логаут
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/Login/login.html";
}
//берем пользователя
function getCurrentUserFromLocalStorage() {
  var currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}
//сайвим
function saveCurrentUserToLocalStorage(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}
//примерный как усер
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
      !surname ||
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
    currentUser.surname = surname;
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
