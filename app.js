const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const modal = document.getElementById("checkoutModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

function scrollToTarget(selector) {
  const target = document.querySelector(selector);
  if (!target) return;
  navLinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openModal() {
  modalBackdrop.hidden = false;
  if (typeof modal.showModal === "function") modal.showModal();
  else modal.setAttribute("open", "");
}

function closeModal() {
  modalBackdrop.hidden = true;
  if (modal.open && typeof modal.close === "function") modal.close();
  modal.removeAttribute("open");
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => scrollToTarget(button.dataset.scroll));
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = link.getAttribute("href");
    if (target.length < 2) return;
    event.preventDefault();
    scrollToTarget(target);
  });
});

document.querySelectorAll(".stripe-mock").forEach((button) => {
  button.addEventListener("click", openModal);
});

modalClose.addEventListener("click", closeModal);
modalOk.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeModal();
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const priceButtons = document.querySelectorAll(".nav-cta, .hero .btn.primary, .final .btn.primary");
priceButtons.forEach((button) => {
  button.addEventListener("mouseenter", () => {
    document.querySelector(".price-card.founder")?.classList.add("price-pulse");
  });
  button.addEventListener("mouseleave", () => {
    document.querySelector(".price-card.founder")?.classList.remove("price-pulse");
  });
});

const demoToast = document.getElementById("demoToast");
let toastTimer;

function showToast(message) {
  if (!demoToast) return;
  demoToast.textContent = message;
  demoToast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => demoToast.classList.remove("show"), 2800);
}

function addActivity(listId, message) {
  const list = document.getElementById(listId);
  if (!list) return;
  const item = document.createElement("li");
  item.textContent = message;
  list.prepend(item);
  [...list.children].slice(4).forEach((node) => node.remove());
}

document.querySelectorAll(".hero-pill").forEach((pill) => {
  pill.addEventListener("click", () => {
    document.querySelectorAll(".hero-pill").forEach((item) => item.classList.remove("active"));
    pill.classList.add("active");
    const microcopy = document.getElementById("heroMicrocopy");
    if (microcopy) microcopy.textContent = pill.dataset.pillCopy;
    showToast(pill.dataset.pillCopy);
  });
});

document.querySelectorAll(".demo-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.demoTab;
    document.querySelectorAll(".demo-tab").forEach((button) => {
      const active = button === tab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll(".demo-panel").forEach((panel) => {
      const active = panel.dataset.demoPanel === key;
      panel.classList.toggle("active", active);
      panel.hidden = !active;
    });
  });
});

const kanbanSeed = [
  { id: "carlos", name: "Carlos Méndez", property: "Departamento Providencia", value: "$4.2M", stage: "Nuevo" },
  { id: "fernanda", name: "Fernanda Ríos", property: "Casa Santa Anita", value: "$6.8M", stage: "Contactado" },
  { id: "roberto", name: "Roberto Larios", property: "Local Andares", value: "$14M", stage: "Calificado" }
];
let kanbanCards = structuredClone(kanbanSeed);

function renderKanban() {
  document.querySelectorAll(".kanban-column").forEach((column) => {
    column.querySelectorAll(".deal-card").forEach((card) => card.remove());
    const cardsInStage = kanbanCards.filter((card) => card.stage === column.dataset.stage);
    const header = column.querySelector("b");
    if (header) header.innerHTML = `${column.dataset.stage}<span class="stage-count">${cardsInStage.length}</span>`;
    cardsInStage.forEach((card) => {
      const node = document.createElement("article");
      node.className = "deal-card";
      node.draggable = true;
      node.dataset.cardId = card.id;
      node.dataset.stage = card.stage;
      node.innerHTML = `<strong>${card.name}</strong><span>${card.property}</span><small>${card.value}</small><em class="deal-stage-chip">${card.stage}</em><button class="move-card" type="button">Mover</button>`;
      column.appendChild(node);
    });
  });
}

function moveDeal(cardId, stage) {
  const card = kanbanCards.find((item) => item.id === cardId);
  if (!card || card.stage === stage) return;
  card.stage = stage;
  renderKanban();
  document.getElementById("dealStageBadge").textContent = stage;
  addActivity("kanbanActivity", `Deal movido a ${stage}`);
  document.querySelector(".workflow-builder div")?.classList.add("triggered");
  showToast("Automation triggered: WhatsApp follow-up programado");
}

