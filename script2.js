
let contadorNotas = 0;
let corteActual = null; // 1, 2 o 3

function seleccionarCorte(corte) {
  corteActual = corte;
  document.getElementById("resultado").innerHTML =
    `<p>Estás calculando el <strong>Corte ${corte}</strong> que equivale al <strong>${corte === 3 ? "40%" : "30%"}</strong> de la nota final.</p>`;
  document.getElementById("notas-container").innerHTML = "";
  contadorNotas = 0;
}

function agregarNota() {
  if (!corteActual) {
    alert("⚠️ Primero selecciona un corte antes de agregar notas.");
    return;
  }
  contadorNotas++;
  const container = document.getElementById("notas-container");
  const div = document.createElement("div");
  div.className = "nota-grupo";
  div.id = `nota${contadorNotas}`;
  div.innerHTML = `
    <input type="number" placeholder="Nota ${contadorNotas}" step="0.01" min="-5" max="5" class="nota">
    <input type="number" placeholder="% de la nota" step="0.01" min="0" max="100" class="porcentaje">
  `;
  container.appendChild(div);
}

function quitarNota() {
  if (contadorNotas > 0) {
    const container = document.getElementById("notas-container");
    const div = document.getElementById(`nota${contadorNotas}`);
    container.removeChild(div);
    contadorNotas--;
  }
}

function calcularCorte() {
  if (!corteActual) {
    alert("⚠️ Selecciona un corte antes de calcular.");
    return;
  }

  const notas = document.querySelectorAll(".nota");
  const porcentajes = document.querySelectorAll(".porcentaje");
  const resultadoDiv = document.getElementById("resultado");

  let sumaPonderada = 0;
  let sumaPorcentajes = 0;

  for (let i = 0; i < notas.length; i++) {
    const nota = parseFloat(notas[i].value);
    const porcentaje = parseFloat(porcentajes[i].value);

    if (isNaN(nota) || isNaN(porcentaje)) {
      resultadoDiv.innerHTML = "⚠️ Completa todas las notas y porcentajes.";
      return;
    }

    // Validación de rango de nota (-5 a 5)
    if (nota < 0 || nota > 5) {
      resultadoDiv.innerHTML = "⚠️ Error: La nota debe estar entre 0 y 5.0.";
      return;
    }

    // Validación de porcentaje
    if (porcentaje < 0 || porcentaje > 100) {
      resultadoDiv.innerHTML = "⚠️ El porcentaje debe estar entre 0 y 100.";
      return;
    }

    // Suma ponderada
    sumaPonderada += nota * porcentaje;
    sumaPorcentajes += porcentaje;
  }

  if (sumaPorcentajes <= 0) {
    resultadoDiv.innerHTML = "⚠️ La suma de los porcentajes debe ser mayor que 0.";
    return;
  }

  // Normalización: tratamos la suma de porcentajes como si fuera 100%
  const notaFinalCorte = sumaPonderada / sumaPorcentajes;

  // Ponderación del corte en la nota final
  const peso = (corteActual === 3) ? 0.40 : 0.30;
  const aporteFinal = notaFinalCorte * peso;

  resultadoDiv.innerHTML = `
    <p><strong>Resultado del Corte ${corteActual}:</strong> ${notaFinalCorte.toFixed(2)} / 5.0</p>
    <p>Aporte al promedio final (${(peso * 100)}%): <strong>${aporteFinal.toFixed(2)}</strong></p>
  `;
}

// Ocultar loader al cargar
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";
});
