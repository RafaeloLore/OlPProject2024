function getCurrentUserFromLocalStorage() {
  var currentUser = localStorage.getItem("currentUser");
  return currentUser ? JSON.parse(currentUser) : null;
}

window.onload = function () {
  var currentUser = getCurrentUserFromLocalStorage();
  if (currentUser) {
    document.getElementById(
      "usernameDisplay"
    ).textContent = `⭐, ${currentUser.username}`;
  } else {
    document.getElementById("usernameDisplay").textContent = `Ghost`;
  }
};

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "/Login/login.html";
}
