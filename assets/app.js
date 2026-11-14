/* BennieAgro Farming Solutions – shared site script */
const WA = {Namibia:"264812610659", Zimbabwe:"263772430498"};
const EMAIL = "bennieagro.farmingsolutions@gmail.com";

const SERVICES = [
  {t:"core",ic:"🧑🏾‍🌾",n:"Agricultural consultancy",d:"Crop and animal production advisory, farm assessments, crop planning, production troubleshooting and practical farm management support."},
  {t:"core",ic:"👥",n:"Community training & capacity building",d:"Village workshops, field demonstrations, seasonal training, mentorship and training-of-trainers tailored to local crops, livestock and climate."},
  {t:"core",ic:"🌦️",n:"Climate-smart farming",d:"Water-use efficiency, moisture conservation, drought and heat adaptation, resilient crop choices, diversification and agroforestry."},
  {t:"core",ic:"🍃",n:"Organic & ecological farming",d:"Soil-building, compost and manure management, rotations, cover crops, mulching, biodiversity and approved organic inputs."},
  {t:"core",ic:"🐞",n:"Integrated Pest Management (IPM)",d:"Field scouting, pest and disease identification, thresholds, cultural, biological and targeted chemical controls."},
  {t:"core",ic:"🧪",n:"Integrated nutrient management",d:"Soil testing where available, nutrient budgeting, balanced crop nutrition, efficient fertilizer placement and organic matter management."},
  {t:"core",ic:"💧",n:"Irrigation systems",d:"Irrigation assessment, system planning, installation support and water-management advice, including drip systems."},
  {t:"core",ic:"🌱",n:"Input supply",d:"Seeds, fertilizers, crop-protection products and related inputs, with guidance on safe, label-compliant use."},
  {t:"core",ic:"🏡",n:"Greenhouses & shade-net houses",d:"Planning, construction and installation of protected production structures, plus crop management advice inside them."},
  {t:"core",ic:"🚜",n:"Farm visits & technical follow-up",d:"On-site inspections, crop monitoring, diagnosis, progress reviews and timely recommendations."},
  {t:"core",ic:"🐄",n:"Crop & animal production support",d:"Crop establishment, nutrition, pests and diseases, livestock husbandry and production planning."},
  {t:"extended",ic:"🔬",n:"Soil, water & leaf analysis",d:"Sampling and interpretation of laboratory soil, irrigation-water and plant-tissue tests to guide fertility and irrigation decisions."},
  {t:"extended",ic:"📈",n:"Farm business plans & feasibility studies",d:"Enterprise budgets, cash-flow projections and bankable proposals for finance, grants or investor applications."},
  {t:"extended",ic:"☀️",n:"Borehole siting & solar-powered pumping",d:"Water-source assessment and solar pumping and storage design for irrigation and livestock water."},
  {t:"extended",ic:"🐔",n:"Poultry & piggery project setup",d:"Housing layout, stocking plans, feeding programmes, biosecurity and production records for broilers, layers and pigs."},
  {t:"extended",ic:"🐟",n:"Aquaculture (fish farming)",d:"Pond and tank system planning, fingerling sourcing, feeding and water-quality management for tilapia and other species."},
  {t:"extended",ic:"🥬",n:"Hydroponics & tunnel production",d:"Soilless and high-value tunnel production systems: setup, fertigation programmes and crop scheduling."},
  {t:"extended",ic:"🍊",n:"Orchard establishment",d:"Site and cultivar selection, planting layout, pruning, nutrition and orchard management plans."},
  {t:"extended",ic:"🌿",n:"Nursery & seedling production",d:"Seedling nursery setup and supply planning for vegetables, fruit trees and agroforestry species."},
  {t:"extended",ic:"🚛",n:"Market linkages & post-harvest handling",d:"Harvest timing, grading, packaging and cold-chain advice, and connecting producers to buyers and contract farming."},
  {t:"extended",ic:"🏭",n:"Agro-processing & value addition",d:"Small-scale processing concepts such as drying, milling and packaging to earn more from produce."},
  {t:"extended",ic:"📋",n:"GAP & certification readiness",d:"Preparation for Good Agricultural Practice, organic or export-market certification: records, hygiene and compliance."},
  {t:"extended",ic:"🐐",n:"Livestock nutrition & rangeland management",d:"Feed and supplementation plans, fodder production, grazing management and herd health planning with vets."},
  {t:"extended",ic:"🛰️",n:"Farm mapping & digital record-keeping",d:"Field mapping, simple farm-management apps and record systems to track inputs, costs and yields."}
];
const MODULES = ["Soil health, composting, mulching & soil fertility","Crop establishment, spacing & irrigation scheduling","IPM, pest scouting & safe crop protection","Integrated nutrient use & fertilizer efficiency","Climate-smart planning, drought & heat stress","Horticulture, protected cultivation & post-harvest","Livestock husbandry & farm biosecurity","Farm budgeting, records & enterprise planning"];

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- Shared: nav, footer year, WhatsApp button ---------- */
$("#yr") && ($("#yr").textContent = new Date().getFullYear());
$("#menuBtn") && ($("#menuBtn").onclick = () => $("#navlinks").classList.toggle("open"));
$("#fabBtn") && ($("#fabBtn").onclick = () => $("#fabMenu").classList.toggle("open"));

