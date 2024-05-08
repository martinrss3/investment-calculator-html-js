function incrementarMonto() {
  const input = document.getElementById("x");
  let valorActual = parseInt(input.value.replace(/\D/g, ""));

  const maxValor = 10000000;
  const incremento = 1000;

  valorActual = Math.min(valorActual + incremento, maxValor);

  input.value = valorActual;
  calcular();
}

function decrementarMonto() {
  const input = document.getElementById("x");
  let valorActual = parseInt(input.value.replace(/\D/g, ""));

  const decremento = 1000;

  valorActual = Math.max(valorActual - decremento, 0);

  input.value = valorActual;
  calcular();
}

function incrementarRepeticiones() {
  const input = document.getElementById("repeticiones");
  let valorActual = parseInt(input.value.replace(/\D/g, ""));

  const maximoValor = 12;

  if (valorActual < maximoValor) {
    input.value = valorActual + 1;
  }

  calcular();
}

function decrementarRepeticiones() {
  const input = document.getElementById("repeticiones");
  let valorActual = parseInt(input.value.replace(/\D/g, ""));

  const minimoValor = 1;

  if (valorActual > minimoValor) {
    input.value = valorActual - 1;
  }

  calcular();
}

function actualizarValores(radioButton) {
  const valoresPorDefecto = {
    opcion1: { y: "11.1", z: "30" },
    opcion2: { y: "11.5", z: "28" },
    opcion3: { y: "12", z: "91" },
    opcion4: { y: "12.50", z: "182" },
    opcion5: { y: "13", z: "364" },
    opcion6: { y: "13.50", z: "364" },
  };

  const yElement = document.getElementById("y");
  const zElement = document.getElementById("z");

  const defaultValue = { y: "11.1", z: "30" };
  const selectedValue = valoresPorDefecto[radioButton.value] || defaultValue;

  yElement.textContent = selectedValue.y;
  zElement.textContent = selectedValue.z;

  calcular(radioButton.value); // Calcular automáticamente al cambiar la opción seleccionada
}

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos
  const repeticionesInput = document.getElementById("repeticiones");
  const monthsInput = document.getElementById("months");
  const progress = document.querySelector(".progress");

  // Asignar valores predeterminados
  repeticionesInput.value = 2;
  monthsInput.value = 2;

  // Actualizar barra de progreso
  const updateProgress = () => {
    const value = Math.floor((monthsInput.value / 12) * 100) - 4;
    progress.style.background = `linear-gradient(to right, #000 0%, #000 ${value}%, #DEDEDE ${value}%, #DEDEDE 100%)`;
  };

  // Llamar a la función de actualización de progreso
  updateProgress();
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos
  const radioButtons = document.getElementsByName("opcionGroup");

  // Encontrar el botón de opción seleccionado
  const radioButtonValue = [...radioButtons].find(
    (radioButton) => radioButton.checked
  )?.value;

  // Actualizar valores
  actualizarValores(
    document.querySelector('input[name="opcionGroup"]:checked')
  );
});

document.addEventListener("DOMContentLoaded", function () {
  // Obtener elementos
  const repeticionesInput = document.getElementById("repeticiones");

  // Asignar valor predeterminado
  repeticionesInput.value = 2;

  // Validar el valor inicial
  validar(repeticionesInput.value, null);
});

const value = document.querySelector("#repeticiones");
const input = document.querySelector("#months");
value.value = input.value;
input.addEventListener("input", (event) => {
  value.value = event.target.value;
});
value.addEventListener("input", (event) => {
  if (event.target.value > 12) {
    event.target.value = 1;
  }

  input.value = event.target.value;
  calcular();
});

function obtenerRadioButtonSeleccionado() {
  const radioButtons = document.getElementsByName("opcionGroup");
  return [...radioButtons].find((radioButton) => radioButton.checked)?.value;
}

function obtenerElementosDOM() {
  const title = document.getElementById("title");
  const termToInvest = document.getElementById("termToInvest");
  const termDisclaimer = document.getElementById("termDisclaimer");
  const listaResultados = document.getElementById("listaResultados");
  return { title, termToInvest, termDisclaimer, listaResultados };
}