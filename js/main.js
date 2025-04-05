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
        actualizarTabla();


        //Pruebas de obtencion de datos en consola
        /*
        console.log(nombre);
        console.log(dni);
        console.log(telefono);
        console.log(correo);
        */
        function actualizarTabla() {
            const clientesList = document.getElementById('clientesList');
            clientesList.innerHTML = ''; // Limpiar la tabla
        
            clientes.forEach((cliente, index) => {
                const totalAPagar = cliente.interesMensual + cliente.montoPrestado; // Calcular total a pagar
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.dni}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.interesMensual.toFixed(2)} $</td>
                    <td>${totalAPagar.toFixed(2)} $</td> <!-- Nueva columna para total a pagar -->
                    <td>
                        <button class="btn btn-info" data-toggle="modal" data-target="#prestamoModal" onclick="abrirModal(${index})" ${cliente.tienePrestamo ? 'disabled' : ''}>
                            ${cliente.tienePrestamo ? 'Préstamo Activo' : 'Registrar Préstamo'}
                        </button>
                        <button class="btn btn-warning" onclick="marcarComoPagado(${index})" ${!cliente.tienePrestamo ? 'disabled' : ''}>
                            Marcar como Pagado
                        </button>
                    </td>
                `;
                clientesList.appendChild(newRow);
            });
        }
        
        // Limpiar el formulario
        document.getElementById("clienteForm").reset();
    });
