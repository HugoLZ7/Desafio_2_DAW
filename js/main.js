    
    document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Obtener los valores de los campos
    const nombre = document.getElementById('nombre').value;
    const dni = document.getElementById('dni').value;
    const telefono = document.getElementById('telefono').value;
    const correo = document.getElementById('correo').value;

    //Pruebas de obtencion de datos en consola
    /*
    console.log(nombre);
    console.log(dni);
    console.log(telefono);
    console.log(correo);
    */

    // Limpiar el formulario
    document.getElementById('clienteForm').reset();
});