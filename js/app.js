const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

/* Boot */
(async()=>{
  const text=$("#bootText"),bar=$("#bootBar");
  const lines=[
    "[BOOT] Loading SUDHEER.SEC identity core...",
    "[OK] SOC / DFIR modules online",
    "[OK] RGB visual engine loaded",
    "[OK] Live telecast interface loaded",
    "[SAFE] External targets disabled",
    "[READY] Cyber defense operations center online."
  ];
  for(const line of lines){text.innerHTML+=`<div>${line}</div>`;await sleep(95)}
  bar.style.width="100%";await sleep(500);$("#boot").classList.add("hide");
})();

/* Mobile nav */
$("#menuBtn").onclick=()=>$("#nav").classList.toggle("open");
$$("nav a").forEach(a=>a.onclick=()=>$("#nav").classList.remove("open"));

/* Terminal */
const terminalLines=[
  ["$ sudo socctl status","dim"],
  ["[IDENTITY] SINGURU SUDHEER","cyan"],
  ["[OK] Wazuh telemetry ........ ONLINE","ok"],
  ["[OK] Threat detection ........ READY","ok"],
  ["[OK] DFIR evidence vault ..... READY","ok"],
  ["[WARN] Suspicious event detected","red"],
  ["[SOC] Correlation rule: WEB-ANOMALY-07","cyan"],
  ["[SOC] Analyst workflow: ACTIVE","ok"],
  ["$ tail -f /var/log/security/events","dim"]
];
(async()=>{
  const box=$("#terminal");
  for(const [line,cls] of terminalLines){
    const el=document.createElement("span");el.className=`term-line ${cls}`;box.appendChild(el);
    for(const c of line){el.textContent+=c;await sleep(5)} await sleep(55);
  }
})();

/* Matrix / hacker background effect */
const canvas=$("#matrix"),ctx=canvas.getContext("2d");let drops=[];
function resizeMatrix(){canvas.width=innerWidth;canvas.height=innerHeight;drops=Array(Math.ceil(innerWidth/18)).fill(1)}
resizeMatrix();addEventListener("resize",resizeMatrix);
setInterval(()=>{
  ctx.fillStyle="rgba(5,5,5,.10)";ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#b7bec7";ctx.font="10px JetBrains Mono";
  drops.forEach((y,i)=>{const chars="01<>/{}[]$#@";const x=i*18;ctx.fillText(chars[Math.floor(Math.random()*chars.length)],x,y*10);if(y*10>canvas.height&&Math.random()>.975)drops[i]=0;drops[i]++});
},85);

/* Live event stream */
const eventTemplates=[
 ["RED_TEAM","10.10.20.15","Reconnaissance event generated","LOW"],
 ["RED_TEAM","LAB-WEB-01","Suspicious HTTP request simulation","HIGH"],
 ["SENSOR","AUTH-SRV-01","Authentication anomaly observed","HIGH"],
 ["WAZUH","LAB-WEB-01","Rule 100221 correlation match","CRITICAL"],
 ["BLUE_TEAM","SOC-CONSOLE","Analyst investigation started","INFO"],
 ["DFIR","EVIDENCE-VAULT","Evidence integrity check passed","INFO"],
 ["BLUE_TEAM","LAB-WEB-01","Host isolation simulated","CRITICAL"],
 ["MISP","IOC-PIPELINE","Indicator enrichment completed","MEDIUM"]
];let eventIndex=0;
function addEvent(t=eventTemplates[eventIndex++%eventTemplates.length]){
  const [source,target,msg,sev]=t,row=document.createElement("div");row.className=`event ${sev==="CRITICAL"?"critical":""}`;
  row.innerHTML=`<time>${new Date().toLocaleTimeString([], {hour12:false})}</time><span class="source">${source}</span><span class="message">${msg} <small>→ ${target}</small></span><span class="sev">${sev}</span>`;
  const stream=$("#eventStream");stream.prepend(row);while(stream.children.length>16)stream.lastElementChild.remove();
  $("#statEpm").textContent=18+Math.floor(Math.random()*14);
}
for(let i=0;i<7;i++)addEvent();setInterval(()=>addEvent(),1800);$("#clearEvents").onclick=()=>$("#eventStream").innerHTML="";

/* Attack simulation */
const scenarios={
 web:["Reconnaissance started","Target fingerprint simulated","Suspicious web request generated","WAF telemetry generated","SIEM correlation triggered","Blue-team containment simulated"],
 auth:["Authentication surface discovered","Credential-attack event simulated","Multiple failed logins generated","Detection rule matched","Account protection triggered","Session contained"],
 network:["Network discovery simulated","Service inventory generated","Unexpected port event generated","Network sensor alert generated","Analyst correlation triggered","Host segment isolated"],
 malware:["Sample behavior simulation started","Process creation event generated","Network beacon event simulated","YARA-style match generated","EDR alert correlated","Execution path contained"]
};
$("#runAttack").onclick=async()=>{
 const type=$("#scenario").value,steps=scenarios[type],box=$("#attackConsole"),status=$("#attackStatus"),cards=$$("#attackChain>div");
 box.textContent="";status.textContent="RUNNING";status.className="red-text";cards.forEach(x=>x.classList.remove("active"));
 for(let i=0;i<steps.length;i++){box.textContent+=`[${new Date().toLocaleTimeString([], {hour12:false})}] ${steps[i]}\n`;if(cards[i])cards[i].classList.add("active");addEvent(["RED_TEAM","LAB-WEB-01",steps[i],i>3?"CRITICAL":"HIGH"]);await sleep(550)}
 status.textContent="CONTAINED";status.className="green-text";box.textContent+="[COMPLETE] Controlled scenario contained successfully.\n[SAFE] No external target contacted.";
};

