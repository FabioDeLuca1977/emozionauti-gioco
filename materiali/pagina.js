// Aiuti comuni alle pagine dei materiali.
// Dentro il link di Claude il gioco gira in una cornice che non apre schede nuove e non avvia la stampa:
// la pagina si apre allora al posto del gioco (con ?dal-gioco) e qui offre la strada per tornare.
(() => {
  const dalGioco = new URLSearchParams(location.search).has("dal-gioco");
  const inCornice = window.self !== window.top;

  document.querySelectorAll("button.stampa").forEach((stampa) => {
    if (dalGioco) {
      const torna = document.createElement("button");
      torna.type = "button";
      torna.className = "stampa torna";
      torna.textContent = "← Torna al gioco";
      torna.addEventListener("click", () => history.back());
      stampa.before(torna);
    }
    if (inCornice) {
      const nota = document.createElement("p");
      nota.className = "nota-stampa";
      nota.textContent = "Qui la stampa non parte: per averla su carta chiedete il PDF a chi vi ha mandato il link.";
      stampa.replaceWith(nota);
    }
  });

  const stile = document.createElement("style");
  stile.textContent =
    ".stampa.torna { background: #fff; color: #233650; border: 2px solid currentColor; }" +
    ".nota-stampa { margin: 0; font-size: .9rem; max-width: 34em; }" +
    "@media print { .torna, .nota-stampa { display: none; } }";
  document.head.append(stile);
})();
