// ============================================================
// KENO-SHOPY — Propuesta técnica — selección de opción A/B
// ============================================================

const PDF_BY_OPTION = {
  a: "Keno-Shopy-Propuesta-Tecnica-OpcionA.pdf",
  b: "Keno-Shopy-Propuesta-Tecnica-OpcionB.pdf",
};

const DOWNLOAD_LABEL_BY_OPTION = {
  a: "Descargar PDF — Opción A",
  b: "Descargar PDF — Opción B",
};

function setOption(option) {
  document.documentElement.setAttribute("data-option", option);

  // Tarjetas A/B: marcar cuál está seleccionada
  document.querySelectorAll(".option-card[data-option]").forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.option === option);
  });

  // Bloques dependientes de la opción (Gantt, Inversión): mostrar solo el correspondiente
  document.querySelectorAll("[data-option-block]").forEach((block) => {
    block.style.display = block.dataset.optionBlock === option ? "" : "none";
  });

  // Botón de descarga: apunta al PDF de la opción activa
  const btn = document.getElementById("download-btn");
  if (btn) {
    btn.setAttribute("href", PDF_BY_OPTION[option]);
    btn.innerHTML = `<span class="download-icon">↓</span> ${DOWNLOAD_LABEL_BY_OPTION[option]}`;
  }
}

function initOptionCards() {
  document.querySelectorAll(".option-card[data-option]").forEach((card) => {
    card.addEventListener("click", () => setOption(card.dataset.option));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setOption("a");
  initOptionCards();
});