/* ---------- Services page ---------- */
const svcGrid = $("#svcGrid");
if (svcGrid) {
  const render = f => {
    svcGrid.innerHTML = SERVICES.map((s, i) => ({...s, i})).filter(s => f === "all" || s.t === f).map(s => `
      <div class="svc">${s.t === "extended" ? '<span class="pill">On request</span>' : ''}
        <div class="ic">${s.ic}</div><h3>${s.n}</h3><p>${s.d}</p>
        <a class="enq" href="contact.html#svc-${s.i}">Enquire about this →</a></div>`).join("");
  };
  const start = ["core","extended"].includes(location.hash.slice(1)) ? location.hash.slice(1) : "all";
  render(start);
  $$(".tabs button").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === start);
    b.onclick = () => { $$(".tabs button").forEach(x => x.classList.remove("active")); b.classList.add("active"); render(b.dataset.filter); };
  });
}

/* Home page service highlights */
const svcHome = $("#svcHome");
if (svcHome) {
  svcHome.innerHTML = [0,6,8,4,7,1].map(i => SERVICES[i]).map(s => `
    <div class="svc"><div class="ic">${s.ic}</div><h3>${s.n}</h3><p>${s.d}</p>
    <a class="enq" href="contact.html#svc-${SERVICES.indexOf(s)}">Enquire →</a></div>`).join("");
}

/* ---------- Training page: module picker ---------- */
const modBox = $("#modules");
if (modBox) {
  modBox.innerHTML = MODULES.map((m, i) => `<label class="module"><input type="checkbox" value="${i}">${m}</label>`).join("");
  const sel = () => $$("#modules input:checked").map(i => +i.value);
  modBox.addEventListener("change", e => {
    e.target.closest(".module").classList.toggle("sel", e.target.checked);
    const n = sel().length; $("#modCount").textContent = n + " module" + (n === 1 ? "" : "s") + " selected";
  });
  $("#trainBtn").onclick = () => { location.href = "contact.html#train-" + (sel().join("-") || "none"); };
}

