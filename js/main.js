let clientes = []; // Array para almacenar los clientes
let clienteIndex = null; // Índice del cliente seleccionado para el préstamo

document
  .getElementById("clienteForm")
  .addEventListener("submit", function (event) {
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
    // Limpiar el formulario
    document.getElementById("clienteForm").reset();
  });

function actualizarTabla() {
  const clientesList = document.getElementById("clientesList");
  clientesList.innerHTML = ""; // Limpiar la tabla

  clientes.forEach((cliente, index) => {
    const totalAPagar = cliente.interesMensual + cliente.montoPrestado; // Calcular total a pagar
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.dni}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.correo}</td>
                    <td>${cliente.interesMensual.toFixed(2)} $</td>
                    <td>${totalAPagar.toFixed(
                      2
                    )} $</td> <!-- Nueva columna para total a pagar -->
                    <td>
                        <button class="btn btn-info" data-toggle="modal" data-target="#prestamoModal" onclick="abrirModal(${index})" ${
      cliente.tienePrestamo ? "disabled" : ""
    }>
                            ${
                              cliente.tienePrestamo
                                ? "Préstamo Activo"
                                : "Registrar Préstamo"
                            }
                        </button>
                        <button class="btn btn-warning" onclick="marcarComoPagado(${index})" ${
      !cliente.tienePrestamo ? "disabled" : ""
    }>
                            Marcar como Pagado
                        </button>
                    </td>
                `;
    clientesList.appendChild(newRow);
  });
}

function abrirModal(index) {
    clienteIndex = index; // Guardar el índice del cliente seleccionado
    document.getElementById('montoPrestamo').value = ''; // Limpiar el campo de monto
    document.getElementById('fechaInicio').value = ''; // Limpiar el campo de fecha
}

document.getElementById('registrarPrestamo').addEventListener('click', function() {
    const montoPrestado = parseFloat(document.getElementById('montoPrestamo').value);
    const fechaInicio = document.getElementById('fechaInicio').value;

    if (!isNaN(montoPrestado) && fechaInicio) {
        // Verificar si el cliente ya tiene un préstamo activo
        if (clientes[clienteIndex].tienePrestamo) {
            alert('Este cliente ya tiene un préstamo activo. Debe pagarlo antes de solicitar otro.');
            return;
        }

        // Calcular el interés mensual (3%)
        const interesMensual = montoPrestado * 0.03;

        // Actualizar el cliente con el interés mensual y el estado del préstamo
        clientes[clienteIndex].interesMensual += interesMensual;
        clientes[clienteIndex].montoPrestado = montoPrestado; // Guardar el monto del préstamo
        clientes[clienteIndex].tienePrestamo = true; // Marcar como que tiene un préstamo activo

        // Actualizar la tabla
        actualizarTabla();

        // Cerrar el modal
        $('#prestamoModal').modal('hide');
    } else {
        alert('Por favor, ingrese un monto válido y una fecha.');
    }
});

function marcarComoPagado(index) {
    // Marcar el préstamo como pagado
    clientes[index].tienePrestamo = false; // Cambiar el estado del préstamo
    clientes[index].interesMensual = 0; // Reiniciar el interés mensual
    clientes[index].montoPrestado = 0; // Reiniciar el monto del préstamo

    // Mostrar un mensaje de alerta
    alert('El préstamo ha sido marcado como pagado. Ahora puede solicitar un nuevo préstamo.');

    // Actualizar la tabla
    actualizarTabla();
}