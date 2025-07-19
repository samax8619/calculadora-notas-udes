let contadorNotas = 0;

function agregarNota() {
    contadorNotas++;

    const container = document.getElementById("notas-container");

    const div = document.createElement("div");
    div.className = "nota-grupo";
    div.id = `nota${contadorNotas}`;

    div.innerHTML = `
        <input type="number" placeholder="Nota ${contadorNotas}" step="0.01" min="0" max="5" class="nota">
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
    const notas = document.querySelectorAll(".nota");
    const porcentajes = document.querySelectorAll(".porcentaje");
    const resultadoDiv = document.getElementById("resultado");

    let suma = 0;
    let sumaPorcentajes = 0;

    for (let i = 0; i < notas.length; i++) {
        const nota = parseFloat(notas[i].value);
        const porcentaje = parseFloat(porcentajes[i].value);

        if (isNaN(nota) || isNaN(porcentaje)) {
            resultadoDiv.innerHTML = "Por favor, completa todas las notas y porcentajes.";
            return;
        }

        suma += nota * (porcentaje / 100);
        sumaPorcentajes += porcentaje;
    }

    if (sumaPorcentajes > 100) {
        resultadoDiv.innerHTML = "⚠️ La suma de los porcentajes no debe exceder el 100%.";
        return;
    }

    resultadoDiv.innerHTML = `Resultado del corte: <strong>${suma.toFixed(2)}</strong>`;
}