function setupKanban() {
  renderKanban();
  const board = document.getElementById("kanbanDemo");
  if (!board) return;
  let draggingId = null;
  let pointerDrag = null;
  board.addEventListener("dragstart", (event) => {
    const card = event.target.closest(".deal-card");
    if (!card) return;
    draggingId = card.dataset.cardId;
    event.dataTransfer.setData("text/plain", draggingId);
  });
  board.addEventListener("dragover", (event) => {
    const column = event.target.closest(".kanban-column");
    if (!column) return;
    event.preventDefault();
    column.classList.add("drag-over");
  });
  board.addEventListener("dragleave", (event) => {
    event.target.closest(".kanban-column")?.classList.remove("drag-over");
  });
  board.addEventListener("drop", (event) => {
    const column = event.target.closest(".kanban-column");
    if (!column) return;
    event.preventDefault();
    column.classList.remove("drag-over");
    moveDeal(event.dataTransfer.getData("text/plain") || draggingId, column.dataset.stage);
  });
  board.addEventListener("click", (event) => {
    const button = event.target.closest(".move-card");
    if (!button) return;
    const cardId = button.closest(".deal-card").dataset.cardId;
    const stages = [...document.querySelectorAll(".kanban-column")].map((column) => column.dataset.stage);
    const card = kanbanCards.find((item) => item.id === cardId);
    const nextStage = stages[Math.min(stages.indexOf(card.stage) + 1, stages.length - 1)];
    moveDeal(cardId, nextStage);
  });
  document.getElementById("resetKanban")?.addEventListener("click", () => {
    kanbanCards = structuredClone(kanbanSeed);
    renderKanban();
    document.getElementById("dealStageBadge").textContent = "Nuevo";
    document.getElementById("kanbanActivity").innerHTML = "<li>Demo listo · arrastra una card</li>";
    document.querySelector(".workflow-builder div")?.classList.remove("triggered");
  });
  board.addEventListener("pointerdown", (event) => {
    const card = event.target.closest(".deal-card");
    if (!card || event.target.closest("button")) return;
    pointerDrag = { id: card.dataset.cardId, startX: event.clientX, startY: event.clientY, active: false, card };
  });
  window.addEventListener("pointermove", (event) => {
    if (!pointerDrag) return;
    const moved = Math.abs(event.clientX - pointerDrag.startX) + Math.abs(event.clientY - pointerDrag.startY);
    if (moved > 12) {
      pointerDrag.active = true;
      pointerDrag.card.classList.add("dragging");
      document.querySelectorAll(".kanban-column").forEach((column) => column.classList.remove("drag-over"));
      document.elementFromPoint(event.clientX, event.clientY)?.closest(".kanban-column")?.classList.add("drag-over");
    }
  });
  window.addEventListener("pointerup", (event) => {
    if (!pointerDrag) return;
    const drag = pointerDrag;
    pointerDrag = null;
    drag.card.classList.remove("dragging");
    document.querySelectorAll(".kanban-column").forEach((column) => column.classList.remove("drag-over"));
    if (!drag.active) return;
    const column = document.elementFromPoint(event.clientX, event.clientY)?.closest(".kanban-column");
    if (column) moveDeal(drag.id, column.dataset.stage);
  });
}

setupKanban();

const runWorkflow = document.getElementById("runWorkflow");
runWorkflow?.addEventListener("click", async () => {
  const toggle = document.getElementById("workflowToggle");
  const result = document.getElementById("workflowResult");
  if (!toggle.checked) {
    result.textContent = "Workflow pausado. Actívalo para correr demo.";
    showToast("Workflow OFF");
    return;
  }
  const nodes = [...document.querySelectorAll(".auto-node")];
  nodes.forEach((node) => node.classList.remove("active", "done"));
  result.textContent = "Ejecutando workflow...";
  for (const node of nodes) {
    node.classList.add("active");
    await new Promise((resolve) => setTimeout(resolve, 220));
    node.classList.add("done");
    node.classList.remove("active");
  }
  result.textContent = "Workflow ejecutado en 1.8s";
  addActivity("kanbanActivity", "Workflow ejecutado · dashboard actualizado");
  showToast("Workflow ejecutado en 1.8s");
});

const waData = [
  {
    id: "carlos",
    name: "Carlos Méndez",
    property: "Departamento Providencia",
    advisor: "Mariana López",
    last: "4 min",
    temp: "Caliente",
    score: 87,
    deal: "Deal pendiente",
    messages: [
      ["in", "¿Podemos visitar el departamento hoy?"],
      ["out", "Sí, Carlos. Mariana tiene 5:30 pm disponible."]
    ]
  },
  {
    id: "michelle",
    name: "Michelle Zamora",
    property: "Casa Santa Anita",
    advisor: "Daniel Torres",
    last: "12 min",
    temp: "Tibio",
    score: 72,
    deal: "Deal pendiente",
    messages: [
      ["in", "Buscamos casa al sur para familia de cuatro."],
      ["out", "Tengo una opción muy alineada en Santa Anita."]
    ]
  },
  {
    id: "ana",
    name: "Ana Paula Cortés",
    property: "Penthouse Arcos Vallarta",
    advisor: "Mariana López",
    last: "2 min",
    temp: "Caliente",
    score: 91,
    deal: "Deal creado",
    messages: [
      ["in", "Me interesa el penthouse, ¿sigue disponible?"],
      ["out", "Sí, lo tengo disponible para visita privada."]
    ]
  }
];
let activeWa = 0;

