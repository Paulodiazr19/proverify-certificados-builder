
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
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificado de Antecedentes - ProVerify</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@700&display=swap" rel="stylesheet">
    <style>
        :root {
            --azul-primario: #0a3d62;
            --azul-secundario: #3c6382;
            --azul-acento: #60a3bc;
            --azul-claro: #82ccdd;
            --rojo-peligro: #e74c3c;
            --naranja-advertencia: #f39c12;
            --verde-exito: #27ae60;
            --azul-logo: #0d2344;
            --naranja-logo: #f7a42c;
            --gris-claro: #f0f0f0;
            --gris-texto: #555;
            --blanco: #ffffff;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: #e0e0e0;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }

        .certificate-container {
            width: 210mm;
            min-height: 297mm;
            position: relative;
        }
        
        body::after {
            content: 'PROVERIFY';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 15vw;
            color: rgba(128, 128, 128, 0.03);
            font-weight: 700;
            font-family: 'Montserrat', sans-serif;
            z-index: 0;
            pointer-events: none;
        }

        .page {
            background: var(--blanco);
            width: 210mm;
            height: 297mm;
            box-shadow: 0 0 15px rgba(0,0,0,0.15);
            margin: 20px 0;
            box-sizing: border-box;
            padding: 20mm 15mm;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        
        .page:not(:last-child) {
            margin-bottom: 20px;
        }

        /* Header */
        .header {
            background: linear-gradient(90deg, var(--azul-primario), var(--azul-secundario));
            padding: 10mm 15mm;
            margin: -20mm -15mm 15mm -15mm;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: var(--blanco);
        }

        .logo-container {
            background: var(--blanco);
            border-radius: 8px;
            padding: 8px 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .logo-text {
            font-family: 'Montserrat', sans-serif;
            font-size: 24px;
            color: var(--azul-logo);
            font-weight: 700;
        }
        
        .logo-icon {
            width: 30px;
            height: 30px;
            border: 3px solid var(--naranja-logo);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .logo-icon .checkmark {
            width: 8px;
            height: 15px;
            border: solid var(--naranja-logo);
            border-width: 0 4px 4px 0;
            transform: rotate(45deg);
            margin-bottom: 3px;
        }

        .header-title {
            font-size: 28px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-align: right;
        }
        
        /* Footer */
        .footer {
            margin-top: auto;
            padding-top: 10px;
            border-top: 1px solid var(--gris-claro);
            font-size: 8px;
            color: var(--gris-texto);
            text-align: center;
            position: absolute;
            bottom: 10mm;
            left: 15mm;
            right: 15mm;
        }

        .footer .logo-container {
            padding: 4px 8px;
            box-shadow: none;
            margin: 0 auto 5px;
            width: fit-content;
        }
        .footer .logo-text { font-size: 14px; }
        .footer .logo-icon { width: 16px; height: 16px; border-width: 2px;}
        .footer .logo-icon .checkmark { width: 4px; height: 8px; border-width: 0 2px 2px 0; margin-bottom: 2px;}

        .footer-legal {
            margin-bottom: 5px;
        }
        
        .footer-brand {
            font-weight: 700;
        }

        .page-number {
            position: absolute;
            bottom: 10mm;
            left: 15mm;
            font-size: 9px;
            color: var(--gris-texto);
        }
        
        .secure-doc {
            position: absolute;
            bottom: 10mm;
            right: 15mm;
            font-size: 9px;
            color: var(--gris-texto);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .secure-doc svg {
            width: 12px;
            height: 12px;
            fill: var(--gris-texto);
        }

        /* Content Sections */
        .content-section {
            margin-bottom: 20px;
        }
        
        .section-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--azul-primario);
            padding-bottom: 5px;
            border-bottom: 2px solid var(--azul-primario);
            margin-bottom: 15px;
        }
        
        /* Info Personal */
        .info-personal {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 15px;
            border: 1px solid var(--gris-claro);
            border-left: 5px solid var(--azul-primario);
            border-radius: 0 8px 8px 0;
        }
        
        .info-fields {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .info-fields .field {
            display: grid;
            grid-template-columns: 120px 1fr;
            align-items: center;
        }

        .info-fields label {
            font-weight: 600;
            font-size: 14px;
            color: var(--gris-texto);
        }

        .info-fields input {
            font-family: 'Poppins', sans-serif;
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 5px 8px;
            font-size: 14px;
            width: 250px;
        }
        
        .risk-indicator {
            text-align: center;
            padding: 10px 20px;
            border: 1px solid var(--naranja-advertencia);
            border-radius: 8px;
        }
        
        .risk-score {
            font-size: 48px;
            font-weight: 700;
            color: var(--naranja-advertencia);
            line-height: 1;
        }
        
        .risk-label {
            font-size: 16px;
            font-weight: 600;
            color: var(--naranja-advertencia);
            text-transform: uppercase;
        }

        .emission-date {
            text-align: right;
            font-size: 12px;
            color: var(--gris-texto);
            margin-top: 10px;
            margin-bottom: 20px;
        }
        
        /* Tables */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
        }
        
        .data-table thead th {
            background: linear-gradient(90deg, var(--azul-primario), var(--azul-secundario));
            color: var(--blanco);
            padding: 10px 8px;
            text-align: left;
            font-weight: 600;
            text-transform: uppercase;
        }
        
        .data-table tbody td {
            padding: 8px;
            border-bottom: 1px solid var(--gris-claro);
        }
        
        .data-table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        /* Leyenda */
        .leyenda-section {
            padding: 15px;
            border: 1px solid var(--gris-claro);
            border-left: 5px solid var(--azul-acento);
            border-radius: 0 8px 8px 0;
            font-size: 11px;
        }

        .leyenda-section p {
            margin: 0 0 10px 0;
        }
        
        .leyenda-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
        }
        
        .color-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            display: inline-block;
        }

        /* Print styles */
        @media print {
            body {
                background-color: var(--blanco);
            }
            .certificate-container {
                width: 100%;
                min-height: auto;
            }
            .page {
                box-shadow: none;
                margin: 0;
                padding: 0;
                height: 297mm;
                page-break-after: always;
                overflow: hidden;
                padding: 20mm 15mm;
            }
            .page:last-child {
                page-break-after: avoid;
            }
            
            body::after {
                position: absolute;
                opacity: 0.05;
            }
            
            .header, .data-table thead th {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }

            .info-fields input {
                border: none;
                background: none;
                padding: 5px 0;
            }
        }
    </style>
</head>
<body>

    <div class="certificate-container">
        <!-- Página 1 -->
        <div class="page">
            <header class="header">
                <div class="logo-container">
                    <span class="logo-text">Pro</span>
                    <div class="logo-icon">
                        <div class="checkmark"></div>
                    </div>
                    <span class="logo-text">erify</span>
                </div>
                <h1 class="header-title">Certificado de Antecedentes</h1>
            </header>

            <main class="content">
                <section class="content-section info-personal-section">
                    <div class="info-personal">
                        <div class="info-fields">
                            <div class="field">
                                <label for="nombre">Nombre Completo:</label>
                                <input type="text" id="nombre" value="Juan Alberto Pérez González">
                            </div>
                            <div class="field">
                                <label for="rut">RUT:</label>
                                <input type="text" id="rut" value="12.345.678-9">
                            </div>
                             <div class="field">
                                <label for="edad">Edad:</label>
                                <input type="text" id="edad" value="45 años">
                            </div>
                        </div>
                        <div class="risk-indicator">
                            <div class="risk-score">65</div>
                            <div class="risk-label">Riesgo Medio</div>
                        </div>
                    </div>
                    <p class="emission-date" id="fecha-emision"></p>
                </section>

                <section class="content-section">
                    <h2 class="section-title">Procedimientos Judiciales</h2>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Estado</th>
                                <th>Inicio Proc.</th>
                                <th>Tribunal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>CIV-001</td>
                                <td>Causa Civil</td>
                                <td>En Tramitación</td>
                                <td>15/03/2022</td>
                                <td>1er Juzgado Civil de Santiago</td>
                            </tr>
                            <tr>
                                <td>LAB-001</td>
                                <td>Causa Laboral</td>
                                <td>Terminado</td>
                                <td>02/08/2021</td>
                                <td>2do Juzgado de Letras del Trabajo</td>
                            </tr>
                            <tr>
                                <td>PEN-001</td>
                                <td>Causa Penal</td>
                                <td>Fallido</td>
                                <td>10/11/2020</td>
                                <td>7mo Juzgado de Garantía de Santiago</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                
                <section class="content-section">
                    <h2 class="section-title">Demandas</h2>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Materia</th>
                                <th>Demandado</th>
                                <th>2do Demandado</th>
                                <th>Cuantía</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>DEM-012</td>
                                <td>Arrendamiento</td>
                                <td>Sí</td>
                                <td>No Aplica</td>
                                <td>$1.500.000</td>
                            </tr>
                            <tr>
                                <td>DEM-013</td>
                                <td>Indemnización</td>
                                <td>Sí</td>
                                <td>Sociedad XYZ Ltda.</td>
                                <td>$15.000.000</td>
                            </tr>
                            <tr>
                                <td>DEM-014</td>
                                <td>Cobranza</td>
                                <td>Sí</td>
                                <td>No Aplica</td>
                                <td>$850.000</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </main>
            
            <div class="page-number">Página 1 de 2</div>
            <div class="secure-doc">
                <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></svg>
                <span>Documento Seguro</span>
            </div>

            <footer class="footer">
                <div class="logo-container">
                    <span class="logo-text">Pro</span><div class="logo-icon"><div class="checkmark"></div></div><span class="logo-text">erify</span>
                </div>
                <div class="footer-legal">
                    Este certificado constituye una recopilación de información pública y no debe ser el único factor en la toma de decisiones. Información sujeta a Acta N°44-2022 de la Excma. Corte Suprema y Ley 20.866.
                </div>
                <div class="footer-brand">ProVerify Certificados | Documento generado automáticamente</div>
            </footer>
        </div>

        <!-- Página 2 -->
        <div class="page">
             <header class="header">
                <div class="logo-container">
                    <span class="logo-text">Pro</span>
                    <div class="logo-icon">
                        <div class="checkmark"></div>
                    </div>
                    <span class="logo-text">erify</span>
                </div>
                <h1 class="header-title">Certificado de Antecedentes</h1>
            </header>
             <main class="content">
                <section class="content-section">
                    <h2 class="section-title">Fallos</h2>
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ROL</th>
                                <th>Inicio/Término Rel. Laboral</th>
                                <th>Fallo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>FALL-001</td>
                                <td>T-254-2021</td>
                                <td>01/01/2020 - 31/07/2021</td>
                                <td>Acoge demanda parcialmente.</td>
                            </tr>
                            <tr>
                                <td>FALL-002</td>
                                <td>C-1234-2022</td>
                                <td>No Aplica</td>
                                <td>Rechaza demanda.</td>
                            </tr>
                            <tr>
                                <td>FALL-003</td>
                                <td>J-58-2020</td>
                                <td>No Aplica</td>
                                <td>Condena en costas.</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                
                <section class="content-section">
                    <div class="leyenda-section">
                        <h3 class="section-title" style="border-bottom: none; font-size: 16px;">Descripción y Leyenda</h3>
                        <p><strong>ID:</strong> Identificador único del procedimiento o demanda.</p>
                        <p><strong>Estado:</strong> Indica la etapa actual del proceso judicial (Ej: En Tramitación, Terminado, Fallido).</p>
                        <p><strong>Fallido:</strong> Indica que el proceso ha concluido con una sentencia o resolución final.</p>
                        <p><strong>Clasificación de Cuantía:</strong> Estimación del monto involucrado en la demanda.</p>
                        <div class="leyenda-item">
                            <span class="color-indicator" style="background-color: var(--verde-exito);"></span>
                            <span><strong>Cuantía Baja:</strong> Menor a $2.000.000</span>
                        </div>
                        <div class="leyenda-item">
                            <span class="color-indicator" style="background-color: var(--naranja-advertencia);"></span>
                             <span><strong>Cuantía Media:</strong> Entre $2.000.001 y $20.000.000</span>
                        </div>
                        <div class="leyenda-item">
                            <span class="color-indicator" style="background-color: var(--rojo-peligro);"></span>
                             <span><strong>Cuantía Alta:</strong> Mayor a $20.000.000</span>
                        </div>
                    </div>
                </section>
            </main>
            
            <div class="page-number">Página 2 de 2</div>
            <div class="secure-doc">
                 <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path></svg>
                <span>Documento Seguro</span>
            </div>

            <footer class="footer">
                 <div class="logo-container">
                    <span class="logo-text">Pro</span><div class="logo-icon"><div class="checkmark"></div></div><span class="logo-text">erify</span>
                </div>
                <div class="footer-legal">
                    Este certificado constituye una recopilación de información pública y no debe ser el único factor en la toma de decisiones. Información sujeta a Acta N°44-2022 de la Excma. Corte Suprema y Ley 20.866.
                </div>
                <div class="footer-brand">ProVerify Certificados | Documento generado automáticamente</div>
            </footer>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const fechaElemento = document.getElementById('fecha-emision');
            const ahora = new Date();
            const opciones = { day: 'numeric', month: 'long', year: 'numeric' };
            const fechaFormateada = ahora.toLocaleDateString('es-ES', opciones);
            
            fechaElemento.textContent = \`Fecha de Emisión: \${fechaFormateada}\`;
        });
    </script>
</body>
</html>
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
