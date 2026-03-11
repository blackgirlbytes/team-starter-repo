import { useState, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────
const REGIONS = [
  {
    id: "auth",
    name: "Auth Plains",
    terrain: "grass",
    x: 80, y: 300,
    w: 220, h: 160,
    color: "#4a8c3f",
    shade: "#2d5a27",
    complete: true,
    boss: { name: "SSO Dragon", defeated: true },
  },
  {
    id: "dashboard",
    name: "Dashboard Dunes",
    terrain: "desert",
    x: 340, y: 200,
    w: 260, h: 180,
    color: "#c8883a",
    shade: "#8a5a1f",
    complete: false,
    current: true,
    boss: { name: "Metrics Golem", defeated: false },
  },
  {
    id: "integrations",
    name: "Integration Isles",
    terrain: "water",
    x: 640, y: 120,
    w: 200, h: 200,
    color: "#3a7bbf",
    shade: "#1a4a80",
    complete: false,
    boss: { name: "Webhook Kraken", defeated: false },
  },
  {
    id: "mobile",
    name: "Mobile Mountains",
    terrain: "mountain",
    x: 580, y: 360,
    w: 230, h: 170,
    color: "#7a5fa0",
    shade: "#4a3060",
    locked: true,
    boss: { name: "Bowser Mobile", defeated: false },
  },
  {
    id: "billing",
    name: "Billing Bog",
    terrain: "ghost",
    x: 300, y: 420,
    w: 200, h: 140,
    color: "#5a7a5a",
    shade: "#2a4a2a",
    locked: true,
    boss: { name: "Stripe Specter", defeated: false },
  },
];

const TICKETS = [
  // Auth Plains
  { id:"T-101", title:"Sign up flow",    region:"auth",         x:120,  y:340, status:"done",   size:"M", owner:"RB" },
  { id:"T-102", title:"Email verify",    region:"auth",         x:180,  y:380, status:"done",   size:"S", owner:"MK" },
  { id:"T-103", title:"OAuth GitHub",    region:"auth",         x:240,  y:330, status:"done",   size:"L", owner:"RB" },
  { id:"T-104", title:"Invite links",    region:"auth",         x:155,  y:415, status:"done",   size:"S", owner:"PS" },
  // Dashboard Dunes
  { id:"T-201", title:"Activity feed",   region:"dashboard",    x:390,  y:240, status:"done",   size:"L", owner:"MK" },
  { id:"T-202", title:"Metrics cards",   region:"dashboard",    x:470,  y:210, status:"active", size:"M", owner:"RB" },
  { id:"T-203", title:"Filter system",   region:"dashboard",    x:530,  y:260, status:"active", size:"L", owner:"PS" },
  { id:"T-204", title:"Export CSV",      region:"dashboard",    x:430,  y:310, status:"todo",   size:"S", owner:null },
  { id:"T-205", title:"Dark mode",       region:"dashboard",    x:510,  y:330, status:"todo",   size:"M", owner:null },
  { id:"T-206", title:"Saved filters",   region:"dashboard",    x:575,  y:220, status:"todo",   size:"S", owner:null },
  // Integration Isles
  { id:"T-301", title:"Slack notifs",    region:"integrations", x:680,  y:165, status:"todo",   size:"L", owner:null },
  { id:"T-302", title:"GitHub sync",     region:"integrations", x:750,  y:145, status:"todo",   size:"L", owner:null },
  { id:"T-303", title:"Zapier hooks",    region:"integrations", x:720,  y:230, status:"todo",   size:"M", owner:null },
  { id:"T-304", title:"Webhook logs",    region:"integrations", x:790,  y:200, status:"todo",   size:"S", owner:null },
  // Mobile Mountains
  { id:"T-401", title:"iOS app",         region:"mobile",       x:625,  y:400, status:"todo",   size:"L", owner:null },
  { id:"T-402", title:"Push notifs",     region:"mobile",       x:700,  y:380, status:"todo",   size:"M", owner:null },
  { id:"T-403", title:"Offline mode",    region:"mobile",       x:760,  y:430, status:"todo",   size:"L", owner:null },
  // Billing Bog
  { id:"T-501", title:"Stripe setup",    region:"billing",      x:340,  y:455, status:"todo",   size:"L", owner:null },
  { id:"T-502", title:"Invoice PDF",     region:"billing",      x:410,  y:480, status:"todo",   size:"M", owner:null },
  { id:"T-503", title:"Usage limits",    region:"billing",      x:465,  y:445, status:"todo",   size:"S", owner:null },
];

// Paths between regions [from, to, waypoints]
const PATHS = [
  { from: "auth", to: "dashboard",    pts: [[300,370],[340,290]] },
  { from: "dashboard", to: "integrations", pts: [[600,240],[640,200]] },
  { from: "dashboard", to: "billing",      pts: [[420,380],[380,430]] },
  { from: "integrations", to: "mobile",    pts: [[700,320],[660,360]] },
  { from: "billing", to: "mobile",         pts: [[500,450],[560,430]] },
];

const STATUS = {
  done:   { color: "#5fc45a", icon: "★" },
  active: { color: "#f5c842", icon: "▶" },
  todo:   { color: "#aaaacc", icon: "○" },
};

const TERRAIN_PATTERNS = {
  grass:    { fill: "#4a8c3f", dots: "#3a6c2f", label: "🌿" },
  desert:   { fill: "#c8883a", dots: "#a86020", label: "🏜️" },
  water:    { fill: "#3a7bbf", dots: "#2a5a9f", label: "🌊" },
  mountain: { fill: "#7a5fa0", dots: "#5a3f80", label: "⛰️" },
  ghost:    { fill: "#5a7a5a", dots: "#3a5a3a", label: "👻" },
};

function TerrainShape({ region }) {
  const t = TERRAIN_PATTERNS[region.terrain];
  const { x, y, w, h } = region;
  const rx = w * 0.45;
  const ry = h * 0.45;
  const cx = x + w / 2;
  const cy = y + h / 2;

  // organic blob via path
  const blobPath = `
    M ${cx} ${y + 10}
    C ${cx + w*0.4} ${y} ${x+w+10} ${cy - h*0.2} ${x+w+5} ${cy}
    C ${x+w+15} ${cy + h*0.35} ${cx + w*0.3} ${y+h+10} ${cx} ${y+h+5}
    C ${cx - w*0.35} ${y+h+15} ${x-10} ${cy + h*0.3} ${x-5} ${cy}
    C ${x-15} ${cy - h*0.4} ${cx - w*0.3} ${y+5} ${cx} ${y+10}
    Z
  `;

  return (
    <g>
      <defs>
        <clipPath id={`clip-${region.id}`}>
          <path d={blobPath} />
        </clipPath>
        <pattern id={`dots-${region.id}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill={t.fill} />
          <circle cx="6" cy="6" r="1.5" fill={t.dots} opacity="0.5" />
        </pattern>
      </defs>

      {/* Shadow */}
      <path d={blobPath} fill="rgba(0,0,0,0.35)" transform="translate(5,6)" />
      {/* Terrain fill */}
      <path d={blobPath} fill={`url(#dots-${region.id})`} />
      {/* Edge highlight */}
      <path d={blobPath} fill="none" stroke={region.locked ? "#333" : t.dots} strokeWidth="3" opacity="0.6" />
      {/* Locked overlay */}
      {region.locked && (
        <path d={blobPath} fill="rgba(0,0,0,0.55)" />
      )}
      {/* Cliff edge blocks */}
      {[0,1,2,3].map(i => {
        const angle = (i / 4) * Math.PI * 2 + 0.4;
        const bx = cx + Math.cos(angle) * rx * 0.85;
        const by = cy + Math.sin(angle) * ry * 0.85;
        return (
          <rect key={i} x={bx-5} y={by-4} width={10} height={8}
            fill={region.shade} rx={1}
            clipPath={`url(#clip-${region.id})`}
          />
        );
      })}
    </g>
  );
}

function PathLine({ path }) {
  const fromR = REGIONS.find(r => r.id === path.from);
  const toR = REGIONS.find(r => r.id === path.to);
  if (!fromR || !toR) return null;

  const fx = fromR.x + fromR.w / 2;
  const fy = fromR.y + fromR.h / 2;
  const tx = toR.x + toR.w / 2;
  const ty = toR.y + toR.h / 2;

  const pts = [[fx,fy], ...path.pts, [tx,ty]];
  const d = pts.map((p,i) => `${i===0?"M":"L"}${p[0]},${p[1]}`).join(" ");

  return (
    <g>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#e8d88a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="10 8" opacity="0.7" />
    </g>
  );
}

function TicketNode({ ticket, onClick, isSelected }) {
  const s = STATUS[ticket.status];
  const locked = REGIONS.find(r => r.id === ticket.region)?.locked;
  const size = ticket.size === "L" ? 14 : ticket.size === "M" ? 12 : 10;

  return (
    <g
      onClick={() => !locked && onClick(ticket)}
      style={{ cursor: locked ? "not-allowed" : "pointer" }}
    >
      {/* Glow for active */}
      {ticket.status === "active" && (
        <circle cx={ticket.x} cy={ticket.y} r={size + 5} fill="#f5c842" opacity="0.2">
          <animate attributeName="r" values={`${size+4};${size+8};${size+4}`} dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.05;0.2" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
      {/* Node circle */}
      <circle cx={ticket.x} cy={ticket.y} r={size}
        fill={locked ? "#2a2a3a" : isSelected ? "#fff" : s.color}
        stroke={isSelected ? s.color : "rgba(0,0,0,0.4)"}
        strokeWidth={isSelected ? 3 : 2}
        opacity={locked ? 0.4 : 1}
      />
      {/* Icon */}
      <text x={ticket.x} y={ticket.y + 4}
        textAnchor="middle"
        fontSize={size * 0.9}
        fill={isSelected ? s.color : "#0a0a14"}
        fontFamily="monospace"
        fontWeight="bold"
      >
        {s.icon}
      </text>
      {/* Owner dot */}
      {ticket.owner && !locked && (
        <circle cx={ticket.x + size - 2} cy={ticket.y - size + 2} r={4}
          fill="#fff" stroke="#333" strokeWidth={1} />
      )}
    </g>
  );
}

function BossNode({ region }) {
  const cx = region.x + region.w - 24;
  const cy = region.y + region.h - 24;
  if (region.locked) return null;

  return (
    <g>
      <circle cx={cx} cy={cy} r={14}
        fill={region.boss.defeated ? "#2a4a2a" : "#4a0a0a"}
        stroke={region.boss.defeated ? "#5fc45a" : "#ff4444"}
        strokeWidth={2}
      />
      <text x={cx} y={cy+5} textAnchor="middle" fontSize={14}>
        {region.boss.defeated ? "🏰" : "👹"}
      </text>
    </g>
  );
}

function RegionLabel({ region }) {
  if (region.locked) return (
    <text x={region.x + region.w/2} y={region.y + region.h/2 + 5}
      textAnchor="middle" fontSize={11} fill="rgba(255,255,255,0.3)"
      fontFamily="'Press Start 2P', monospace"
    >
      🔒
    </text>
  );

  return (
    <text x={region.x + region.w/2} y={region.y + 22}
      textAnchor="middle" fontSize={7} fill="rgba(255,255,255,0.85)"
      fontFamily="'Press Start 2P', monospace"
      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
    >
      {region.name}
    </text>
  );
}

// ── MAIN ────────────────────────────────────────────────────────────────────
export default function WorldMap() {
  const [selected, setSelected] = useState(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.tagName === "svg" || e.target.tagName === "rect") {
      dragStart.current = { mx: e.clientX, my: e.clientY, px: pan.x, py: pan.y };
      setDragging(true);
    }
  };
  const handleMouseMove = (e) => {
    if (!dragging || !dragStart.current) return;
    setPan({
      x: dragStart.current.px + (e.clientX - dragStart.current.mx),
      y: dragStart.current.py + (e.clientY - dragStart.current.my),
    });
  };
  const handleMouseUp = () => setDragging(false);

  const selectedRegion = selected ? REGIONS.find(r => r.id === selected.region) : null;
  const regionTickets = selected ? TICKETS.filter(t => t.region === selected.region) : [];

  return (
    <div style={{
      width: "100%", height: "100vh",
      background: "#5b9bd4",
      overflow: "hidden",
      position: "relative",
      cursor: dragging ? "grabbing" : "grab",
      fontFamily: "'Press Start 2P', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        * { box-sizing: border-box; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes sparkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(1.2)} }
      `}</style>

      {/* Sky background */}
      <div style={{
        position:"absolute", inset:0,
        background: "linear-gradient(180deg, #4a8fc8 0%, #6aafea 60%, #8ecfff 100%)",
      }} />

      {/* Clouds */}
      {[[80,60],[300,40],[560,80],[780,50],[950,70]].map(([cx,cy],i) => (
        <div key={i} style={{
          position:"absolute", left:cx+pan.x, top:cy+pan.y,
          animation:`float ${3+i*0.5}s ease-in-out infinite`,
          animationDelay:`${i*0.7}s`,
          fontSize: 28+i*4, opacity:0.85,
          pointerEvents:"none",
        }}>☁️</div>
      ))}

      {/* SVG map */}
      <svg
        width="100%" height="100%"
        viewBox="0 0 1000 620"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ position:"absolute", inset:0 }}
      >
        <g transform={`translate(${pan.x * 0.8},${pan.y * 0.8})`}>
          {/* Paths first (below regions) */}
          {PATHS.map((p,i) => <PathLine key={i} path={p} />)}

          {/* Terrain regions */}
          {REGIONS.map(r => (
            <g key={r.id}>
              <TerrainShape region={r} />
              <RegionLabel region={r} />
              <BossNode region={r} />
            </g>
          ))}

          {/* Ticket nodes */}
          {TICKETS.map(t => (
            <TicketNode
              key={t.id}
              ticket={t}
              isSelected={selected?.id === t.id}
              onClick={setSelected}
            />
          ))}

          {/* Player marker on current region */}
          {(() => {
            const cur = REGIONS.find(r => r.current);
            if (!cur) return null;
            return (
              <text x={cur.x + cur.w/2} y={cur.y + cur.h/2 + 8}
                textAnchor="middle" fontSize={22}
                style={{ animation:"float 0.8s ease-in-out infinite" }}
              >
                🍄
              </text>
            );
          })()}
        </g>
      </svg>

      {/* HUD top */}
      <div style={{
        position:"absolute", top:16, left:16,
        background:"rgba(0,0,0,0.7)",
        border:"2px solid rgba(255,255,255,0.15)",
        borderRadius:8, padding:"10px 16px",
        backdropFilter:"blur(8px)",
      }}>
        <div style={{ fontSize:8, color:"#FFD700", letterSpacing:"0.15em", marginBottom:4 }}>
          SPRINT MAP
        </div>
        <div style={{ fontSize:7, color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em" }}>
          Q2 2026
        </div>
        <div style={{ display:"flex", gap:12, marginTop:8 }}>
          {Object.entries(STATUS).map(([k,v]) => (
            <div key={k} style={{ display:"flex", alignItems:"center", gap:4 }}>
              <div style={{ width:7, height:7, borderRadius:"50%", background:v.color }} />
              <span style={{ fontSize:6, color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>{k}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Legend: drag hint */}
      <div style={{
        position:"absolute", bottom:16, left:16,
        fontSize:6, color:"rgba(255,255,255,0.35)",
        letterSpacing:"0.1em",
      }}>
        DRAG TO EXPLORE · CLICK NODES
      </div>

      {/* Ticket detail panel */}
      {selected && (
        <div style={{
          position:"absolute", right:0, top:0, bottom:0,
          width:300,
          background:"rgba(10,10,20,0.93)",
          borderLeft:"2px solid rgba(255,255,255,0.1)",
          backdropFilter:"blur(12px)",
          display:"flex", flexDirection:"column",
          overflowY:"auto",
        }}>
          {/* Region header */}
          <div style={{
            padding:"20px 18px 14px",
            borderBottom:"1px solid rgba(255,255,255,0.07)",
            background: selectedRegion
              ? `linear-gradient(135deg, ${selectedRegion.color}33, transparent)`
              : "transparent",
          }}>
            <div style={{ fontSize:7, color:"rgba(255,255,255,0.4)", letterSpacing:"0.15em", marginBottom:6 }}>
              {selectedRegion?.name?.toUpperCase()}
            </div>
            <div style={{ fontSize:11, color:"#fff", marginBottom:12 }}>
              {selected.title}
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{
                fontSize:7, padding:"3px 8px",
                background: STATUS[selected.status].color + "33",
                color: STATUS[selected.status].color,
                borderRadius:4, letterSpacing:"0.1em",
              }}>
                {selected.status.toUpperCase()}
              </span>
              <span style={{
                fontSize:7, padding:"3px 8px",
                background:"rgba(255,255,255,0.08)",
                color:"rgba(255,255,255,0.5)",
                borderRadius:4,
              }}>
                SIZE {selected.size}
              </span>
              <span style={{
                fontSize:7, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em",
              }}>
                {selected.id}
              </span>
            </div>
          </div>

          {/* Owner */}
          <div style={{ padding:"14px 18px", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize:7, color:"rgba(255,255,255,0.3)", marginBottom:8, letterSpacing:"0.1em" }}>
              OWNER
            </div>
            {selected.owner ? (
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{
                  width:26, height:26, borderRadius:"50%",
                  background:"linear-gradient(135deg, #FF6B35, #ff4400)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:9, fontWeight:700, color:"#fff",
                }}>
                  {selected.owner}
                </div>
                <span style={{ fontSize:9, color:"rgba(255,255,255,0.7)" }}>{selected.owner}</span>
              </div>
            ) : (
              <div style={{
                fontSize:8, color:"#ff6b6b",
                padding:"6px 10px",
                border:"1px dashed rgba(255,100,100,0.3)",
                borderRadius:4, cursor:"pointer",
                letterSpacing:"0.1em",
                transition:"all 0.15s",
              }}
              onMouseOver={e=>{e.currentTarget.style.background="rgba(255,100,100,0.1)"}}
              onMouseOut={e=>{e.currentTarget.style.background="transparent"}}
              >
                ⚑ GRAB THIS TICKET
              </div>
            )}
          </div>

          {/* Other tickets in region */}
          <div style={{ padding:"14px 18px", flex:1 }}>
            <div style={{ fontSize:7, color:"rgba(255,255,255,0.3)", marginBottom:10, letterSpacing:"0.1em" }}>
              ALSO IN THIS REGION
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
              {regionTickets.filter(t => t.id !== selected.id).map(t => (
                <div key={t.id}
                  onClick={() => setSelected(t)}
                  style={{
                    display:"flex", alignItems:"center", gap:8,
                    padding:"6px 10px",
                    background:"rgba(255,255,255,0.04)",
                    borderRadius:5, cursor:"pointer",
                    border:"1px solid rgba(255,255,255,0.05)",
                    transition:"background 0.1s",
                  }}
                  onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
                  onMouseOut={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"}
                >
                  <div style={{ width:7, height:7, borderRadius:"50%", background:STATUS[t.status].color, flexShrink:0 }} />
                  <span style={{ fontSize:8, color:"rgba(255,255,255,0.6)", flex:1 }}>{t.title}</span>
                  <span style={{ fontSize:7, color:"rgba(255,255,255,0.25)" }}>{t.id}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Close */}
          <div style={{ padding:"12px 18px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
            <div onClick={() => setSelected(null)} style={{
              fontSize:7, color:"rgba(255,255,255,0.3)", cursor:"pointer",
              letterSpacing:"0.15em", textAlign:"center",
              padding:"6px",
              transition:"color 0.15s",
            }}
            onMouseOver={e=>e.currentTarget.style.color="rgba(255,255,255,0.6)"}
            onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,0.3)"}
            >
              ✕ CLOSE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
