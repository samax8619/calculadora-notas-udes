function toggleTercerCorte() {
  const contenedor = document.getElementById("tercerCorteContainer");
  const boton = document.getElementById("toggleCorte3Btn");

  if (contenedor.style.display === "none") {
    contenedor.style.display = "block";
    boton.textContent = "Ocultar campo del tercer corte";
  } else {
    contenedor.style.display = "none";
    boton.textContent = "Agregar mi propia nota del tercer corte";
    document.getElementById("corte3").value = "";
    calcularNotaFinal(); // recalcula sin el tercer corte
  }
}

function calcularNotaFinal() {
  const c1 = parseFloat(document.getElementById("corte1").value);
  const c2 = parseFloat(document.getElementById("corte2").value);
  const contenedorVisible = document.getElementById("tercerCorteContainer").style.display === "block";
  const c3 = contenedorVisible ? parseFloat(document.getElementById("corte3").value) : null;
  const resultadoDiv = document.getElementById("resultado");

  // Validación de notas no mayores a 5
  if ((c1 > 5) || (c2 > 5) || (contenedorVisible && c3 > 5)) {
    resultadoDiv.innerHTML = '<p class="mensaje-rojo">⚠️ Error: La nota no puede ser mayor que 5.0</p>';
    return;
  }

  if (isNaN(c1) || isNaN(c2)) {
    resultadoDiv.innerHTML = '';
    return;
  }

  if (!contenedorVisible || isNaN(c3)) {
    const acumulado = c1 * 0.3 + c2 * 0.3;
    const notaNecesaria = (3.0 - acumulado) / 0.4;

    let mensaje = `<p>Acumulado con dos cortes: <strong>${acumulado.toFixed(2)}</strong></p>`;

    if (notaNecesaria > 5) {
      mensaje += `<p class="mensaje-rojo">Necesitarías <strong>${notaNecesaria.toFixed(2)}</strong> en el tercer corte para aprobar con 3.0, por lo tanto mejor cancela .</p>`;
    } else if (notaNecesaria <= 0) {
      mensaje += `<p class="mensaje-verde">¡Felicidades! Ya apruebas sin importar la nota del tercer corte.</p>`;
    } else {
      mensaje += `<p class="mensaje-verde">Necesitas al menos <strong>${notaNecesaria.toFixed(2)}</strong> en el tercer corte para aprobar con 3.0.</p>`;
    }

    resultadoDiv.innerHTML = mensaje;
    return;
  }

  // Si se ingresaron los tres cortes
  const resultado1 = c1 * 0.3;
  const resultado2 = c2 * 0.3;
  const resultado3 = c3 * 0.4;
  const notaFinal = resultado1 + resultado2 + resultado3;

  let mensaje = `
    <p>Resumen de cálculos:</p>
    <p>Corte 1 (30%): ${resultado1.toFixed(2)}</p>
    <p>Corte 2 (30%): ${resultado2.toFixed(2)}</p>
    <p>Corte 3 (40%): ${resultado3.toFixed(2)}</p>
    <p><strong>Nota final estimada: ${notaFinal.toFixed(2)}</strong></p>
  `;

  if (notaFinal >= 2.96 && notaFinal <= 2.99) {
    mensaje += '<p class="mensaje-verde">Podrías aprobar con redondeo a 3.0.</p>';
  } else if (notaFinal >= 3.0) {
    mensaje += '<p class="mensaje-verde">¡Felicidades! Con esa nota pasarás la materia!</p>';
  } else if (notaFinal > 2.46 && notaFinal < 3.0) {
    mensaje += '<p class="mensaje-habilitacion">tu nota definitiva entre 2.5 y 2.9 por lo tanto si te lo permiten puedes habilitar para poder pasar .</p>';
  } else {
    mensaje += '<p class="mensaje-rojo">mejor cancela. </p>';
  }

  resultadoDiv.innerHTML = mensaje;
}

// Ejecutar cuando el documento esté cargado
document.addEventListener("DOMContentLoaded", function () {
  const corte1 = document.getElementById("corte1");
  const corte2 = document.getElementById("corte2");
  const corte3 = document.getElementById("corte3");

  // Calcular automáticamente al escribir corte1 y corte2
  corte1.addEventListener("input", calcularNotaFinal);
  corte2.addEventListener("input", calcularNotaFinal);
  if (corte3) corte3.addEventListener("input", calcularNotaFinal);

  // Navegación con Enter
  corte1.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      corte2.focus();
    }
  });

  corte2.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const visible = document.getElementById("tercerCorteContainer").style.display === "block";
      if (visible && corte3) {
        corte3.focus();
      }
    }
  });

  if (corte3) {
    corte3.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        calcularNotaFinal();
      }
    });
  }
});
