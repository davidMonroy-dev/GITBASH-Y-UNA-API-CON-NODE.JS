// Obtén los botones y los formularios
const directorBtn = document.getElementById("director-btn");
const estudianteBtn = document.getElementById("estudiante-btn");
const profesorBtn = document.getElementById("profesor-btn");
const rolInput = document.getElementById("rolInput");

directorBtn.addEventListener("click", function () {
    rolInput.value = directorBtn.getAttribute("data-value");
    directorBtn.classList.add("active");
    estudianteBtn.classList.remove("active");
    profesorBtn.classList.remove("active");
  });

estudianteBtn.addEventListener("click", function () {
  rolInput.value = estudianteBtn.getAttribute("data-value");
  estudianteBtn.classList.add("active");
  profesorBtn.classList.remove("active");
  directorBtn.classList.remove("active");
});

profesorBtn.addEventListener("click", function () {
  rolInput.value = profesorBtn.getAttribute("data-value");
  profesorBtn.classList.add("active");
  estudianteBtn.classList.remove("active");
  directorBtn.classList.remove("active");
});