/* Alerts / response */
const alerts=[
 ["CRITICAL","WEB-ANOMALY-07","Suspicious web request correlation","LAB-WEB-01"],
 ["HIGH","AUTH-FAIL-12","Repeated authentication failures","AUTH-SRV-01"],
 ["HIGH","PROC-NEW-44","Unexpected process behavior","ENDPOINT-03"],
 ["MEDIUM","NET-CONN-21","Unusual outbound connection","ENDPOINT-07"]
];
$("#alerts").innerHTML=alerts.map(a=>`<div class="alert"><span class="level">${a[0]}</span><p><b>${a[1]}</b><br>${a[2]}<br><small>${a[3]}</small></p><span>›</span></div>`).join("");
$$(".response-buttons button").forEach(btn=>btn.onclick=()=>{
 $("#responseLog").innerHTML=`<span class="green-text">[ACTION ACCEPTED]</span><br>${btn.dataset.response}<br><small>${new Date().toLocaleTimeString([], {hour12:false})} · analyst console</small>`;
 addEvent(["BLUE_TEAM","SOC-CONSOLE",btn.dataset.response,"INFO"]);
 $("#analystAction").textContent=btn.dataset.response.toUpperCase().slice(0,20);
});

/* Incident */
const timeline=["Alert generated","Analyst triage","IOC correlation","Evidence preserved","Host contained","Case closure"];
$("#timeline").innerHTML=timeline.map((x,i)=>`<div class="time-item ${i<4?"done":""}"><i></i><small>STEP ${String(i+1).padStart(2,"0")}</small><b>${x}</b></div>`).join("");
$("#containCase").onclick=()=>{$("#caseStatus").textContent="CONTAINED";$("#caseStatus").className="green-text";$$(".time-item").forEach(x=>x.classList.add("done"));$("#teleContain").textContent="CONTAINED";addEvent(["BLUE_TEAM","INC-2026-1042","Incident contained successfully","CRITICAL"])};
$("#closeCase").onclick=()=>{$("#caseStatus").textContent="CLOSED";$("#caseStatus").className="cyan-text";addEvent(["SOC","INC-2026-1042","Case closed — simulation complete","INFO"])};

/* Live hacker-vs-defender telecast */
const redChars="01 01 <> /sys/ scan --lab event:: packet packet // 0xA7 REDTEAM";
$("#redRain").textContent=Array(130).fill(0).map(()=>redChars[Math.floor(Math.random()*redChars.length)]).join("");
let broadcastSeconds=0;
setInterval(()=>{broadcastSeconds++;const h=String(Math.floor(broadcastSeconds/3600)).padStart(2,"0"),m=String(Math.floor(broadcastSeconds/60)%60).padStart(2,"0"),s=String(broadcastSeconds%60).padStart(2,"0");$("#broadcastTime").textContent=`${h}:${m}:${s}`},1000);
$("#telecastRun").onclick=async()=>{
 const status=$("#battleStatus"),console=$("#broadcastConsole"),action=$("#analystAction"),contain=$("#teleContain");
 const lines=[
  ["[LIVE]","Black-hat side: adversary event simulated..."],
  ["[DETECT]","Network sensor generated telemetry..."],
  ["[SIEM]","Correlation rule matched suspicious activity..."],
  ["[BLUE]","White-hat side: analyst triage initiated..."],
  ["[DFIR]","Evidence preservation workflow triggered..."],
  ["[DEFEND]","Containment action simulated — scenario complete."]
 ];
 console.innerHTML="";
 for(const [tag,msg] of lines){console.innerHTML+=`<span>${tag}</span> ${msg}\n`;status.textContent=msg.toUpperCase();await sleep(650)}
 action.textContent="CONTAIN";contain.textContent="CONTAINED";addEvent(["BLUE_TEAM","LIVE-TELECAST","Red vs White Hat scenario contained","CRITICAL"]);
};

/* ATT&CK interaction */
$$(".tactic").forEach(t=>t.onclick=()=>{$$(".tactic").forEach(x=>x.classList.remove("active"));t.classList.add("active")});

/* Reveal on scroll */
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("reveal")}),{threshold:.07});
$$(".panel,.section-title").forEach(el=>observer.observe(el));

/* Lightweight tilt for project cards */
$$(".float-card").forEach(card=>{
 card.addEventListener("pointermove",e=>{
  if(innerWidth<760)return;
  const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`translateY(-7px) rotateX(${(-y*3).toFixed(2)}deg) rotateY(${(x*3).toFixed(2)}deg)`;
 });
 card.addEventListener("pointerleave",()=>card.style.transform="");
});


/* Cinematic telemetry layer */
let packets=4821;
setInterval(()=>{
  packets += Math.floor(3+Math.random()*17);
  const el=$("#packetCount"); if(el) el.textContent=String(packets).padStart(6,"0");
  const levels=["ELEVATED","ELEVATED","HIGH","GUARDED"];
  const tl=$("#threatLevel"); if(tl) tl.textContent=levels[Math.floor(Math.random()*levels.length)];
},1200);

$("#cinematicMode")?.addEventListener("click",()=>{
  document.body.classList.toggle("cinematic-on");
  $("#cinematicMode").classList.toggle("active");
  $("#cinematicMode").textContent=document.body.classList.contains("cinematic-on")?"◉ CINEMATIC ACTIVE":"◉ CINEMATIC MODE";
});

/* Subtle section camera movement */
addEventListener("mousemove",e=>{
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  document.documentElement.style.setProperty("--mx",`${x*10}px`);
  document.documentElement.style.setProperty("--my",`${y*10}px`);
});
