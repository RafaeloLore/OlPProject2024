function getFlatsFromLocalStorage() {
  var flats = localStorage.getItem("flats");
  return flats ? JSON.parse(flats) : [];
}

function saveFlatsToLocalStorage(flats) {
  localStorage.setItem("flats", JSON.stringify(flats));
}

function displayFlats(flats) {
  const tableBody = document.getElementById("flatsTableBody");
  tableBody.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  flats.forEach((flat) => {
    const row = document.createElement("tr");

    Object.keys(flat).forEach((key) => {
      if (key !== "id") {
        const cell = document.createElement("td");
        cell.textContent = flat[key];
        row.appendChild(cell);
      }
    });
    //создание ногого тд
    const actionsCell = document.createElement("td");
    const isFavorite = favorites.some((f) => f.id === flat.id);

    if (!isFavorite) {
      const favoriteButton = document.createElement("button");
      favoriteButton.textContent = "Add to Favorites✔️";
      favoriteButton.classList.add("btn-add-favorites");
      favoriteButton.onclick = function () {
        addToFavorites(flat.id);
      };
      actionsCell.appendChild(favoriteButton);
    } else {
      const removeFavoriteButton = document.createElement("button");
      removeFavoriteButton.textContent = "Remove from Favorites🚫";
      removeFavoriteButton.classList.add("btn-remove-favorites");
      removeFavoriteButton.onclick = function () {
        removeFromFavorites(flat.id);
      };
      actionsCell.appendChild(removeFavoriteButton);
    }
    //удаление
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete❌";
    deleteButton.classList.add("btn-delete");
    deleteButton.onclick = function () {
      deleteFlat(flat.id);
    };
    actionsCell.appendChild(deleteButton);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  });
}
//сортировка
function sortFlats(flats, criteria) {
  return flats.sort((a, b) => {
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
//Событие DOMContentLoaded возникает, когда HTML-документ полностью проанализирован, а все отложенные сценарии
document.addEventListener("DOMContentLoaded", function () {
  let flats = getFlatsFromLocalStorage();
  displayFlats(flats);

  document.getElementById("sortButton").addEventListener("click", function () {
    const sortCriteria = document.getElementById("sortCriteria").value;
    flats = sortFlats(flats, sortCriteria);
    displayFlats(flats);
    saveFlatsToLocalStorage(flats);
  });
});
//флат ид
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
//удалить фаврит
function removeFromFavorites(flatId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((f) => f.id !== flatId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  toastr.success("Flat removed from favorites!");
  location.reload();
}
//удалить
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
