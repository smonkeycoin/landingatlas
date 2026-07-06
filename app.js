const dashView = document.getElementById("dashView");
const dashTitle = document.getElementById("dashTitle");
const dashEyebrow = document.getElementById("dashEyebrow");
const toast = document.getElementById("productToast");
const founderAccess = document.getElementById("founderAccess");
const founderModal = document.getElementById("founderModal");
const founderBackdrop = document.getElementById("founderBackdrop");
const founderClose = document.getElementById("founderClose");
const founderOk = document.getElementById("founderOk");
const productHome = document.querySelector(".product-home");
const workspaceSection = document.getElementById("workspace");

let toastTimer;
let currentView = "command";
let propertyPrice = "$18.4M MXN";
let webStatus = "Publicado";
let activeLead = 0;
let deals = [
  { id: "carlos", name: "Carlos Méndez", property: "Dpto. Providencia", value: "$4.2M", stage: "Nuevo", score: 82, advisor: "Mariana", source: "WhatsApp" },
  { id: "fernanda", name: "Fernanda Ríos", property: "Casa Santa Anita", value: "$6.8M", stage: "Contactado", score: 74, advisor: "Daniel", source: "Web" },
  { id: "jorge", name: "Jorge Salvatierra", property: "Penthouse Arcos", value: "$18.4M", stage: "Calificado", score: 68, advisor: "Mariana", source: "Portal" },
  { id: "ana", name: "Ana Paula Cortés", property: "Torre Zapopan", value: "$3.2M", stage: "Visita agendada", score: 65, advisor: "Sofía", source: "Meta" },
  { id: "diego", name: "Diego Herrera", property: "Local Andares", value: "$9.8M", stage: "Negociación", score: 79, advisor: "Sofía", source: "CRM" },
  { id: "lucia", name: "Lucía Martínez", property: "Casa Country", value: "$7.2M", stage: "Cierre", score: 91, advisor: "Mariana", source: "Referido" }
];

const stages = ["Nuevo", "Contactado", "Calificado", "Visita agendada", "Negociación", "Cierre"];
const leads = [
  { name: "Carlos Méndez", source: "WhatsApp", interest: "Departamento Providencia", score: 82, temp: "Caliente", advisor: "Mariana López", last: "Hace 12 min", next: "Enviar ficha + agenda para visita", msg: "Hola, me interesa el departamento con terraza.", suggested: ["Penthouse Arcos Vallarta", "Dpto. Providencia", "Torre Zapopan"] },
  { name: "Fernanda Ríos", source: "Web", interest: "Casa Santa Anita", score: 74, temp: "Tibio", advisor: "Daniel Torres", last: "Hoy 10:42", next: "Confirmar presupuesto y zona sur", msg: "¿Tienen algo al sur para familia?", suggested: ["Casa Santa Anita", "Casa Country", "Residencia Bugambilias"] },
  { name: "Roberto Larios", source: "Portal", interest: "Local Andares", score: 71, temp: "Caliente", advisor: "Sofía Herrera", last: "Ayer 18:20", next: "Agendar llamada comercial", msg: "Necesito local comercial con buen flujo.", suggested: ["Local Andares", "Local Providencia", "Plaza Patria"] }
];

const stageMeta = {
  "Nuevo": { tone: "blue", short: "Nuevo" },
  "Contactado": { tone: "cyan", short: "Contactado" },
  "Calificado": { tone: "gold", short: "Calificado" },
  "Visita agendada": { tone: "violet", short: "Visita" },
  "Negociación": { tone: "orange", short: "Negociación" },
  "Cierre": { tone: "green", short: "Cierre" }
};

