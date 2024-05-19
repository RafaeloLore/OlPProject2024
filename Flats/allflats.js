document.addEventListener("DOMContentLoaded", function () {
  const flats = JSON.parse(localStorage.getItem("flats")) || [];
  const tableBody = document.getElementById("flatsTableBody");

  flats.forEach((flat) => {
    const row = document.createElement("tr");

    Object.keys(flat).forEach((key) => {
      const cell = document.createElement("td");
      cell.textContent = flat[key];
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });
});
