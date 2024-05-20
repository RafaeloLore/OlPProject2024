document.addEventListener("DOMContentLoaded", function () {
  const flats = JSON.parse(localStorage.getItem("flats")) || [];
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const tableBody = document.getElementById("flatsTableBody");

  flats.forEach((flat) => {
    const row = document.createElement("tr");

    Object.keys(flat).forEach((key) => {
      if (key !== "id") {
        const cell = document.createElement("td");
        cell.textContent = flat[key];
        row.appendChild(cell);
      }
    });

    const actionsCell = document.createElement("td");
    const isFavorite = favorites.some((f) => f.id === flat.id);

    if (!isFavorite) {
      const favoriteButton = document.createElement("button");
      favoriteButton.textContent = "Add to Favorites✔️";
      favoriteButton.classList.add("btn-add-favorites"); // Добавляем класс
      favoriteButton.onclick = function () {
        addToFavorites(flat.id);
      };
      actionsCell.appendChild(favoriteButton);
    } else {
      const removeFavoriteButton = document.createElement("button");
      removeFavoriteButton.textContent = "Remove from Favorites🚫";
      removeFavoriteButton.classList.add("btn-remove-favorites"); // Добавляем класс
      removeFavoriteButton.onclick = function () {
        removeFromFavorites(flat.id);
      };
      actionsCell.appendChild(removeFavoriteButton);
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete❌";
    deleteButton.classList.add("btn-delete"); // Добавляем класс
    deleteButton.onclick = function () {
      deleteFlat(flat.id);
    };
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
});

function addToFavorites(flatId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  let flats = JSON.parse(localStorage.getItem("flats")) || [];
  const flat = flats.find((f) => f.id === flatId);

  if (!favorites.some((f) => f.id === flatId)) {
    favorites.push(flat);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    toastr.success("Flat added to favorites!");
    location.reload();
  } else {
    toastr.error("Flat is already in favorites!");
  }
}

function removeFromFavorites(flatId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((f) => f.id !== flatId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  toastr.success("Flat removed from favorites!");
  location.reload();
}

function deleteFlat(flatId) {
  let flats = JSON.parse(localStorage.getItem("flats")) || [];
  flats = flats.filter((f) => f.id !== flatId);
  localStorage.setItem("flats", JSON.stringify(flats));

  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((f) => f.id !== flatId);
  localStorage.setItem("favorites", JSON.stringify(favorites));

  toastr.success("Flat deleted!");
  location.reload();
}
