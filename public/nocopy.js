function applyNoCopyProtection() {
  // Bloqueia seleção de texto nos elementos com .nocopy
  // document.querySelectorAll('.nocopy').forEach(el => {
  //   el.style.userSelect = 'none';
  //   el.style.webkitUserSelect = 'none';
  //   el.style.mozUserSelect = 'none';
  //   el.style.msUserSelect = 'none';
  // });

  // Bloqueia o menu de contexto e o evento de copiar apenas nos elementos .nocopy
  document.querySelectorAll(".nocopy").forEach((el) => {
    el.addEventListener("contextmenu", (e) => e.preventDefault());
    el.addEventListener("copy", (e) => {
      e.clipboardData.setData('text/plain', 'Cópia desabilitada!');
      e.preventDefault();
    });
  });
}

function prefentDefault(e) {
  e.preventDefault();
  return false;
}

// Executa após o carregamento da página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", applyNoCopyProtection);
} else {
  applyNoCopyProtection();
}
