        let clientes = []; // Array para almacenar los clientes
        document.getElementById("clienteForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Obtener los valores de los campos
        const nombre = document.getElementById("nombre").value;
        const dni = document.getElementById("dni").value;
        const telefono = document.getElementById("telefono").value;
        const correo = document.getElementById("correo").value;
               
        // Crear un nuevo cliente
        const nuevoCliente = {
            nombre,
            dni,
            telefono,
            correo,
            interesMensual: 0, // Inicialmente, el interés es 0
            tienePrestamo: false, // Inicialmente, no tiene préstamo
            montoPrestado: 0, // Inicialmente, el monto del préstamo es 0
        };
        // Agregar el cliente al array
        clientes.push(nuevoCliente);

        //Pruebas de obtencion de datos en consola
        /*
        console.log(nombre);
        console.log(dni);
        console.log(telefono);
        console.log(correo);
        */
       
        // Limpiar el formulario
        document.getElementById("clienteForm").reset();
    });
