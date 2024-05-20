document
  .getElementById("flatForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const flat = {
      name: document.getElementById("name").value,
      city: document.getElementById("city").value,
      streetName: document.getElementById("streetName").value,
      streetNumber: document.getElementById("streetNumber").value,
      areaSize: document.getElementById("areaSize").value,
      hasAC: document.getElementById("hasAC").checked,
      yearBuilt: document.getElementById("yearBuilt").value,
      rentPrice: document.getElementById("rentPrice").value,
      dateAvailable: document.getElementById("dateAvailable").value,
      id: Date.now(),
    };

    let flats = JSON.parse(localStorage.getItem("flats")) || [];
    flats.push(flat);
    localStorage.setItem("flats", JSON.stringify(flats));

    alert("Flat added successfully!");
    document.getElementById("flatForm").reset();
  });
