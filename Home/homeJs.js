document.addEventListener("DOMContentLoaded", function () {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const tableBody = document.getElementById("favoritesTableBody");

  favorites.forEach((flat) => {
    const row = document.createElement("tr");

    Object.keys(flat).forEach((key) => {
      if (key !== "id") {
        const cell = document.createElement("td");
        cell.textContent = flat[key];
        row.appendChild(cell);
      }
    });

    const actionsCell = document.createElement("td");
    const removeFavoriteButton = document.createElement("button");
    removeFavoriteButton.textContent = "Remove from Favorites";
    removeFavoriteButton.classList.add("btn-remove-favorites"); // Добавляем класс
    removeFavoriteButton.onclick = function () {
      removeFromFavorites(flat.id);
    };
    actionsCell.appendChild(removeFavoriteButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
});

function removeFromFavorites(flatId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((f) => f.id !== flatId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  toastr.success("Flat removed from favorites!");
  location.reload();
 }