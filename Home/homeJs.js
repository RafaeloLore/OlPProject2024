//берем из стораге

function getFavoritesFromLocalStorage() {
  var favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
}
//сайв функцыя
function saveFavoritesToLocalStorage(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}
//дисплей для фаворит
function displayFavorites(favorites) {
  const tableBody = document.getElementById("favoritesTableBody");
  tableBody.innerHTML = "";

  favorites.forEach((flat) => {
    const row = document.createElement("tr");

    Object.keys(flat).forEach((key) => {
      if (key !== "id") {
        const cell = document.createElement("td");
        cell.textContent = flat[key];
        row.appendChild(cell);
      }
    });
//создати елемент с удалением из избраного
    const actionsCell = document.createElement("td");
    const removeFavoriteButton = document.createElement("button");
    removeFavoriteButton.textContent = "Remove from Favorites🚫";
    removeFavoriteButton.classList.add("btn-remove-favorites");
    removeFavoriteButton.onclick = function () {
      removeFromFavorites(flat.id);
    };
    actionsCell.appendChild(removeFavoriteButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}

function sortFavorites(favorites, criteria) {
  return favorites.sort((a, b) => {
    if (criteria === "hasAC") {
      return a.hasAC === b.hasAC ? 0 : a.hasAC ? -1 : 1;
    } else if (
      criteria === "areaSize" ||
      criteria === "yearBuilt" ||
      criteria === "rentPrice"
    ) {
      return a[criteria] - b[criteria];
    } else if (criteria === "city") {
      return a.city.localeCompare(b.city);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let favorites = getFavoritesFromLocalStorage();
  displayFavorites(favorites);

  document.getElementById("sortButton").addEventListener("click", function () {
    const sortCriteria = document.getElementById("sortCriteria").value;
    favorites = sortFavorites(favorites, sortCriteria);
    displayFavorites(favorites);
    saveFavoritesToLocalStorage(favorites);
  });
});

function removeFromFavorites(flatId) {
  let favorites = getFavoritesFromLocalStorage();
  favorites = favorites.filter((f) => f.id !== flatId);
  saveFavoritesToLocalStorage(favorites);
  toastr.success("Flat removed from favorites!");
  location.reload();
}