const documents = [
  ["NDA.pdf", "Firmado", "Cliente"],
  ["Contrato Promesa de Venta.pdf", "En revisión", "Deal"],
  ["Carta Oferta.pdf", "Generado IA", "Lead"],
  ["Ficha Técnica.pdf", "Firmado", "Property"],
  ["Contrato Arrendamiento.pdf", "Pendiente", "Cliente"],
  ["Autorización Datos.pdf", "Firmado", "Cliente"],
  ["Expediente Cliente.pdf", "En revisión", "Asesor"],
  ["Checklist Entrega.pdf", "Pendiente", "Deal"],
  ["Avalúo.pdf", "Generado IA", "Property"],
  ["INE.pdf", "Firmado", "Cliente"],
  ["RFC.pdf", "Pendiente", "Cliente"],
  ["Comprobante domicilio.pdf", "En revisión", "Cliente"]
];

const integrations = [
  ["WA", "WhatsApp Business", "Conectado", "Conversaciones, fichas y deals desde el inbox.", "Administrar"],
  ["FB", "Facebook Leads", "Disponible pronto", "Captura directa de campañas Meta.", "Próximamente"],
  ["GC", "Google Calendar", "Disponible pronto", "Agenda visitas y seguimientos.", "Próximamente"],
  ["EB", "EasyBroker", "Beta", "Sincronización de inventario y portales.", "Conectar"],
  ["ST", "Stripe", "Conectado", "Pagos, suscripciones y Founder Access.", "Administrar"],
  ["MP", "Mercado Pago", "Disponible pronto", "Cobros locales y links de pago.", "Próximamente"],
  ["DS", "DocuSign", "Beta", "Firmas y auditoría documental.", "Conectar"],
  ["GD", "Google Drive", "Disponible pronto", "Respaldo automático de expedientes.", "Próximamente"],
  ["API", "Website API", "Conectado", "Publicación web desde Property Engine.", "Administrar"],
  ["AI", "OpenAI", "Beta", "Respuestas, documentos e insights.", "Conectar"],
  ["PI", "Portales Inmobiliarios", "Disponible pronto", "Distribución multi portal.", "Próximamente"]
];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}

function setView(view) {
  currentView = view;
  document.querySelectorAll(".dash-sidebar button").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  dashView.classList.add("leaving");
  setTimeout(() => {
    const viewMap = {
      command: ["Mission Control", "Dashboard", commandView],
      property: ["Property Engine", "Inventario vivo", propertyView],
      crm: ["Lead Engine", "CRM operativo", crmView],
      kanban: ["Pipeline", "Kanban Comercial", kanbanView],
      whatsapp: ["WhatsApp OS", "Centro operativo", whatsappView],
      automation: ["Automation Engine", "Workflow Builder", automationView],
      analytics: ["Analytics", "Visibilidad total", analyticsView],
      docs: ["Docs", "Expedientes y documentos", docsView],
      marketplace: ["Marketplace", "Integraciones", marketplaceView]
    };
    const [eyebrow, title, render] = viewMap[view];
    dashEyebrow.textContent = eyebrow;
    dashTitle.textContent = title;
    dashView.innerHTML = render();
    bindView(view);
    dashView.classList.remove("leaving");
    showToast(`${title} activo`);
  }, 180);
}

