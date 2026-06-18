import React, { useState } from 'react';
import { Download, TrendingUp, Zap, Mail, X, Send } from 'lucide-react';

const CASOS_DATA = [
  // RETAIL (8)
  {id:1,s:"Retail",c:"Chatbot recomendador",t:"Chat",ini:22000,rec:2600,prob:"Conversión"},
  {id:2,s:"Retail",c:"Chat tallas/fit",t:"Chat",ini:18000,rec:1900,prob:"Conversión"},
  {id:3,s:"Retail",c:"Recuperación carritos",t:"Voz",ini:20000,rec:2400,prob:"Conversión"},
  {id:4,s:"Retail",c:"Chat postventa",t:"Chat",ini:14000,rec:1600,prob:"Retención"},
  {id:5,s:"Retail",c:"Chat loyalty",t:"Chat",ini:16000,rec:1800,prob:"Retención"},
  {id:6,s:"Retail",c:"Auto. devoluciones",t:"Automatización",ini:15000,rec:1500,prob:"Operación"},
  {id:7,s:"Retail",c:"Auto. reabastecimiento",t:"Automatización",ini:30000,rec:2000,prob:"Operación"},
  {id:8,s:"Retail",c:"Omnicanal CRM",t:"Integración",ini:28000,rec:2500,prob:"Tecnología"},
  
  // BANCA (9)
  {id:9,s:"Banca",c:"Consultas saldo voz",t:"Voz",ini:35000,rec:4000,prob:"Operación"},
  {id:10,s:"Banca",c:"Bloqueo tarjetas",t:"Voz",ini:22000,rec:2500,prob:"Operación"},
  {id:11,s:"Banca",c:"Cobro impagos",t:"Voz",ini:30000,rec:3000,prob:"Cobranza"},
  {id:12,s:"Banca",c:"Onboarding KYC",t:"Chat",ini:40000,rec:3500,prob:"Adquisición"},
  {id:13,s:"Banca",c:"Asesor financiero",t:"Chat",ini:25000,rec:2800,prob:"Adquisición"},
  {id:14,s:"Banca",c:"Préstamos preaprobados",t:"Chat",ini:30000,rec:3200,prob:"Adquisición"},
  {id:15,s:"Banca",c:"Fraude detección",t:"Automatización",ini:60000,rec:5000,prob:"Riesgo"},
  {id:16,s:"Banca",c:"Antifraude multicanal",t:"Automatización",ini:55000,rec:4500,prob:"Riesgo"},
  {id:17,s:"Banca",c:"Chat-core",t:"Integración",ini:50000,rec:4000,prob:"Tecnología"},
  
  // SALUD (7)
  {id:18,s:"Salud",c:"Citas por voz",t:"Voz",ini:25000,rec:2800,prob:"Acceso"},
  {id:19,s:"Salud",c:"Confirmación citas",t:"Voz",ini:20000,rec:2200,prob:"Acceso"},
  {id:20,s:"Salud",c:"Seguimiento postop",t:"Voz",ini:26000,rec:2600,prob:"Seguimiento"},
  {id:21,s:"Salud",c:"Triaje síntomas",t:"Chat",ini:35000,rec:3000,prob:"Acceso"},
  {id:22,s:"Salud",c:"Chat resultados",t:"Chat",ini:16000,rec:1600,prob:"Seguimiento"},
  {id:23,s:"Salud",c:"Recordatorios medicación",t:"Automatización",ini:18000,rec:1500,prob:"Adherencia"},
  {id:24,s:"Salud",c:"Chat-historia clínica",t:"Integración",ini:45000,rec:3500,prob:"Tecnología"},
  
  // TELECOM (8)
  {id:25,s:"Telecom",c:"Soporte N1",t:"Voz",ini:30000,rec:3500,prob:"Soporte"},
  {id:26,s:"Telecom",c:"Anti-churn",t:"Voz",ini:32000,rec:3500,prob:"Retención"},
  {id:27,s:"Telecom",c:"Upselling planes",t:"Voz",ini:26000,rec:2800,prob:"Ingresos"},
  {id:28,s:"Telecom",c:"Portabilidad/altas",t:"Chat",ini:25000,rec:2800,prob:"Conversión"},
  {id:29,s:"Telecom",c:"Consumo datos",t:"Chat",ini:16000,rec:1700,prob:"Servicio"},
  {id:30,s:"Telecom",c:"Incidencias red",t:"Chat",ini:18000,rec:1900,prob:"Servicio"},
  {id:31,s:"Telecom",c:"Diagnóstico averías",t:"Automatización",ini:45000,rec:3000,prob:"Soporte"},
  {id:32,s:"Telecom",c:"Chat-OSS/BSS",t:"Integración",ini:40000,rec:3200,prob:"Tecnología"},
  
  // LOGÍSTICA (7)
  {id:33,s:"Logística",c:"Tracking voz",t:"Voz",ini:18000,rec:2000,prob:"Servicio"},
  {id:34,s:"Logística",c:"Reprogramación entregas",t:"Chat",ini:16000,rec:1800,prob:"Servicio"},
  {id:35,s:"Logística",c:"Asignación rutas",t:"Automatización",ini:45000,rec:2500,prob:"Eficiencia"},
  {id:36,s:"Logística",c:"Incidencias en ruta",t:"Automatización",ini:35000,rec:2400,prob:"Control"},
  {id:37,s:"Logística",c:"Coordinación conductores",t:"Voz",ini:22000,rec:2400,prob:"Coordinación"},
  {id:38,s:"Logística",c:"Reclamaciones",t:"Chat",ini:15000,rec:1600,prob:"Gestión"},
  {id:39,s:"Logística",c:"Chat-TMS",t:"Integración",ini:30000,rec:2600,prob:"Tecnología"},
  
  // VIAJES (6)
  {id:40,s:"Viajes",c:"Reservas hotel",t:"Voz",ini:22000,rec:2400,prob:"Reserva"},
  {id:41,s:"Viajes",c:"Check-in/out",t:"Chat",ini:20000,rec:2000,prob:"Operación"},
  {id:42,s:"Viajes",c:"Upselling servicios",t:"Voz",ini:20000,rec:2200,prob:"Ingresos"},
  {id:43,s:"Viajes",c:"Conserjería 24/7",t:"Chat",ini:16000,rec:1700,prob:"Experiencia"},
  {id:44,s:"Viajes",c:"Overbooking",t:"Automatización",ini:28000,rec:1800,prob:"Gestión"},
  {id:45,s:"Viajes",c:"Chat-PMS",t:"Integración",ini:26000,rec:2200,prob:"Tecnología"},
  
  // SEGUROS (7)
  {id:46,s:"Seguros",c:"FNOL voz",t:"Voz",ini:30000,rec:3000,prob:"FNOL"},
  {id:47,s:"Seguros",c:"Cotización pólizas",t:"Chat",ini:28000,rec:3000,prob:"Adquisición"},
  {id:48,s:"Seguros",c:"Comparador coberturas",t:"Chat",ini:18000,rec:1900,prob:"Educación"},
  {id:49,s:"Seguros",c:"Renovaciones",t:"Voz",ini:26000,rec:2800,prob:"Retención"},
  {id:50,s:"Seguros",c:"Peritaje fotográfico",t:"Automatización",ini:55000,rec:3500,prob:"Siniestros"},
  {id:51,s:"Seguros",c:"Validación documental",t:"Automatización",ini:30000,rec:2000,prob:"Procesos"},
  {id:52,s:"Seguros",c:"Chat-pólizas",t:"Integración",ini:35000,rec:2800,prob:"Tecnología"},
  
  // ENERGÍA (6)
  {id:53,s:"Energía",c:"Lectura contador",t:"Voz",ini:20000,rec:2400,prob:"Operación"},
  {id:54,s:"Energía",c:"Alta/baja suministro",t:"Chat",ini:24000,rec:2600,prob:"Conversión"},
  {id:55,s:"Energía",c:"Eficiencia energética",t:"Chat",ini:20000,rec:2000,prob:"Venta cruzada"},
  {id:56,s:"Energía",c:"Gestión cortes",t:"Automatización",ini:40000,rec:2800,prob:"Gestión"},
  {id:57,s:"Energía",c:"Gestión impagos",t:"Automatización",ini:26000,rec:2000,prob:"Cobranza"},
  {id:58,s:"Energía",c:"Chat-CIS",t:"Integración",ini:30000,rec:2400,prob:"Tecnología"},
  
  // EDUCACIÓN (6)
  {id:59,s:"Educación",c:"Admisiones",t:"Voz",ini:20000,rec:2200,prob:"Captación"},
  {id:60,s:"Educación",c:"Orientación vocacional",t:"Voz",ini:20000,rec:2200,prob:"Orientación"},
  {id:61,s:"Educación",c:"Tutor académico 24/7",t:"Chat",ini:30000,rec:2800,prob:"Retención"},
  {id:62,s:"Educación",c:"Gestión becas",t:"Chat",ini:16000,rec:1600,prob:"Acceso"},
  {id:63,s:"Educación",c:"Matriculación",t:"Automatización",ini:26000,rec:1800,prob:"Operación"},
  {id:64,s:"Educación",c:"Chat-LMS",t:"Integración",ini:24000,rec:2000,prob:"Tecnología"},
  
  // TECH/SAAS (6)
  {id:65,s:"Tech/SaaS",c:"Soporte premium",t:"Voz",ini:30000,rec:3200,prob:"Soporte"},
  {id:66,s:"Tech/SaaS",c:"Cualificación leads",t:"Voz",ini:26000,rec:2800,prob:"Ventas"},
  {id:67,s:"Tech/SaaS",c:"Onboarding producto",t:"Chat",ini:24000,rec:2600,prob:"Activation"},
  {id:68,s:"Tech/SaaS",c:"Knowledge base",t:"Chat",ini:20000,rec:2000,prob:"Soporte"},
  {id:69,s:"Tech/SaaS",c:"Gestión tickets",t:"Automatización",ini:26000,rec:2200,prob:"Soporte"},
  {id:70,s:"Tech/SaaS",c:"Chat-CRM",t:"Integración",ini:26000,rec:2200,prob:"Tecnología"},
];

