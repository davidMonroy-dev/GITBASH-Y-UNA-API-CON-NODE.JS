// Mostrar/ocultar el formulario
function mostrarFormulario() {
    const formSection = document.getElementById('form-section');
    formSection.classList.toggle('hidden');
}

// Manejar el envío del formulario
document.getElementById('form-agregar-asignatura').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const profesor = document.getElementById('profesor').value;

    // Crear una nueva fila para la tabla
    const tabla = document.getElementById('subject-table').getElementsByTagName('tbody')[0];
    const nuevaFila = tabla.insertRow();

    // Insertar las celdas
    const celdaID = nuevaFila.insertCell(0);
    const celdaNombre = nuevaFila.insertCell(1);
    const celdaProfesor = nuevaFila.insertCell(2);
    const celdaAcciones = nuevaFila.insertCell(3);

    // Generar un ID (se puede cambiar a un ID dinámico en una implementación real)
    const id = tabla.rows.length;

    // Rellenar las celdas
    celdaID.textContent = id;
    celdaNombre.textContent = nombre;
    celdaProfesor.textContent = profesor;
    celdaAcciones.innerHTML = `
        <button class="btn-edit">Editar</button>
        <button class="btn-delete">Eliminar</button>
    `;

    // Limpiar el formulario y ocultarlo
    document.getElementById('form-agregar-asignatura').reset();
    mostrarFormulario();
});


/* gestion de cursos */
let courseId = 1;

function showForm() {
    document.getElementById("courseForm").style.display = "block";
}

function addCourse() {
    const courseName = document.getElementById("courseName").value;
    const professor = document.getElementById("professor").value;
    const students = document.getElementById("students").value;

    if (courseName && professor && students) {
        const table = document.getElementById("courseList");
        const row = table.insertRow();

        row.innerHTML = `
            <td>${courseId++}</td>
            <td>${courseName}</td>
            <td>${professor}</td>
            <td>${students}</td>
            <td>
                <button class="btn-edit" onclick="editCourse(this)">Editar</button>
                <button class="btn-delete" onclick="deleteCourse(this)">Eliminar</button>
            </td>
        `;

        // Limpiar formulario
        document.getElementById("courseName").value = "";
        document.getElementById("professor").value = "";
        document.getElementById("students").value = "";
        document.getElementById("courseForm").style.display = "none";
    } else {
        alert("Por favor, complete todos los campos");
    }
}

function editCourse(button) {
    const row = button.parentElement.parentElement;
    const cells = row.getElementsByTagName("td");

    document.getElementById("courseName").value = cells[1].innerText;
    document.getElementById("professor").value = cells[2].innerText;
    document.getElementById("students").value = cells[3].innerText;

    // Eliminar fila actual
    row.remove();
}

function deleteCourse(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}