function commandView() {
  return `
    <section class="one-dashboard-grid mission-control">
      <div class="kpi-row">
        ${kpi("128", "Leads nuevos", "blue")}
        ${kpi("42%", "Conversión", "green")}
        ${kpi("316", "Inventario activo", "violet")}
        ${kpi("$18.4M", "Valor inventario", "cyan")}
      </div>
      <article class="dash-panel intelligence"><b>Atlas Intelligence</b><ul><li>14 leads requieren seguimiento hoy.</li><li>8 cambios web listos para publicar.</li><li>Mariana López lidera conversión con 51%.</li><li>2 propiedades premium requieren media nueva.</li></ul></article>
      <article class="dash-panel activity"><b>Live Activity</b><ul id="activityFeed"><li>09:42 Lead caliente asignado a Mariana.</li><li>09:48 Ficha enviada por WhatsApp.</li><li>10:03 Workflow Preventa ejecutado.</li><li>10:16 Precio actualizado en Website API.</li></ul></article>
      <article class="dash-panel agenda-panel"><b>Agenda del día</b><ul><li>11:30 Visita Penthouse Arcos.</li><li>13:00 Llamada con Roberto Larios.</li><li>16:45 Firma Carta Oferta.</li></ul></article>
      <article class="dash-panel workflow-status"><b>Workflow Status</b><div class="status-rail"><span>Preventa <strong>Activo</strong></span><span>Docs <strong>6/8</strong></span><span>Follow-up <strong>2h</strong></span></div></article>
      <article class="dash-panel queue-panel"><b>Web Sync Queue</b><ul><li>Penthouse Arcos · Precio listo</li><li>Casa Santa Anita · Fotos pendientes</li><li>Local Andares · Landing generada</li></ul></article>
      <article class="dash-panel snapshot-panel"><b>Pipeline Snapshot</b><div class="mini-funnel">${stages.map((stage) => `<span class="${stageMeta[stage].tone}" style="height:${28 + deals.filter((deal) => deal.stage === stage).length * 18}%"></span>`).join("")}</div></article>
      <article class="dash-panel alert-panel"><b>Property Alerts</b><ul><li>3 inventarios sin actualización en 7 días.</li><li>1 owner pidió cambio de precio.</li><li>Media score bajo en Casa Country.</li></ul></article>
      <article class="dash-panel top-advisor"><b>Top asesor</b><h4>Mariana López</h4><p>$31.8M en pipeline · 51% conversión</p></article>
      <article class="dash-panel notification-panel"><b>Notifications</b><ul><li>Cliente abrió ficha 4 veces.</li><li>DocuSign beta listo para conectar.</li></ul></article>
    </section>`;
}

function kpi(value, label, tone) {
  return `<article class="dash-kpi ${tone}"><strong>${value}</strong><span>${label}</span><em></em></article>`;
}

function propertyView() {
  return `
    <section class="property-view property-product">
      <article class="property-listing">
        <div class="listing-image"><img src="assets/images/penthouse-arcos-vallarta.jpg" alt="Penthouse Arcos Vallarta" onerror="this.remove(); this.parentElement.classList.add('image-fallback')"><span>Zapopan · Premium</span></div>
        <h4>Penthouse Arcos Vallarta</h4>
        <strong id="propertyPrice">${propertyPrice}</strong>
        <p class="property-location">Arcos Vallarta · Guadalajara/Zapopan · 280 m² · Terraza skyline</p>
        <div class="listing-tags"><span id="webStatus">${webStatus}</span><span>Owner: Mariana López</span><span>Media 96%</span><span>Interest 92</span><span>Score 88</span><span>Web sync listo</span></div>
      </article>
      <article class="dash-panel websync"><b>Acciones rápidas</b><p>Una propiedad alimenta sitio web, landing, WhatsApp, PDF y portales.</p><div class="listing-tags listing-specs"><span>3 recámaras</span><span>3.5 baños</span><span>280 m²</span><span>Terraza</span></div><button id="publishChanges">Publicar</button><button id="updatePrice">Actualizar precio</button><button data-action="landing">Generar landing</button><button data-action="whatsapp">Compartir WhatsApp</button><button data-action="pdf">Generar PDF</button></article>
      <article class="dash-panel analytics-mini"><b>Performance vivo</b><div class="property-metrics"><span>1,284 vistas<strong>+18%</strong></span><span>43 leads<strong>7 hot</strong></span><span>12 fichas enviadas<strong>Hoy</strong></span></div><div class="bars"><i style="height:42%"></i><i style="height:74%"></i><i style="height:58%"></i><i style="height:88%"></i></div></article>
    </section>`;
}

