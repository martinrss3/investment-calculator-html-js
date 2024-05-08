var canvas = document.getElementById("myChart");
var ctx = canvas.getContext("2d");
var dataQualitySmall = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        label: "Rendimiento",
        yAxisID: "y-axis-2", // Asigna este dataset al primer eje Y
        type: "line",
        data: inversiones,
        backgroundColor: "transparent",
        borderColor: "#8590F9",
        borderWidth: 4,
        lineTension: 0,
      },
      {
        label: "Capital",
        yAxisID: "y-axis-1", // Asigna este dataset al segundo eje Y
        type: "bar",
        data: retornos,
        backgroundColor: "#2437F5",
        borderColor: "#2437F5",
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          id: "y-axis-1",
          type: "linear",
          position: "left", // Coloca este eje a la izquierda
          ticks: {
            beginAtZero: true,
          },
        },
        {
          id: "y-axis-2",
          type: "linear",
          position: "right", // Coloca este eje a la derecha
        },
      ],
    },
    tooltips: {
      borderColor: "#DEDEDE",
      borderWidth: 1,
      backgroundColor: "#F8F8F8",
      bodyFontColor: "#000",
      titleFontColor: "#000",
      width: 20,
    },
  },
});

// Actualiza el gráfico
dataQualitySmall.update();