/*gestion de estudiantes*/
document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentForm = document.getElementById('studentForm');
    const studentFormElement = document.getElementById('studentFormElement');
    const cancelBtn = document.getElementById('cancelBtn');
    const studentTableBody = document.getElementById('studentTableBody');
    
    let editingStudentId = null;

    // Función para mostrar u ocultar el formulario
    function toggleForm() {
        if (studentForm.style.display === 'block') {
            studentForm.style.display = 'none';
        } else {
            studentForm.style.display = 'block';
            studentFormElement.reset();
            document.getElementById('formTitle').textContent = 'Agregar Nuevo Estudiante';
            editingStudentId = null;
        }
    }

    // Mostrar/ocultar el formulario al hacer clic en el botón "Agregar Estudiante"
    addStudentBtn.addEventListener('click', toggleForm);

    // Ocultar el formulario al hacer clic en "Cancelar"
    cancelBtn.addEventListener('click', toggleForm);

    studentFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const course = document.getElementById('course').value;

        if (editingStudentId) {
            // Actualizar estudiante existente
            const row = document.querySelector(`tr[data-id='${editingStudentId}']`);
            row.querySelector('.name').textContent = name;
            row.querySelector('.email').textContent = email;
            row.querySelector('.course').textContent = course;
        } else {
            // Agregar nuevo estudiante
            const id = Date.now(); // Simple unique ID based on timestamp
            const row = document.createElement('tr');
            row.dataset.id = id;
            row.innerHTML = `
                <td>${id}</td>
                <td class="name">${name}</td>
                <td class="email">${email}</td>
                <td class="course">${course}</td>
                <td>
                    <button class="editBtn">Editar</button>
                    <button class="deleteBtn">Eliminar</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        }

        toggleForm();
    });

    studentTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            const row = e.target.closest('tr');
            editingStudentId = row.dataset.id;
            document.getElementById('name').value = row.querySelector('.name').textContent;
            document.getElementById('email').value = row.querySelector('.email').textContent;
            document.getElementById('course').value = row.querySelector('.course').textContent;
            document.getElementById('formTitle').textContent = 'Editar Estudiante';
            studentForm.style.display = 'block';
        }

        if (e.target.classList.contains('deleteBtn')) {
            const row = e.target.closest('tr');
            studentTableBody.removeChild(row);
        }
    });
});

/*gestion de actividades*/
document.addEventListener('DOMContentLoaded', () => {
    const addActivityBtn = document.getElementById('add-activity-btn');
    const activityFormSection = document.getElementById('activity-form-section');
    const activityForm = document.getElementById('activity-form');
    const activityTableBody = document.getElementById('activity-table-body');
    const cancelBtn = document.getElementById('cancel-btn');
    
    let editingActivityId = null;

    // Función para mostrar u ocultar el formulario
    function toggleForm() {
        if (activityFormSection.style.display === 'block') {
            activityFormSection.style.display = 'none';
        } else {
            activityFormSection.style.display = 'block';
            activityForm.reset();
            document.getElementById('form-title').textContent = 'Agregar Nueva Actividad';
            editingActivityId = null;
        }
    }

    // Mostrar el formulario al hacer clic en "Agregar Actividad"
    addActivityBtn.addEventListener('click', toggleForm);

    // Ocultar el formulario al hacer clic en "Cancelar"
    cancelBtn.addEventListener('click', toggleForm);

    // Manejar el envío del formulario
    activityForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const activityName = document.getElementById('activity-name').value;
        const activityDate = document.getElementById('activity-date').value;
        const activitySubject = document.getElementById('activity-subject').value;

        if (editingActivityId) {
            // Actualizar actividad existente
            const row = document.querySelector(`tr[data-id='${editingActivityId}']`);
            row.querySelector('.name').textContent = activityName;
            row.querySelector('.date').textContent = activityDate;
            row.querySelector('.subject').textContent = activitySubject;
        } else {
            // Agregar nueva actividad
            const id = Date.now(); // Generar un ID único basado en el timestamp
            const row = document.createElement('tr');
            row.dataset.id = id;
            row.innerHTML = `
                <td>${id}</td>
                <td class="name">${activityName}</td>
                <td class="date">${activityDate}</td>
                <td class="subject">${activitySubject}</td>
                <td>
                    <button class="btn-edit">Editar</button>
                    <button class="btn-delete">Eliminar</button>
                </td>
            `;
            activityTableBody.appendChild(row);
        }

        toggleForm(); // Cerrar el formulario después de guardar
    });

    // Editar o eliminar actividad desde la tabla
    activityTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            const row = e.target.closest('tr');
            editingActivityId = row.dataset.id;
            document.getElementById('activity-name').value = row.querySelector('.name').textContent;
            document.getElementById('activity-date').value = row.querySelector('.date').textContent;
            document.getElementById('activity-subject').value = row.querySelector('.subject').textContent;
            document.getElementById('form-title').textContent = 'Editar Actividad';
            activityFormSection.style.display = 'block';
        }

        if (e.target.classList.contains('btn-delete')) {
            const row = e.target.closest('tr');
            activityTableBody.removeChild(row);
        }
    });
});

/*gestion de eventos estudiantiles */
document.addEventListener('DOMContentLoaded', function() {
    const addEventBtn = document.getElementById('addEventBtn');
    const eventForm = document.getElementById('eventForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const eventFormElement = document.getElementById('eventFormElement');
    const eventTableBody = document.getElementById('eventTableBody');

    addEventBtn.addEventListener('click', () => {
        eventForm.classList.remove('hidden');
    });

    cancelBtn.addEventListener('click', () => {
        eventForm.classList.add('hidden');
    });

    eventFormElement.addEventListener('submit', function(e) {
        e.preventDefault();
        const eventName = document.getElementById('eventName').value;
        const eventDate = document.getElementById('eventDate').value;
        const eventLocation = document.getElementById('eventLocation').value;
        const eventDescription = document.getElementById('eventDescription').value;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${eventName}</td>
            <td>${eventDate}</td>
            <td>${eventLocation}</td>
            <td>${eventDescription}</td>
            <td>
                <button class="editBtn">Editar</button>
                <button class="deleteBtn">Eliminar</button>
            </td>
        `;
        eventTableBody.appendChild(row);
        eventFormElement.reset();
        eventForm.classList.add('hidden');
    });

    eventTableBody.addEventListener('click', function(e) {
        if (e.target.classList.contains('deleteBtn')) {
            const row = e.target.closest('tr');
            row.remove();
        }
    });
});

/*gestion de boletines*/
document.addEventListener('DOMContentLoaded', function() {
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const formSection = document.getElementById('formSection');
    const form = document.getElementById('boletinForm');
    const tableBody = document.querySelector('table tbody');

    // Función para alternar la visibilidad del formulario
    function toggleForm() {
        if (formSection.classList.contains('active')) {
            formSection.classList.remove('active');
        } else {
            formSection.classList.add('active');
        }
    }

    // Alternar formulario al hacer clic en el botón "Agregar Boletín"
    toggleFormBtn.addEventListener('click', toggleForm);

    // Agregar boletín cuando se envía el formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const date = document.getElementById('date').value;
        const content = document.getElementById('content').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>3</td> <!-- ID estático para el ejemplo -->
            <td>${title}</td>
            <td>${date}</td>
            <td>${content}</td>
            <td>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </td>
        `;

        tableBody.appendChild(newRow);

        form.reset();
        formSection.classList.remove('active'); // Ocultar el formulario después de agregar boletín
    });

    // Eliminar boletín
    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const row = event.target.closest('tr');
            row.remove();
        }
    });
});


/*getion de planes de estudio*/
document.getElementById('planForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombrePlan = document.getElementById('nombrePlan').value;
    const descripcion = document.getElementById('descripcion').value;
    const duracion = document.getElementById('duracion').value;
    const numeroAsignaturas = document.getElementById('numeroAsignaturas').value;

    const tableBody = document.getElementById('planesTable').getElementsByTagName('tbody')[0];
    const newRow = tableBody.insertRow();

    newRow.insertCell(0).textContent = nombrePlan;
    newRow.insertCell(1).textContent = descripcion;
    newRow.insertCell(2).textContent = duracion;
    newRow.insertCell(3).textContent = numeroAsignaturas;

    // Limpiar el formulario
    document.getElementById('planForm').reset();
});