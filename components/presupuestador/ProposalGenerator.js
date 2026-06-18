export const generarPropuestaHTML = (selectedCasos, sector, sinergia, invYear1, invBundled, roiBundled, beneficioBundled, companyData, resumenROI) => {
  const hasROI = resumenROI && resumenROI.beneficioMensualTotal > 0;

  const clienteInfo = companyData ? `
    <div style="background: #1a2744; border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid #243353;">
      <p style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 12px; letter-spacing: 1px;">PREPARADO PARA</p>
      <p style="color: #ffffff; font-size: 16px; font-weight: bold; margin: 0;">${companyData.nombre}${companyData.cargo ? ` — ${companyData.cargo}` : ''}</p>
      <p style="color: #94a3b8; font-size: 14px; margin: 4px 0 0;">${companyData.empresa}${companyData.empleados ? ` (${companyData.empleados} empleados)` : ''}</p>
      ${companyData.email ? `<p style="color: #60a5fa; font-size: 13px; margin: 4px 0 0;">${companyData.email}</p>` : ''}
    </div>
  ` : '';

  const roiSection = hasROI ? `
    <div style="background: rgba(239, 68, 68, 0.08); border-left: 4px solid #f87171; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
      <p style="color: #f87171; font-weight: bold; font-size: 14px; margin: 0 0 4px;">COSTE DE INACCION MENSUAL</p>
      <p style="font-size: 28px; font-weight: bold; color: #f87171; margin: 0;">&euro;${Math.round(resumenROI.costeInaccionMensual).toLocaleString()}</p>
      <p style="color: #fca5a5; font-size: 12px; margin: 8px 0 0;">Este es el coste de no actuar: lo que tu empresa pierde cada mes por no implementar.</p>
    </div>

    <div style="display: flex; gap: 16px; margin-bottom: 24px;">
      <div style="flex: 1; background: #1a2744; border-radius: 12px; padding: 20px; border: 1px solid #243353;">
        <p style="color: #34d399; font-size: 11px; font-weight: bold; margin: 0; letter-spacing: 1px;">ROI PERSONALIZADO</p>
        <p style="font-size: 28px; font-weight: bold; color: #34d399; margin: 8px 0 0;">${Math.round(resumenROI.roiTotal)}%</p>
        <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0;">Basado en tus datos reales</p>
      </div>
      <div style="flex: 1; background: #1a2744; border-radius: 12px; padding: 20px; border: 1px solid #243353;">
        <p style="color: #60a5fa; font-size: 11px; font-weight: bold; margin: 0; letter-spacing: 1px;">BENEFICIO ANUAL</p>
        <p style="font-size: 28px; font-weight: bold; color: #ffffff; margin: 8px 0 0;">&euro;${Math.round(resumenROI.beneficioAnualTotal).toLocaleString()}</p>
        <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0;">Inversion: &euro;${Math.round(resumenROI.inversionTotal).toLocaleString()}</p>
      </div>
    </div>

    ${resumenROI.detalles.length > 1 ? `
      <div style="background: #1a2744; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #243353;">
        <p style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 12px; letter-spacing: 1px;">DESGLOSE POR AREA</p>
        <table style="width: 100%; border-collapse: collapse;">
          ${resumenROI.detalles.map(d => `
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; border-bottom: 1px solid #243353;">${d.label}</td>
              <td style="padding: 8px 0; text-align: right; color: #34d399; font-weight: bold; font-size: 13px; border-bottom: 1px solid #243353;">${Math.round(d.roi)}% ROI</td>
              <td style="padding: 8px 0; text-align: right; color: #f87171; font-size: 12px; border-bottom: 1px solid #243353;">&euro;${Math.round(d.costeInaccion).toLocaleString()}/mes</td>
            </tr>
          `).join('')}
        </table>
      </div>
    ` : ''}
  ` : `
    <div style="display: flex; gap: 16px; margin-bottom: 24px;">
      <div style="flex: 1; background: #1a2744; border-radius: 12px; padding: 20px; border: 1px solid #243353;">
        <p style="color: #60a5fa; font-size: 11px; font-weight: bold; margin: 0; letter-spacing: 1px;">INVERSION ANO 1</p>
        <p style="font-size: 28px; font-weight: bold; color: #ffffff; margin: 8px 0 0;">&euro;${Math.round(invBundled).toLocaleString()}</p>
        ${sinergia.disc > 0 ? `<p style="font-size: 12px; color: #34d399; margin: 4px 0 0;">Ahorro: &euro;${Math.round(invYear1 - invBundled).toLocaleString()}</p>` : ''}
      </div>
      <div style="flex: 1; background: #1a2744; border-radius: 12px; padding: 20px; border: 1px solid #243353;">
        <p style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0; letter-spacing: 1px;">ROI ESTIMADO</p>
        <p style="font-size: 28px; font-weight: bold; color: #34d399; margin: 8px 0 0;">${(roiBundled * 100).toFixed(0)}%</p>
        <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0;">Beneficio: &euro;${Math.round(beneficioBundled).toLocaleString()}</p>
      </div>
    </div>
  `;

  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"><title>Propuesta AgentIA - ${companyData?.empresa || sector}</title></head>
    <body style="font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; max-width: 900px; margin: 0 auto; color: #e2e8f0; background: #020617;">
      <div style="background: linear-gradient(135deg, #0a1628 0%, #111d35 100%); border-radius: 16px; padding: 40px; border: 1px solid #243353;">
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 32px; margin: 0;">
            <span style="color: #ffffff;">Agent</span><span style="color: #fbbf24;">IA</span>
          </h1>
          <p style="color: #94a3b8; margin-top: 8px;">Propuesta de Agentes IA</p>
        </div>

        ${clienteInfo}

        <div style="background: #1a2744; border-radius: 12px; padding: 24px; margin-bottom: 24px; border-left: 4px solid #fbbf24;">
          <h2 style="color: #fbbf24; font-size: 18px; margin: 0 0 8px;">Sector: ${sector}</h2>
          <p style="color: #94a3b8; font-size: 14px; margin: 0;">Analisis de presupuestacion e impacto ROI para ${selectedCasos.length} agentes IA</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="background: #1a2744;">
            <th style="border: 1px solid #243353; padding: 12px; text-align: left; color: #fbbf24; font-size: 13px;">Caso de uso</th>
            <th style="border: 1px solid #243353; padding: 12px; text-align: center; color: #fbbf24; font-size: 13px;">Tipo</th>
            <th style="border: 1px solid #243353; padding: 12px; text-align: right; color: #fbbf24; font-size: 13px;">Inv. Inicial</th>
          </tr>
          ${selectedCasos.map(c => `
            <tr>
              <td style="border: 1px solid #243353; padding: 12px; color: #e2e8f0; font-size: 14px;">${c.c}</td>
              <td style="border: 1px solid #243353; padding: 12px; text-align: center; color: #94a3b8; font-size: 13px;">${c.t}</td>
              <td style="border: 1px solid #243353; padding: 12px; text-align: right; color: #e2e8f0; font-size: 14px;">&euro;${c.ini.toLocaleString()}</td>
            </tr>
          `).join('')}
        </table>

        ${roiSection}

        ${sinergia.bonus > 0 ? `
          <div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #34d399; padding: 16px 20px; border-radius: 8px; margin-bottom: 24px;">
            <p style="color: #34d399; font-weight: bold; font-size: 14px; margin: 0 0 8px;">Sinergias Detectadas</p>
            <p style="color: #6ee7b7; font-size: 13px; margin: 0;">+${sinergia.bonus}% ROI por integracion &middot; -${sinergia.disc}% inversion por escala</p>
          </div>
        ` : ''}

        <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #243353; text-align: center;">
          <p style="font-size: 11px; color: #64748b;">Propuesta generada: ${new Date().toLocaleDateString('es-ES')} | AgentIA v2.0</p>
        </div>
      </div>
    </body>
    </html>
  `;
  return html;
};

export const descargarPropuesta = (selectedCasos, sector, sinergia, invYear1, invBundled, roiBundled, beneficioBundled, companyData, resumenROI) => {
  const html = generarPropuestaHTML(selectedCasos, sector, sinergia, invYear1, invBundled, roiBundled, beneficioBundled, companyData, resumenROI);
  const blob = new Blob([html], { type: 'text/html' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Propuesta_AgentIA_${companyData?.empresa || sector}_${Date.now()}.html`;
  a.click();
  window.URL.revokeObjectURL(url);
};