function crmView() {
  return `
    <section class="crm-view crm-product">
      <article class="lead-inbox">${leads.map((lead, index) => `<button class="${index === activeLead ? "active" : ""}" data-lead="${index}"><b>${lead.name}</b><span>${lead.source} · ${lead.interest}</span><em>${lead.score}</em></button>`).join("")}</article>
      <article class="dash-panel lead-intelligence"><b>Lead Intelligence</b>${leadContext(leads[activeLead])}</article>
      <article class="dash-panel crm-side"><b>Siguiente mejor acción</b><div class="ai-action"><strong>${leads[activeLead].next}</strong><span>Fuente: ${leads[activeLead].source}</span><span>Último contacto: ${leads[activeLead].last}</span></div><b>Propiedades sugeridas</b><div class="suggested-list">${leads[activeLead].suggested.map((item) => `<span>${item}</span>`).join("")}</div><b>Timeline</b><ul><li>Lead capturado desde ${leads[activeLead].source}</li><li>Score actualizado por intención de compra</li><li>Asesor sugerido: ${leads[activeLead].advisor}</li></ul><div class="chat-actions"><button data-crm="reply">Respuesta IA</button><button data-crm="task">Crear tarea</button><button data-crm="visit">Agendar visita</button></div></article>
    </section>`;
}

function leadContext(lead) {
  return `<h4>${lead.name}</h4><p>${lead.msg}</p><div class="score-ring"><strong>${lead.score}</strong><span>Lead Score</span></div><div class="listing-tags"><span>${lead.temp}</span><span>${lead.advisor}</span><span>${lead.interest}</span><span>${lead.last}</span></div>`;
}

function kanbanView() {
  return `<section class="single-kanban" id="singleKanban">${stages.map((stage) => {
    const cards = deals.filter((deal) => deal.stage === stage);
    return `<div class="single-col stage-${stageMeta[stage].tone}" data-stage="${stage}"><b>${stage}<em>${cards.length}</em></b>${cards.map((deal) => `<article class="single-deal stage-${stageMeta[stage].tone}" draggable="true" data-id="${deal.id}"><i>${stageMeta[stage].short}</i><strong>${deal.name}</strong><span>${deal.property}</span><small>${deal.value} · ${deal.source} · ${deal.advisor}</small><em class="score-chip">Score ${deal.score}</em><button>Mover</button></article>`).join("")}</div>`;
  }).join("")}<footer id="kanbanActivity">Arrastra un deal para activar Atlas.</footer></section>`;
}

function whatsappView() {
  const lead = leads[activeLead];
  return `
    <section class="whatsapp-view whatsapp-product">
      <aside class="lead-inbox compact wa-list"><b>Conversaciones</b>${leads.map((item, index) => `<button class="${index === activeLead ? "active" : ""}" data-lead="${index}"><b>${item.name}</b><span>${item.msg}</span><em>${item.score}</em></button>`).join("")}</aside>
      <article class="chat-panel"><b><span>${lead.name}</span><small>WhatsApp Business · última interacción ${lead.last}</small></b><div class="chat-bubbles" id="chatBubbles"><p class="in">${lead.msg}</p><p class="out">Claro. Tengo una propiedad ideal y te comparto ficha con disponibilidad.</p><div class="wa-property-card"><img src="assets/images/penthouse-arcos-vallarta.jpg" alt=""><span><strong>Penthouse Arcos Vallarta</strong>$18.4M · 3 recámaras · Terraza</span></div><p class="ai">Respuesta IA: Recomiendo enviar ficha, proponer visita y crear deal Calificado.</p></div><div class="chat-actions"><button data-wa="ai">Respuesta IA</button><button data-wa="sheet">Compartir ficha</button><button data-wa="deal">Crear Deal</button><button data-wa="follow">Programar seguimiento</button><button data-wa="hot">Marcar caliente</button></div></article>
      <article class="dash-panel context"><b>Contexto operativo</b><span>Lead Score <strong id="leadScore">${lead.score}</strong></span><span>Temperatura <strong id="leadTemp">${lead.temp}</strong></span><span>Asesor <strong>${lead.advisor}</strong></span><span>Interés <strong>${lead.interest}</strong></span><span>Última interacción <strong>${lead.last}</strong></span></article>
    </section>`;
}

