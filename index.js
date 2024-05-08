// Constantes necesarias para el cálculo
const repeticiones = parseInt(document.getElementById("repeticiones").value);
const tasaInteres = parseFloat(document.getElementById("y").textContent) / 100;
const plazo = parseInt(document.getElementById("z").textContent);
const montoInversion = parseFloat(
  document.getElementById("x").value.replace(/\D/g, "")
);
const retencion = 0.5; // Retención en porcentaje
const retencionDecimal = retencion / 100; // Retención en decimal
const UMA = 108.57; // UMA
const calculodelUMA = UMA * 12 * 30.4 * 5; // Cálculo del UMA

function calcular(radioButtonOption) {
  radioButtonOption = radioButtonOption || obtenerRadioButtonSeleccionado();

  const { y, z } = obtenerValoresYZ();
  const x = obtenerValorNumerico();

  let resultado = "0";

  if (x >= 0) {
    resultado = ((x * y) / 360) * z;
    resultado = resultado / 100;
    document.getElementById("resultado").textContent = resultado;

    const amount = x;
    calcularResultado(radioButtonOption, amount);
  } else {
    document.getElementById("resultado").textContent = "$0";
  }
}

let inversiones = [];
let retornos = [];

function calcularResultado(radioButtonOption, amount) {
  const repeticiones = parseInt(document.getElementById("repeticiones").value);
  const title = document.getElementById("title");
  const termToInvest = document.getElementById("termToInvest");
  const termDisclaimer = document.getElementById("termDisclaimer");
  const listaResultados = document.getElementById("listaResultados");
  const x = amount;

  let repeticionesMultiplicadas = 0;
  let trimestral = false;
  let semestre = false;
  let anual = false;

  switch (radioButtonOption) {
    case "opcion1":
    case "opcion2":
      repeticionesMultiplicadas = repeticiones;
      title.innerHTML = "Meses a invertir";
      termToInvest.innerHTML = "meses";
      termDisclaimer.innerHTML = "meses";
      break;
    case "opcion3":
      repeticionesMultiplicadas = repeticiones * 3;
      title.innerHTML = "Trimestres a invertir";
      termToInvest.innerHTML = "trimestres";
      termDisclaimer.innerHTML = "trimestres";
      trimestral = true;
      break;
    case "opcion4":
      repeticionesMultiplicadas = repeticiones * 6;
      title.innerHTML = "Semestres a invertir";
      termToInvest.innerHTML = "semestres";
      termDisclaimer.innerHTML = "semestres";
      semestre = true;
      break;
    case "opcion5":
    case "opcion6":
      repeticionesMultiplicadas = repeticiones * 12;
      title.innerHTML = "Años a invertir";
      termToInvest.innerHTML = "años";
      termDisclaimer.innerHTML = "años";
      anual = true;
      break;
    default:
      // No debería llegar aquí
      break;
  }

  // Limpiamos cualquier contenido previo en la lista de resultados
  listaResultados.innerHTML = "";

  let resultadoFinal = 0;
  let inversiones = [];
  let retornos = [];
  let retenciones = [];
  let sumaRetenciones = 0;

  let tasaInteres = parseFloat(document.getElementById("y").textContent) / 100; // Convertir a decimal
  let plazo = parseInt(document.getElementById("z").textContent);
  let montoInversion = parseFloat(
    document.getElementById("x").value.replace(/\D/g, "")
  );

  for (let i = 0; i < repeticionesMultiplicadas; i++) {
    let rendimiento = montoInversion * ((tasaInteres / 360) * plazo);
    let resultado = montoInversion + rendimiento;

    const inversion = resultado;
    const rendimientoFormateado = rendimiento;

    // Actualizar monto de inversión para el próximo cálculo
    montoInversion = resultado;

    // Agregar el resultado a la lista de retornos
    retornos.push(+rendimientoFormateado);
    inversiones.push(inversion);

    // Crear un nuevo elemento de lista y agregarlo a la lista de resultados
    const listItem = document.createElement("li");
    listItem.textContent = `Repeticion ${i + 1}: ${rendimientoFormateado}`;
    listaResultados.appendChild(listItem);

    // Incrementar el contador según el tipo de período (trimestral, semestral, anual)
    if (trimestral) {
      i += 2;
    }
    if (semestre) {
      i += 5;
    }
    if (anual) {
      i += 11;
    }
  }

  for (var i = 1; i <= repeticiones; i++) {
    var duracion = i; // Duración actual
    let rendimiento = montoInversion * ((tasaInteres / 360) * plazo);
    let resultado = montoInversion + rendimiento;

    if (duracion === 1) {
      montoInversion = parseFloat(
        document.getElementById("x").value.replace(/\D/g, "")
      );
    } else {
      montoInversion = resultado;
    }

    // Calcular la retención para la duración actual
    var retencion =
      (((parseFloat(montoInversion).toFixed(2) - calculodelUMA) *
        retencionDecimal) /
        360) *
      plazo;

    if (retencion < 0) {
      retencion = 0; // Asignar 0 si la retención es negativa
    }

    // Guardar la retención en el array
    retenciones.push(retencion);

    // Sumar la retención actual a la suma total
    sumaRetenciones += retencion;
  }

  // Mostrar el resultado en el elemento con el id "retenciones"
  document.getElementById("retenciones").textContent =
    "$" + formatNumber(sumaRetenciones);

  const labelsQuantity = retornos.length;
  const labels = [];
  for (let i = 0; i < labelsQuantity; i++) {
    labels.push(String(i));
  }

  // Obtener el valor particular a sumar
  let montoAInvertir = parseFloat(
    document.getElementById("x").value.replace(/\D/g, "")
  );

  let inversionesActualizado = inversiones.slice();
  inversionesActualizado.unshift(montoAInvertir);

  let inversionesActualizadoLength = inversionesActualizado.length;

  let labelsForChart = [];

  for (let i = 0; i <= inversionesActualizadoLength - 1; i++) {
    labelsForChart.push(i.toString());
  }

  let retornosForChart = retornos.slice();
  retornosForChart.unshift(0);

  let retencionesForChart = retenciones.slice();
  retencionesForChart.unshift(0);

  let retencionesAplicadas = [];
  let sumaAcumulativaRetenciones = 0;
  let sumaAcumulativaRetencionesArray = retencionesForChart.map((valor) => {
    sumaAcumulativaRetenciones += parseFloat(valor);
    return sumaAcumulativaRetenciones;
  });

  for (let i = 0; i < inversionesActualizadoLength; i++) {
    let inversionActualizada = parseFloat(inversionesActualizado[i]);
    let retencion = parseFloat(sumaAcumulativaRetencionesArray[i]) || 0;
    let nuevoValor = (inversionActualizada - retencion).toFixed(2);
    retencionesAplicadas.push(nuevoValor);
  }

  // Actualiza los datos en el gráfico
  dataQualitySmall.data.datasets[1].data = retencionesAplicadas;
  dataQualitySmall.data.datasets[0].data = retornosForChart;
  dataQualitySmall.data.labels = labelsForChart;

  // Actualiza el gráfico
  dataQualitySmall.update();

  // Sumamos el valor de X al resultado final
  resultadoFinal += x;

  // Obtener el último elemento del array 'inversiones' que contiene el monto final con los rendimientos sumados
  const resultadoFinalConRendimientos = parseFloat(
    inversiones[inversiones.length - 1]
  );

  const resultadoFinalConRetenciones =
    resultadoFinalConRendimientos - sumaRetenciones;

  // Mostrar el resultado final con los rendimientos sumados en el elemento 'resultado'
  document.getElementById("resultado").textContent =
    "$" + formatNumber(resultadoFinalConRetenciones);
}

function calcularResultadoFinal(
  repeticiones,
  tasaInteres,
  plazo,
  montoInversion,
  retencionDecimal
) {
  let sumaRetenciones = 0;

  for (let i = 1; i <= repeticiones; i++) {
    let rendimiento = montoInversion * ((tasaInteres / 360) * plazo);
    let resultado = montoInversion + rendimiento;

    if (i !== 1) {
      montoInversion = resultado;
    }

    const retencion =
      (((montoInversion - calculodelUMA) * retencionDecimal) / 360) * plazo;

    if (retencion < 0) {
      retencion = 0;
    }

    sumaRetenciones += retencion;
  }

  const resultadoFinalConRendimientos = montoInversion;
  const resultadoFinalConRetenciones =
    resultadoFinalConRendimientos - sumaRetenciones;

  // Actualiza el resultado final en el elemento 'resultado'
  document.getElementById("resultado").textContent =
    "$" + formatNumber(resultadoFinalConRetenciones);
}