function renderWhatsApp() {
  const lead = waData[activeWa];
  const people = document.getElementById("waConversations");
  const chat = document.getElementById("waChat");
  if (!people || !chat) return;
  people.innerHTML = waData.map((item, index) => `<button class="wa-person ${index === activeWa ? "active" : ""}" data-wa="${index}">${item.name}</button>`).join("");
  chat.innerHTML = lead.messages.map(([type, text]) => `<p class="bubble ${type}">${text}</p>`).join("");
  document.getElementById("waScore").textContent = lead.score;
  document.getElementById("waTemp").textContent = `Temperatura: ${lead.temp}`;
  document.getElementById("waProperty").textContent = `Interés: ${lead.property}`;
  document.getElementById("waAdvisor").textContent = `Asesor: ${lead.advisor}`;
  document.getElementById("waLast").textContent = `Último contacto: ${lead.last}`;
  document.getElementById("waDeal").textContent = lead.deal;
}

document.getElementById("waConversations")?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-wa]");
  if (!button) return;
  activeWa = Number(button.dataset.wa);
  renderWhatsApp();
});

document.getElementById("aiReply")?.addEventListener("click", () => {
  waData[activeWa].messages.push(["out", "Respuesta sugerida: puedo enviarte ficha, agenda y condiciones en este momento."]);
  renderWhatsApp();
  showToast("Lead actualizado en Atlas");
});
document.getElementById("sendSheet")?.addEventListener("click", () => {
  waData[activeWa].messages.push(["out", `Te comparto la ficha de ${waData[activeWa].property} con fotos, precio y disponibilidad.`]);
  renderWhatsApp();
  showToast("Lead actualizado en Atlas");
});
document.getElementById("createDeal")?.addEventListener("click", () => {
  waData[activeWa].deal = "Deal creado";
  renderWhatsApp();
  addActivity("kanbanActivity", "Deal creado desde WhatsApp OS");
  showToast("Lead actualizado en Atlas");
});
document.getElementById("markHot")?.addEventListener("click", () => {
  waData[activeWa].temp = "Caliente";
  waData[activeWa].score = Math.min(99, waData[activeWa].score + 8);
  renderWhatsApp();
  showToast("Lead actualizado en Atlas");
});
renderWhatsApp();

document.querySelectorAll(".satellites .node").forEach((node) => {
  node.addEventListener("click", () => {
    document.querySelectorAll(".satellites .node").forEach((item) => item.classList.remove("active"));
    node.classList.add("active");
    document.getElementById("propertyState").textContent = node.dataset.copy;
    showToast(node.dataset.copy);
  });
});

document.getElementById("propertyUpdatePrice")?.addEventListener("click", () => {
  document.getElementById("propertyPrice").textContent = "$18.9M MXN";
  document.getElementById("propertySyncBadge").textContent = "Sync pending";
  document.getElementById("propertyState").textContent = "Precio actualizado · Web Engine pendiente";
  showToast("Precio actualizado · Web Engine pendiente");
});

document.getElementById("propertyPublish")?.addEventListener("click", () => {
  document.getElementById("propertySyncBadge").textContent = "Publicado";
  document.getElementById("propertyState").textContent = "Listing sincronizado";
  showToast("Listing sincronizado");
});

let syncPending = false;
document.getElementById("updatePrice")?.addEventListener("click", () => {
  syncPending = true;
  document.getElementById("syncPrice").textContent = "$18.9M MXN";
  document.getElementById("syncQueue").textContent = "9";
  document.getElementById("syncBadge").textContent = "Sync pending";
  addActivity("syncActivity", "Precio actualizado · Web Engine pendiente");
  showToast("Web Sync Queue actualizada");
});
document.getElementById("publishChanges")?.addEventListener("click", () => {
  if (!syncPending) {
    showToast("No hay cambios pendientes");
    return;
  }
  syncPending = false;
  document.getElementById("syncQueue").textContent = "0";
  document.getElementById("syncBadge").textContent = "Publicado";
  addActivity("syncActivity", "Listing sincronizado");
  showToast("Listing sincronizado");
});
