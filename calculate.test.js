describe("calcularResultadoFinal", () => {
  it("test case 1", () => {
    const repeticiones = 9;
    const tasaInteres = 11.1 / 100;
    const plazo = 30;
    const montoInversion = 200000;
    const retencionDecimal = 0.5 / 100;

    const result = calcularResultadoFinal(
      repeticiones,
      tasaInteres,
      plazo,
      montoInversion,
      retencionDecimal
    );

    expect(result).toBe(formatNumber(217242.94));
  });

  it("test case 2", () => {
    const repeticiones = 2;
    const tasaInteres = 11.1 / 100;
    const plazo = 30;
    const montoInversion = 10092.5;
    const retencionDecimal = 0.5 / 100;

    const result = calcularResultadoFinal(
      repeticiones,
      tasaInteres,
      plazo,
      montoInversion,
      retencionDecimal
    );

    expect(result).toBe(formatNumber(10185.86));
  });

  it("test case 3", () => {
    const repeticiones = 1;
    const tasaInteres = 11.1 / 100;
    const plazo = 30;
    const montoInversion = 20000;
    const retencionDecimal = 0.5 / 100;

    const result = calcularResultadoFinal(
      repeticiones,
      tasaInteres,
      plazo,
      montoInversion,
      retencionDecimal
    );

    expect(result).toBe(formatNumber(20185.0));
  });

  it("test case 4", () => {
    const repeticiones = 4;
    const tasaInteres = 11.1 / 100;
    const plazo = 91;
    const montoInversion = 200000;
    const retencionDecimal = 0.5 / 100;

    const result = calcularResultadoFinal(
      repeticiones,
      tasaInteres,
      plazo,
      montoInversion,
      retencionDecimal
    );

    expect(result).toBe(formatNumber(225335.06));
  });

  it("calculates Max Value", () => {
    const repeticiones = 12;
    const tasaInteres = 13.5 / 100;
    const plazo = 364;
    const montoInversion = 10000000;
    const retencionDecimal = 0.5 / 100;

    const result = calcularResultadoFinal(
      repeticiones,
      tasaInteres,
      plazo,
      montoInversion,
      retencionDecimal
    );

    expect(result).toBe(formatNumber(44040715.75));
  });
});

// Constantes necesarias para el cálculo
const UMA = 108.57; // UMA
const calculodelUMA = UMA * 12 * 30.4 * 5; // Cálculo del UMA

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

    let retencion =
      (((montoInversion - calculodelUMA) * retencionDecimal) / 360) * plazo;

    if (retencion < 0) {
      retencion = 0;
    }

    sumaRetenciones += retencion;
  }

  const resultadoFinalConRendimientos = montoInversion;
  const resultadoFinalConRetenciones =
    resultadoFinalConRendimientos - sumaRetenciones;

  return formatNumber(resultadoFinalConRetenciones);
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