function automationView() {
  return `<section class="automation-view automation-product"><article class="workflow-chain" id="workflowChain"><b>Workflow activo · Preventa Premium</b>${["WHEN Lead nuevo desde web", "IF Interés en propiedad premium", "THEN Asignar asesor", "THEN Enviar WhatsApp", "THEN Crear deal", "THEN Programar seguimiento", "THEN Actualizar dashboard"].map((step) => `<span>${step}</span>`).join("")}</article><article class="dash-panel automation-meta"><b>Timeline</b><span>Última ejecución <strong>Hoy 10:03</strong></span><span>Tiempo <strong>1.8s</strong></span><span>Próxima ejecución <strong>Cuando entre lead premium</strong></span><span>Historial <strong>284 runs · 99.1% success</strong></span><button class="run-btn" id="runAutomation">Ejecutar workflow</button><p id="automationStatus">Listo para ejecutar</p></article></section>`;
}

function analyticsView() {
  return `<section class="analytics-view analytics-product"><div class="kpi-row">${kpi("128", "Leads", "blue")}${kpi("42%", "Conversión", "green")}${kpi("11 min", "Respuesta", "cyan")}${kpi("$2.8M", "Comisiones", "violet")}</div><article class="dash-panel big-chart"><b>Embudo comercial</b><div class="funnel-bars"><span style="width:100%">Leads 128</span><span style="width:74%">Calificados 94</span><span style="width:45%">Visitas 58</span><span style="width:28%">Cierre 36</span></div></article><article class="dash-panel analytics-side"><div class="analytics-side-card"><b>Top asesor</b><h4>Mariana López</h4><p><strong>51% conversión</strong><span>$31.8M pipeline</span></p></div><div class="analytics-side-card"><b>Inventario</b><p><strong>316 activos</strong><span>24 premium</span><span>8 alertas</span></p></div><div class="analytics-side-card"><b>Ciudades principales</b><p><strong>Zapopan</strong><span>Guadalajara</span><span>Tlaquepaque</span></p></div><div class="analytics-side-card"><b>Tiempo respuesta</b><p><strong>11 min promedio</strong><span class="positive">-34% vs semana anterior</span></p></div></article></section>`;
}

function docsView() {
  return `<section class="docs-view"><article class="dash-panel doc-stack"><b>Expediente digital</b>${documents.map((doc) => `<div class="doc-row"><i>PDF</i><span><strong>${doc[0]}</strong><small>Relacionado a: ${doc[2]}</small></span><em>${doc[1]}</em></div>`).join("")}</article><article class="dash-panel doc-context"><b>Trazabilidad</b><span>Lead <strong>Carlos Méndez</strong></span><span>Property <strong>Penthouse Arcos Vallarta</strong></span><span>Deal <strong>Calificado</strong></span><span>Asesor <strong>Mariana López</strong></span><button class="run-btn">Generar paquete IA</button></article></section>`;
}

function marketplaceView() {
  return `<section class="market-view marketplace-product">${integrations.map((item) => `<article class="integration-card"><i>${item[0]}</i><span><b>${item[1]}</b><small>${item[3]}</small></span><em>${item[2]}</em><button>${item[4]}</button></article>`).join("")}</section>`;
}

