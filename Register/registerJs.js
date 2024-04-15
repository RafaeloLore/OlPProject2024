// Функция для получения данных о пользователях из Local Storage
function getUsersFromLocalStorage() {
  var users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

// Функция для сохранения данных о пользователях в Local Storage
function saveUsersToLocalStorage(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Предотвращаем отправку формы

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    // Проверка на пустые поля и совпадение паролей
    if (
      !username ||
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

    // Получаем текущий список пользователей
    var users = getUsersFromLocalStorage();

    // Проверяем, есть ли уже пользователь с таким именем
    if (users.some((user) => user.username === username)) {
      Toastify({
        text: "Пользователь с таким именем уже существует",
        duration: 3000,
        close: true,
        backgroundColor: "red",
      }).showToast();
      return;
    }

    // Добавляем нового пользователя в список
    users.push({ username: username, email: email, password: password });

    // Сохраняем обновленный список пользователей в Local Storage
    saveUsersToLocalStorage(users);

    Toastify({
      text: "Регистрация успешна!",
      duration: 3000,
      close: true,
      backgroundColor: "green",
    }).showToast();
  });