/* ---------- Contact page: enquiry form ---------- */
const form = $("#enqForm");
if (form) {
  const LABELS = {quote:"Tell us about your project", visit:"What should we look at during the visit?", training:"Tell us about your group and goals", general:"Your message"};
  const TYPE_NAMES = {quote:"Quote request", visit:"Farm visit booking", training:"Training programme request", general:"General enquiry"};
  let formType = "quote";
  const svcSel = $("#svcSelect");
  svcSel.innerHTML = '<option value="">Not sure yet / multiple</option><optgroup label="Core services">' +
    SERVICES.filter(s => s.t === "core").map(s => `<option>${s.n}</option>`).join("") + '</optgroup><optgroup label="Extended services">' +
    SERVICES.filter(s => s.t === "extended").map(s => `<option>${s.n}</option>`).join("") + '</optgroup>';

  function setFormType(t) {
    formType = t; $("#formWrap").classList.remove("hidden"); $("#doneWrap").classList.add("hidden");
    $$("#ftabs button").forEach(b => b.classList.toggle("active", b.dataset.type === t));
    $$("[data-show]").forEach(el => el.classList.toggle("hidden", !el.dataset.show.split(" ").includes(t)));
    $("#msgLabel").textContent = LABELS[t];
    if (t === "training" && !svcSel.value) svcSel.value = "Community training & capacity building";
    if (t === "visit" && !svcSel.value) svcSel.value = "Farm visits & technical follow-up";
  }
  $$("#ftabs button").forEach(b => b.onclick = () => setFormType(b.dataset.type));

  function applyHash() {
    const h = location.hash.slice(1);
    if (["quote","visit","training","general"].includes(h)) setFormType(h);
    else if (h.startsWith("svc-")) { const s = SERVICES[+h.slice(4)]; setFormType("quote"); if (s) svcSel.value = s.n; }
    else if (h.startsWith("train-")) {
      const ids = h.slice(6).split("-").map(Number).filter(n => MODULES[n]);
      svcSel.value = "Community training & capacity building"; setFormType("training");
      $("#modField").value = ids.map(i => MODULES[i]).join("; ");
    } else setFormType(formType);
  }
  applyHash(); window.addEventListener("hashchange", applyHash);

  const tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
  form.querySelector("[name=date]").min = tmr.toISOString().slice(0, 10);

  function summary(d) {
    const L = [`*BennieAgro – ${TYPE_NAMES[d.type]}* (Ref ${d.ref})`, `Name: ${d.name}`];
    if (d.org) L.push(`Organisation/farm: ${d.org}`);
    L.push(`Phone: ${d.phone}`); if (d.email) L.push(`Email: ${d.email}`);
    L.push(`Location: ${[d.location, d.country].filter(Boolean).join(", ")}`, `Client type: ${d.clientType}`);
    if (d.service) L.push(`Service: ${d.service}`);
    if (d.type === "quote" || d.type === "visit") { if (d.farmSize) L.push(`Farm size: ${d.farmSize}`); if (d.crops) L.push(`Crops/livestock: ${d.crops}`); }
    if (d.type === "visit") L.push(`Preferred visit: ${d.date} (${d.time})`);
    if (d.type === "training") { if (d.participants) L.push(`Participants: ${d.participants}`); if (d.modules) L.push(`Modules: ${d.modules}`); }
    if (d.message) L.push(`Message: ${d.message}`);
    L.push(`Preferred contact: ${d.contactPref}`);
    return L.join("\n");
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(form).entries());
    const errs = [];
    if (!fd.name.trim()) errs.push("your name");
    if (!fd.phone.trim() || fd.phone.replace(/\D/g, "").length < 7) errs.push("a valid phone number");
    if (fd.email && !/^\S+@\S+\.\S+$/.test(fd.email)) errs.push("a valid email (or leave it blank)");
    if (formType === "visit" && !fd.date) errs.push("a preferred visit date");
    if (errs.length) { $("#formErr").textContent = "Please provide " + errs.join(", ") + "."; $("#formErr").classList.remove("hidden"); return; }
    $("#formErr").classList.add("hidden");
    const d = {...fd, type: formType, ref: "BA-" + Date.now().toString(36).toUpperCase().slice(-6)};
    const msg = summary(d), plain = msg.replace(/\*/g, ""), num = WA[d.country] || WA.Namibia;
    const wa = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
    const mail = `mailto:${EMAIL}?subject=${encodeURIComponent(TYPE_NAMES[d.type] + " – " + d.ref)}&body=${encodeURIComponent(plain)}`;
    $("#formWrap").classList.add("hidden");
    const done = $("#doneWrap"); done.classList.remove("hidden");
    done.innerHTML = `
      <div class="tick">📨</div>
      <h3>Almost done — send your request to us</h3>
      <p>Your reference is <span class="ref">${d.ref}</span>.</p>
      <p style="color:var(--muted)">Tap below to send your details to our ${d.country === "Zimbabwe" ? "Zimbabwe" : "Namibia"} team on WhatsApp (pre-filled), or by email.</p>
      <div class="acts">
        <a class="btn btn-wa" href="${wa}" target="_blank" rel="noopener">Send on WhatsApp</a>
        <a class="btn btn-ghost" href="${mail}">Send by email</a>
        <button class="btn btn-ghost" id="copyBtn" type="button">Copy details</button>
      </div>
      <details style="text-align:left;max-width:520px;margin:0 auto"><summary style="cursor:pointer;color:var(--forest);font-weight:600">View your request</summary><pre style="white-space:pre-wrap;background:var(--cream);padding:14px;border-radius:10px;font-size:.85rem">${esc(plain)}</pre></details>
      <p style="margin-top:16px"><button class="btn btn-sm btn-dark" type="button" id="againBtn">Submit another request</button></p>`;
    $("#copyBtn").onclick = async () => { try { await navigator.clipboard.writeText(plain); $("#copyBtn").textContent = "Copied ✓"; } catch (_) { $("#copyBtn").textContent = "Copy not available"; } };
    $("#againBtn").onclick = () => setFormType(formType);
    form.reset();
    done.scrollIntoView({block: "center"});
  });
}