function bindView(view) {
  if (view === "property") {
    document.getElementById("updatePrice").addEventListener("click", () => {
      propertyPrice = propertyPrice === "$18.4M MXN" ? "$18.9M MXN" : "$18.4M MXN";
      webStatus = "Sync pending";
      setView("property");
    });
    document.getElementById("publishChanges").addEventListener("click", () => {
      webStatus = "Publicado";
      setView("property");
    });
    document.querySelectorAll("[data-action]").forEach((button) => button.addEventListener("click", () => showToast(`${button.textContent} listo en Property Engine`)));
  }
  if (view === "crm" || view === "whatsapp") {
    document.querySelectorAll("[data-lead]").forEach((button) => button.addEventListener("click", () => {
      activeLead = Number(button.dataset.lead);
      setView(view);
    }));
  }
  if (view === "crm") {
    document.querySelectorAll("[data-crm]").forEach((button) => button.addEventListener("click", () => showToast(`${button.textContent} creado desde Lead Intelligence`)));
  }
  if (view === "kanban") bindKanban();
  if (view === "whatsapp") {
    document.querySelectorAll("[data-wa]").forEach((button) => button.addEventListener("click", () => {
      const lead = leads[activeLead];
      if (button.dataset.wa === "ai") document.getElementById("chatBubbles").insertAdjacentHTML("beforeend", `<p class="out">Respuesta sugerida: enviemos ficha y agenda en este momento.</p>`);
      if (button.dataset.wa === "sheet") document.getElementById("chatBubbles").insertAdjacentHTML("beforeend", `<p class="card">Ficha enviada · ${lead.interest}</p>`);
      if (button.dataset.wa === "deal") showToast("Deal creado dentro de Atlas");
      if (button.dataset.wa === "follow") showToast("Seguimiento programado para mañana");
      if (button.dataset.wa === "hot") { lead.score = Math.min(99, lead.score + 10); lead.temp = "Caliente"; setView("whatsapp"); }
      showToast("Lead actualizado en Atlas");
    }));
  }
  if (view === "automation") {
    document.getElementById("runAutomation").addEventListener("click", runAutomation);
  }
}

function bindKanban() {
  const board = document.getElementById("singleKanban");
  let dragId = null;
  board.addEventListener("dragstart", (event) => {
    const card = event.target.closest(".single-deal");
    if (!card) return;
    dragId = card.dataset.id;
    event.dataTransfer.setData("text/plain", dragId);
  });
  board.addEventListener("dragover", (event) => {
    const col = event.target.closest(".single-col");
    if (!col) return;
    event.preventDefault();
    col.classList.add("over");
  });
  board.addEventListener("dragleave", (event) => event.target.closest(".single-col")?.classList.remove("over"));
  board.addEventListener("drop", (event) => {
    const col = event.target.closest(".single-col");
    if (!col) return;
    event.preventDefault();
    const deal = deals.find((item) => item.id === (event.dataTransfer.getData("text/plain") || dragId));
    if (deal) {
      deal.stage = col.dataset.stage;
      showToast(`${deal.name} movido a ${deal.stage}`);
      setView("kanban");
    }
  });
  board.addEventListener("click", (event) => {
    const btn = event.target.closest(".single-deal button");
    if (!btn) return;
    const deal = deals.find((item) => item.id === btn.closest(".single-deal").dataset.id);
    const next = stages[Math.min(stages.indexOf(deal.stage) + 1, stages.length - 1)];
    deal.stage = next;
    setView("kanban");
  });
}

async function runAutomation() {
  const status = document.getElementById("automationStatus");
  const steps = [...document.querySelectorAll("#workflowChain span")];
  status.textContent = "Ejecutando";
  steps.forEach((step) => step.classList.remove("active", "done"));
  for (const step of steps) {
    step.classList.add("active");
    await new Promise((resolve) => setTimeout(resolve, 220));
    step.classList.remove("active");
    step.classList.add("done");
  }
  status.textContent = "Workflow ejecutado en 1.8s";
  showToast("Workflow ejecutado en 1.8s");
}

document.querySelectorAll(".dash-sidebar button").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

function openFounderFlow() {
  founderBackdrop.hidden = false;
  founderModal.showModal();
}

function closeFounderFlow() {
  founderModal.close();
  founderBackdrop.hidden = true;
}

founderAccess?.addEventListener("click", openFounderFlow);
founderClose?.addEventListener("click", closeFounderFlow);
founderOk?.addEventListener("click", closeFounderFlow);
founderBackdrop?.addEventListener("click", closeFounderFlow);
founderModal?.addEventListener("close", () => { founderBackdrop.hidden = true; });

function scrollToWorkspace(behavior = "smooth") {
  productHome?.scrollTo({ top: workspaceSection?.offsetTop || window.innerHeight, behavior });
}

document.querySelectorAll('a[href="#workspace"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    history.replaceState(null, "", "#workspace");
    scrollToWorkspace();
  });
});

if (window.location.hash === "#workspace") {
  requestAnimationFrame(() => scrollToWorkspace("auto"));
}

setView("command");
