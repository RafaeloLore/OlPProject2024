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
        text: "Вход успешен!",
        duration: 3000,
        close: true,
        backgroundColor: "green",
      }).showToast();
      window.location.href = "/Home/homepage.html"; // Перенаправление на домашнюю страницу
    } else {
      Toastify({
        text: "Неверное имя пользователя или пароль",
        duration: 3000,
        close: true,
        backgroundColor: "red",
      }).showToast();
    }
  });
