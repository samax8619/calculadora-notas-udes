function calcularNotaFinal() {
  const c1 = parseFloat(document.getElementById("corte1").value);
  const c2 = parseFloat(document.getElementById("corte2").value);
  const contenedorVisible = document.getElementById("tercerCorteContainer").style.display !== "none";
  const c3 = contenedorVisible ? parseFloat(document.getElementById("corte3").value) : null;
  const resultadoDiv = document.getElementById("resultado");

  // Validación de rango
  if ((c1 < 0 || c1 > 5) || (c2 < 0 || c2 > 5) || (contenedorVisible && (c3 < 0 || c3 > 5))) {
    resultadoDiv.innerHTML = '<p class="mensaje-rojo">⚠️ La nota debe estar entre 0 y 5.0</p>';
    return;
  }

  if (isNaN(c1) || isNaN(c2)) {
    resultadoDiv.innerHTML = '';
    return;
  }

  if (!contenedorVisible || isNaN(c3)) {
    const acumulado = c1 * 0.3 + c2 * 0.3;
    const notaNecesaria = (3.0 - acumulado) / 0.4;

    let mensaje = `<p>📊 Acumulado con dos cortes: <strong>${acumulado.toFixed(2)}</strong></p>`;

    if (notaNecesaria > 5) {
      mensaje += `<p class="mensaje-rojo">Necesitarías <strong>${notaNecesaria.toFixed(2)}</strong> en el tercer corte — mejor considera cancelar.</p>`;
    } else if (notaNecesaria <= 0) {
      mensaje += `<p class="mensaje-verde">🎉 ¡Ya apruebas sin importar la nota del tercer corte!</p>`;
    } else {
      mensaje += `<p class="mensaje-verde">✅ Necesitas al menos <strong>${notaNecesaria.toFixed(2)}</strong> en el tercer corte para aprobar con 3.0.</p>`;
    }

    resultadoDiv.innerHTML = mensaje;
    return;
  }

  const resultado1 = c1 * 0.3;
  const resultado2 = c2 * 0.3;
  const resultado3 = c3 * 0.4;
  const notaFinal  = resultado1 + resultado2 + resultado3;

  let mensaje = `
    <p>📝 Corte 1 (30%): <strong>${resultado1.toFixed(2)}</strong></p>
    <p>📝 Corte 2 (30%): <strong>${resultado2.toFixed(2)}</strong></p>
    <p>📝 Corte 3 (40%): <strong>${resultado3.toFixed(2)}</strong></p>
    <p>🎓 Nota final estimada: <strong>${notaFinal.toFixed(2)}</strong></p>
  `;

  if (notaFinal >= 2.95 && notaFinal <= 2.99) {
    mensaje += '<p class="mensaje-verde">Podrías aprobar con redondeo a 3.0. 🤞</p>';
  } else if (notaFinal >= 3.0) {
    mensaje += '<p class="mensaje-verde">🎉 ¡Felicidades! Pasarás la materia.</p>';
  } else if (notaFinal > 2.49 && notaFinal < 3.0) {
    mensaje += '<p class="mensaje-habilitacion">⚠️ Nota entre 2.5 y 2.9 — puedes intentar habilitar si te lo permiten.</p>';
  } else {
    mensaje += '<p class="mensaje-rojo">😓 La nota es muy baja. Considera cancelar la materia.</p>';
  }

  resultadoDiv.innerHTML = mensaje;
}

document.addEventListener("DOMContentLoaded", function () {
  const corte1 = document.getElementById("corte1");
  const corte2 = document.getElementById("corte2");
  const corte3 = document.getElementById("corte3");

  corte1.addEventListener("input", calcularNotaFinal);
  corte2.addEventListener("input", calcularNotaFinal);
  if (corte3) corte3.addEventListener("input", calcularNotaFinal);

  corte1.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); corte2.focus(); }
  });

  corte2.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const visible = document.getElementById("tercerCorteContainer").style.display !== "none";
      if (visible && corte3) corte3.focus();
    }
  });

  if (corte3) {
    corte3.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); calcularNotaFinal(); }
    });
  }
});