const calcSinergia = (ids, casosMap) => {
  if (!ids.length) return { bonus: 0, disc: 0 };
  
  const sectorCounts = {};
  const typeCounts = {};
  
  ids.forEach(id => {
    const c = casosMap[id];
    sectorCounts[c.s] = (sectorCounts[c.s] || 0) + 1;
    typeCounts[c.t] = (typeCounts[c.t] || 0) + 1;
  });
  
  let bonus = 0, disc = 0;
  
  Object.values(sectorCounts).forEach(count => {
    if (count >= 2) {
      bonus += 10 * (count - 1);
      disc += 15 * (count - 1);
    }
  });
  
  Object.values(typeCounts).forEach(count => {
    if (count >= 2) {
      bonus += 12 * (count - 1);
      disc += 18 * (count - 1);
    }
  });
  
  if (ids.length >= 3) {
    bonus += 15;
    disc += 15;
  }
  
  return { bonus: Math.min(bonus, 50), disc: Math.min(disc, 50) };
};

const calcBeneficio = (tipo, ini, rec) => {
  const multipliers = { Voz: 2.8, Chat: 2.5, Automatización: 4.0, Integración: 3.2 };
  const mult = multipliers[tipo] || 3.0;
  return (ini + rec * 12) * mult;
};

const generarPDF = (selectedCasos, sector, sinergia, invYear1, invBundled, roiBundled, beneficioBundled) => {
  const element = document.createElement("div");
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 900px; color: #333;">
      <h1 style="text-align: center; color: #1F3864; border-bottom: 3px solid #1F3864; padding-bottom: 10px;">PROPUESTA AGENTES IA</h1>
      
      <div style="margin: 30px 0;">
        <h2 style="color: #1F3864; font-size: 18px;">Sector: ${sector}</h2>
        <p style="color: #666; font-size: 14px;">Análisis de presupuestación e impacto ROI</p>
      </div>
      
      <div style="margin: 30px 0;">
        <h3 style="color: #1F3864; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">Casos Seleccionados (${selectedCasos.length})</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr style="background: #f0f0f0;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Caso</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Tipo</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Inv. Inicial</th>
          </tr>
          ${selectedCasos.map(c => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 10px;">${c.c}</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: center; font-size: 12px;">${c.t}</td>
              <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">€${c.ini.toLocaleString()}</td>
            </tr>
          `).join("")}
        </table>
      </div>
      
      <div style="background: #f9f9f9; border-left: 4px solid #0066cc; padding: 20px; margin: 30px 0;">
        <h3 style="color: #1F3864; margin-top: 0;">Resumen Económico</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
          <div>
            <p style="color: #666; font-size: 12px; margin: 0;">INVERSIÓN AÑO 1</p>
            <p style="font-size: 24px; font-weight: bold; color: #0066cc; margin: 5px 0;">€${Math.round(invBundled).toLocaleString()}</p>
            ${sinergia.disc > 0 ? `<p style="font-size: 12px; color: #28a745; margin: 0;">Ahorro por sinergia: €${Math.round(invYear1 - invBundled).toLocaleString()}</p>` : ""}
          </div>
          <div>
            <p style="color: #666; font-size: 12px; margin: 0;">ROI BUNDLED</p>
            <p style="font-size: 24px; font-weight: bold; color: #28a745; margin: 5px 0;">${(roiBundled * 100).toFixed(0)}%</p>
            <p style="font-size: 12px; color: #666; margin: 0;">Beneficio anual: €${Math.round(beneficioBundled).toLocaleString()}</p>
          </div>
        </div>
      </div>
      
      ${sinergia.bonus > 0 ? `
        <div style="background: #e8f5e9; border-left: 4px solid #28a745; padding: 20px; margin: 30px 0;">
          <h3 style="color: #2e7d32; margin-top: 0;">Sinergias Detectadas</h3>
          <ul style="color: #2e7d32; margin: 10px 0;">
            <li>+${sinergia.bonus}% ROI por integración inteligente</li>
            <li>-${sinergia.disc}% inversión por economía de escala</li>
          </ul>
        </div>
      ` : ""}
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
        <p>Propuesta generada: ${new Date().toLocaleDateString("es-ES")}</p>
        <p>Herramienta: Presupuestador de Agentes IA v1.0</p>
      </div>
    </div>
  `;
  
  const opt = {
    margin: 10,
    filename: `Propuesta_${sector}_${new Date().getTime()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait", unit: "mm", format: "a4" }
  };
  
  // Retornar HTML para descarga local o para envío
  return element.innerHTML;
};

export default function Presupuestador() {
  const [sector, setSector] = useState("Retail");
  const [selected, setSelected] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  
  const casosMap = Object.fromEntries(CASOS_DATA.map(c => [c.id, c]));
  const sectores = [...new Set(CASOS_DATA.map(c => c.s))];
  const casosSector = CASOS_DATA.filter(c => c.s === sector);
  const selectedCasos = selected.map(id => casosMap[id]);
  const sinergia = calcSinergia(selected, casosMap);
  
  const invYear1 = selectedCasos.reduce((s, c) => s + c.ini + c.rec * 12, 0);
  const beneficioInd = selectedCasos.reduce((s, c) => s + calcBeneficio(c.t, c.ini, c.rec), 0);
  const beneficioBundled = beneficioInd * (1 + sinergia.bonus / 100);
  const invBundled = invYear1 * (1 - sinergia.disc / 100);
  const roiBundled = invBundled > 0 ? (beneficioBundled - invBundled) / invBundled : 0;
  
  const toggle = id => {
    setSelected(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id]);
  };
  
  const handleEnviar = async () => {
    if (!email || !nombre) {
      alert("Por favor completa nombre y email");
      return;
    }
    
    setLoading(true);
    
    try {
      // Generar contenido PDF
      const pdfContent = generarPDF(selectedCasos, sector, sinergia, invYear1, invBundled, roiBundled, beneficioBundled);
      
      // Llamar a API backend (necesitas tu propio endpoint)
      const response = await fetch("/api/enviar-propuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          nombre,
          sector,
          pdfContent,
          casos: selectedCasos.length,
          roi: (roiBundled * 100).toFixed(0),
          inversion: Math.round(invBundled),
          beneficio: Math.round(beneficioBundled)
        })
      });
      
      if (response.ok) {
        alert(`✓ Propuesta enviada a ${email}`);
        setShowEmailModal(false);
        setEmail("");
        setNombre("");
      } else {
        alert("Error al enviar. Intenta descargarlo como PDF.");
        descargarPDF();
      }
    } catch (err) {
      alert("Error de conexión. Descargando PDF...");
      descargarPDF();
    } finally {
      setLoading(false);
    }
  };
  
  const descargarPDF = () => {
    const html = generarPDF(selectedCasos, sector, sinergia, invYear1, invBundled, roiBundled, beneficioBundled);
    const blob = new Blob([html], { type: "text/html" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Propuesta_${sector}.html`;
    a.click();
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-white mb-2">Presupuestador de Agentes IA</h1>
          <p className="text-blue-300 text-lg">68 casos realistas. Selecciona, descubre sinergias, maximiza ROI.</p>
        </div>
        
        <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 mb-8 border border-slate-700">
          <div className="flex gap-2 flex-wrap">
            {sectores.map(s => (
              <button
                key={s}
                onClick={() => { setSector(s); setSelected([]); }}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                  sector === s ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-4">{sector}</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {casosSector.map(caso => (
                  <label key={caso.id} className="flex p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/60 cursor-pointer transition border border-slate-600">
                    <input
                      type="checkbox"
                      checked={selected.includes(caso.id)}
                      onChange={() => toggle(caso.id)}
                      className="w-4 h-4 mt-1 accent-blue-400"
                    />
                    <div className="ml-3 flex-1">
                      <div className="font-semibold text-white">{caso.c}</div>
                      <div className="text-xs text-slate-400">{caso.t} • €{caso.ini.toLocaleString()} • {caso.prob}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {selected.length === 0 ? (
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700 text-center">
                <Zap className="w-12 h-12 text-blue-400 mx-auto mb-3 opacity-60" />
                <p className="text-slate-400">Selecciona casos para ver análisis</p>
              </div>
            ) : (
              <>
                {sinergia.bonus > 0 && (
                  <div className="bg-green-900/30 backdrop-blur rounded-xl p-4 border border-green-700">
                    <h3 className="text-sm font-bold text-green-300 mb-2 flex items-center gap-2">
                      <TrendingUp size={16} /> Sinergias Detectadas
                    </h3>
                    <div className="text-xs text-green-200 space-y-1">
                      <p>✓ +{sinergia.bonus}% ROI</p>
                      <p>✓ -{sinergia.disc}% inversión</p>
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-900/30 backdrop-blur rounded-xl p-5 border border-blue-700">
                  <div className="text-xs text-blue-300 font-bold mb-2">INVERSIÓN AÑO 1</div>
                  <div className="text-3xl font-bold text-white">€{Math.round(invBundled).toLocaleString()}</div>
                  {sinergia.disc > 0 && (
                    <div className="text-xs text-blue-300 mt-2">Ahorro: €{Math.round(invYear1 - invBundled).toLocaleString()}</div>
                  )}
                </div>
                
                <div className="bg-purple-900/30 backdrop-blur rounded-xl p-5 border border-purple-700">
                  <div className="text-xs text-purple-300 font-bold mb-3">ROI BUNDLED</div>
                  <div className="text-4xl font-bold text-green-400">{(roiBundled * 100).toFixed(0)}%</div>
                  <div className="text-xs text-purple-300 mt-2">Beneficio: €{Math.round(beneficioBundled).toLocaleString()}</div>
                </div>
                
                <button
                  onClick={() => setShowEmailModal(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <Mail size={18} /> Enviar por Email
                </button>
                
                <button
                  onClick={descargarPDF}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Download size={18} /> Descargar PDF
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Modal Email */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Enviar Propuesta</h2>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Nombre</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@empresa.com"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              
              <button
                onClick={handleEnviar}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                <Send size={18} /> {loading ? "Enviando..." : "Enviar Propuesta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
