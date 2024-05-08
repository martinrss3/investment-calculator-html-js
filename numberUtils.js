function validar(value, event) {
  const maximoValor = 12;
  const longitudMaxima = 2;

  if (parseInt(value) > maximoValor || value.length > longitudMaxima) {
    event.preventDefault();
    const repeticiones = document.getElementById("repeticiones");
    repeticiones.value = 1;
    return;
  }

  return calcular();
}

function formatNumber(number) {
  // Convert the number to a string with 2 decimal places
  var numberString = number.toFixed(2);

  // Replace the dot with a comma for decimals
  numberString = numberString.replace(".", ",");

  // Split into integer and decimal parts
  var parts = numberString.split(",");
  var integerPart = parts[0];
  var decimalPart = parts[1];

  // Replace comma with dot for thousands
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Concatenate integer and decimal parts with the new format
  return integerPart + "." + decimalPart;
}

function validarNumero(input) {
  input.value = input.value.replace(/\D/g, ""); // Remueve todos los caracteres que no sean dígitos

  // Verificar si el valor es mayor a 10,000,000
  if (parseInt(input.value) > 10000000) {
    // Si es mayor, establecer el valor máximo permitido
    input.value = "10000000";
  }

  // Si el valor del input está vacío, mostrar "0"
  if (input.value === "") {
    input.value = "0";
  }
}

function obtenerValorNumerico() {
  const inputElement = document.getElementById("x");
  const number = parseInt(inputElement.value.replace(/\D/g, ""));
  if (!isNaN(number)) {
    const formattedNumber = number.toLocaleString("es-US");
    inputElement.value = formattedNumber;
    return number;
  }
  return 0;
}

function obtenerValoresYZ() {
  const y = parseFloat(document.getElementById("y").textContent);
  const z = parseFloat(document.getElementById("z").textContent);
  return { y, z };
}
