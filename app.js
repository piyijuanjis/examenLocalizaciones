var map = L.map('map').setView([36.7201600, -4.4203400], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


let datosJson = document.querySelector('template');
let contenido = document.querySelector("#contenido");
let id = 0;

fetch("https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json?classId=a44f2eea-e51b-4a7a-a11a-eefc73428d1a&assignmentId=b6d46e1e-b651-43e1-b861-1d6ba465dd82&submissionId=c773ff20-ba3d-cf9e-1095-93f6fedc73c5")
  .then(response => response.json())
  .then(data => {
    const listado = data.map(elemento => {
      const ubicacion = datosJson.content.cloneNode(true);
      ubicacion.querySelector("h3").innerText = elemento.properties.nombre;
      ubicacion.querySelector("p").innerText = elemento.properties.horario;
      ubicacion.querySelector("#direccion").innerText = elemento.properties.direccion;
      ubicacion.querySelector("#telefono").innerText = elemento.properties.telefono;
      ubicacion.querySelector("li").setAttribute("id", id);

      let x = elemento.properties.x;
      let y = elemento.properties.y;

      let marker = L.marker([x, y]).addTo(map);
      let label = '<b>' + elemento.properties.nombre + '</b><br/>' + elemento.properties.direccion + '</b><br/>' + elemento.properties.telefono;

      marker.bindPopup(label);

      const divListado = document.createElement("div");
      divListado.classList.add('ubicacion');
      divListado.appendChild(ubicacion);
      id++

      return divListado;
    });

    contenido.append(...listado);
  });



  


var modalDisplay = document.getElementById("modalDisplay");
var myModal = document.getElementById("myModal");

modalDisplay.addEventListener("click", function() {
  myModal.classList.add("show");
  myModal.style.display = "block";
});

myModal.addEventListener("click", function(event) {
  if (event.target == myModal || event.target.getAttribute("data-dismiss") == "modal") {
    myModal.classList.remove("show");
    myModal.style.display = "none";
  }
});

 


  






