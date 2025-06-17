
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { DatosPersonalesData } from './DatosPersonales';
import { CausaLaboral } from './CausasLaborales';
import { ProcedimientoJudicial } from './ProcedimientosJudiciales';
import { Demanda } from './Demandas';
import { Fallo } from './Fallos';

interface PDFGeneratorProps {
  datos: DatosPersonalesData;
  causas: CausaLaboral[];
  procedimientos: ProcedimientoJudicial[];
  demandas: Demanda[];
  fallos: Fallo[];
}

export const generatePDF = async ({ datos, causas, procedimientos, demandas, fallos }: PDFGeneratorProps) => {
  // Crear el contenido HTML del certificado
  const htmlContent = `
    <div id="certificate" style="
      font-family: 'Montserrat', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px;
      background: white;
      color: #0a3d62;
      line-height: 1.6;
    ">
      <!-- Encabezado con logo -->
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 40px;
        border-bottom: 3px solid #f7a42c;
        padding-bottom: 20px;
      ">
        <div style="
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #0a3d62 0%, #3c6382 60%, #f7a42c 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 24px;
        ">
          PV
        </div>
        <div style="text-align: right;">
          <h1 style="
            margin: 0;
            font-size: 28px;
            font-weight: bold;
            color: #0a3d62;
            margin-bottom: 8px;
          ">CERTIFICADO DE ANTECEDENTES JUDICIALES</h1>
          <p style="
            margin: 0;
            color: #3c6382;
            font-size: 16px;
          ">ProVerify Certificados</p>
          <p style="
            margin: 0;
            color: #3c6382;
            font-size: 14px;
            margin-top: 10px;
          ">Fecha de emisión: ${new Date().toLocaleDateString('es-CL')}</p>
        </div>
      </div>

      <!-- Datos Personales -->
      <section style="margin-bottom: 30px;">
        <h2 style="
          color: #f7a42c;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
          border-left: 4px solid #f7a42c;
          padding-left: 12px;
        ">DATOS PERSONALES</h2>
        <div style="
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3c6382;
        ">
          <p><strong>Nombre Completo:</strong> ${datos.nombre || 'No especificado'}</p>
          <p><strong>RUT:</strong> ${datos.rut || 'No especificado'}</p>
          <p><strong>Email:</strong> ${datos.email || 'No especificado'}</p>
          <p><strong>Edad:</strong> ${datos.edad || 'No especificado'}</p>
          <p><strong>Indicador de Riesgo:</strong> ${datos.riesgo || 'No especificado'}</p>
        </div>
      </section>

      <!-- Causas Laborales -->
      <section style="margin-bottom: 30px;">
        <h2 style="
          color: #f7a42c;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
          border-left: 4px solid #f7a42c;
          padding-left: 12px;
        ">CAUSAS LABORALES</h2>
        <div style="
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3c6382;
        ">
          ${causas.length > 0 ? causas.map((causa, index) => `
            <div style="margin-bottom: 15px; ${index < causas.length - 1 ? 'border-bottom: 1px solid #dee2e6; padding-bottom: 15px;' : ''}">
              <p><strong>Tipo:</strong> ${causa.tipo || 'No especificado'}</p>
              <p><strong>Estado:</strong> ${causa.estado || 'No especificado'}</p>
              <p><strong>Cuantía:</strong> ${causa.cuantia || 'No especificado'}</p>
              <p><strong>Fecha:</strong> ${causa.fecha || 'No especificado'}</p>
              <p><strong>Juzgado:</strong> ${causa.juzgado || 'No especificado'}</p>
              <p><strong>Demandado:</strong> ${causa.demandado || 'No especificado'}</p>
              <p><strong>Materia:</strong> ${causa.materia || 'No especificado'}</p>
              <p><strong>RIT:</strong> ${causa.rit || 'No especificado'}</p>
            </div>
          `).join('') : '<p><em>No hay causas laborales registradas.</em></p>'}
        </div>
      </section>

      <!-- Procedimientos Judiciales -->
      <section style="margin-bottom: 30px;">
        <h2 style="
          color: #f7a42c;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
          border-left: 4px solid #f7a42c;
          padding-left: 12px;
        ">PROCEDIMIENTOS JUDICIALES</h2>
        <div style="
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3c6382;
        ">
          ${procedimientos.length > 0 ? procedimientos.map((proc, index) => `
            <div style="margin-bottom: 15px; ${index < procedimientos.length - 1 ? 'border-bottom: 1px solid #dee2e6; padding-bottom: 15px;' : ''}">
              <p><strong>ID:</strong> ${proc.id || 'No especificado'}</p>
              <p><strong>Tipo:</strong> ${proc.tipo || 'No especificado'}</p>
              <p><strong>Estado:</strong> ${proc.estado || 'No especificado'}</p>
              <p><strong>Inicio:</strong> ${proc.inicio || 'No especificado'}</p>
              <p><strong>Tribunal:</strong> ${proc.tribunal || 'No especificado'}</p>
            </div>
          `).join('') : '<p><em>No hay procedimientos judiciales registrados.</em></p>'}
        </div>
      </section>

      <!-- Demandas -->
      <section style="margin-bottom: 30px;">
        <h2 style="
          color: #f7a42c;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
          border-left: 4px solid #f7a42c;
          padding-left: 12px;
        ">DEMANDAS</h2>
        <div style="
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3c6382;
        ">
          ${demandas.length > 0 ? demandas.map((demanda, index) => `
            <div style="margin-bottom: 15px; ${index < demandas.length - 1 ? 'border-bottom: 1px solid #dee2e6; padding-bottom: 15px;' : ''}">
              <p><strong>ID:</strong> ${demanda.id || 'No especificado'}</p>
              <p><strong>Materia:</strong> ${demanda.materia || 'No especificado'}</p>
              <p><strong>Demandado:</strong> ${demanda.demandado || 'No especificado'}</p>
              <p><strong>Segundo Demandado:</strong> ${demanda.segundoDemandado || 'No especificado'}</p>
              <p><strong>Cuantía:</strong> ${demanda.cuantia || 'No especificado'}</p>
            </div>
          `).join('') : '<p><em>No hay demandas registradas.</em></p>'}
        </div>
      </section>

      <!-- Fallos -->
      <section style="margin-bottom: 40px;">
        <h2 style="
          color: #f7a42c;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          text-transform: uppercase;
          border-left: 4px solid #f7a42c;
          padding-left: 12px;
        ">FALLOS</h2>
        <div style="
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #3c6382;
        ">
          ${fallos.length > 0 ? fallos.map((fallo, index) => `
            <div style="margin-bottom: 15px; ${index < fallos.length - 1 ? 'border-bottom: 1px solid #dee2e6; padding-bottom: 15px;' : ''}">
              <p><strong>ID:</strong> ${fallo.id || 'No especificado'}</p>
              <p><strong>ROL:</strong> ${fallo.rol || 'No especificado'}</p>
              <p><strong>Inicio Relación:</strong> ${fallo.inicioRelacion || 'No especificado'}</p>
              <p><strong>Término Relación:</strong> ${fallo.finRelacion || 'No especificado'}</p>
              <p><strong>Fallo:</strong> ${fallo.fallo || 'No especificado'}</p>
            </div>
          `).join('') : '<p><em>No hay fallos registrados.</em></p>'}
        </div>
      </section>

      <!-- Pie de página -->
      <div style="
        text-align: center;
        margin-top: 40px;
        padding-top: 20px;
        border-top: 2px solid #f7a42c;
        color: #3c6382;
        font-size: 12px;
      ">
        <p><strong>ProVerify Certificados</strong></p>
        <p>Documento generado el ${new Date().toLocaleDateString('es-CL')} a las ${new Date().toLocaleTimeString('es-CL')}</p>
        <p>Este certificado es válido y ha sido generado automáticamente.</p>
      </div>
    </div>
  `;

  // Crear un elemento temporal para renderizar el HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  document.body.appendChild(tempDiv);

  try {
    // Convertir HTML a canvas
    const canvas = await html2canvas(tempDiv.querySelector('#certificate') as HTMLElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    // Crear PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Descargar el PDF
    const fileName = `certificado_antecedentes_${datos.nombre?.replace(/\s+/g, '_') || 'documento'}_${new Date().toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } finally {
    // Limpiar el elemento temporal
    document.body.removeChild(tempDiv);
  }
};