/* ---------- Ask an Agronomist page: chat ---------- */
const log = $("#chatLog");
if (log) {
  const addMsg = (text, who) => { const m = document.createElement("div"); m.className = "msg " + who; m.textContent = text; log.appendChild(m); log.scrollTop = log.scrollHeight; return m; };
  addMsg("Hello! I'm the BennieAgro assistant. Ask me about crops, irrigation, pests, soil, livestock or our services. How can I help?", "bot");
  let history = [], busy = false, samplerP = null;
  try { if (window.claude && window.claude.use) samplerP = window.claude.use("sample").catch(() => null); } catch (_) {}

  const SYSTEM = `You are the BennieAgro Assistant on the website of BennieAgro Farming Solutions, an agricultural consultancy and practical farming support business serving Namibia and Zimbabwe (office: 18 Stephenson Street, Windhoek North; Namibia +264 81 261 0659; Zimbabwe +263 77 243 0498; email ${EMAIL}).
Services: ${SERVICES.map(s => s.n + (s.t === "extended" ? " (on request)" : "")).join("; ")}.
Training modules: ${MODULES.join("; ")}.
Rules: Give practical, concise farming guidance (under 170 words, plain text, short "-" bullet lines allowed) suited to semi-arid southern African conditions. Favour IPM, soil health, water efficiency and climate-smart approaches. Never give specific pesticide doses or product prescriptions; say to follow the product label and local regulations. If a problem needs diagnosis, say a photo or farm visit is needed and suggest booking a farm visit or WhatsApp. For animal health emergencies advise contacting a veterinarian. Do not invent prices; pricing is quoted per project. Stay on agriculture and BennieAgro topics.`;

  const FAQ = [
    [/price|cost|quote|how much|fee/i, "Pricing depends on your farm, location and scope, so we quote per project. Use the “Request a quote” form on our Contact page or WhatsApp us and we’ll get back to you."],
    [/train|workshop|cooperative|group|course|school/i, "Yes — we run community-based training: field demonstrations, seasonal training, mentorship and training-of-trainers. Modules include soil health, irrigation scheduling, IPM, nutrient management, climate-smart planning, horticulture, livestock husbandry and farm budgeting. Build your programme on our Training page."],
    [/drip|irrigat|water|borehole|pump|solar/i, "We assess your water source, soil and crop, then plan and support installation of a suitable system (often drip for vegetables). Key points: know your water volume and quality, match emitter spacing to the crop, filter well and schedule irrigation by soil moisture. Book a farm visit for a design for your site."],
    [/yellow|spot|pest|disease|insect|worm|blight|aphid|leaf|leaves|whitefly|tuta/i, "Symptoms like spots or yellowing can come from pests, diseases or nutrient problems, so correct identification comes first. Scout regularly, remove badly affected plants, avoid overhead watering late in the day, and follow product labels if spraying. Send us photos on WhatsApp or book a farm visit for a proper diagnosis."],
    [/drought|dry|heat|climate|rain/i, "Drought-tolerant options include sorghum, pearl millet (mahangu), cowpeas, groundnuts and cassava where suited. Combine them with mulching, conservation tillage, early planting on the first effective rains and water harvesting. We can help plan the right mix for your area."],
    [/greenhouse|shade|tunnel|net/i, "We plan, construct and install greenhouses and shade-net houses, and advise on crop management inside them — ventilation, irrigation, nutrition and pest control. Request a quote with your planned size and crops."],
    [/organic|compost|manure|soil/i, "Build soil health with mature compost, well-managed manure, mulching, crop rotation and cover crops. A soil test helps balance nutrients. If you want certified organic status, the farm must follow the certification standard and approved input rules — we can guide you."],
    [/poultry|chicken|broiler|layer|pig|goat|cattle|livestock|fish/i, "We support livestock projects including husbandry, housing, feeding, biosecurity and production planning (poultry, pigs, small stock, cattle, and fish on request). For sick animals, contact a veterinarian promptly. Tell us about your project via the Contact page."],
    [/where|location|namibia|zimbabwe|area|office/i, "We work across Namibia and Zimbabwe. Our office is at 18 Stephenson Street, Windhoek North. Call or WhatsApp +264 81 261 0659 (Namibia) or +263 77 243 0498 (Zimbabwe)."],
    [/seed|fertili|input|chemical|spray/i, "We supply seeds, fertilizers, crop-protection products and related inputs, with guidance on safe, label-compliant use. Tell us your crop and area and we’ll recommend suitable options."]
  ];
  const faqAnswer = q => { for (const [re, a] of FAQ) if (re.test(q)) return a; return "Thanks for your question! For the best advice our agronomists will respond directly — WhatsApp +264 81 261 0659 (Namibia) or +263 77 243 0498 (Zimbabwe), or use the form on our Contact page."; };

  async function ask(q) {
    if (busy || !q.trim()) return; busy = true;
    $("#sugs").classList.add("hidden");
    addMsg(q, "me"); history.push({role: "user", content: q});
    const bot = addMsg("Thinking…", "bot");
    let answer = null;
    try {
      const sampler = samplerP ? await Promise.race([samplerP, new Promise(r => setTimeout(() => r(null), 3000))]) : null;
      if (sampler) {
        const msgs = history.slice(-10);
        while (msgs.length && msgs[0].role !== "user") msgs.shift();
        msgs[0] = {role: "user", content: SYSTEM + "\n\nFarmer's question: " + msgs[0].content};
        const r = await sampler(msgs, {cache: false, modelTier: "quick", onText: ({text}) => { bot.textContent = text; log.scrollTop = log.scrollHeight; }});
        answer = r.text;
      }
    } catch (_) { answer = null; }
    if (!answer) { await new Promise(r => setTimeout(r, 400)); answer = faqAnswer(q); }
    bot.textContent = answer; history.push({role: "assistant", content: answer});
    log.scrollTop = log.scrollHeight; busy = false;
  }
  $("#chatForm").onsubmit = e => { e.preventDefault(); const v = $("#chatIn").value; $("#chatIn").value = ""; ask(v); };
  $$("#sugs button").forEach(b => b.onclick = () => ask(b.textContent));
}
