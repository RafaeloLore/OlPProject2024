<script>
      function getCurrentUserFromLocalStorage() {
        var currentUser = localStorage.getItem("currentUser");
        return currentUser ? JSON.parse(currentUser) : null;
      }

      // Функция для сохранения обновленных данных пользователя в Local Storage
      function saveCurrentUserToLocalStorage(user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }

      document
        .getElementById("updateForm")
        .addEventListener("submit", function (event) {
          event.preventDefault(); // Предотвращаем отправку формы

          var username = document.getElementById("username").value;
          var surname = document.getElementById("surname").value;
          var email = document.getElementById("email").value;
          var password = document.getElementById("password").value;
          var confirmPassword =
            document.getElementById("confirmPassword").value;

          // Проверка на пустые поля и совпадение паролей
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

          // Получаем текущего пользователя
          var currentUser = getCurrentUserFromLocalStorage();

          // Обновляем данные текущего пользователя
          currentUser.username = username;
          currentUser.surname = surname;
          currentUser.email = email;
          currentUser.password = password;

          // Сохраняем обновленные данные текущего пользователя в Local Storage
          saveCurrentUserToLocalStorage(currentUser);

          Toastify({
            text: "Данные обновлены успешно!",
            duration: 3000,
            close: true,
            backgroundColor: "green",
          }).showToast();
        });

      // Заполним форму текущими данными пользователя при загрузке страницы
      window.onload = function () {
        var currentUser = getCurrentUserFromLocalStorage();
        if (currentUser) {
          document.getElementById("username").value = currentUser.username;
          document.getElementById("surname").value = currentUser.surname;
          document.getElementById("email").value = currentUser.email;
          // Пароль не должен быть заполнен, чтобы пользователь самостоятельно ввел новый пароль
        }
      };
      // Функция для получения текущего пользователя из Local Storage
      function getCurrentUserFromLocalStorage() {
        var currentUser = localStorage.getItem("currentUser");
        return currentUser ? JSON.parse(currentUser) : null;
      }

      // Заполним данные текущего пользователя при загрузке страницы
      window.onload = function () {
        var currentUser = getCurrentUserFromLocalStorage();
        if (currentUser) {
          document.getElementById("username").textContent =
            currentUser.username;
          document.getElementById("surname").textContent = currentUser.surname;
          document.getElementById("email").textContent = currentUser.email;
        }
      };
      // Функция для получения текущего пользователя из Local Storage
      function getCurrentUserFromLocalStorage() {
        var currentUser = localStorage.getItem("currentUser");
        return currentUser ? JSON.parse(currentUser) : null;
      }

      // Заполним данные текущего пользователя при загрузке страницы
      window.onload = function () {
        var currentUser = getCurrentUserFromLocalStorage();
        if (currentUser) {
          document.getElementById("username").textContent =
            currentUser.username;
          document.getElementById("surname").textContent = currentUser.surname;
          document.getElementById("email").textContent = currentUser.email;
        }
      };
    </script>