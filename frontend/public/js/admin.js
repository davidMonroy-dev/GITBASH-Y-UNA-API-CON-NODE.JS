document.getElementById('institucion-id').addEventListener('change', function () {
    // Obtiene la opción seleccionada
    const selectedOption = this.options[this.selectedIndex];

    // Extrae los valores de los atributos data-*
    const nombreInstitucion = selectedOption.getAttribute('data-nombre');
    const tipoInstitucion = selectedOption.getAttribute('data-tipo');
    const descripcionInstitucion = selectedOption.getAttribute('data-descripcion');
    const direccionInstitucion = selectedOption.getAttribute('data-direccion');
    const ciudadInstitucion = selectedOption.getAttribute('data-ciudad');
    const paisInstitucion = selectedOption.getAttribute('data-pais');

    // Actualiza los campos de texto
    document.getElementById('nombre').value = nombreInstitucion;
    document.getElementById('tipo_de_institucion').value = tipoInstitucion;
    document.getElementById('descripcion').value = descripcionInstitucion;
    document.getElementById('direccion').value = direccionInstitucion;
    document.getElementById('ciudad').value = ciudadInstitucion;
    document.getElementById('pais').value = paisInstitucion;
});