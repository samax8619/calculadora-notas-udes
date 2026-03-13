let contadorNotas = 0;
let corteActual = null;

function seleccionarCorte(corte) {
  corteActual = corte;

  // Update button styles
  [1, 2, 3].forEach(n => {
    const btn = document.getElementById(`btn-c${n}`);
    if (btn) btn.classList.toggle("active", n === corte);
  });

  // Clear container
  const container = document.getElementById("notas-container");
  container.innerHTML = "";
  contadorNotas = 0;

  // Clear result
  document.getElementById("resultado").innerHTML = "";

  // Auto-add first nota row
  agregarNota();
}

function agregarNota() {
  if (!corteActual) {
    alert("⚠️ Primero selecciona un corte antes de agregar actividades.");
    return;
  }

  // Remove placeholder if present
  const placeholder = document.querySelector(".placeholder-msg");
  if (placeholder) placeholder.remove();

  contadorNotas++;
  const container = document.getElementById("notas-container");
  const div = document.createElement("div");
  div.className = "nota-grupo";
  div.id = `nota${contadorNotas}`;
  div.innerHTML = `
    <div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#4a5a72;margin-bottom:5px;">Actividad ${contadorNotas} — Nota</div>
      <input type="number" placeholder="0.00 – 5.00" step="0.01" min="0" max="5" class="nota" />
    </div>
    <div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#4a5a72;margin-bottom:5px;">Porcentaje (%)</div>
      <input type="number" placeholder="Ej: 30" step="0.01" min="0" max="100" class="porcentaje" />
    </div>
  `;
  container.appendChild(div);
}

function quitarNota() {
  if (contadorNotas > 0) {
    const container = document.getElementById("notas-container");
    const div = document.getElementById(`nota${contadorNotas}`);
    if (div) container.removeChild(div);
    contadorNotas--;

    if (contadorNotas === 0) {
      container.innerHTML = '<p class="placeholder-msg">Agrega actividades para calcular</p>';
    }
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

  if (notas.length === 0) {
    resultadoDiv.innerHTML = '<p style="border-left-color:#c0180a;background:#fff5f5;color:#c0180a;padding:12px 16px;border-radius:10px;">⚠️ Agrega al menos una actividad.</p>';
    return;
  }

  let sumaPonderada = 0;
  let sumaPorcentajes = 0;

  for (let i = 0; i < notas.length; i++) {
    const nota = parseFloat(notas[i].value);
    const porcentaje = parseFloat(porcentajes[i].value);

    if (isNaN(nota) || isNaN(porcentaje)) {
      resultadoDiv.innerHTML = '<p style="border-left-color:#c0180a;background:#fff5f5;color:#c0180a;padding:12px 16px;border-radius:10px;">⚠️ Completa todas las notas y porcentajes.</p>';
      return;
    }
    if (nota < 0 || nota > 5) {
      resultadoDiv.innerHTML = '<p style="border-left-color:#c0180a;background:#fff5f5;color:#c0180a;padding:12px 16px;border-radius:10px;">⚠️ La nota debe estar entre 0 y 5.0.</p>';
      return;
    }
    if (porcentaje < 0 || porcentaje > 100) {
      resultadoDiv.innerHTML = '<p style="border-left-color:#c0180a;background:#fff5f5;color:#c0180a;padding:12px 16px;border-radius:10px;">⚠️ El porcentaje debe estar entre 0 y 100.</p>';
      return;
    }

    sumaPonderada += nota * porcentaje;
    sumaPorcentajes += porcentaje;
  }

  if (sumaPorcentajes <= 0) {
    resultadoDiv.innerHTML = '<p style="border-left-color:#c0180a;background:#fff5f5;color:#c0180a;padding:12px 16px;border-radius:10px;">⚠️ La suma de porcentajes debe ser mayor que 0.</p>';
    return;
  }

  const notaFinalCorte = sumaPonderada / sumaPorcentajes;
  const peso = (corteActual === 3) ? 0.40 : 0.30;
  const aporteFinal = notaFinalCorte * peso;

  // Visual status
  let statusColor = "#1a8a4a";
  let statusBg = "#f0fff6";
  let statusMsg = "✅ Aprobado";
  if (notaFinalCorte < 3.0) { statusColor = "#c0180a"; statusBg = "#fff5f5"; statusMsg = "❌ Reprobado"; }

  resultadoDiv.innerHTML = `
    <p style="background:linear-gradient(135deg,#0352A6,#1a6bc9);color:#fff;padding:16px;border-radius:10px 10px 0 0;text-align:center;font-size:22px;font-weight:800;border-left:none;margin-bottom:0;">
      ${notaFinalCorte.toFixed(2)} <span style="font-size:14px;font-weight:400;opacity:0.8;">/ 5.0</span>
    </p>
    <p style="border-left-color:${statusColor};background:${statusBg};color:${statusColor};padding:10px 16px;">
      ${statusMsg} &nbsp;·&nbsp; Corte ${corteActual}
    </p>
    <p style="padding:10px 16px;">📊 Porcentajes ingresados suman: <strong>${sumaPorcentajes.toFixed(1)}%</strong></p>
    <p style="padding:10px 16px;border-radius:0 0 10px 10px;">🎯 Aporte a la nota final (${(peso*100)}%): <strong>${aporteFinal.toFixed(2)}</strong></p>
  `;
}

window.addEventListener("load", function () {
  setTimeout(() => {
    const loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }, 900);
});
