// Функция для получения данных о пользователях из Local Storage
function getUsersFromLocalStorage() {
  var users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    var loginUsername = document.getElementById("loginUsername").value;
    var loginPassword = document.getElementById("loginPassword").value;

    // Получаем текущий список пользователей
    var users = getUsersFromLocalStorage();

    // Проверяем, существует ли пользователь с таким именем и паролем
    var user = users.find(
      (user) =>
        user.username === loginUsername && user.password === loginPassword
    );

    if (user) {
      Toastify({
        text: "Login!",
        duration: 3000,
        close: true,
        backgroundColor: "green",
      }).showToast();
      window.location.href = "/Home/homepage.html"; // Перенаправление на домашнюю страницу//
    } else {
      Toastify({
        text: "Numele sau parola incorect",
        duration: 3000,
        close: true,
        backgroundColor: "red",
      }).showToast();
    }
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "/Home/homepage.html";
    } else {
      Toastify({
        text: "Неправильный email или пароль",
        duration: 3000,
        close: true,
        backgroundColor: "red",
      }).showToast();
    }
  });
